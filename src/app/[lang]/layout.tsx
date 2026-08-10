import type { Metadata } from "next";
import { Cairo, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Footer } from "@/components/Footer";
import { getDictionary } from "@/lib/dictionaries";
import { cn } from "@/lib/utils";

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL("https://valict.com"),
  title: "Valict | Validate Your Vision",
  description: "Reliable IT Solutions | Powering your business with innovative technology",
  alternates: {
    canonical: "https://valict.com",
    languages: {
      "en": "https://valict.com",
      "ar": "https://valict.com",
    },
  },
  openGraph: {
    title: "Valict | Validate Your Vision",
    description: "Reliable IT Solutions | Powering your business with innovative technology",
    url: "https://valict.com",
    siteName: "Valict",
    locale: "en_US",
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
    title: "Valict | Validate Your Vision",
    description: "Reliable IT Solutions | Powering your business with innovative technology",
    images: ["/valict-openGraph.png"]
  },
};

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

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning={true}>
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
        </ThemeProvider>
      </body>
    </html>
  );
}
