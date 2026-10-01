"use client";

import React from "react";
import Link from "next/link";
import { 
  FaLaptopCode, 
  FaNetworkWired, 
  FaCloud, 
  FaShieldHalved, 
  FaHeadset, 
  FaCode,
  FaChevronRight
} from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

interface ServiceItem {
  slug: string;
  title: string;
  desc: string;
}

interface ServicesProps {
  dict: any;
  lang?: string;
}

const iconMap: { [key: number]: any } = {
  0: FaLaptopCode,
  1: FaNetworkWired,
  2: FaCloud,
  3: FaShieldHalved,
  4: FaHeadset,
  5: FaCode
};

const colorMap: { [key: number]: { bg: string; text: string; blob: string } } = {
  0: { 
    bg: "bg-blue-50 dark:bg-blue-950/30", 
    text: "text-blue-600 dark:text-blue-400", 
    blob: "bg-blue-500/20 dark:bg-blue-400/15" 
  },
  1: { 
    bg: "bg-emerald-50 dark:bg-emerald-950/30", 
    text: "text-emerald-600 dark:text-emerald-400", 
    blob: "bg-emerald-500/20 dark:bg-emerald-400/15" 
  },
  2: { 
    bg: "bg-sky-50 dark:bg-sky-950/30", 
    text: "text-sky-600 dark:text-sky-400", 
    blob: "bg-sky-500/20 dark:bg-sky-400/15" 
  },
  3: { 
    bg: "bg-red-50 dark:bg-red-950/30", 
    text: "text-red-600 dark:text-red-400", 
    blob: "bg-red-500/20 dark:bg-red-400/15" 
  },
  4: { 
    bg: "bg-lime-50 dark:bg-lime-950/30", 
    text: "text-lime-600 dark:text-lime-400", 
    blob: "bg-lime-500/20 dark:bg-lime-400/15" 
  },
  5: { 
    bg: "bg-purple-50 dark:bg-purple-950/30", 
    text: "text-purple-600 dark:text-purple-400", 
    blob: "bg-purple-500/20 dark:bg-purple-400/15" 
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export function Services({ dict, lang = "ar" }: ServicesProps) {
  return (
    <section 
      id="services" 
      className="bg-white dark:bg-[#0B1120] transition-colors duration-300"
    >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-12 gap-6">
          <div className="max-w-2xl text-start">
            <h2 className="text-cyan-700 dark:text-cyan-400 font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-cyan-600 dark:bg-cyan-400 inline-block rounded-full"></span>
              {dict.services.subtitle}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-valict-dark dark:text-white leading-tight tracking-tight">
              {dict.services.title} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-valict-navy to-valict-cyan">
                {dict.services.highlight}
              </span>
            </h3>
          </div>
          <p className="text-slate-600 dark:text-slate-300 max-w-md text-start lg:text-end text-base md:text-lg leading-relaxed">
            {dict.services.description}
          </p>
        </div>

        {/* Cards Grid with Framer Motion */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {dict.services.items.map((service: ServiceItem, index: number) => {
            const Icon = iconMap[index] || FaLaptopCode;
            const colors = colorMap[index] || { 
              bg: "bg-blue-50", 
              text: "text-blue-600", 
              blob: "bg-blue-500/20" 
            };
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-valict-navy/10 hover:bg-valict-navy dark:hover:bg-valict-navy hover:-translate-y-2 transition-all duration-500 border border-slate-200 dark:border-slate-800 hover:border-valict-cyan/30 dark:hover:border-valict-cyan/30 flex flex-col h-full text-start overflow-hidden"
              >
                {/* Blob داخلي — في الزاوية */}
                <div
                  className={`absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500 ${colors.blob} group-hover:opacity-0`}
                ></div>

                {/* المحتوى */}
                <div className="relative z-10 flex flex-col h-full">
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110 ${colors.bg}`}
                  >
                    <Icon className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 group-hover:text-valict-cyan ${colors.text}`} />
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h2>
                  
                  <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-8 flex-grow group-hover:text-slate-200 transition-colors duration-300">
                    {service.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50 group-hover:border-white/10 transition-colors duration-300">
                    <Link
                      href={`/${lang}/services/${service.slug}`}
                      aria-label={`${dict.services.learnMore} - ${service.title}`}
                      className="inline-flex items-center gap-2 text-valict-navy dark:text-valict-cyan font-bold text-sm group-hover:text-valict-cyan transition-colors"
                    >
                      <span className="sr-only">
                        {dict.services.learnMore} {service.title}
                      </span>
    
                      <span aria-hidden="true">
                        {dict.services.learnMore}
                      </span> 
                      <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* ========================= */}
      {/* Line Separator — تحت     */}
      {/* ملزوق على الحد بين الأقسام */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-transparent dark:via-slate-600"></div>
      </div>
      {/* ========================= */}

    </section>
  );
}
