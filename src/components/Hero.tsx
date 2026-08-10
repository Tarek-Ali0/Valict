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

  const textY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "-3vh"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "-1vh"]);

  const heroContent = (
    <>
      <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 mb-2 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
        <span className="text-xs font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
          {dict.hero.badge}
        </span>
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.2] lg:leading-[1.15] mb-0 text-valict-dark dark:text-white tracking-tight">
        {dict.hero.title1} <br className="hidden sm:block" />
        <span className="logo-gradient-text leading-relaxed">
          {dict.hero.title2}
        </span>
      </h1>
    </>
  );

  return (
    <section ref={containerRef} className="relative min-h-[90dvh] lg:h-[125vh] transition-colors duration-300 pb-12 lg:pb-0">
      
      {/* Sticky Container - تم زيادة الـ pt في الموبايل عشان ميبقاش لازق في النافبار */}
      <div className="sticky top-0 w-[100dvw] lg:h-[100dvh] overflow-hidden flex flex-col items-center justify-start pt-20 sm:pt-24 lg:pt-20">
        
        {/* --- Premium Background Elements --- */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/10 dark:bg-valict-cyan/5 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
        {/* ----------------------------------- */}

        {/* 1. حاوية الموبايل والتابلت (تم إظهار اللاب وتظبيط المسافات والوصف من ملف الترجمة) */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl">
          {heroContent}
          <div className="w-full max-w-4xl my-3">
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard"
              width={1000}
              height={700}
              className="w-full h-auto drop-shadow-lg object-contain pointer-events-none"
              priority
            />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium mt-1 mb-3 px-2">
            {dict.hero.description}
          </p>
          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-valict-cyan/25 mb-4"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-3.5 w-3.5 rtl:rotate-180" />
          </Link>
        </div>

        {/* 2. حاوية الديسكتوب (العنوان والبادج) */}
        <motion.div
          className="hidden lg:flex relative z-20 flex-col items-center text-center px-4 w-full max-w-6xl mt-6 lg:mt-4"
          style={{ y: textY, opacity: textOpacity }}
        >
          {heroContent}
        </motion.div>

        {/* Laptop / Dashboard Image */}
        <motion.div
          className="hidden lg:block relative z-30 w-full max-w-4xl lg:max-w-[950px] px-4 mt-2"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/dashboard-mockup.png"
            alt="Tech Dashboard"
            width={1100}
            height={720}
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(30,58,138,0.2)] object-contain pointer-events-none"
            priority
          />
        </motion.div>

        {/* السطر والزرار تحت اللابتوب للديسكتوب */}
        <div className="hidden lg:flex relative z-40 flex-col items-center text-center px-4 w-full max-w-4xl mt-2 pb-6">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mb-2">
            {dict.hero.description}
          </p>
          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-7 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-valict-cyan/25 hover:shadow-valict-cyan/40 transition-all duration-300"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
