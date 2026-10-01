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
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.92]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-auto transition-colors duration-300 overflow-hidden"
    >
      {/* --- Premium Background Elements --- */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/10 dark:bg-valict-cyan/5 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
      {/* ----------------------------------- */}

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24 lg:pb-32">
        {/* 1. حاوية الموبايل والتابلت — عمودي بالترتيب الجديد */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-start w-full">
          {/* 1) Badge — في النص */}
          <div className="w-full flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full bg-gradient-to-r from-valict-cyan/5 via-white to-valict-navy/5 dark:from-valict-cyan/10 dark:via-slate-900 dark:to-valict-navy/10 border border-valict-cyan/30 dark:border-valict-cyan/20 shadow-md shadow-valict-cyan/10">
              <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
              <span className="text-sm font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
                {dict.hero.badge}
              </span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
            </div>
          </div>

          {/* 2) صورة اللاب توب */}
          <div className="w-full max-w-[400px] xs:max-w-[440px] sm:max-w-[520px] mb-6">
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard Visualizing Valict ICT Infrastructure Solutions"
              width={900}
              height={600}
              className="w-full h-auto drop-shadow-md object-contain pointer-events-none"
              priority
              sizes="(max-width: 640px) 400px, (max-width: 1024px) 520px, 900px"
            />
          </div>

          {/* 3) العنوان */}
          <h2 className="w-full text-2xl xs:text-3xl sm:text-4xl font-black leading-[1.2] mb-4 text-valict-dark dark:text-white tracking-tight text-start">
            {dict.hero.title1} <br />
            <span className="logo-gradient-text leading-relaxed">
              {dict.hero.title2}
            </span>
          </h2>

          {/* 4) الوصف */}
          {(dict.hero.description || dict.about?.text) && (
            <p className="w-full text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mb-6 leading-relaxed font-medium text-start">
              {dict.hero.description || dict.about?.text}
            </p>
          )}

          {/* 5) الزرار */}
          <div className="w-full">
            <Link
              href="#contact"
              aria-label="Navigate to Valict consultation and contact section"
              className="inline-flex font-sans btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs items-center gap-2 shadow-lg shadow-valict-cyan/25"
            >
              {dict.hero.cta}
              <FaArrowRightLong className="h-3 w-3 rtl:rotate-180" />
            </Link>
          </div>
        </div>

        {/* 2. حاوية الديسكتوب — Split Layout */}
        <div className="hidden lg:block relative z-20 w-full">
          {/* Badge — في نص الصفحة فوق الـ Grid */}
          <div className="flex justify-center mb-8 -mt-4">
            <div className="inline-flex items-center gap-2 px-5 py-2 text-sm rounded-full bg-gradient-to-r from-valict-cyan/5 via-white to-valict-navy/5 dark:from-valict-cyan/10 dark:via-slate-900 dark:to-valict-navy/10 border border-valict-cyan/30 dark:border-valict-cyan/20 shadow-md shadow-valict-cyan/10">
              <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
              <span className="text-sm font-bold text-slate-900 dark:text-valict-cyan tracking-widest uppercase">
                {dict.hero.badge}
              </span>
              <span className="flex h-2.5 w-2.5 rounded-full bg-valict-cyan animate-pulse"></span>
            </div>
          </div>

          {/* الـ Grid — نص + صورة */}
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 xl:gap-12 items-center w-full">
            {/* الجانب الأول: النص */}
            <div className="flex flex-col text-start space-y-3 min-w-0">
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-black leading-[1.15] text-valict-dark dark:text-white tracking-tight">
                <span className="lg:whitespace-nowrap">{dict.hero.title1}</span>
                <br />
                <span className="logo-gradient-text leading-relaxed lg:whitespace-nowrap">
                  {dict.hero.title2}
                </span>
              </h1>

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
              className="w-full flex items-center justify-center"
              style={{ scale: imageScale }}
            >
              <Image
                src="/dashboard-mockup.png"
                alt="Tech Dashboard Visualizing Valict ICT Infrastructure Solutions"
                width={1050}
                height={680}
                className="w-full h-auto max-w-[1400px] drop-shadow-[0_15px_35px_rgba(30,58,138,0.15)] object-contain pointer-events-none"
                priority
                sizes="(min-width: 1024px) 1400px, 100vw"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* Line Separator — تحت     */}
      {/* خطين: من الطرفين، فراغ في النص */}
      {/* ========================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center gap-4">
          {/* الخط الأيسر — حاد من الطرف، بيتلاشى في النص */}
          <div className="flex-1 h-[1px] bg-gradient-to-r from-slate-400 to-transparent dark:from-slate-600"></div>

          {/* فراغ في النص */}
          <div className="w-24 md:w-32"></div>

          {/* الخط الأيمن — حاد من الطرف، بيتلاشى في النص */}
          <div className="flex-1 h-[1px] bg-gradient-to-l from-slate-400 to-transparent dark:from-slate-600"></div>
        </div>
      </div>
      {/* ========================= */}

    </section>
  );
}
