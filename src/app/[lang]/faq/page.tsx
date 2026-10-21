import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
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

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Navbar lang={currentLang} dict={dict} />

      {/* Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">
        {/* زر الرجوع للرئيسية */}
        <div className="mb-8">
          <Link
            href={`/${currentLang}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-valict-cyan dark:text-slate-300 dark:hover:text-valict-cyan transition-colors"
          >
            <FaArrowRightLong
              className={currentLang === "ar" ? "rotate-0" : "rotate-180"}
            />
            {currentLang === "ar" ? "العودة إلى الرئيسية" : "Back to Home"}
          </Link>
        </div>

        {/* مكون الـ FAQ */}
        <FAQ dict={dict} lang={currentLang} />
      </main>

      <Footer lang={currentLang} dict={dict} />
    </div>
  );
}
