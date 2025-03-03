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
  console.info("Triggered middleware");

  const forwardedHost =
    request.headers.get("x-forwarded-host") || request.nextUrl.hostname;
  const forwardedProto = request.headers.get("x-forwarded-proto") || "http";

  const realVisitedUrl = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    `${forwardedProto}://${forwardedHost}`,
  );
  const { pathname } = request.nextUrl;
  console.info("Real visited URL: ", realVisitedUrl);

  let response = paraglide(request);
  console.info("Created localized response");

  if (/^\/app(\/.*)?$/.test(pathname)) {
    console.info("Detected app route");
    const tokenCookieValue = JSON.parse(
      request.cookies.get(tokensCookieName)?.value ?? "{}",
    );
    console.info("Parsed token cookie value: ");

    try {
      console.info("Validating tokens");

      await validateTokens({
        access_token: tokenCookieValue.access_token,
        id_token: tokenCookieValue.id_token,
      });

      console.info("Validation succeeded, responding");

      return response;
    } catch (error) {
      console.warn("Could not validate tokens, starting login flow");
    }

    const { state, code_verifier, redirect_uri } = await startSignin(
      realVisitedUrl,
      "/auth/resolve-login",
    );

    console.info("Started login flow");

    response = NextResponse.redirect(redirect_uri.toString());

    console.info("Created response with redirect", redirect_uri);

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

    console.info("Set cookies");
    console.info("Responding with redirect and cookies");

    return response;
  }

  if (/^\/auth\/resolve-login(\/.*)?$/.test(pathname)) {
    console.info("Detected resolve login route");
    const verifier = request.cookies.get(codeVerifierCookieName);
    if (!verifier || !verifier.value) {
      throw new Error("No code verifier cookie found.");
    }
    const oidcState = request.cookies.get(oidcStateCookieName);
    if (!oidcState || !oidcState.value) {
      throw new Error("No oidc state cookie found.");
    }

    console.info("Found verifier and state cookies. State:");

    const { state, tokens } = await resolveSignin(
      realVisitedUrl,
      verifier.value,
      oidcState.value,
    );

    console.info("Resolved login flow with state", state);

    response = NextResponse.redirect(state.visitedUrl, 302);

    console.info("Created response with redirect", state.visitedUrl);

    response.cookies.set({
      name: tokensCookieName,
      value: JSON.stringify(tokens),
      maxAge: tokens.expires_in ? tokens.expires_in * 1000 : undefined,
      sameSite: "lax",
      path: "/",
      secure: true,
      httpOnly: true,
    });

    console.info("Set tokens cookie");

    request.cookies.delete(codeVerifierCookieName);
    request.cookies.delete(oidcStateCookieName);

    console.info("Deleted verifier and state cookies");
    console.info("Responding with redirect to visited URL");

    return response;
  }
  
  console.info("Responding with default localized response");
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
