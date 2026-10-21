import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://valict.com";

  // تاريخ ثابت حقيقي للصفحات القديمة (غيره للتاريخ اللي إنت متأكد منه)
  const oldPagesDate = new Date("2026-05-01"); 
  
  // تاريخ النهارده للصفحات الجديدة (زي FAQ)
  const newPagesDate = new Date("2026-10-21"); 

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

  // 1. الصفحات الثابتة القديمة (about + home)
  const oldStaticRoutes = [
    "/en", "/ar",
    "/en/about", "/ar/about"
  ];

  const mapOldStaticRoutes = oldStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: oldPagesDate,
    changeFrequency: "monthly" as const,
    priority: route.endsWith("/about") ? 0.8 : 1.0,
  }));

  // 2. الصفحة الجديدة (FAQ)
  const newStaticRoutes = [
    "/en/faq", "/ar/faq"
  ];

  const mapNewStaticRoutes = newStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: newPagesDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 3. توليد روابط الخدمات ديناميكياً (برضه هنستخدم تاريخ الصفحات القديمة)
  const serviceRoutes = languages.flatMap((lang) =>
    services.map((slug) => ({
      url: `${baseUrl}/${lang}/services/${slug}`,
      lastModified: oldPagesDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...mapOldStaticRoutes, ...mapNewStaticRoutes, ...serviceRoutes];
}
