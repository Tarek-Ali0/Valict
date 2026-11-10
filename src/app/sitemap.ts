import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://valict.com";

  // 1. تاريخ ثابت للصفحات الأساسية (من وقت النشر في شهر 5)
  const oldPagesDate = new Date("2026-05-01");

  // 2. تاريخ ثابت للصفحات اللي اتضافت بعد كده (زي FAQ في أكتوبر)
  const newPagesDate = new Date("2026-10-21");

  const services = [
    "managed-it",
    "network",
    "cloud",
    "cybersecurity",
    "monitoring",
    "web-design",
  ];

  const languages = ["en", "ar"];

  // الصفحات القديمة (الرئيسية + من نحن)
  const oldStaticRoutes = ["/en", "/ar", "/en/about", "/ar/about"];

  const mapOldStaticRoutes = oldStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: oldPagesDate,
    changeFrequency: "monthly" as const,
    priority: route.endsWith("/about") ? 0.8 : 1.0,
  }));

  // الصفحات الجديدة (FAQ)
  const newStaticRoutes = ["/en/faq", "/ar/faq"];

  const mapNewStaticRoutes = newStaticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: newPagesDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // صفحات الخدمات (بتاخد تاريخ الصفحات القديمة)
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
