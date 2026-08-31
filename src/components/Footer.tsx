import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaEnvelope, FaPhone, FaChevronRight, FaFacebook } from "react-icons/fa6";

interface FooterProps {
  dict?: any;
  lang?: string;
}

export function Footer({ dict, lang = "en" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerDict = dict?.footer || {
    about: "Empowering your business with innovative IT solutions.",
    badge: "IT & Security Solutions",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    emailLabel: "Email Us",
    phoneLabel: "Call Us",
    copyright: "© Valict {year}. All rights reserved."
  };

  const navDict = dict?.nav || {
    services: "Services",
    whyValict: "Why Valict",
    aboutUs: "About Us"
  };

  const howDict = dict?.how || {
    title: "How It Works"
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#0B1120] pt-12 pb-8 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* لمسة جمالية في الخلفية */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-valict-navy/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-4 relative group">
              <div className="relative w-36 h-16 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/valict-logo.png"
                  alt="Valict Logo"
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain object-left filter dark:brightness-0 dark:invert"
                />
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
              {footerDict.about}
            </p>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
              <span className="text-xs font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
                {footerDict.badge}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-bold text-valict-dark dark:text-white mb-4">{footerDict.quickLinks}</h4>
            <ul className="space-y-2">
              {[
                { name: navDict.services, href: `/${lang}/#services` },
                { name: navDict.whyValict, href: `/${lang}/#why-valict` },
                { name: howDict.title, href: `/${lang}/#how-it-works` },
                { name: navDict.aboutUs, href: `/${lang}/about` }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-sm text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                  >
                    <FaChevronRight className="text-[9px] opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-valict-cyan transition-all duration-300 rtl:rotate-180 mr-2" />
                    <span className="transform transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-base font-bold text-valict-dark dark:text-white mb-4">{footerDict.contactUs}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:info@valict.com" 
                  className="group flex items-start gap-3 text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-valict-cyan group-hover:bg-valict-cyan/5 transition-all duration-300">
                    <FaEnvelope className="text-xs text-valict-navy dark:text-valict-cyan group-hover:text-valict-cyan transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{footerDict.emailLabel}</span>
                    <span className="text-sm font-medium dark:text-slate-300">{dict?.contact?.email || "info@valict.com"}</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+201505544455" 
                  className="group flex items-start gap-3 text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-valict-cyan group-hover:bg-valict-cyan/5 transition-all duration-300">
                    <FaPhone className="text-xs text-valict-navy dark:text-valict-cyan group-hover:text-valict-cyan transition-colors" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{footerDict.phoneLabel}</span>
                    <span className="text-sm font-medium dark:text-slate-300" dir="ltr">{dict?.contact?.phone || "+20 150 554 4455"}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p dir="rtl" className="text-slate-500 dark:text-slate-400 text-xs text-center md:text-start">
            {footerDict.copyright.replace('{year}', currentYear.toString())}
          </p>

          <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/valict"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/ValictOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Facebook"
              >
                <FaFacebook className="w-3.5 h-3.5" />
              </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
