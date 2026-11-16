"use client";

import React from "react";
import Image from "next/image";

interface StripBannerProps {
  lang: string;
}

export function StripBanner({ lang }: StripBannerProps) {
  const isAr = lang === "ar";

  const highlights = isAr
    ? ["أمن سيبراني متقدم", "بنية تحتية موثوقة", "دعم فني 24/7"]
    : ["Advanced Cybersecurity", "Reliable Infrastructure", "24/7 Technical Support"];

  return (
    <section className="relative w-full overflow-hidden transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        <div className="relative w-full h-[100px] bg-gradient-to-r rtl:bg-gradient-to-l from-valict-navy to-valict-dark rounded-2xl px-8 md:px-10 shadow-xl overflow-hidden flex items-center justify-center">
          
          <div className="absolute top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.08] pointer-events-none ltr:left-0 rtl:right-0">
            <Image
              src="/JustV.png"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 w-full flex items-center justify-center gap-8 md:gap-16">
            {highlights.map((text, index) => (
              <div key={index} className="text-white font-bold text-sm md:text-base whitespace-nowrap">
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
