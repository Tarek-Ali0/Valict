"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface StepData {
  title: string;
  desc: string;
}

interface MappedStep {
  number: string;
  title: string;
  desc: string;
}

interface HowItWorksProps {
  dict: any;
}

export function HowItWorks({ dict }: HowItWorksProps) {
  const steps: MappedStep[] = dict.how.steps.map((step: StepData, index: number) => ({
    number: `0${index + 1}`,
    title: step.title,
    desc: step.desc
  }));

  // إعدادات حركة دخول السكشن
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-[#0B1120] relative border-t border-slate-200 dark:border-slate-800 overflow-hidden transition-colors duration-300">
      
      {/* إضاءة خلفية ناعمة */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-valict-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-valict-navy/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-20"
        >
          <h2 className="text-valict-cyan font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2 justify-center">
            <span className="w-8 h-[2px] bg-valict-cyan inline-block rounded-full"></span>
            {dict.how.subtitle}
            <span className="w-8 h-[2px] bg-valict-cyan inline-block rounded-full"></span>
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold text-valict-dark dark:text-white tracking-tight">
            {dict.how.title}
          </h3>
        </motion.div>

        {/* Steps Grid with Connecting Line */}
        <div className="relative">
          {/* الخط الواصل بين الخطوات (يظهر في الشاشات الكبيرة فقط) */}
          <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-700 to-transparent z-0"></div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step: MappedStep, index: number) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                className="group relative bg-white dark:bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-valict-navy/10 border border-slate-200 dark:border-slate-800 hover:border-valict-cyan/30 dark:hover:border-valict-cyan/30 transition-all duration-500 hover:-translate-y-2 flex flex-col text-start overflow-hidden"
              >
                {/* رقم شفاف في الخلفية (Watermark) */}
                <span className="absolute -right-4 -top-6 text-8xl font-black text-slate-50 dark:text-slate-800/50 transition-colors duration-500 group-hover:text-valict-cyan/5 select-none pointer-events-none">
                  {step.number}
                </span>

                {/* البادج الخاص برقم الخطوة */}
                <div className="relative z-10 w-14 h-14 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-valict-cyan group-hover:border-valict-cyan transition-all duration-500">
                  <span className="text-xl font-black text-valict-navy dark:text-valict-cyan group-hover:text-white transition-colors duration-500">
                    {step.number}
                  </span>
                </div>

                {/* المحتوى */}
                <div className="relative z-10">
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-valict-navy transition-colors duration-300">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>

                {/* شريط سفلي جمالي يظهر عند الهوفر */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-valict-navy to-valict-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}