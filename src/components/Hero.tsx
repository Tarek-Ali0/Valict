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
      <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 dark:border-cyan-400/20 mb-3 shadow-sm transition-all duration-300 hover:border-cyan-500/40">
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
        <span className="text-xs font-bold text-valict-navy dark:text-valict-cyan tracking-widest uppercase">
          {dict.hero.badge}
        </span>
        <span className="flex h-2 w-2 rounded-full bg-valict-cyan animate-pulse"></span>
      </div>

      <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-6xl font-black leading-[1.2] lg:leading-[1.15] mb-0 text-valict-dark dark:text-white tracking-tight">
        {dict.hero.title1} <br className="hidden sm:block" />
        <span className="logo-gradient-text leading-relaxed">
          {dict.hero.title2}
        </span>
      </h1>
    </>
  );

  return (
    <section ref={containerRef} className="relative h-auto lg:h-[125vh] transition-colors duration-300 overflow-hidden">
      
      {/* Sticky Container */}
      <div className="relative lg:sticky top-0 lg:h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-start pt-24 sm:pt-28 lg:pt-32 pb-6 lg:pb-0">
        
        {/* --- Modern 2026 Background Glow Elements --- */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[700px] h-[350px] md:h-[700px] bg-gradient-to-tr from-valict-cyan/20 to-valict-navy/15 dark:from-valict-cyan/10 dark:to-valict-navy/20 rounded-full blur-[100px] md:blur-[140px] -z-10 pointer-events-none"></div>
        <div className="circuit-bg absolute inset-0 opacity-[0.15] dark:opacity-[0.05] -z-20 pointer-events-none"></div>
        {/* ----------------------------------- */}

        {/* 1. حاوية الموبايل والتابلت */}
        <div className="lg:hidden relative z-20 flex flex-col items-center text-center px-4 w-full max-w-6xl">
          {heroContent}
          
          {/* Modern Floating Glass Container for Mobile */}
          <div className="w-full max-w-[340px] xs:max-w-xs sm:max-w-md my-3 p-2 rounded-2xl bg-gradient-to-b from-white/40 to-white/10 dark:from-slate-900/40 dark:to-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 shadow-2xl">
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard"
              width={900}
              height={600}
              className="w-full h-auto rounded-xl object-contain pointer-events-none"
              priority
            />
          </div>

          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-valict-cyan/25 mt-1"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-3 w-3 rtl:rotate-180" />
          </Link>
        </div>

        {/* 2. حاوية الديسكتوب (العنوان والبادج) */}
        <motion.div
          className="hidden lg:flex relative z-20 flex-col items-center text-center px-4 w-full max-w-6xl mt-2"
          style={{ y: textY, opacity: textOpacity }}
        >
          {heroContent}
        </motion.div>

        {/* Modern Floating Dashboard Mockup for Desktop */}
        <motion.div
          className="hidden lg:block relative z-30 w-full max-w-4xl lg:max-w-[920px] px-4 mt-4"
          style={{ scale: imageScale, y: imageY }}
        >
          <div className="relative p-3 rounded-3xl bg-gradient-to-b from-white/50 via-white/20 to-transparent dark:from-slate-800/40 dark:via-slate-900/20 dark:to-transparent backdrop-blur-2xl border border-white/30 dark:border-slate-700/40 shadow-[0_25px_60px_-15px_rgba(30,58,138,0.25)] dark:shadow-[0_25px_60px_-15px_rgba(34,211,238,0.1)]">
            {/* Inner glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-valict-cyan/10 via-transparent to-valict-navy/10 pointer-events-none"></div>
            
            <Image
              src="/dashboard-mockup.png"
              alt="Tech Dashboard"
              width={1050}
              height={680}
              className="w-full h-auto rounded-2xl object-contain pointer-events-none shadow-inner"
              priority
            />
          </div>
        </motion.div>

        {/* الزرار تحت الواجهة للديسكتوب */}
        <div className="hidden lg:flex relative z-40 flex-col items-center text-center px-4 w-full max-w-4xl mt-4">
          <Link
            href="#contact"
            className="font-sans btn-gradient text-white px-8 py-3 rounded-xl font-bold text-sm flex items-center gap-3 shadow-lg shadow-valict-cyan/30 hover:shadow-valict-cyan/50 hover:scale-[1.02] transition-all duration-300"
          >
            {dict.hero.cta}
            <FaArrowRightLong className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
