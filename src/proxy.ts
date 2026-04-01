import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  // 🔐 SESSION TOKEN (COOKIE + HEADER SUPPORT)
  const cookieToken = req.cookies.get("session_token")?.value;

  const authHeader = req.headers.get("authorization");
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  const sessionToken = cookieToken || bearerToken;

  const pathname = req.nextUrl.pathname;

  /* ===============================
     🟢 PUBLIC ROUTES (NO AUTH)
  =============================== */
  const publicPaths = [
    "/",                        
    "/about",                   
    "/legal",                   
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/reset-password",   // ✅ FIX ADDED
    "/auth/verify",
    "/auth/verify-email",
  ];

  const isPublic = publicPaths.some((p) =>
    pathname === p || pathname.startsWith(p + "/")
  );

  /* ===============================
     🔐 AUTH GUARD
  =============================== */

  // 🔓 Allow public pages always
  if (!sessionToken && isPublic) {
    return NextResponse.next();
  }

  // 🚫 Not logged in → protect private routes
  if (!sessionToken && !isPublic) {
    const url = req.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // 🔁 Logged-in users should not visit auth pages (EXCEPT reset page)
  if (
    sessionToken &&
    pathname.startsWith("/auth") &&
    !pathname.startsWith("/auth/reset-password")
  ) {
    const url = req.nextUrl.clone();
    url.pathname = "/risefeed";
    return NextResponse.redirect(url);
  }

  /* ===============================
     🧹 PROFILE URL SANITIZER
  =============================== */

  if (pathname.startsWith("/n/profile/")) {
    const username = pathname.slice("/n/profile/".length);
    const url = req.nextUrl.clone();
    url.pathname = `/profile/${username}`;
    return NextResponse.redirect(url);
  }

  if (/^\/{2,}profile\/+/.test(pathname)) {
    const clean = pathname.replace(/^\/+profile\/+/, "/profile/");
    const url = req.nextUrl.clone();
    url.pathname = clean;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
