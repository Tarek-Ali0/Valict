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
import type { Dictionary } from "@/lib/dict.types";

interface NavLink {
  name: string;
  href: string;
  ariaLabel: string;
}

/**
 * useMounted — بديل setState-in-effect.
 *
 * [إصلاح أداء #1] قبل التعديل كان الـ pattern هو:
 *   const [mounted, setMounted] = useState(false);
 *   useEffect(() => { setMounted(true); }, []);
 * ده بيسبب cascading render: السيرفر بيرندر بـ false، الكلاينت بيرندر بـ false
 * (عشان يتطابق مع السيرفر في الـ hydration)، وبعدين الـ effect بيشتغل وبيستدعي
 * setMounted(true) فبيحصل re-render تاني. توثيق React 19 بيتجنب هذا النمط.
 *
 * useSyncExternalStore بيوفّر نفس السلوك بشكل رسمي:
 * - getServerSnapshot بترجع false (matching SSR output).
 * - getSnapshot بترجع true بعد الـ hydration.
 * - ما فيش setState call جوّه effect → ما فيش تحذير set-state-in-effect
 *   ولا re-render متتالي.
 */
function useMounted(): boolean {
  return React.useSyncExternalStore(
    () => () => {
      // لا يوجد اشتراك فعلي — القيمة ثابتة (true على الكلاينت، false على السيرفر).
    },
    () => true, // getSnapshot (client only)
    () => false // getServerSnapshot (SSR + initial hydration)
  );
}

// [ملاحظة types] النبارة بتقرأ dict.nav.* و dict.footer.contactUs فقط (مع
// fallback مدمج). الصفحات التجريبية زي /experiment بتبعت footer جزئي،
// فالنوع بيقبل footer اختياري جزئي بدل الـ FooterDict الكامل.
export function Navbar({ lang, dict }: {
  lang: string;
  dict: Pick<Dictionary, "nav"> & { footer?: Pick<Dictionary["footer"], "contactUs"> };
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = useMounted();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  // [إصلاح أداء #1] أزلنا setMounted(true) من جوّه الـ effect.
  // الـ effect ده دلوقتي مسؤول عن scroll listener فقط، وأي setState بيحصل
  // جوّه معالج الحدث (handleScroll) — مش في جسم الـ effect نفسه — فده آمن
  // وما بيطلّعش تحذير set-state-in-effect.
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    // مزامنة أولية: لو الصفحة اتنزّلت وهي بالفعل scrolled (مثلاً بعد refresh
    // أو navigation من scroll position محفوظ)، نحدّث الحالة. بنستدعي
    // handleScroll() بدل setIsScrolled مباشرة عشان الـ setState يحصل داخل
    // rAF callback مش في جسم الـ effect.
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const alternateLang = lang === "en" ? "ar" : "en";
  const alternatePath = pathname.replace(`/${lang}`, `/${alternateLang}`);

  const navLinks: NavLink[] = [
    {
      name: dict.nav.services,
      href: `/${lang}/#services`,
      ariaLabel: `${dict.nav.services} services section`,
    },
    {
      name: dict.nav.whyValict,
      href: `/${lang}/#why-valict`,
      ariaLabel: `Why Valict company advantages section`,
    },
    {
      name: dict.nav.aboutUs,
      href: `/${lang}/about`,
      ariaLabel: `About Valict corporate profile page`,
    },
    {
      name: dict.nav.faq,
      href: `/${lang}/faq`,
      ariaLabel: `Frequently asked questions about Valict services`,
    },
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
        {/* رجعنا الإرتفاع لـ h-24 */}
        <div className="flex justify-between items-center h-24">
          <Link
            href={`/${lang}`}
            className="group relative block w-40 h-12"
            aria-label="Valict Corporate Home"
          >
            <Image
              src="/valict-logo.png"
              alt="Valict - IT Solutions Company Logo"
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
                aria-label={link.ariaLabel}
                className="group relative text-slate-800 dark:text-slate-100 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold transition-colors duration-300 after:absolute after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-valict-cyan after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6 ml-2">
              <Link
                href={alternatePath}
                rel="alternate"
                hrefLang={alternateLang}
                className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label={`Switch page language to ${alternateLang.toUpperCase()}`}
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
                className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Toggle display theme color mode"
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
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-[1px] bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Visit Valict Official LinkedIn Company Profile"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>

              <a
                href="https://www.facebook.com/ValictOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-[1px] bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Visit Valict Official Facebook Page"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <Link
              href={alternatePath}
              rel="alternate"
              hrefLang={alternateLang}
              className="cursor-pointer px-3 h-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-valict-cyan dark:border dark:border-slate-700"
              aria-label={`Switch page language to ${alternateLang.toUpperCase()}`}
            >
              <FaGlobe className="h-4 w-4" />
              <span className="text-sm font-bold leading-none mt-0.5 uppercase">
                {lang === "ar" ? "EN" : "AR"}
              </span>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 bg-slate-100/80 backdrop-blur-md text-slate-800 hover:bg-slate-200 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:bg-slate-700 dark:border dark:border-slate-700 hover:text-valict-navy dark:hover:text-valict-cyan"
              aria-label="Toggle responsive mobile navigation menu"
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

      <div
        className={cn(
          "lg:hidden absolute top-24 left-0 w-full bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        )}
      >
        <div className="p-6 flex flex-col gap-4">
          {navLinks.map((link: NavLink) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-slate-800 dark:text-slate-100 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold text-lg py-2"
            >
              {link.name}
            </Link>
          ))}

          <Link
            href={`/${lang}/#contact`}
            aria-label="Navigate to contact information section"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-800 dark:text-slate-100 hover:text-valict-navy dark:hover:text-valict-cyan font-semibold text-lg py-2"
          >
            {dict.footer?.contactUs || "Contact Us"}
          </Link>
        </div>
      </div>
    </nav>
  );
}
