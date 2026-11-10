import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://valict.com";
  
  // تاريخ اليوم (بيتحدث تلقائياً مع كل Build)
  const currentDate = new Date().toISOString();

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

  // 1. الصفحات الثابتة (home + about + faq)
  const staticRoutes = [
    "/en", "/ar",
    "/en/about", "/ar/about",
    "/en/faq", "/ar/faq"
  ];

  const mapStaticRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: route.includes("/about") || route.includes("/faq") ? 0.8 : 1.0,
  }));

  // 2. توليد روابط الخدمات ديناميكياً
  const serviceRoutes = languages.flatMap((lang) =>
    services.map((slug) => ({
      url: `${baseUrl}/${lang}/services/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...mapStaticRoutes, ...serviceRoutes];
}
