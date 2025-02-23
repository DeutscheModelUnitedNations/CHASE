import { t, Elysia } from "elysia";
import { oidcPlugin } from "../../auth/oidc";
import { permissionsPlugin } from "../../auth/permissions";

export const auth = new Elysia({
  prefix: "/auth",
})
  .use(oidcPlugin)
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
      permissions.getLoggedInUserOrThrow();
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
