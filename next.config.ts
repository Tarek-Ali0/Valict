import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '://unsplash.com', port: '', pathname: '/**' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // الحل السحري لتدمير مشكلة الـ Network dependency tree الخاصة بالأيقونات والمكتبات الكبيرة
  modularizeImports: {
    "react-icons/fa6": {
      transform: "react-icons/fa6/{{member}}",
      skipDefaultConversion: true,
    },
  },

  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: true },
    ];
  },
};

export default nextConfig;
