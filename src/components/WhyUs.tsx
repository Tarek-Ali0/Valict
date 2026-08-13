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

  // إعدادات حركة دخول السكشن والصور
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // إعدادات حركة القائمة (تظهر بالتدريج)
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
      className="py-24 md:py-32 bg-white dark:bg-[#0B1120] overflow-hidden border-t border-slate-200 dark:border-slate-800 relative transition-colors duration-300"
    >
      {/* إضاءة خلفية ناعمة لربط التصميم ببعضه */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-valict-cyan/5 rounded-full blur-[100px] -z-10 pointer-events-none translate-y-[-50%]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* الجانب الأيسر: الصور المتداخلة (Overlapping Composition) لحل مشكلة الفراغ */}
          <motion.div 
            className="lg:w-1/2 relative w-full h-[450px] md:h-[600px] flex items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            {/* عناصر ديكور في الخلفية لملء الفراغ */}
            <div className="absolute top-10 left-0 w-32 h-32 border-4 border-slate-100 dark:border-slate-800 rounded-full -z-10 opacity-50"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-valict-cyan/10 rounded-full blur-xl -z-10"></div>

            {/* الصورة الرئيسية (في الخلف ناحية اليمين) */}
            <div className="absolute top-0 right-0 w-[75%] h-[75%] rounded-[2rem] overflow-hidden shadow-2xl group">
              <div className="absolute inset-0 bg-valict-navy/10 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <Image
                src="/why-server-room.webp"
                alt="IT Monitoring"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* الصورة الفرعية (في الأمام ناحية الشمال لملء الفراغ بالكامل) */}
            <div className="absolute bottom-0 left-0 w-[60%] h-[60%] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] border-[8px] md:border-[12px] border-white dark:border-slate-900 z-20 group">
              <div className="absolute inset-0 bg-valict-cyan/10 z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
              <Image
                src="/why-monitoring.webp"
                alt="Server Room"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Premium Floating Badge (تم تصغيره وضبط مظهره ليصبح أنيقاً) */}
            <motion.div 
              className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 bg-valict-navy/95 backdrop-blur-md p-4 md:p-5 rounded-2xl text-center shadow-[0_15px_30px_rgba(30,58,138,0.3)] border border-white/15 z-30 w-36 md:w-44"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring", bounce: 0.4 }}
              viewport={{ once: true }}
            >
              <span className="block text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-valict-cyan mb-1">
                {dict.why.uptime}
              </span>
              <span className="text-white/90 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em]">
                {dict.why.uptimeLabel}
              </span>
            </motion.div>
          </motion.div>

          {/* الجانب الأيمن: النصوص والمميزات */}
          <motion.div 
            className="lg:w-1/2 text-start w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUpVariant}
          >
            <h2 className="text-valict-cyan font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-valict-cyan inline-block rounded-full"></span>
              {dict.why.title}
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-valict-dark dark:text-white mb-6 leading-tight tracking-tight">
              {dict.why.headline}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mb-10 text-base md:text-lg leading-relaxed max-w-lg">
              {dict.about.text}
            </p>

            {/* List with Staggered Animation */}
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
                  {/* الأيقونة داخل مربع احترافي */}
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:bg-valict-navy dark:group-hover:bg-valict-navy group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-valict-navy">
                    <point.icon className="w-5 h-5 md:w-6 md:h-6 text-valict-navy dark:text-valict-cyan transition-colors duration-300 group-hover:text-valict-cyan" />
                  </div>
                  <div className="mt-1">
                    <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-valict-navy dark:group-hover:text-valict-cyan transition-colors">
                      {point.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
