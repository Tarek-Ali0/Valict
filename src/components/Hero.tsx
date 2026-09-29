"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  dict: any;
}

export function Hero({ dict }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // اللابتوب: يصغر تدريجياً فقط (بدون اختفاء)
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16 transition-colors duration-300 flex items-center justify-center overflow-hidden"
    >
      {/* --- Premium Background Elements --- */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/10 dark:bg-valict-cyan/5 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
      {/* ----------------------------------- */}

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. حاوية الموبايل والتابلت — عمودي */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-center w-full">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mb-4 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
            <span className="text-xs font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
              {dict.hero.badge}
            </span>
            <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
          </div>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-black leading-[1.2] mb-3 text-valict-dark dark:text-white tracking-tight">
            {dict.hero.title1} <br className="hidden sm:block" />
            <span className="logo-gradient-text leading-relaxed">
              {dict.hero.title2}
            </span>
          </h2>

          {/* خط متحرك للموبايل */}
          <div className="w-full max-w-[280px] sm:max-w-[360px] mb-4">
            <AnimatedUnderline />
          </div>

          {(dict.hero.description || dict.about?.text) && (
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
              {dict.hero.description || dict.about?.text}
            </p>
          )}

          <div className="w-full max-w-[320px] xs:max-w-xs sm:max-w-md my-2.5">
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard Visualizing Valict ICT Infrastructure Solutions"
              width={900}
              height={600}
              className="w-full h-auto drop-shadow-lg object-contain pointer-events-none"
              priority
              sizes="(max-width: 640px) 320px, (max-width: 1024px) 450px, 900px"
            />
          </div>
          <Link
            href="#contact"
            aria-label="Navigate to Valict consultation and contact section"
            className="font-sans btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-valict-cyan/25"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-3 w-3 rtl:rotate-180" />
          </Link>
        </div>

        {/* 2. حاوية الديسكتوب — Split Layout */}
        <div className="hidden lg:grid lg:grid-cols-[1.5fr_1fr] gap-10 xl:gap-14 items-center relative z-20 w-full">
          {/* الجانب الأول: النص */}
          <div className="flex flex-col text-start space-y-3 min-w-0">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
              <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
              <span className="text-xs font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
                {dict.hero.badge}
              </span>
              <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.15] text-valict-dark dark:text-white tracking-tight">
              <span className="lg:whitespace-nowrap">{dict.hero.title1}</span>
              <br />
              <span className="logo-gradient-text leading-relaxed lg:whitespace-nowrap">
                {dict.hero.title2}
              </span>
            </h1>

            {/* خط متحرك — تحت العنوان */}
            <div className="w-full -mt-1">
              <AnimatedUnderline />
            </div>

            {(dict.hero.description || dict.about?.text) && (
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-medium">
                {dict.hero.description || dict.about?.text}
              </p>
            )}

            <div className="pt-2">
              <Link
                href="#contact"
                aria-label="Navigate to Valict consultation and contact section"
                className="inline-flex font-sans btn-gradient text-white px-7 py-3 rounded-xl font-bold text-sm items-center gap-2 shadow-lg shadow-valict-cyan/25 hover:shadow-valict-cyan/40 transition-all duration-300"
              >
                {dict.hero.cta}
                <FaArrowRightLong className="h-4 w-4 rtl:rotate-180" />
              </Link>
            </div>
          </div>

          {/* الجانب التاني: صورة اللابتوب */}
          <motion.div
            className="w-full flex justify-center"
            style={{ scale: imageScale }}
          >
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard Visualizing Valict ICT Infrastructure Solutions"
              width={1050}
              height={680}
              className="w-full h-auto max-w-[880px] drop-shadow-[0_20px_50px_rgba(30,58,138,0.2)] object-contain pointer-events-none"
              priority
              sizes="(min-width: 1024px) 880px, 100vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * خط متحرك — CSS Animation باستخدام div
 * يتضمن:
 * - خط أساسي باهت (دائماً ظاهر)
 * - خط متوهج بيمشي من اليسار لليمين — مستمر (loop)
 */
function AnimatedUnderline() {
  return (
    <div className="relative w-full h-[2px]">
      {/* الخط الباهت (دائماً ظاهر) */}
      <div className="absolute inset-0 bg-valict-cyan/20 rounded-full" />

      {/* الخط المتوهج (بيمشي بشكل مستمر) */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="animated-line absolute inset-y-0 left-0 w-full bg-gradient-to-r from-valict-cyan/0 via-valict-cyan to-valict-cyan rounded-full" />
      </div>

      <style jsx>{`
        .animated-line {
          transform: translateX(-100%);
          animation: slideIn 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes slideIn {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
