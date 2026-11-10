import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AIChatWidget } from "@/components/AIChatWidget";
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

  const title =
    lang === "ar"
      ? "فالكت | عزّز رؤيتك"
      : "Valict | Validate Your Vision";

  const description =
    lang === "ar"
      ? "حلول متكاملة في إدارة تقنية المعلومات، الحوسبة السحابية، والأمن السيبراني المتقدم لحماية أصولك الرقمية وضمان إستمرارية أعمالك بكفاءة مطلقة."
      : "Reliable IT solutions and ICT infrastructure. Valict delivers expert managed services, cloud computing, and cybersecurity to secure business continuity.";

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
          url: "https://valict.com/valict-openGraph.png",
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
      images: ["https://valict.com/valict-openGraph.png"],
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

  const dict = await getDictionary(lang as "en" | "ar");

  // *** Organization Schema ***
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://valict.com/#organization",

    name: "Valict",

    alternateName: ["فالكت", "Valict ICT Solutions"],

    url: "https://valict.com",

    logo: {
      "@type": "ImageObject",
      url: "https://valict.com/valict-logo.png",
      width: 400,
      height: 400,
    },

    description:
      lang === "ar"
        ? "حلول متكاملة في إدارة تقنية المعلومات، الحوسبة السحابية، والأمن السيبراني المتقدم لحماية أصولك الرقمية وضمان إستمرارية أعمالك بكفاءة مطلقة."
        : "Reliable IT solutions and ICT infrastructure. Valict delivers expert managed services, cloud computing, and cybersecurity to secure business continuity.",
    slogan: lang === "ar" ? "عزّز رؤيتك" : "Validate Your Vision",
    sameAs: [
      "https://www.linkedin.com/company/valict",
      "https://www.facebook.com/ValictOfficial",
    ],
  };

  // *** WebSite Schema ***
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://valict.com/#website",
    url: "https://valict.com",
    name: lang === "ar" ? "فالكت" : "Valict",
    description:
      lang === "ar"
        ? "الموقع الرسمي لشركة فالكت لحلول تقنية المعلومات."
        : "Official website of Valict IT solutions company.",
    publisher: {
      "@id": "https://valict.com/#organization",
    },
    inLanguage: lang === "ar" ? "ar" : "en",
  };

  return (
    <html
      lang={lang}
      dir={dir}
      suppressHydrationWarning={true}
    >
      <head>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
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
          <AIChatWidget lang={lang} />
        </ThemeProvider>
      </body>
    </html>
  );
}
