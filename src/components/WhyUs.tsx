"use client";

import React from "react";
import Image from "next/image";
import { FaArrowTrendDown, FaGaugeHigh, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";

interface WhyUsProps {
  dict: any;
}

interface PointData {
  title: string;
  desc: string;
}

interface MappedPoint {
  title: string;
  desc: string;
  icon: React.ElementType;
}

export function WhyUs({ dict }: WhyUsProps) {
  const icons = [FaArrowTrendDown, FaGaugeHigh, FaArrowUpRightFromSquare];
  const points: MappedPoint[] = dict.why.points.map((point: PointData, index: number) => ({
    title: point.title,
    desc: point.desc,
    icon: icons[index] || FaArrowTrendDown
  }));

  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const pointVariant: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section
      id="why-valict"
      className="bg-white dark:bg-[#0B1120] overflow-hidden relative transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-12 md:pt-16 pb-12 md:pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            className="lg:w-1/2 relative w-full h-[450px] md:h-[600px] flex items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <div className="absolute top-[10%] right-0 w-[70%] h-[70%] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className="absolute bottom-[5%] left-0 w-[60%] h-[60%] bg-valict-navy/10 dark:bg-valict-cyan/7 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            {/* شبكة الموصلات - في الركن اليسار فوق - مع سيجنال متحرك */}
            <div className="absolute top-6 left-0 w-48 h-48 opacity-[0.15] z-0 pointer-events-none">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 20 H60 V60 H100 V100" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M180 20 H140 V60 H100 V100" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M100 100 V140 H60 V180" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M100 100 V140 H140 V180" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M20 100 H60 V140" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M180 100 H140 V140" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M60 60 H80 V80" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M140 60 H120 V80" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />

                <circle cx="20" cy="20" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="180" cy="20" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="100" cy="100" r="5" fill="currentColor" className="text-valict-cyan" />
                <circle cx="20" cy="100" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="180" cy="100" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="60" cy="180" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="140" cy="180" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="80" cy="80" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="120" cy="80" r="3" fill="currentColor" className="text-valict-cyan" />

                {/* السيجنال المتحرك على خط واحد */}
                <motion.circle
                  r="2.5"
                  fill="currentColor"
                  className="text-valict-cyan"
                  initial={{ cx: 20, cy: 20 }}
                  animate={{
                    cx: [20, 60, 60, 100, 100],
                    cy: [20, 20, 60, 60, 100],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </svg>
            </div>

            {/* شبكة الموصلات - نسخة تانية في الركن اليمين تحت - ملفوفة 90 درجة عكس عقارب الساعة */}
            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-[0.15] z-0 pointer-events-none -rotate-90">
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M20 20 H60 V60 H100 V100" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M180 20 H140 V60 H100 V100" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M100 100 V140 H60 V180" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M100 100 V140 H140 V180" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M20 100 H60 V140" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M180 100 H140 V140" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M60 60 H80 V80" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />
                <path d="M140 60 H120 V80" stroke="currentColor" strokeWidth="1" className="text-valict-cyan" />

                <circle cx="20" cy="20" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="180" cy="20" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="100" cy="100" r="5" fill="currentColor" className="text-valict-cyan" />
                <circle cx="20" cy="100" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="180" cy="100" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="60" cy="180" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="140" cy="180" r="4" fill="currentColor" className="text-valict-cyan" />
                <circle cx="80" cy="80" r="3" fill="currentColor" className="text-valict-cyan" />
                <circle cx="120" cy="80" r="3" fill="currentColor" className="text-valict-cyan" />
              </svg>
            </div>

            <div className="absolute bottom-10 right-10 w-24 h-24 bg-valict-cyan/10 rounded-full blur-xl -z-10 pointer-events-none"></div>

            <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl border-[6px] md:border-[8px] border-white dark:border-slate-900 group z-10">
              <div className="absolute inset-0 bg-valict-navy/10 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <Image
                src="/why-server-room.webp"
                alt="Valict IT Monitoring Services - Server Room Infrastructure"
                fill
                sizes="(max-width: 768px) 75vw, (max-width: 1200px) 38vw, 480px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[6px] md:border-[8px] border-white dark:border-slate-900 z-20 group">
              <div className="absolute inset-0 bg-valict-cyan/10 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <Image
                src="/why-monitoring.webp"
                alt="Valict Server Room Monitoring - IT Infrastructure Services"
                fill
                sizes="(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 380px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            <motion.div 
              className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-valict-navy/75 backdrop-blur-md px-5 py-4 rounded-2xl text-center shadow-[0_15px_30px_rgba(0,0,0,0.25)] border border-white/20 z-30 w-auto whitespace-nowrap"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="block text-2xl md:text-4xl font-black text-white mb-1 drop-shadow-md">
                {dict.why.uptime}
              </span>
              <span className="block text-white/95 text-[10px] md:text-xs font-bold uppercase tracking-[0.15em]">
                {dict.why.uptimeLabel}
              </span>
            </motion.div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 text-start w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-cyan-600 dark:text-cyan-400 font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-cyan-600 dark:bg-cyan-400 inline-block rounded-full"></span>
              {dict.why.title}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-valict-dark dark:text-white mb-6 leading-tight tracking-tight">
              {dict.why.headline}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-10 text-base md:text-lg leading-relaxed max-w-lg">
              {dict.about.text}
            </p>

            <motion.div 
              className="space-y-6 md:space-y-8"
              variants={staggerContainer}
            >
              {points.map((point: MappedPoint, index: number) => (
                <motion.div 
                  key={index} 
                  variants={pointVariant}
                  className="flex items-start gap-4 md:gap-5 group"
                >
                  <div className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-valict-navy dark:group-hover:bg-valict-navy group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-valict-navy overflow-hidden">
                    <div className="absolute -top-3 -right-3 w-10 h-10 bg-valict-cyan/20 dark:bg-valict-cyan/15 rounded-full blur-xl pointer-events-none transition-opacity duration-300 group-hover:opacity-0"></div>

                    <point.icon className="relative z-10 w-5 h-5 md:w-6 md:h-6 text-valict-navy dark:text-valict-cyan transition-colors duration-300 group-hover:text-valict-cyan" />
                  </div>
                  <div className="mt-1">
                    <p className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-valict-navy dark:group-hover:text-valict-cyan transition-colors">
                      {point.title}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-slate-400 to-transparent dark:via-slate-600"></div>
      </div>

    </section>
  );
}
