import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const sessionCookie = request.cookies.get("fifth-elements-session");

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home",
    "/classmates/:path*",
    "/gallery/:path*",
    "/movies/:path*",
    "/fun/:path*",
    "/credits/:path*",
    "/api/gallery/:path*",
  ],
};
