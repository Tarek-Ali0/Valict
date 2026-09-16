import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. إعدادات معالجة الصور الاحترافية فائقة الخفة والجودة لتسريع تحميل الصفحات
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 2. تفعيل ضغط الملفات والحزم وتقليص حجم الـ Chunks لمنع الـ Unused JS وحظر الشبكة
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // حذف الـ console.log في الإنتاج لتوفير الحجم
  },

  // 3. تحسينات الأداء المتقدمة لـ Next.js لتعطيل الـ Legacy Polyfills وتوليد أكواد حديثة
  experimental: {
    optimizePackageImports: ["react-icons"], // تسريع وضغط حزم الأيقونات تلقائياً في الخلفية
  },
  
  // تفعيل خيار الضغط التلقائي للمخرجات من السيرفر لتقليل مساحات جافا سكريبت المهدرة
  compress: true, 

  // 4. الصياغة الرسمية والسليمة لـ TypeScript للتوجيه الفوري اللحظي للإنجليزي دون حظر للشبكة
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false, // تحويل مرن يمنع حظر الشبكة والـ Render-blocking تماماً في فحص جوجل
      },
    ];
  },
};

export default nextConfig;
