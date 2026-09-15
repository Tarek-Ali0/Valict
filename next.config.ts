import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. حل مشكلة (Improve image delivery): إجبار المحرك على تقديم الصور بأحدث وأصغر صيغ عالمية (AVIF و WebP)
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '://unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // 2. تحسين إضافي للسيو والأداء وحذف الـ Legacy JS: تنظيف أكواد الـ console.logs تلقائياً عند بناء النسخة النهائية
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
