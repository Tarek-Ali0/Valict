import { getDictionary } from "@/lib/dictionaries"; // تأكد من مسار جلب الترجمة عندك
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { notFound } from "next/navigation";

export default async function ServiceDetailsPage({
  params: { lang, slug },
}: {
  params: { lang: string; slug: string };
}) {
  const dict = await getDictionary(lang);
  
  // البحث عن الخدمة المطلوبة من ملف الترجمة بناءً على الـ slug
  const service = dict.services.items.find((item: any) => item.slug === slug);

  // لو الخدمة مش موجودة يحوله لصفحة 404
  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-slate-50 dark:bg-valict-dark transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* زرار الرجوع */}
        <Link 
          href={`/${lang}#services`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-valict-cyan dark:text-slate-400 mb-8 transition-colors"
        >
          <FaArrowRightLong className="rotate-180 rtl:rotate-0" />
          {lang === "ar" ? "العودة للخدمات" : "Back to Services"}
        </Link>

        {/* محتوى الخدمة */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          <div className="inline-block px-4 py-1.5 rounded-full bg-valict-cyan/10 text-valict-cyan font-bold text-sm mb-6">
            {dict.services.title}
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-valict-navy dark:text-white mb-6 leading-tight">
            {service.title}
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-10 max-w-3xl">
            {service.desc}
          </p>

          {/* محتوى إضافي يمكن إضافته لاحقاً في ملف الـ JSON */}
          <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mb-10"></div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href={`/${lang}#contact`}
              className="btn-gradient text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg hover:shadow-valict-cyan/40 transition-all"
            >
              {dict.cta.button}
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
