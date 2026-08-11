import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://valict.com';

  // قائمة الـ Slugs الخاصة بخدماتك
  const services = [
    "managed-it",
    "network",
    "cloud",
    "cybersecurity",
    "monitoring",
    "web-design"
  ];

  // اللغات المدعومة في الموقع
  const languages = ['en', 'ar'];

  // الصفحات الثابتة الأساسية باللغات (الاكتفاء بالمسارات المخصصة للغات لتفادي التكرار)
  const staticRoutes = [
    "/en",
    "/ar"
  ];

  const mapStaticRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0, // أولوية قصوى للصفحتين الرئيسيتين باللغتين
  }));

  // توليد روابط الخدمات ديناميكياً لكل لغة
  const serviceRoutes = languages.flatMap((lang) => 
    services.map((slug) => ({
      url: `${baseUrl}/${lang}/services/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  );

  return [...mapStaticRoutes, ...serviceRoutes];
}
