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

  // حركة العنوان
  const textY = useTransform(scrollYProgress, [0, 0.25], ["0vh", "-10vh"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // حركة اللابتوب
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.3], ["0vh", "0vh"]);

  const heroContent = (
    <>
      {/* مسافة آمنة تحت النافبار عشان الـ Badge ما تدخلش فيه */}
      <div className="inline-flex items-center gap-2 px-4 py-2 text-xs rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 mb-4 shadow-sm mt-4 lg:mt-6">
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
        <span className="text-xs md:text-sm font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
          {dict.hero.badge}
        </span>
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.15] lg:leading-[1.1] mb-3 text-valict-dark dark:text-white tracking-tight">
        {dict.hero.title1} <br className="hidden sm:block" />
        <span className="logo-gradient-text leading-relaxed">
          {dict.hero.title2}
        </span>
      </h1>
    </>
  );

  return (
    <section ref={containerRef} className="relative h-[90dvh] lg:h-[160vh] transition-colors duration-300">
      
      {/* Sticky Container */}
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-start pt-16 lg:pt-20">
        
        {/* --- Premium Background Elements --- */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/15 dark:bg-valict-cyan/10 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/10 dark:bg-valict-cyan/5 rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
        <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
        {/* ----------------------------------- */}

        {/* 1. حاوية الموبايل والتابلت */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl">
          {heroContent}
          <div className="w-full max-w-5xl my-2">
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard"
              width={1200}
              height={800}
              className="w-full h-auto drop-shadow-lg object-contain pointer-events-none"
              priority
            />
          </div>
          <p className="font-sans text-base text-slate-500 dark:text-slate-400 mb-4 max-w-2xl leading-relaxed">
            {dict.hero.subheadline}
          </p>
          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-8 py-3 rounded-xl font-bold text-base flex items-center gap-2 shadow-lg shadow-valict-cyan/20"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>

        {/* 2. حاوية الديسكتوب */}
        <motion.div
          className="hidden lg:flex relative z-20 flex-col items-center text-center px-4 w-full max-w-6xl"
          style={{ y: textY, opacity: textOpacity }}
        >
          {heroContent}
        </motion.div>

        {/* Laptop / Dashboard Image (تحت العنوان مباشرة وبشكل متناسق) */}
        <motion.div
          className="hidden lg:block relative z-35 w-full max-w-6xl px-4 mt-2"
          style={{ scale: imageScale, y: imageY }}
        >
          <Image
            src="/dashboard-mockup.png"
            alt="Tech Dashboard"
            width={1300}
            height={850}
            className="w-full h-auto drop-shadow-[0_20px_50px_rgba(30,58,138,0.2)] object-contain pointer-events-none"
            priority
          />
        </motion.div>

        {/* السطر الفرعي والـ CTA (تحت اللابتوب مباشرة) */}
        <div className="hidden lg:flex relative z-40 flex-col items-center text-center px-4 w-full max-w-3xl mt-3">
          <p className="font-sans text-base lg:text-lg text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
            {dict.hero.subheadline}
          </p>

          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-8 py-3 rounded-xl font-bold text-base flex items-center gap-3 shadow-lg shadow-valict-cyan/20 hover:shadow-valict-cyan/40 transition-all duration-300"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
