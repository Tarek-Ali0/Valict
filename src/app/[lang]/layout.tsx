import type { Metadata } from "next";
import { Cairo, Plus_Jakarta_Sans, Geist } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });
const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: "Valict | IT Management & ICT Solutions",
  description: "Validate Your Vision | Powering your business with Reliable Solutions",
  alternates: {
    canonical: "https://valict.com",
    languages: {
      "en": "https://valict.com",
      "ar": "https://valict.com",
    },
  },
  openGraph: {
    title: "Valict | IT Management & ICT Solutions",
    description: "Validate Your Vision | Powering your business with Reliable Solutions",
    url: "https://valict.com",
    siteName: "Valict",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Valict | IT Management & ICT Solutions",
    description: "Validate Your Vision | Powering your business with Reliable Solutions",
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
  const dir = resolvedParams.lang === "ar" ? "rtl" : "ltr";

  return (
    <html lang={resolvedParams.lang} dir={dir} suppressHydrationWarning={true}>
      <body
        suppressHydrationWarning={true}
        className={cn(
          "min-h-screen bg-white text-slate-900 dark:bg-[#0B1120] dark:text-slate-100 antialiased transition-colors duration-300",
          geist.variable,
          plusJakartaSans.variable,
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
        </ThemeProvider>
      </body>
    </html>
  );
}
