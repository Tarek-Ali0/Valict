import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  const siteUrl = "https://valict.com";
  const pageUrl = `${siteUrl}/${lang}`;
  const logoUrl = `${siteUrl}/JustV.png`;

  const title = "Valict | Validate Your Vision";

  const description =
    lang === "ar"
      ? "نقدم حلول تقنية وبنية تحتية متكاملة لتقنية المعلومات والاتصالات. نساعدك في تطوير وتأمين أعمالك من خلال خدمات مدارة، أنظمة سحابية، وحلول مبتكرة تضمن استمرارية الأعمال."
      : "Reliable IT Solutions and ICT Infrastructure Services. At Valict, we specialize in delivering integrated technology solutions, managed IT services, cloud systems, and cybersecurity to optimize performance and drive business growth.";

  return {
    metadataBase: new URL(siteUrl),

    title,
    description,

    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${siteUrl}/en`,
        ar: `${siteUrl}/ar`,
        "x-default": `${siteUrl}/en`,
      },
    },

    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "Valict",
      locale: lang === "ar" ? "ar_AR" : "en_US",
      type: "website",

      images: [
        {
          url: logoUrl,
          width: 400,
          height: 400,
          alt: "Valict Logo",
        },
      ],
    },

    twitter: {
      card: "summary",
      title,
      description,
      images: [logoUrl],
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

  // جلب الترجمة وتمريرها للفوتر لتجنب أي أخطاء أثناء الـ Build
  const dict = await getDictionary(lang as "en" | "ar");

  // بيانات الـ Schema المهيكلة لربط Valict بكلمة "فالكت" ونشاط الشركة لجوجل
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://valict.com/#organization",

    "name": "Valict",

    "alternateName": [
      "فالكت",
      "Valict ICT Solutions",
    ],

    "url": "https://valict.com",

    "logo": {
      "@type": "ImageObject",
      "url": "https://valict.com/JustV.png",
      "width": 400,
      "height": 400,
    },

    "description":
      "Reliable IT Solutions and ICT Infrastructure Services",

    "slogan": "Validate Your Vision",

    "sameAs": [
      "https://www.linkedin.com/company/valict",
    ],
  };

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning={true}
    >
      <head>
        {/* حقن بيانات الـ Schema في رأس الصفحة لتقرأها محركات البحث */}
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

          <Footer
            lang={lang}
            dict={dict}
          />

          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
