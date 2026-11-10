import type { NextConfig } from "next";

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
    optimizePackageImports: ["react-icons"], // تسريع وضغط حزم الأيقونات تلقائياً في الخلفية
  },

  // تفعيل خيار الضغط التلقائي للمخرجات من السيرفر لتقليل مساحات جافا سكريبت المهدرة
  compress: true,

  // 4. إخفاء هيدر X-Powered-By لتحسين الأمان
  poweredByHeader: false,

  // 5. إزالة الـ redirects من هنا لأن proxy.ts هو اللي بيتعامل مع التوجيه
  // redirects: async () => { ... },
};

export default nextConfig;
