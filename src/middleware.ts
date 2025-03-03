import { middleware as paraglide } from "@/lib/i18n";
import { NextResponse, type NextRequest } from "next/server";
import {
  codeVerifierCookieName,
  oidcStateCookieName,
  resolveSignin,
  startSignin,
  tokensCookieName,
  validateTokens,
} from "./api/services/OIDC";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const response = paraglide(request);

  if (/^\/app(\/.*)?$/.test(pathname)) {
    const tokenCookieValue = JSON.parse(
      request.cookies.get(tokensCookieName)?.value ?? "{}",
    );

    try {
      await validateTokens({
        access_token: tokenCookieValue.access_token,
        id_token: tokenCookieValue.id_token,
      });

      return response;
    } catch (error) {
      console.warn("Could not validate tokens, starting login flow");
    }

    const { state, code_verifier, redirect_uri } = await startSignin(
      new URL(request.nextUrl.toString()),
      "/auth/resolve-login",
    );
    response.cookies.set({
      name: codeVerifierCookieName,
      value: code_verifier,
      maxAge: 60 * 5,
      sameSite: "lax",
      path: "/",
      secure: true,
      httpOnly: true,
    });

    response.cookies.set({
      name: oidcStateCookieName,
      value: state,
      maxAge: 60 * 5,
      sameSite: "lax",
      path: "/",
      secure: true,
      httpOnly: true,
    });

    return NextResponse.redirect(redirect_uri.toString());
  }

  if (/^\/auth\/resolve-login(\/.*)?$/.test(pathname)) {
    const verifier = request.cookies.get(codeVerifierCookieName);
    if (!verifier || !verifier.value) {
      throw new Error("No code verifier cookie found.");
    }
    const oidcState = request.cookies.get(oidcStateCookieName);
    if (!oidcState || !oidcState.value) {
      throw new Error("No oidc state cookie found.");
    }

    const { state, tokens } = await resolveSignin(
      new URL(request.nextUrl.toString()),
      verifier.value,
      oidcState.value,
    );

    response.cookies.set({
      name: tokensCookieName,
      value: JSON.stringify(tokens),
      maxAge: tokens.expires_in ? tokens.expires_in * 1000 : undefined,
      sameSite: "lax",
      path: "/",
      secure: true,
      httpOnly: true,
    });

    request.cookies.delete(codeVerifierCookieName);
    request.cookies.delete(oidcStateCookieName);

    return NextResponse.redirect(state.visitedUrl, 302);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|undraw|logo|misc|dmunlogo).*)",
  ],
};
