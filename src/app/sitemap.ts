import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://valict.com";

  // تاريخ البناء الحالي (بيتحدث تلقائياً مع كل Deploy)
  const lastModifiedDate = new Date();

  // قائمة الـ Slugs الخاصة بخدماتك
  const services = [
    "managed-it",
    "network",
    "cloud",
    "cybersecurity",
    "monitoring",
    "web-design",
  ];

  // اللغات المدعومة في الموقع
  const languages = ["en", "ar"];

  // الصفحات الثابتة الأساسية باللغات
  const staticRoutes = [
    "/en",
    "/ar",
    "/en/about",
    "/ar/about",
    "/en/faq",
    "/ar/faq",
  ];

  const mapStaticRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: lastModifiedDate,
    changeFrequency: "monthly" as const,
    priority: route.endsWith("/about") || route.endsWith("/faq") ? 0.8 : 1.0,
  }));

  // توليد روابط الخدمات ديناميكياً لكل لغة
  const serviceRoutes = languages.flatMap((lang) =>
    services.map((slug) => ({
      url: `${baseUrl}/${lang}/services/${slug}`,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...mapStaticRoutes, ...serviceRoutes];
}
