import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "ar";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip all internal Next.js paths, API routes, and static assets with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[^/]+$/) // Skips anything with a file extension (.svg, .png, .ico, etc)
  ) {
    return NextResponse.next();
  }

  // 2. Check if the pathname already contains a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 3. If the locale is present, just continue serving the requested route
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 4. Redirect any request missing a locale to the default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Matches all routes except internal files, api, and files with extensions
    "/((?!_next|api|.*\\.).*)",
  ],
};
