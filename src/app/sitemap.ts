import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://valict.com";

  // [تحديث #6] بدل تواريخ ثابتة قديمة (2026-05-01 / 2026-10-21)، بنستخدم
  // تاريخ اليوم في وقت البناء. كده محركات البحث تلاقي آخر تحديث حقيقي
  // بدل تاريخ جامد بيبقى قديم مع كل deploy.
  //
  // ملاحظة: الـ build بيتعمل على Vercel عند كل deploy، فالتاريخ هيتحدّث
  // تلقائيًا مع كل نشر. لو محتاج دقة أكبر (آخر تعديل فعلي لكل صفحة)،
  // ممكن نستخدم git log لاحقًا، بس ده كافي للمتطلب الحالي.
  const now = new Date();

  const services = [
    "managed-it",
    "network",
    "cloud",
    "cybersecurity",
    "monitoring",
    "web-design",
  ];

  const languages = ["en", "ar"];

  // الصفحات الأساسية (الرئيسية + من نحن)
  const staticRoutes = ["/en", "/ar", "/en/about", "/ar/about"];

  const mapStaticRoutes = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: route.endsWith("/about") ? 0.8 : 1.0,
  }));

  // صفحات FAQ
  const faqRoutes = ["/en/faq", "/ar/faq"];

  const mapFaqRoutes = faqRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // صفحات الخدمات
  const serviceRoutes = languages.flatMap((lang) =>
    services.map((slug) => ({
      url: `${baseUrl}/${lang}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...mapStaticRoutes, ...mapFaqRoutes, ...serviceRoutes];
}
