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

  // حركة الكلام (للديسكتوب فقط)
  const textY = useTransform(scrollYProgress, [0, 0.4], ["0vh", "-25vh"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  // حركة اللاب توب (للديسكتوب فقط)
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.5], ["45vh", "10vh"]);

  // جمعنا محتوى النص في متغير عشان ما نكررش الكود مرتين
  const heroContent = (
    <>
         <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-xs rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 mb-6 shadow-sm">
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-valict-cyan animate-pulse"></span>
            <span className="text-xs md:text-sm font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
              {dict.hero.badge}
            </span>
            <span className="flex h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-valict-cyan animate-pulse"></span>
          </div>

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.15] lg:leading-[1.1] mb-6 lg:mb-8 text-valict-dark dark:text-white tracking-tight">
        {dict.hero.title1} <br className="hidden sm:block" />
        <span className="logo-gradient-text leading-relaxed">
          {dict.hero.title2}
        </span>
      </h1>

      <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-8 lg:mb-10 max-w-2xl leading-relaxed mx-auto px-2">
        {dict.hero.subheadline}
      </p>

      {/* <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-center justify-center w-full px-4 sm:px-0">
        <Link
          href="#contact"
          className="btn-gradient text-white w-full sm:w-auto justify-center px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg flex items-center gap-3 shadow-lg shadow-valict-cyan/20 hover:shadow-valict-cyan/40 transition-all duration-300"
        >
          {dict.hero.cta}
          <FaArrowRightLong className="h-4 w-4 md:h-5 md:w-5 rtl:rotate-180" />
        </Link>
      </div> */}
    </>
  );

  return (
    <section ref={containerRef} className="relative h-[90dvh] lg:h-[250vh] transition-colors duration-300">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center lg:justify-start lg:pt-32">
        
        {/* --- Premium Background Elements --- */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/10 dark:bg-valict-cyan/5 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-white/60 dark:bg-slate-800/60 rounded-full blur-[80px] md:blur-[100px] -z-10 pointer-events-none"></div>
        <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
        {/* ----------------------------------- */}

        {/* 
          1. حاوية الموبايل والتابلت (ثابتة بدون أنيميشن) 
          بتختفي في الديسكتوب (lg:hidden) 
        */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-center px-4 md:px-6 w-full  max-w-6xl">
          {heroContent}
        </div>

        {/* 
          2. حاوية الديسكتوب (بها أنيميشن السكرول) 
          مخفية في الموبايل والتابلت (hidden lg:flex) 
        */}
        <motion.div
          className="hidden lg:flex relative z-20 flex-col items-center text-center px-4 md:px-6 w-full max-w-6xl"
          style={{ y: textY, opacity: textOpacity }}
        >
          {heroContent}
        </motion.div>

        {/* Laptop / Dashboard Image - hidden on mobile and tablet (hidden lg:block) */}
        <motion.div
          className="hidden lg:block absolute z-30 w-full max-w-7xl px-2 sm:px-4 lg:px-8"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/dashboard-mockup.png"
            alt="Tech Dashboard"
            width={1400}
            height={900}
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(30,58,138,0.2)] object-contain pointer-events-none"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
