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

// فصلنا الخلفية عن لون النص عشان Tailwind تقراهم بشكل أسرع وأدق
const colorMap: { [key: number]: { bg: string; text: string } } = {
  0: { bg: "bg-blue-50", text: "text-blue-600" },
  1: { bg: "bg-cyan-50", text: "text-valict-cyan" },
  2: { bg: "bg-slate-100", text: "text-slate-700" },
  3: { bg: "bg-red-50", text: "text-red-500" },
  4: { bg: "bg-green-50", text: "text-green-500" },
  5: { bg: "bg-purple-50", text: "text-purple-500" }
};

// إعدادات حركة الـ Scroll (العنصر الأب)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // الفرق الزمني بين ظهور كل كارت والتاني
    },
  },
};

// إعدادات حركة الكروت نفسها (بتطلع من تحت لفوق بنعومة)
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
    <section id="services" className="py-24 md:py-32 bg-slate-50 dark:bg-[#0B1120] relative border-t border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      
      {/* لمسة جمالية في الخلفية */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-valict-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl text-start">
            <h2 className="text-valict-cyan font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-valict-cyan inline-block rounded-full"></span>
              {dict.services.subtitle}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-valict-dark dark:text-white leading-tight tracking-tight">
              {dict.services.title} <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-valict-navy to-valict-cyan">
                {dict.services.highlight}
              </span>
            </h3>
          </div>
          <p className="text-slate-500 dark:text-slate-400 max-w-md text-start lg:text-end text-base md:text-lg leading-relaxed">
            {dict.services.description}
          </p>
        </div>

        {/* Cards Grid with Framer Motion */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // الكروت هتظهر أول ما السكرول يوصلها
        >
          {dict.services.items.map((service: ServiceItem, index: number) => {
            const Icon = iconMap[index] || FaLaptopCode;
            const colors = colorMap[index] || { bg: "bg-blue-50", text: "text-blue-600" };
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-premium hover:shadow-2xl hover:shadow-valict-navy/10 hover:bg-valict-navy dark:hover:bg-valict-navy hover:-translate-y-2 transition-all duration-500 border border-slate-200 dark:border-slate-800 hover:border-valict-cyan/30 dark:hover:border-valict-cyan/30 flex flex-col h-full text-start"
              >
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 md:mb-8 transition-all duration-500 group-hover:bg-white/10 group-hover:scale-110 ${colors.bg}`}
                >
                  <Icon className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-500 group-hover:text-valict-cyan ${colors.text}`} />
                </div>
                
                <h4 className="text-xl md:text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h4>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8 flex-grow group-hover:text-slate-300 transition-colors duration-300">
                  {service.desc}
                </p>
                
                {/* زرار Learn More بيتحرك بنعومة لقدام وبيودي للـ slug الصحيح */}
                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-700/50 group-hover:border-white/10 transition-colors duration-300">
                  <Link
                    href={`/${lang}/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-valict-navy dark:text-valict-cyan font-bold text-sm group-hover:text-valict-cyan transition-colors"
                  >
                    {dict.services.learnMore} 
                    <FaChevronRight className="text-[10px] transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
