import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaXTwitter, FaEnvelope, FaPhone, FaChevronRight, FaFacebook } from "react-icons/fa6";

interface FooterProps {
  dict?: any;
  lang?: string; // أضفنا الـ lang هنا عشان نظبط بيه الروابط
}

export function Footer({ dict, lang = "en" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // تأمين البيانات في حال كان dict مش واصل كاملاً
  const footerDict = dict?.footer || {
    about: "Empowering your business with innovative IT solutions.",
    badge: "IT & Security Solutions",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    emailLabel: "Email Us",
    phoneLabel: "Call Us",
    copyright: "© {year} Valict. All rights reserved."
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
    <footer className="bg-slate-50 dark:bg-[#0B1120] pt-20 pb-10 border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-300">
      {/* لمسة جمالية في الخلفية */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-valict-navy/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-2">
            <Link href={`/${lang}`} className="inline-block mb-6 relative group">
              <div className="relative w-40 h-20 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/valict-logo.png"
                  alt="Valict Logo"
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className="object-contain object-left filter dark:brightness-0 dark:invert"
                />
              </div>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed max-w-sm mb-6">
              {footerDict.about}
            </p>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
              <span className="text-sm font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
                {footerDict.badge}
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-valict-dark dark:text-white mb-6">{footerDict.quickLinks}</h4>
            <ul className="space-y-4">
              {[
                { name: navDict.services, href: `/${lang}/#services` },
                { name: navDict.whyValict, href: `/${lang}/#why-valict` },
                { name: howDict.title, href: `/${lang}/#how-it-works` },
                { name: navDict.aboutUs, href: `/${lang}/#about` }
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="group flex items-center text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                  >
                    <FaChevronRight className="text-[10px] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-valict-cyan transition-all duration-300 rtl:rotate-180 mr-2" />
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
            <h4 className="text-lg font-bold text-valict-dark dark:text-white mb-6">{footerDict.contactUs}</h4>
            <ul className="space-y-5">
              <li>
                <a 
                  href="mailto:info@valict.com" 
                  className="group flex items-start gap-4 text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-valict-cyan group-hover:bg-valict-cyan/5 transition-all duration-300">
                    <FaEnvelope className="text-valict-navy dark:text-valict-cyan group-hover:text-valict-cyan transition-colors" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{footerDict.emailLabel}</span>
                    <span className="font-medium dark:text-slate-300">{dict?.contact?.email || "info@valict.com"}</span>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+201505544455" 
                  className="group flex items-start gap-4 text-slate-500 dark:text-slate-400 hover:text-valict-navy dark:hover:text-valict-cyan transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:border-valict-cyan group-hover:bg-valict-cyan/5 transition-all duration-300">
                    <FaPhone className="text-valict-navy dark:text-valict-cyan group-hover:text-valict-cyan transition-colors" />
                  </div>
                  <div className="flex flex-col pt-1">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">{footerDict.phoneLabel}</span>
                    <span className="font-medium dark:text-slate-300" dir="ltr">{dict?.contact?.phone || "+20 150 554 4455"}</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p dir="rtl" className="text-slate-500 dark:text-slate-400 text-sm text-center md:text-start">
            {footerDict.copyright.replace('{year}', currentYear.toString())}
          </p>

          <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/valict"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/ValictOfficial"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-valict-cyan dark:border dark:border-slate-700"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
