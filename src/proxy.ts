import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;

  // 1. Redirect www → non-www
  if (hostname === "www.valict.com") {
    const url = request.nextUrl.clone();
    url.hostname = "valict.com";

    // If no locale is present, go directly to the default locale
    if (
      !locales.some(
        (locale) =>
          pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
      )
    ) {
      url.pathname = `/${defaultLocale}${pathname}`;
    }

    return NextResponse.redirect(url, 301);
  }

  // 2. Skip all internal Next.js paths, API routes,
  // and static assets with extensions
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.match(/\.[^/]+$/)
  ) {
    return NextResponse.next();
  }

  // 3. Check if the pathname already contains a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // 4. If the locale is present, continue serving the requested route
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // 5. Redirect any request missing a locale to the default locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;

  return NextResponse.redirect(request.nextUrl, 301);
}

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.).*)",
  ],
};
