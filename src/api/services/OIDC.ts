import {
  allowInsecureRequests,
  authorizationCodeGrant,
  buildAuthorizationUrl,
  buildEndSessionUrl,
  calculatePKCECodeChallenge,
  discovery,
  fetchUserInfo,
  randomPKCECodeVerifier,
  randomState,
  refreshTokenGrant,
  tokenIntrospection,
  type TokenEndpointResponse,
} from "openid-client";
import { createRemoteJWKSet, jwtVerify } from "jose";

export const oidcRoles = ["admin", "member", "service_user"] as const;

export type OIDCUser = {
  sub: string;
  email: string;
  preferred_username: string;
  family_name: string;
  given_name: string;

  // non checked fields
  locale?: string;
  phone?: string;

  [key: string]: any;
};

type OIDCFlowState = {
  visitedUrl: string;
  random: string;
};

export function isValidOIDCUser(user: any): user is OIDCUser {
  return (
    user.sub &&
    user.email &&
    user.preferred_username &&
    user.family_name &&
    user.given_name
  );
}

export const codeVerifierCookieName = "code_verifier";
export const oidcStateCookieName = "oidc_state";
export const tokensCookieName = "token_set";

const { config, jwks } = await (async () => {
  // this runs statically but we don't have access to the dynamic config values at build time
  // so we need to return dummy values
//   if (process.env.NEXT_PHASE === "phase-production-build") {
    return {
      config: undefined as unknown as Awaited<ReturnType<typeof discovery>>,
      jwks: undefined as unknown as
        | Awaited<ReturnType<typeof createRemoteJWKSet>>
        | undefined,
    };
//   }
//   const execute = [];
//   if (process.env.NODE_ENV === "development") {
//     execute.push(allowInsecureRequests);
//   }
//   const config = await discovery(
//     new URL(process.env.NEXT_PUBLIC_OIDC_AUTHORITY!),
//     process.env.NEXT_PUBLIC_OIDC_CLIENT_ID!,
//     {
//       client_secret: process.env.OIDC_CLIENT_SECRET,
//       token_endpoint_auth_method: process.env.OIDC_CLIENT_SECRET
//         ? undefined
//         : "none",
//     },
//     undefined,
//     {
//       execute,
//     },
//   );
//   const jwks_uri = config.serverMetadata().jwks_uri;
//   const jwks = jwks_uri
//     ? await createRemoteJWKSet(new URL(jwks_uri))
//     : undefined;

//   return { config, jwks };
})();

export async function startSignin(
  visitedUrl: URL,
  loginRoute = "/auth/login-callback",
) {
  //TODO https://github.com/gornostay25/svelte-adapter-bun/issues/62
  if (process.env.NODE_ENV === "production") {
    visitedUrl.protocol = "https:";
  }

  const code_verifier = randomPKCECodeVerifier();
  const code_challenge = await calculatePKCECodeChallenge(code_verifier);
  const state: OIDCFlowState = {
    visitedUrl: visitedUrl.toString(),
    random: randomState(),
  };
  const serialized_state = JSON.stringify(state);

  const parameters: Record<string, string> = {
    redirect_uri: `${visitedUrl.origin}${loginRoute}`,
    scope: process.env.OIDC_SCOPES! ?? "openid email profile",
    code_challenge,
    code_challenge_method: "S256",
    state: serialized_state,
  };

  const redirect_uri = buildAuthorizationUrl(config, parameters);

  return {
    code_verifier,
    redirect_uri,
    state: serialized_state,
  };
}

export async function resolveSignin(
  visitedUrl: URL,
  code_verifier: string,
  raw_state: string,
) {
  console.info("Resolving Signin");

  //TODO https://github.com/gornostay25/svelte-adapter-bun/issues/62
  if (process.env.NODE_ENV === "production") {
    visitedUrl.protocol = "https:";
    console.info("Fixed protocol:", visitedUrl.toString());
  }
  const state = JSON.parse(raw_state) as OIDCFlowState;
  console.info("Parsed state:", state);
  const tokens = await authorizationCodeGrant(config, visitedUrl, {
    pkceCodeVerifier: code_verifier,
    expectedState: JSON.stringify(state),
  });

  console.info("Retrieved tokens");

  (state as any).random = undefined;
  const strippedState: Omit<OIDCFlowState, "random"> = { ...state };

  console.info("Stripped state");

  return { tokens, state: strippedState };
}

export async function validateTokens({
  access_token,
  id_token,
}: Pick<
  TokenEndpointResponse,
  "access_token" | "id_token"
>): Promise<OIDCUser> {
  try {
    if (!jwks) throw new Error("No jwks available");
    if (!id_token) throw new Error("No id_token available");

    const [accessTokenValue, idTokenValue] = await Promise.all([
      jwtVerify(access_token, jwks, {
        issuer: config.serverMetadata().issuer,
        audience: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
      }),
      jwtVerify(id_token, jwks, {
        issuer: config.serverMetadata().issuer,
        audience: process.env.NEXT_PUBLIC_OIDC_CLIENT_ID,
      }),
    ]);

    if (!accessTokenValue.payload.sub) {
      throw new Error("No subject in access token");
    }

    if (!idTokenValue.payload.sub) {
      throw new Error("No subject in id token");
    }

    if (accessTokenValue.payload.sub !== idTokenValue.payload.sub) {
      throw new Error("Subject in access token and id token do not match");
    }

    // some basic fields which we want to be present
    // if the id token is configured in a way that it does not contain these fields
    // we instead want to use the userinfo endpoint
    if (!isValidOIDCUser(idTokenValue.payload)) {
      throw new Error("Not all fields in id token are present");
    }

    return idTokenValue.payload;
  } catch (error: any) {
    console.warn(
      "Failed to verify tokens locally, falling back to less performant info fetch:",
      error.message,
    );

    const remoteUserInfo = await tokenIntrospection(config, access_token);

    if (!isValidOIDCUser(remoteUserInfo)) {
      throw new Error("Not all fields in remoteUserInfo token are present");
    }

    return remoteUserInfo;
  }
}

export function refresh(refresh_token: string) {
  return refreshTokenGrant(config, refresh_token);
}

export function getLogoutUrl(visitedUrl: URL) {
  if (process.env.NODE_ENV === "production") {
    visitedUrl.protocol = "https:";
  }
  return buildEndSessionUrl(config, {
    post_logout_redirect_uri: `${visitedUrl.origin}/auth/logout-callback`,
  });
}

export function fetchUserInfoFromIssuer(
  access_token: string,
  expectedSubject: string,
) {
  return fetchUserInfo(config, access_token, expectedSubject);
}
