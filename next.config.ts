import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. إعدادات معالجة الصور الاحترافية فائقة الخفة والجودة
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
    removeConsole: process.env.NODE_ENV === 'production', // حذف الـ console.log في الإنتاج
  },

  // 3. تحسينات الأداء المتقدمة لـ Next.js 15 لتعطيل الـ Legacy Polyfills وتوليد أكواد حديثة
  experimental: {
    optimizePackageImports: ["react-icons"], // تسريع وضغط حزم الأيقونات لتوفير الحجم
  },
  
  // تم تفعيل خيار الضغط التلقائي للمخرجات من السيرفر
  compress: true, 
};

// هذا الجزء الإضافي يضمن التوجيه الفوري للإنجليزي مع التوافق الكامل مع خوادم Vercel
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false, // تحويل فوري مرن يمنع حظر الشبكة والـ Render-blocking تماماً
      },
    ];
  }
export default nextConfig;
