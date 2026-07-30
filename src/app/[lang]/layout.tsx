import type { Metadata } from "next";
import { Fraunces, Inter, Cairo } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

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
    images: [
      {
        url: "https://valict.com",
        width: 600,
        height: 600,
        alt: "Valict IT Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Valict | IT Management & ICT Solutions",
    description: "Validate Your Vision | Powering your business with Reliable Solutions",
    images: ["https://valict.com"],
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
          "min-h-screen bg-white text-slate-900 dark:bg-[#0B1120] dark:text-slate-100 font-sans antialiased transition-colors duration-300",
          inter.variable,
          fraunces.variable,
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
