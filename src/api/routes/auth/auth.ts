import { Elysia } from "elysia";
import { oidcPlugin } from "../../auth/oidc";
import { permissionsPlugin } from "../../auth/permissions";
import { fetchUserInfoFromIssuer, getLogoutUrl } from "@/api/services/OIDC";
import { db } from "@prisma/db";
import { UserPlain } from "@prisma/generated/schema/User";

export const auth = new Elysia({
  prefix: "/auth",
})
  .use(oidcPlugin)
  .use(permissionsPlugin)
  // .get(
  //   "/logout-url",
  //   async ({ request: { url } }) => {
  //     return getLogoutUrl(new URL(url)).toString();
  //   },
  //   {
  //     detail: {
  //       description: "The url to visit to log out",
  //     },
  //   },
  // )
  .get(
    "/offline-user-refresh",
    async ({ permissions, oidc }) => {
      const user = permissions.getLoggedInUserOrThrow();
      return { user, nextTokenRefreshDue: oidc.nextTokenRefreshDue };
    },
    {
      detail: {
        description: "Refreshes the current user auth using the refresh token",
      },
    },
  )
  .get(
    "/myInfo",
    async ({ permissions }) => {
      const user = permissions.getLoggedInUserOrThrow();

      const res = db.user.findUniqueOrThrow({
        where: { id: user.sub },
        include: {
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

      return res;
    },
    {
      detail: {
        description: "Returns the user info when they are logged in",
      },
    },
  )
  .post(
    "/upsert-self",
    async ({ permissions, oidc }) => {
      const user = permissions.getLoggedInUserOrThrow();

      const issuerUserData = await fetchUserInfoFromIssuer(
        oidc.tokenSet!.access_token,
        user.sub,
      );

      if (
        !issuerUserData.email ||
        !issuerUserData.family_name ||
        !issuerUserData.given_name ||
        !issuerUserData.preferred_username
      ) {
        throw new Error("OIDC result is missing required fields!");
      }

      return await db.user.upsert({
        where: { id: issuerUserData.sub },
        create: {
          id: issuerUserData.sub,
          email: issuerUserData.email,
          family_name: issuerUserData.family_name,
          given_name: issuerUserData.given_name,
          preferred_username: issuerUserData.preferred_username,
          locale:
            issuerUserData.locale ?? process.env.PUBLIC_DEFAULT_LOCALE ?? "de",
        },
        update: {
          email: issuerUserData.email,
          family_name: issuerUserData.family_name,
          given_name: issuerUserData.given_name,
          preferred_username: issuerUserData.preferred_username,
          locale: issuerUserData.locale ?? process.env.PUBLIC_DEFAULT_LOCALE,
        },
      });
    },
    {
      detail: {
        description: "Refreshes the current user auth using the refresh token",
      },
    },
  );
