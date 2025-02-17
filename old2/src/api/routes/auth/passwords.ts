import { t, Elysia } from "elysia";
import { db } from "../../../../prisma/db";
import { sessionPlugin } from "../../auth/session";
import { permissionsPlugin } from "../../auth/permissions";

/**
 * === Regex for password requirements ===
 * --> (?=(.*RULE){MIN_OCCURANCES,})
 *
 *  ^                               start anchor
 *  (?=(.*[a-z]){1,})               lowercase letters.
 *  (?=(.*[A-Z]){1,})               uppercase letters.
 *  (?=(.*[0-9]){1,})               numbers.
 *  (?=(.*[!@#$%^&*()\-__+.]){1,})  all the special characters in the [] fields. The ones used by regex are escaped by using the \ or the character itself.
 *  {8,}                            indicates that you want 8 or more
 *  $                               end anchor
 */
const passwordRegex =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;

export const passwords = new Elysia()
  .use(sessionPlugin)
  .use(permissionsPlugin)
  .post(
    "/password",
    async ({ body: { email, password, credentialCreateToken } }) => {
      const foundEmail = await db.email.findUniqueOrThrow({
        where: {
          email,
        },
        include: {
          user: {
            include: {
              passwords: true,
              pendingCredentialCreationTasks: { include: { token: true } },
            },
          },
        },
      });

      if (!foundEmail.validated) {
        throw new Error("Email not validated");
      }

      if (!passwordRegex.test(password)) {
        throw new Error("Password does not meet requirements");
      }

      const foundTask = (
        await Promise.all(
          foundEmail.user.pendingCredentialCreationTasks.map(async (task) => ({
            ...task,
            hit: await Bun.password.verify(
              credentialCreateToken,
              task.token.tokenHash
            ),
          }))
        )
      ).find((t) => t.hit);

      if (!foundTask) {
        throw new Error("Invalid token");
      }

      if (
        (
          await Promise.all(
            foundEmail.user.passwords.map(async (p) => ({
              ...p,
              hit: await Bun.password.verify(password, p.passwordHash),
            }))
          )
        ).find((p) => p.hit)
      ) {
        throw new Error("Password already exists");
      }

      await db.password.create({
        data: {
          passwordHash: await Bun.password.hash(password),
          user: {
            connect: {
              id: foundEmail.userId,
            },
          },
        },
      });

      await db.pendingCredentialCreateTask.delete({
        where: {
          id: foundTask.id,
        },
      });

      await db.token.delete({
        where: {
          id: foundTask.token.id,
        },
      });
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
        credentialCreateToken: t.String(),
      }),
      detail: {
        description: "Login with a password",
      },
    }
  )
  .delete(
    "/password",
    async ({ body: { password }, session, permissions }) => {
      permissions.mustBeLoggedIn();
      const user = await db.user.findUniqueOrThrow({
        where: {
          id: session.data?.user?.id,
        },
        include: { passwords: true },
      });

      const foundPassword = (
        await Promise.all(
          user.passwords.map(async (p) => ({
            ...p,
            hit: await Bun.password.verify(password, p.passwordHash),
          }))
        )
      ).find((p) => p.hit);

      if (!foundPassword) {
        throw new Error("Password not found");
      }

      await db.password.delete({
        where: {
          id: foundPassword.id,
        },
      });
    },
    {
      body: t.Object({
        password: t.String(),
      }),
      detail: {
        description: "Delete a password",
      },
    }
  )
  .post(
    "/password/login",
    async ({ body: { email, password }, session }) => {
      const foundEmail = await db.email.findUniqueOrThrow({
        where: {
          email,
        },
        include: { user: { include: { passwords: true } } },
      });

      if (!foundEmail.validated) {
        throw new Error("Email not validated");
      }
      if (
        !(
          await Promise.all(
            foundEmail.user.passwords.map((p) =>
              Bun.password.verify(password, p.passwordHash)
            )
          )
        ).some((p) => p)
      ) {
        throw new Error("Invalid password");
      }

      await session.setData({
        loggedIn: true,
        user: {
          id: foundEmail.user.id,
          email: foundEmail.email,
          name: foundEmail.user.name,
        },
      });
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        description: "Login with a password",
      },
    }
  );
