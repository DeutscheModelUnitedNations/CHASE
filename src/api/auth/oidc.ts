import Elysia, { t, type Static } from "elysia";
import { type oidcRoles, refresh, validateTokens } from "../services/OIDC";
import { mockedDefaultUser } from "@prisma/db";

const TokenCookieSchema = t.Object(
  {
    refresh_token: t.String(),
    access_token: t.String(),
    token_type: t.String(),
    id_token: t.String(),
    scope: t.String(),
    expires_in: t.Number(),
    expires_at: t.Number(),
    session_state: t.Any(),
  },
  { additionalProperties: false },
);

export type TokenCookieSchemaType = Static<typeof TokenCookieSchema>;
export const tokensCookieName = "token_set";

export type OidcResponse = Partial<{
  nextTokenRefreshDue: Date;
  tokenSet: TokenCookieSchemaType &
    Required<Pick<TokenCookieSchemaType, "access_token">>;
  user: Awaited<ReturnType<typeof validateTokens>> & {
    hasRole: (role: (typeof oidcRoles)[number]) => boolean;
    OIDCRoleNames: (typeof oidcRoles)[number][];
  };
}>;

type InternalOIDCResponse = {
  oidc: OidcResponse;
};

const emptyOidcResponse: InternalOIDCResponse = {
  oidc: {
    nextTokenRefreshDue: undefined,
    tokenSet: undefined,
    user: undefined,
  },
};

export const oidcPlugin = new Elysia({ name: "oidcPlugin" })
  // .guard({
  //   cookie: t.Cookie(
  //     {
  //       [tokensCookieName]: t.Optional(t.Partial(TokenCookieSchema)),
  //     },
  //     {
  //       path: "/",
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "lax",
  //     },
  //   ),
  // })
  .resolve(async ({ cookie: { token_set } }): Promise<InternalOIDCResponse> => {
    return {
      oidc: {
        // in 14 days
        nextTokenRefreshDue: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        tokenSet: {
          access_token: "123",
          expires_at: Date.now() + 1000 * 60 * 60 * 24 * 14,
          expires_in: 1000 * 60 * 60 * 24 * 14,
          id_token: "123",
          refresh_token: "123",
          scope: "123",
          session_state: "123",
          token_type: "123",
        },
        user: {
          ...mockedDefaultUser,
          sub: mockedDefaultUser.id,
          hasRole: () => true,
          OIDCRoleNames: ["admin"],
        },
      },
    };

    // if (!token_set.value || !token_set.value.access_token) {
    //   return structuredClone(emptyOidcResponse);
    // }

    // let user: Awaited<ReturnType<typeof validateTokens>> | undefined =
    //   undefined;

    // try {
    //   user = await validateTokens({
    //     access_token: token_set.value.access_token,
    //     id_token: token_set.value.id_token,
    //   });
    // } catch (error) {
    //   console.warn("Failed to retrieve user info from tokens", error);
    // }

    // if (!user) {
    //   try {
    //     if (!token_set.value.refresh_token) {
    //       throw new Error("No refresh token available");
    //     }
    //     const refreshed = await refresh(token_set.value.refresh_token);
    //     token_set.value = refreshed;
    //     token_set.maxAge = refreshed.expires_in;
    //   } catch (error) {
    //     console.warn("Failed to refresh tokens", error);
    //     return structuredClone(emptyOidcResponse);
    //   }
    // }

    // const OIDCRoleNames: (typeof oidcRoles)[number][] = [];

    // if (user && process.env.OIDC_ROLE_CLAIM) {
    //   const rolesRaw = user[process.env.OIDC_ROLE_CLAIM];
    //   if (rolesRaw) {
    //     const roleNames = Object.keys(rolesRaw);
    //     OIDCRoleNames.push(...(roleNames as any));
    //   }
    // }

    // const hasRole = (role: (typeof OIDCRoleNames)[number]) => {
    //   return OIDCRoleNames.includes(role);
    // };

    // return {
    //   oidc: {
    //     nextTokenRefreshDue: token_set.value.expires_in
    //       ? new Date(Date.now() + token_set.value.expires_in * 1000)
    //       : undefined,
    //     tokenSet: token_set.value as OidcResponse["tokenSet"],
    //     user: user ? { ...user, hasRole, OIDCRoleNames } : undefined,
    //   },
    // };
  })
  .as("plugin");
