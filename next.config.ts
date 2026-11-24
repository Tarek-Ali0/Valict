import type { NextConfig } from "next";

/**
 * Content Security Policy (CSP)
 *
 * [إصلاح أمني #1] قبل التعديل ما كان فيه أي CSP ولا security headers.
 * ده بيترك الموقع مفتوح لـ XSS و clickjacking و MIME sniffing.
 *
 * تفصيل الـ directives:
 * - default-src 'self': المصدر الافتراضي لكل حاجة هو نفس النطاق.
 * - script-src 'self' 'unsafe-inline' 'unsafe-eval': Next.js في development بيحتاج
 *   unsafe-eval، وفي كل البيئات بيحتاج unsafe-inline للـ scripts اللي بيدخلها في
 *   <head> (React refresh, runtime). ملاحظة: 'unsafe-eval' بنحطها في dev بس.
 * - style-src 'self' 'unsafe-inline': Tailwind + Framer Motion بيحقنوا styles inline.
 * - img-src 'self' data: https: blob: : صور self + data URIs + أي HTTPS (للـ OG
 *   preview و صور الـ services من valict.com و unsplash).
 * - font-src 'self' data: : خطوط Cairo/Geist self-hosted + data URIs.
 * - connect-src 'self' https://valict.com https://*.upstash.com https://api.groq.com:
 *   API calls للـ chat + Redis cache + Groq SDK.
 * - frame-ancestors 'none': منع clickjacking (أقوى من X-Frame-Options).
 * - base-uri 'self': منع <base> tag injection.
 * - form-action 'self': النماذج ما تبعثش لـ third-party.
 * - object-src 'none': منع <object>/<embed>/<applet>.
 * - upgrade-insecure-requests: ترقية HTTP → HTTPS تلقائيًا.
 */
const cspScriptSrc =
  process.env.NODE_ENV === "development"
    ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
    : "script-src 'self' 'unsafe-inline'";

const cspDirectives = [
  "default-src 'self'",
  cspScriptSrc,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://valict.com https://*.upstash.com https://api.groq.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * Security Headers الأساسية.
 *
 * [إصلاح أمني #1] دي طبقة دفاع أساسية لأي موقع إنتاجي. كل header بنشرحها:
 * - Strict-Transport-Security: إجبار HTTPS لمدة سنتين + include subdomains + preload.
 * - X-Content-Type-Options: منع MIME sniffing (المتصفح ما يخمنش نوع الملف).
 * - X-Frame-Options: منع التضمين في iframe (تكميلي مع frame-ancestors 'none'
 *   في CSP للمتصفحات القديمة).
 * - Referrer-Policy: strict-origin-when-cross-origin — يبعث الـ origin بس
 *   للـ cross-origin، مش الـ full URL.
 * - Permissions-Policy: تعطيل APIs ما يحتاجهاش الموقع (camera, microphone,
 *   geolocation, payment) عشان لو فيه XSS ما يقدرش يوصلها.
 * - X-DNS-Prefetch-Control: off — تعطيل DNS prefetching للموارد الخارجية
 *   (خصوصية + أداء).
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: cspDirectives,
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=(), interest-cohort=()",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
  },
];

const nextConfig: NextConfig = {
  // 1. إعدادات معالجة الصور الاحترافية فائقة الخفة والجودة لتسريع تحميل الصفحات
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  // 2. تفعيل ضغط الملفات والحزم وتقليص حجم الـ Chunks لمنع الـ Unused JS وحظر الشبكة
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // حذف الـ console.log في الإنتاج لتوفير الحجم
  },

  // 3. تحسينات الأداء المتقدمة لـ Next.js لتعطيل الـ Legacy Polyfills وتوليد أكواد حديثة
  experimental: {
    optimizePackageImports: ["react-icons"], // تسريع وضغط حزم الأيقونات تلقائيًا في الخلفية
  },

  // تفعيل خيار الضغط التلقائي للمخرجات من السيرفر لتقليل مساحات جافا سكريبت المهدرة
  compress: true,

  // 4. إخفاء هيدر X-Powered-By لتحسين الأمان
  poweredByHeader: false,

  // 5. إزالة الـ redirects من هنا لأن proxy.ts هو اللي بيتعامل مع التوجيه
  // redirects: async () => { ... },

  // 6. [إصلاح أمني #1] Security Headers + CSP على كل الـ routes
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
