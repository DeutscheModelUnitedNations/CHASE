import { t, Elysia } from "elysia";
import { nanoid } from "nanoid";
import { sessionPlugin } from "../../auth/session";
import { permissionsPlugin } from "../../auth/permissions";

export const auth = new Elysia({
  prefix: "/auth",
})
  .use(sessionPlugin)
  .use(permissionsPlugin)
  .get(
    "/userState",
    async ({ query: { email } }) => {
      const foundEmail = await db.email.findUnique({
        where: {
          email,
        },
        include: { user: true },
      });

      if (!foundEmail?.user) {
        return "userNotFound";
      }

      if (!foundEmail.validated) {
        return "emailNotValidated";
      }

      return "ok";
    },
    {
      query: t.Object({
        email: t.String(),
      }),
      response: t.Union([
        t.Literal("userNotFound"),
        t.Literal("emailNotValidated"),
        t.Literal("ok"),
      ]),
      detail: {
        description:
          "Returns some info on the user in the system. Can be used to check if the user is existing and validated.",
      },
    },
  )
  .get(
    "/myInfo",
    async ({ session, permissions }) => {
      permissions.mustBeLoggedIn();
      return db.user.findUniqueOrThrow({
        where: { id: session.data?.user?.id },
        include: {
          emails: true,
          conferenceMemberships: {
            select: {
              id: true,
              role: true,
              conference: true,
            },
          },
          committeeMemberships: {
            include: {
              committee: {
                include: {
                  conference: true,
                },
              },
              delegation: {
                select: {
                  nation: true,
                },
              },
            },
          },
        },
      });
    },
    {
      detail: {
        description: "Returns the user info when they are logged in",
      },
    },
  )
  .post(
    "/validateEmail",
    async ({ body: { email, token } }) => {
      const foundEmail = await db.email.findUnique({
        where: {
          email,
        },
        include: { validationToken: true },
      });

      if (!foundEmail) {
        return "emailNotFound";
      }

      if (foundEmail.validated) {
        return "alreadyValidated";
      }

      if (!foundEmail.validationToken) {
        return "emailDoesNotHaveActiveValidationToken";
      }

      if (new Date() > foundEmail.validationToken.expiresAt) {
        return "tokenExpired";
      }

      if (
        !(await Bun.password.verify(
          token,
          foundEmail.validationToken.tokenHash,
        ))
      ) {
        return "invalidToken";
      }

      await db.email.update({
        where: {
          email,
        },
        data: {
          validated: true,
          validationTokenId: null,
        },
      });
      await db.token.delete({
        where: { id: foundEmail.validationToken.id },
      });

      const credentialCreateToken = nanoid(32);
      await db.pendingCredentialCreateTask.create({
        data: {
          token: {
            create: {
              tokenHash: await Bun.password.hash(credentialCreateToken),
              expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
            },
          },
          user: {
            connect: {
              id: foundEmail.userId,
            },
          },
        },
      });

      return { credentialCreateToken };
    },
    {
      body: t.Object({
        email: t.String(),
        token: t.String(),
      }),
      response: t.Union([
        t.Literal("emailNotFound"),
        t.Literal("emailDoesNotHaveActiveValidationToken"),
        t.Literal("invalidToken"),
        t.Literal("alreadyValidated"),
        t.Literal("tokenExpired"),
        t.Object({ credentialCreateToken: t.String() }),
      ]),
      detail: {
        description:
          "Validates the email of a user. The token is the token that was sent to the user via email. Returns a token which can be used to create credentials",
      },
    },
  )
  .post(
    "/createUser",
    async ({ body: { email, locale, name } }) => {
      const emailValidationToken = nanoid(32);
      const emailValidationTokenHash =
        await Bun.password.hash(emailValidationToken);
      await db.user.create({
        data: {
          name: name ?? email,
          emails: {
            create: {
              email,
              validationToken: {
                create: {
                  tokenHash: emailValidationTokenHash,
                  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                },
              },
            },
          },
        },
      });
    },
    {
      body: t.Object({
        email: t.String(),
        locale: t.Union([t.Literal("en"), t.Literal("de")]),
        name: t.Optional(t.String()),
      }),
      detail: {
        description: "Creates a user",
      },
    },
  )
  //TODO spam protection?
  .get(
    "/sendCredentialCreateToken",
    async ({ query: { email, locale } }) => {
      const token = nanoid(32);

      const foundEmail = await db.email.findUniqueOrThrow({
        where: {
          email,
        },
      });

      await db.pendingCredentialCreateTask.create({
        data: {
          token: {
            create: {
              tokenHash: await Bun.password.hash(token),
              expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
            },
          },
          user: {
            connect: {
              id: foundEmail.userId,
            },
          },
        },
      });
    },
    {
      query: t.Object({
        locale: t.Union([t.Literal("en"), t.Literal("de")]),
        email: t.String(),
      }),
      detail: {
        description: "Sends a credential creation token to the users email",
      },
    },
  )
  .get(
    "/logout",
    ({ session }) => {
      session.setData({ loggedIn: false });
    },
    {
      detail: {
        description:
          "Logs the user out. The user will be logged out on the next request",
      },
    },
  );
