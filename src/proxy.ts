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

  // 5. تم تعديل هذا الجزء برمجياً للقضاء على تحذير الـ Render-blocking تماماً
  // إذا كان الزائر يطلب الصفحة الرئيسية المجردة، نعرض له محتوى الإنجليزي فوراً بدون Redirect
  if (pathname === "/") {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.rewrite(request.nextUrl); // عرض داخلي سريع بدون إعادة توجيه
  }

  // لأي مسارات داخلية أخرى مفقودة اللغة، نترك التوجيه الدائم يعمل كالمعتاد لحماية الـ SEO
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, 301);
}

export const config = {
  matcher: [
    "/((?!_next|api|.*\\.).*)",
  ],
};
