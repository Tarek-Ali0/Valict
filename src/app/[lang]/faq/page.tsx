import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { FAQ } from "@/components/FAQ";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const currentLang = lang === "ar" ? "ar" : "en";
  const dict = await getDictionary(currentLang);

  const title =
    currentLang === "ar"
      ? `فالكت | ${dict.faq.title}`
      : `Valict | ${dict.faq.title}`;

  const description =
    currentLang === "ar"
      ? "كل اللي محتاج تعرفه عن خدمات فالكت وحلولها التقنية للشركات الصغيرة والمتوسطة والمؤسسات."
      : "Everything you need to know about Valict's IT services and solutions for SMEs and enterprises.";

  const url = `https://valict.com/${currentLang}/faq`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: "https://valict.com/en/faq",
        ar: "https://valict.com/ar/faq",
        "x-default": "https://valict.com/en/faq",
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Valict",
      type: "website",
      locale: currentLang === "ar" ? "ar_EG" : "en_US",
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const currentLang = lang === "ar" ? "ar" : "en";
  const dict = await getDictionary(currentLang);
  const isRTL = currentLang === "ar";

  // Breadcrumb Labels
  const homeLabel = currentLang === "ar" ? "الرئيسية" : "Home";
  const faqLabel = currentLang === "ar" ? "الأسئلة الشائعة" : "FAQ";

  // توليد الـ FAQ Schema لكل الأسئلة في كل الأقسام
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.categories.flatMap((category: any) =>
      category.items.map((item: any) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  // *** Breadcrumb Schema ***
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `https://valict.com/${currentLang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: faqLabel,
        item: `https://valict.com/${currentLang}/faq`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar lang={currentLang} dict={dict} />

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">
        
        {/* Breadcrumb (تدرج لوني من الأبيض للسماوي مع دعم RTL) */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r rtl:bg-gradient-to-l from-white to-valict-cyan/10 dark:from-slate-900 dark:to-valict-cyan/10 text-valict-cyan font-bold text-sm">
            <Link 
              href={`/${currentLang}`} 
              className="hover:text-valict-navy dark:hover:text-white transition-colors"
            >
              {homeLabel}
            </Link>
            <span className={`mx-1 ${isRTL ? "rotate-180" : ""} inline-block opacity-70`}>
              <FaArrowRightLong className="w-3 h-3" />
            </span>
            <span className="text-valict-navy dark:text-white">
              {faqLabel}
            </span>
          </div>
        </nav>

        {/* Main FAQ Card */}
        <FAQ dict={dict} lang={currentLang} />
      </div>
    </div>
  );
}
