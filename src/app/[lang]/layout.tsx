import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIChatWidget } from "@/components/AIChatWidget"; // الاستدعاء الجديد لمكون الدعم الذكي
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const cairo = Cairo({ 
  subsets: ["arabic"], 
  variable: "--font-cairo",
  display: "swap",
  adjustFontFallback: false 
});
const geist = Geist({ 
  subsets: ["latin"], 
  variable: "--font-geist",
  display: "swap",
  adjustFontFallback: false
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // عنوان الصفحة حسب اللغة
  const title =
    lang === "ar"
      ? "فالكت | عزّز رؤيتك"
      : "Valict | Validate Your Vision";

  // تم تقصير الوصف الإنجليزي هنا بدقة متناهية ليطابق الشروط القياسية لمحركات البحث ومنع قصه بنقاط
  const description =
    lang === "ar"
      ? "حلول متكاملة في إدارة تقنية المعلومات، الحوسبة السحابية، والأمن السيبراني المتقدم لحماية أصولك الرقمية وضمان استمرارية أعمالك بكفاءة مطلقة."
      : "Reliable IT solutions and ICT infrastructure. Valict delivers expert managed services, cloud computing, and cybersecurity to secure business continuity.";

  return {
    metadataBase: new URL("https://valict.com"),

    title,
    description,

    alternates: {
      canonical: `https://valict.com{lang}`,
      languages: {
        en: "https://valict.com",
        ar: "https://valict.com",
        "x-default": "https://valict.com",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://valict.com{lang}`,
      siteName: "Valict",
      locale: lang === "ar" ? "ar_AR" : "en_US",
      type: "website",

      images: [
        {
          url: "https://valict.com",
          width: 1200,
          height: 630,
          alt: "Valict Logo",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://valict.com"],
    },
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dir = lang === "ar" ? "rtl" : "ltr";

  // جلب الترجمة وتمريرها للفوتر
  const dict = await getDictionary(lang as "en" | "ar");

  // بيانات الـ Schema المهيكلة لربط Valict بكلمة "فالكت" ونشاط الشركة
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://valict.com",

    name: "Valict",

    alternateName: ["فالكت", "Valict ICT Solutions"],

    url: "https://valict.com",

    logo: {
      "@type": "ImageObject",
      url: "https://valict.com",
      width: 400,
      height: 400,
    },

    description: lang === 'ar' 
    ? "نقدم حلول تقنية وبنية تحتية متكاملة لتقنية المعلومات والاتصالات." 
    : "Reliable IT Solutions and ICT Infrastructure Services.",
  slogan: lang === 'ar' ? "عزّز رؤيتك" : "Validate Your Vision",
  sameAs: 
    ["https://linkedin.com",
     "https://facebook.com"
  ]
};

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning={true}
    >
      <head>
        <link
  rel="preload"
  href="/_next/static/media/d41831e24743a3c1-s.02r-fjhi~6g_a.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="anonymous"
/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>

      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-white text-slate-900 dark:bg-[#0B1120] dark:text-slate-100 antialiased transition-colors duration-300",
          geist.variable,
          cairo.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}

          <Footer lang={lang} dict={dict} />

          {/* الأزرار العائمة بالأسفل */}
          <ScrollToTop />
          <AIChatWidget /> {/* إضافة زر الدعم الفني الذكي هنا بالأسفل بجانب زر الصعود */}
        </ThemeProvider>
      </body>
    </html>
  );
}
