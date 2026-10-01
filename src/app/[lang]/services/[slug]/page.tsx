import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import { notFound } from "next/navigation";

// بيانات تفصيلية إضافية لكل خدمة مع مسار الصورة الخاصة بها
const serviceDetailsContent: Record<
  string,
  {
    image: string;
    en: {
      overview: string;
      features: string[];
    };
    ar: {
      overview: string;
      features: string[];
    };
  }
> = {
  "managed-it": {
    image: "/images/services/managed-it.webp",
    en: {
      overview:
        "Empower your business with comprehensive, end-to-end IT management designed to eliminate downtime, optimize performance, and secure your digital workspace. We provide proactive solutions to streamline your workflow.",
      features: [
        "24/7 Proactive system monitoring to prevent issues before they occur.",
        "Significant reduction in internal IT overhead and maintenance costs.",
        "Access to a dedicated team of senior technical experts and engineers.",
        "Guaranteed business continuity and high system uptime.",
      ],
    },
    ar: {
      overview:
        "امنح شركتك القدرة على التركيز في نموها بينما نتولى نحن إدارة البنية التحتية بالكامل بمرونة واحترافية تامة للقضاء على الأعطال وتحسين الأداء.",
      features: [
        "مراقبة استباقية للأنظمة على مدار الساعة لمنع المشكلات قبل حدوثها.",
        "تقليل التكاليف التشغيلية ومصاريف قسم تقنية المعلومات الداخلي.",
        "الحصول على دعم فريق كامل من الخبراء والمهندسين المعتمدين.",
        "ضمان استمرارية العمل وعدم توقف الأعمال المفاجئ.",
      ],
    },
  },

  network: {
    image: "/images/services/network.webp",
    en: {
      overview:
        "Design, implementation, and optimization of robust network environments tailored to scale seamlessly with your growing corporate infrastructure.",
      features: [
        "High-performance local and wide-area network (LAN/WAN) design.",
        "Advanced enterprise routing and switching configurations.",
        "Robust network security implementation and segmentation.",
        "Seamless scalability to support future business expansion.",
      ],
    },
    ar: {
      overview:
        "تصميم وتنفيذ وتحسين بيئات شبكية قوية وآمنة مصممة خصيصاً لتتوسع بسلاسة مع نمو البنية التحتية لشركتك.",
      features: [
        "تصميم شبكات محلية وواسعة (LAN/WAN) عالية الأداء.",
        "إعداد وتكوين أنظمة التوجيه والتبديل المؤسسية المتقدمة.",
        "تطبيق معايير أمان شبكي قوية وعزل القطاعات الحساسة.",
        "قابلية للتوسع السلس لدعم توسعات الشركة المستقبلية.",
      ],
    },
  },

  cloud: {
    image: "/images/services/cloud.webp",
    en: {
      overview:
        "Scalable cloud systems and architecture designed for high availability, supreme performance, and cost-effective operational flexibility.",
      features: [
        "Secure cloud migration and hybrid infrastructure setup.",
        "High availability and automated backup solutions.",
        "Optimized cloud resource management to reduce monthly spending.",
        "Enterprise-grade reliability and fast disaster recovery.",
      ],
    },
    ar: {
      overview:
        "أنظمة وبنية سحابية قابلة للتوسع مصممة لضمان أعلى توافر، وأداء فائق، ومرونة تشغيلية عالية بتكلفة مناسبة.",
      features: [
        "نقل آمن للسحاب وإعداد البنية التحتية الهجينة (Hybrid).",
        "حلول توفر عالٍ (High Availability) ونسخ احتياطي تلقائي.",
        "تحسين إدارة الموارد السحابية لتقليل التكاليف الشهرية.",
        "موثوقية بمستوى المؤسسات واستجابة سريعة للطوارئ.",
      ],
    },
  },

  cybersecurity: {
    image: "/images/services/cybersecurity.webp",
    en: {
      overview:
        "Protect critical data, corporate digital assets, and user privacy with advanced, multi-layered security measures and proactive threat defense.",
      features: [
        "Comprehensive vulnerability assessments and penetration testing.",
        "Next-generation firewall and endpoint protection deployment.",
        "24/7 security operations center (SOC) monitoring.",
        "Employee security awareness training and compliance readiness.",
      ],
    },
    ar: {
      overview:
        "حماية البيانات الحرجة، والأصول الرقمية، وخصوصية الشركة من خلال تدابير أمنية متقدمة متعددة الطبقات ودفاع استباقي ضد التهديدات.",
      features: [
        "تقييم شامل للثغرات واختبارات الاختراق الأمنية.",
        "نشر جدران حماية من الجيل التالي وحماية نقاط النهاية.",
        "مراقبة أمنية مركزية على مدار الساعة (SOC).",
        "تدريب توعوي لفريق العمل وجاهزية للامتثال للمعايير.",
      ],
    },
  },

  monitoring: {
    image: "/images/services/monitoring.webp",
    en: {
      overview:
        "Round-the-clock monitoring and dedicated technical support services designed to deliver total peace of mind for your daily operations.",
      features: [
        "24/7/365 continuous performance and system health monitoring.",
        "Rapid incident response and immediate ticket resolution.",
        "Proactive alerts and automated performance reporting.",
        "Dedicated helpdesk support for your employees.",
      ],
    },
    ar: {
      overview:
        "خدمات مراقبة على مدار الساعة ودعم فني متخصص مصمم ليمنحك راحة البال الكاملة ويضمن سلاسة العمليات اليومية.",
      features: [
        "مراقبة مستمرة لأداء وصحة الأنظمة على مدار الساعة.",
        "استجابة سريعة للحوادث وحل المشكلات فور ظهورها.",
        "تنبيهات استباقية وتقارير أداء دورية ومفصلة.",
        "مكتب مساعدة ودعم فني مخصص لموظفيك.",
      ],
    },
  },

  "web-design": {
    image: "/images/services/web-design.webp",
    en: {
      overview:
        "Professional, high-performance corporate websites built with modern technologies to enhance your digital footprint and convert visitors.",
      features: [
        "Custom, responsive UI/UX design tailored to your brand identity.",
        "Lightning-fast loading speeds and advanced SEO optimization.",
        "Secure, scalable architecture built using cutting-edge frameworks.",
        "Bilingual support (Arabic & English) with seamless RTL layout.",
      ],
    },
    ar: {
      overview:
        "مواقع إلكترونية احترافية وعالية الأداء للمؤسسات، مبنية بأحدث التقنيات لتعزيز تواجدك الرقمي وتحويل الزوار إلى عملاء.",
      features: [
        "تصميم واجهات مستخدم مخصصة ومتجاوبة تتناسب مع هوية علامتك.",
        "سرعات تصفح فائقة التحسين وتحسين محركات البحث (SEO).",
        "بنية برمجية آمنة وقابلة للتوسع باستخدام أحدث التقنيات.",
        "دعم كامل للغة العربية والإنجليزية مع ضبط اتجاهات (RTL).",
      ],
    },
  },
};

/**
 * خريطة الألوان المميزة لكل خدمة (Badge + Border + Icon)
 * متوافقة مع نظام الألوان semantic في Services.tsx
 */
const serviceColors: Record<
  string,
  {
    badge: string;
    border: string;
    icon: string;
  }
> = {
  "managed-it": {
    badge:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    border: "border-blue-100/80 dark:border-blue-500/20",
    icon: "text-blue-500",
  },
  network: {
    badge:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    border: "border-emerald-100/80 dark:border-emerald-500/20",
    icon: "text-emerald-500",
  },
  cloud: {
    badge: "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400",
    border: "border-sky-100/80 dark:border-sky-500/20",
    icon: "text-sky-500",
  },
  cybersecurity: {
    badge: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
    border: "border-red-100/80 dark:border-red-500/20",
    icon: "text-red-500",
  },
  monitoring: {
    badge:
      "bg-lime-50 text-lime-600 dark:bg-lime-500/10 dark:text-lime-400",
    border: "border-lime-100/80 dark:border-lime-500/20",
    icon: "text-lime-500",
  },
  "web-design": {
    badge:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    border: "border-purple-100/80 dark:border-purple-500/20",
    icon: "text-purple-500",
  },
};

/**
 * خريطة ألوان الـ blobs المميزة لكل خدمة
 * مأخوذة من colorMap في Services.tsx — بنفس درجات الألوان
 */
const serviceBlobs: Record<
  string,
  {
    blob1: string;
    blob2: string;
  }
> = {
  "managed-it": {
    blob1: "bg-blue-400/[0.15] dark:bg-blue-400/[0.10]",
    blob2: "bg-blue-600/[0.10] dark:bg-blue-600/[0.07]",
  },
  network: {
    blob1: "bg-emerald-400/[0.15] dark:bg-emerald-400/[0.10]",
    blob2: "bg-emerald-600/[0.10] dark:bg-emerald-600/[0.07]",
  },
  cloud: {
    blob1: "bg-sky-400/[0.15] dark:bg-sky-400/[0.10]",
    blob2: "bg-sky-600/[0.10] dark:bg-sky-600/[0.07]",
  },
  cybersecurity: {
    blob1: "bg-red-400/[0.15] dark:bg-red-400/[0.10]",
    blob2: "bg-red-600/[0.10] dark:bg-red-600/[0.07]",
  },
  monitoring: {
    blob1: "bg-lime-400/[0.15] dark:bg-lime-400/[0.10]",
    blob2: "bg-lime-600/[0.10] dark:bg-lime-600/[0.07]",
  },
  "web-design": {
    blob1: "bg-purple-400/[0.15] dark:bg-purple-400/[0.10]",
    blob2: "bg-purple-600/[0.10] dark:bg-purple-600/[0.07]",
  },
};

// ألوان افتراضية في حالة عدم وجود slug مطابق
const defaultColors = {
  badge: "bg-valict-cyan/10 text-valict-cyan",
  border: "border-slate-100 dark:border-slate-800",
  icon: "text-valict-cyan",
};

const defaultBlobs = {
  blob1: "bg-valict-navy/[0.10] dark:bg-valict-navy/[0.07]",
  blob2: "bg-valict-cyan/[0.07] dark:bg-valict-cyan/[0.05]",
};

/**
 * Generate static pages for all supported languages and services
 */
export async function generateStaticParams() {
  const languages = ["en", "ar"] as const;

  const slugs = Object.keys(serviceDetailsContent);

  return languages.flatMap((lang) =>
    slugs.map((slug) => ({
      lang,
      slug,
    }))
  );
}

export const dynamicParams = false;

/**
 * SEO Metadata لكل صفحة خدمة
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  const currentLang = lang === "ar" ? "ar" : "en";

  const dict = await getDictionary(currentLang);

  const service = dict.services.items.find(
    (item: any) => item.slug === slug
  );

  // في حالة عدم وجود الخدمة
  if (!service) {
    return {
      title: "Valict | Validate Your Vision",
      description:
        "Valict delivers reliable IT infrastructure, network solutions, cloud services, cybersecurity, and managed IT solutions.",
    };
  }

  const serviceData = serviceDetailsContent[slug];

  // صياغة وصف مختصر ومثالي لأرشفة محركات البحث لصفحات الخدمات الستة
  const description =
    currentLang === "ar"
      ? `اكتشف خدمات ${service.title} فالكت لتأمين بنيتك التحتية وضمان استمرارية أعمالك بكفاءة.`
      : `Explore Valict's ${service.title} services designed to optimize infrastructure and secure business growth.`;

  const title =
    currentLang === "ar"
      ? `فالكت | ${service.title}`
      : `Valict | ${service.title}`;

  const url = `https://valict.com/${currentLang}/services/${slug}`;

  return {
    title,
    description,

    alternates: {
      canonical: url,

      languages: {
        en: `https://valict.com/en/services/${slug}`,
        ar: `https://valict.com/ar/services/${slug}`,
        "x-default": `https://valict.com/en/services/${slug}`,
      },
    },

    openGraph: {
      title,
      description,
      url,
      siteName: "Valict",
      type: "article",
      locale: currentLang === "ar" ? "ar_EG" : "en_US",
      images: [
        {
          url: serviceData?.image
            ? `https://valict.com${serviceData.image}`
            : "https://valict.com",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: [
        serviceData?.image
          ? `https://valict.com${serviceData.image}`
          : "https://valict.com",
      ],
    },
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  const currentLang = lang === "ar" ? "ar" : "en";

  const dict = await getDictionary(currentLang);

  const service = dict.services.items.find(
    (item: any) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  // جلب المحتوى التفصيلي مع مسار الصورة أو الاعتماد على قيم افتراضية
  const serviceData = serviceDetailsContent[slug] || {
    image: "/images/services/managed-it.webp",
    en: {
      overview: service.desc,
      features: [],
    },
    ar: {
      overview: service.desc,
      features: [],
    },
  };

  const details = serviceData[currentLang];

  // ألوان الخدمة الحالية
  const colors = serviceColors[slug] || defaultColors;
  const blobs = serviceBlobs[slug] || defaultBlobs;

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      {/* --- Premium Background Elements (بلون الخدمة) --- */}
      <div
        className={`absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${blobs.blob1} rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none`}
      ></div>
      <div
        className={`absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] ${blobs.blob2} rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none`}
      ></div>
      <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
      {/* ---------------------------------------------------- */}

      {/* النافبار ثابت فوق */}
      <Navbar lang={currentLang} dict={dict} />

      {/* محتوى الصفحة مع مساحة علوية كافية */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-44 pb-20">
        {/* زرار الرجوع للخدمات */}
        <Link
          href={`/${currentLang}/#services`}
          aria-label={
            currentLang === "ar"
              ? "العودة إلى قسم الخدمات الرئيسي"
              : "Back to main services section"
          }
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-valict-cyan dark:text-slate-400 mb-8 transition-colors"
        >
          <FaArrowRightLong
            className={currentLang === "ar" ? "rotate-0" : "rotate-180"}
          />

          {currentLang === "ar" ? "العودة للخدمات" : "Back to Services"}
        </Link>

        {/* كارت محتوى تفاصيل الخدمة مقسم لعمودين (نص وصورة) */}
        <div
          className={`bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border ${colors.border}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* عمود النصوص والمميزات (يأخذ 7 أعمدة) */}
            <div className="lg:col-span-7">
              {/* Badge بلون الخدمة */}
              <div
                className={`inline-block px-4 py-1.5 rounded-full font-bold text-sm mb-6 ${colors.badge}`}
              >
                {dict.services.title}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-valict-navy dark:text-white mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
                {details.overview}
              </p>

              <div className="w-full h-[1px] bg-slate-100 dark:bg-slate-800 mb-8"></div>

              {details.features.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-xl font-bold text-valict-navy dark:text-white mb-6">
                    {currentLang === "ar"
                      ? "المميزات الرئيسية للخدمة:"
                      : "Key Features & Benefits:"}
                  </h3>

                  <ul className="grid grid-cols-1 gap-4">
                    {details.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {/* الأيقونة بلون الخدمة */}
                        <FaCheckCircle
                          className={`w-5 h-5 shrink-0 mt-1 ${colors.icon}`}
                        />

                        <span className="text-slate-600 dark:text-slate-300 font-medium">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/${currentLang}/#contact`}
                  aria-label={`${dict.cta.button} - ${service.title}`}
                  className="btn-gradient text-white px-8 py-3 rounded-xl font-bold text-center shadow-lg hover:shadow-valict-cyan/40 transition-all inline-block"
                >
                  {dict.cta.button}
                </Link>
              </div>
            </div>

            {/* عمود الصورة التوضيحية (يأخذ 5 أعمدة) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50">
                <Image
                  src={serviceData.image}
                  alt={service.title}
                  fill
                  className="object-cover"
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
