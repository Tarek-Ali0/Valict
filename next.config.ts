import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. حل مشكلة (Improve image delivery): إجبار المحرك على تحويل وتقديم الصور بأحدث وأصغر صيغ عالمية (AVIF و WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // 2. حل مشكلة (Legacy JavaScript): إجبار مترجم Next.js السريع (SWC) على ضغط الملفات وحذف الأكواد المهملة للنسخ القديمة
  swcMinify: true,
  
  // تحسين إضافي للسيو والأداء: تنظيف أكواد الطباعة (console.logs) تلقائياً عند بناء النسخة النهائية للموقع لتقليل حجم الحزم
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
