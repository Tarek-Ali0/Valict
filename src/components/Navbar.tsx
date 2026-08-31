"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FaBarsStaggered,
  FaXmark,
  FaGlobe,
  FaSun,
  FaMoon,
  FaLinkedinIn,
  FaFacebook,
} from "react-icons/fa6";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function Navbar({ lang, dict }: { lang: string; dict: any }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const alternateLang = lang === "en" ? "ar" : "en";
  const alternatePath = pathname.replace(`/${lang}`, `/${alternateLang}`);

  interface NavLink {
    name: string;
    href: string;
  }

  const navLinks: NavLink[] = [
    { name: dict.nav.services, href: `/${lang}/#services` },
    { name: dict.nav.whyValict, href: `/${lang}/#why-valict` },
    { name: dict.nav.aboutUs, href: `/${lang}/about` },
  ];

  return (
    <>
      {/* تعريف ستايل الحركة الخاص بالبرواز المتحرك */}
      <style jsx global>{`
        @keyframes border-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-border-spin {
          animation: border-spin 4s linear infinite;
        }
      `}</style>

      <nav
        className={cn(
          "fixed w-full z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-24">

            {/* Logo مع تأثير البرواز المتحرك */}
            <Link
              href={`/${lang}`}
              className="group relative inline-block p-[1.5px] rounded-2xl overflow-hidden"
            >
              {/* الخط المتحرك بخلفية متدرجة */}
              <div className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#06b6d4_0%,#3b82f6_50%,#1e3a8a_100%)] animate-border-spin"></div>
              
              {/* الحاوية الداخلية للوجو */}
              <div className="relative bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md px-3.5 py-2 rounded-[14px] flex items-center w-36 h-11">
                <div className="relative w-full h-full">
                  <Image
                    src="/valict-logo.png"
                    alt="Valict Logo"
                    fill
                    sizes="(max-width: 768px) 150px, 200px"
                    className="object-contain filter dark:brightness-0 dark:invert"
                    priority
                  />
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">

              {navLinks.map((link: NavLink) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group relative text-slate-600 dark:text-slate-300 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold transition-colors duration-300 after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-valict-cyan after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.name}
                </Link>
              ))}

              {/* Language & Theme */}
              <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">

                <Link
                  href={alternatePath}
                  className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                  title={dict.nav.changeLanguage}
                >
                  <FaGlobe className="h-4 w-4" />

                  <span className="text-sm font-bold leading-none mt-0.5 uppercase">
                    {lang === "ar" ? "EN" : "AR"}
                  </span>
                </Link>

                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "light" ? "dark" : "light")
                  }
                  className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                  title={dict.nav.toggleTheme}
                >
                  {mounted && resolvedTheme === "dark" ? (
                    <FaSun className="h-5 w-5" />
                  ) : (
                    <FaMoon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-3">

                <a
                  href="https://www.linkedin.com/company/valict"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-[1px] bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </a>

                <a
                  href="https://www.facebook.com/ValictOfficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-[1px] bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                  aria-label="Facebook"
                >
                  <FaFacebook className="w-4 h-4" />
                </a>

              </div>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-4">

              <Link
                href={alternatePath}
                className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label={dict.nav.changeLanguage}
              >
                <FaGlobe className="h-4 w-4" />

                <span className="text-sm font-bold leading-none mt-0.5 uppercase">
                  {lang === "ar" ? "EN" : "AR"}
                </span>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-700 dark:border dark:border-slate-700 hover:text-valict-navy dark:hover:text-valict-cyan"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <FaXmark size={24} />
                ) : (
                  <FaBarsStaggered size={24} />
                )}
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "lg:hidden absolute top-24 left-0 w-full bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 ease-in-out",
            isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          )}
        >
          <div className="p-6 flex flex-col gap-4">

            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-slate-600 dark:text-slate-300 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold text-lg py-2"
              >
                {link.name}
              </Link>
            ))}

            <Link
              href={`/${lang}/#contact`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="btn-gradient text-white px-8 py-4 rounded-xl font-bold text-center mt-2"
            >
              {dict.nav.getStarted}
            </Link>

          </div>
        </div>
      </nav>
    </>
  );
}
