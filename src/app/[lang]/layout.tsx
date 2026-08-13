import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

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

  // الوصف حسب اللغة
  const description =
    lang === "ar"
      ? "نقدم حلول تقنية وبنية تحتية متكاملة لتقنية المعلومات والاتصالات. نساعدك في تطوير وتأمين أعمالك من خلال خدمات مدارة، أنظمة سحابية، وحلول مبتكرة تضمن استمرارية الأعمال."
      : "Reliable IT Solutions and ICT Infrastructure Services. At Valict, we specialize in delivering integrated technology solutions, managed IT services, cloud systems, and cybersecurity to optimize performance and drive business growth.";

  return {
    metadataBase: new URL("https://valict.com"),

    title,
    description,

    alternates: {
      canonical: `https://valict.com/${lang}`,
      languages: {
        en: "https://valict.com/en",
        ar: "https://valict.com/ar",
        "x-default": "https://valict.com/en",
      },
    },

    openGraph: {
      title,
      description,
      url: `https://valict.com/${lang}`,
      siteName: "Valict",
      locale: lang === "ar" ? "ar_AR" : "en_US",
      type: "website",

      images: [
        {
          url: "/valict-openGraph.png",
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
      images: ["/valict-openGraph.png"],
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
    "@id": "https://valict.com/#organization",

    name: "Valict",

    alternateName: ["فالكت", "Valict ICT Solutions"],

    url: "https://valict.com",

    logo: {
      "@type": "ImageObject",
      url: "https://valict.com/JustV.png",
      width: 400,
      height: 400,
    },

    description: lang === 'ar' 
    ? "نقدم حلول تقنية وبنية تحتية متكاملة لتقنية المعلومات والاتصالات." 
    : "Reliable IT Solutions and ICT Infrastructure Services.",
  slogan: lang === 'ar' ? "عزّز رؤيتك" : "Validate Your Vision",
  sameAs: ["https://www.linkedin.com/company/valict"],
};

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning={true}
    >
      <head>
        {/* حقن بيانات الـ Schema في رأس الصفحة */}
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

          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
