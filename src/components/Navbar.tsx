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
  const { setTheme, theme, resolvedTheme } = useTheme();
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

  const toggleLang = () => {
    const newLang = lang === "en" ? "ar" : "en";
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    window.location.href = newPath;
  };

  interface NavLink {
    name: string;
    href: string;
  }

  const navLinks: NavLink[] = [
    { name: dict.nav.services, href: `/${lang}/#services` },
    { name: dict.nav.whyValict, href: `/${lang}/#why-valict` },
    { name: dict.nav.aboutUs, href: `/${lang}/#about` },
  ];

  return (
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
          <Link href={`/${lang}`} className="relative block w-40 h-12">
           <Image
             src="/valict-logo.png"
             alt="Valict Logo"
             fill
             sizes="(max-width: 768px) 150px, 200px"
             className="filter dark:brightness-0 dark:invert"
             priority
           />
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link: NavLink) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">
              <button
                onClick={toggleLang}
                className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                title={dict.nav.changeLanguage}
              >
                <FaGlobe className="h-4 w-4" />
                <span className="text-sm font-bold leading-none mt-0.5 uppercase">
                  {lang === "ar" ? "EN" : "AR"}
                </span>
              </button>

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
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/valict"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61572077354354"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-600 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
              aria-label={dict.nav.changeLanguage}
            >
              <FaGlobe className="h-4 w-4" />
              <span className="text-sm font-bold leading-none mt-0.5 uppercase">
                {lang === "ar" ? "EN" : "AR"}
              </span>
            </button>
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
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
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
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-gradient text-white px-8 py-4 rounded-xl font-bold text-center mt-2"
          >
            {dict.nav.getStarted}
          </Link>
        </div>
      </div>
    </nav>
  );
}
