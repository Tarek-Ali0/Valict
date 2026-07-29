export default async function sitemap() {
  return [
    {
      url: 'https://valict.com',
      lastModified: new Date().toISOString(), // صيغة التاريخ الصحيحة لجوجل
      changeFrequency: 'daily',             // اختياري: معدل تغير الصفحة
      priority: 1.0,                        // اختياري: أهمية الصفحة (من 0.0 إلى 1.0)
    },
    {
      url: 'https://valict.com',      // الرابط الثاني (مثال لصفحة أخرى)
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
