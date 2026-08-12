import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;

  const currentLang = lang === "ar" ? "ar" : "en";

  const title =
    currentLang === "ar"
      ? "من نحن | Valict"
      : "About Us | Valict";

  const description =
    currentLang === "ar"
      ? "تعرف على Valict ورؤيتنا في تقديم حلول تقنية موثوقة للبنية التحتية لتقنية المعلومات والاتصالات، والخدمات المدارة، والحلول السحابية والأمن السيبراني."
      : "Learn more about Valict and our vision for delivering reliable IT infrastructure, managed services, cloud solutions, and cybersecurity solutions that help businesses grow securely and efficiently.";

  const url = `https://valict.com/${currentLang}/about`;

  return {
    title,
    description,

    alternates: {
      canonical: url,

      languages: {
        en: "https://valict.com/en/about",
        ar: "https://valict.com/ar/about",
        "x-default": "https://valict.com/en/about",
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Valict",
      type: "website",
      locale: currentLang === "ar" ? "ar_AR" : "en_US",

      images: [
        {
          url: "/valict-openGraph.png",
          width: 1200,
          height: 630,
          alt: "Valict | Validate Your Vision",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/valict-openGraph.png"],
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const currentLang = lang === "ar" ? "ar" : "en";

  const dict = await getDictionary(currentLang);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-valict-dark transition-colors duration-300">
      {/* Navbar */}
      <Navbar lang={currentLang} dict={dict} />

      {/* Page Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">

        {/* Back to Home */}
        <Link
          href={`/${currentLang}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-valict-cyan dark:text-slate-400 mb-8 transition-colors"
        >
          <FaArrowRightLong
            className={currentLang === "ar" ? "rotate-0" : "rotate-180"}
          />

          {currentLang === "ar"
            ? "العودة إلى الرئيسية"
            : "Back to Home"}
        </Link>

        {/* Main About Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Text Content */}
            <div className="lg:col-span-7">

              <div className="inline-block px-4 py-1.5 rounded-full bg-valict-cyan/10 text-valict-cyan font-bold text-sm mb-6">
                {currentLang === "ar"
                  ? "من نحن"
                  : "About Us"}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-valict-navy dark:text-white mb-6 leading-tight">
                {currentLang === "ar"
                  ? "Valict | Validate Your Vision"
                  : "Valict | Validate Your Vision"}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {currentLang === "ar"
                  ? "في Valict، نؤمن بأن التكنولوجيا ليست مجرد أدوات وأنظمة، بل هي عنصر أساسي لنجاح الأعمال واستمراريتها. نقدم حلول تقنية وبنية تحتية متكاملة لتقنية المعلومات والاتصالات تساعد الشركات على العمل بكفاءة وأمان والاستعداد للنمو."
                  : "At Valict, we believe technology is more than just tools and systems. It is a fundamental part of business success and continuity. We deliver reliable, integrated IT and ICT infrastructure solutions that help businesses operate efficiently, securely, and stay ready for growth."}
              </p>

              <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mb-8" />

              {/* Vision & Mission */}
              <div className="space-y-6 mb-10">

                <div>
                  <h2 className="text-xl font-bold text-valict-navy dark:text-white mb-2">
                    {currentLang === "ar"
                      ? "رؤيتنا"
                      : "Our Vision"}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentLang === "ar"
                      ? "أن نكون شريكًا تقنيًا موثوقًا يساعد الشركات على تحويل رؤيتها إلى قيمة حقيقية من خلال التكنولوجيا."
                      : "To be a trusted technology partner that helps businesses turn their vision into real value through technology."}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-valict-navy dark:text-white mb-2">
                    {currentLang === "ar"
                      ? "مهمتنا"
                      : "Our Mission"}
                  </h2>

                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {currentLang === "ar"
                      ? "تقديم حلول تقنية موثوقة وعملية وقابلة للتوسع، مع التركيز على الأداء والأمان واستمرارية الأعمال."
                      : "To deliver reliable, practical, and scalable technology solutions focused on performance, security, and business continuity."}
                  </p>
                </div>

              </div>

              {/* Core Values */}
              <div>

                <h2 className="text-xl font-bold text-valict-navy dark:text-white mb-6">
                  {currentLang === "ar"
                    ? "ما يميزنا"
                    : "What We Stand For"}
                </h2>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {(
                    currentLang === "ar"
                      ? [
                          "الموثوقية واستمرارية الأعمال",
                          "الأمان وحماية البيانات",
                          "حلول عملية وقابلة للتوسع",
                          "التركيز على قيمة الأعمال",
                        ]
                      : [
                          "Reliability and business continuity",
                          "Security and data protection",
                          "Practical and scalable solutions",
                          "Business value-focused technology",
                        ]
                  ).map((value, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3"
                    >
                      <FaCheckCircle className="w-5 h-5 text-valict-cyan shrink-0 mt-1" />

                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        {value}
                      </span>
                    </li>
                  ))}

                </ul>

              </div>

            </div>

            {/* Image */}
            <div className="lg:col-span-5 flex justify-center">

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50">

                <Image
                  src="/JustV.png"
                  alt="Valict"
                  fill
                  className="object-contain p-12"
                  sizes="(max-width: 768px) 100vw, 500px"
                  priority
                />

              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}