"use client";

import React from "react";
import Image from "next/image";
import { FaShieldHalved, FaServer, FaHeadset, FaLaptopCode } from "react-icons/fa6";

interface StripBannerProps {
  lang: string;
}

export function StripBanner({ lang }: StripBannerProps) {
  const isAr = lang === "ar";

  const highlights = isAr
    ? [
        { text: "أمن سيبراني", icon: FaShieldHalved },
        { text: "بنية تحتية موثوقة", icon: FaServer },
        { text: "حلول الويب", icon: FaLaptopCode },
        { text: "دعم فني 24/7", icon: FaHeadset },
      ]
    : [
        { text: "Cybersecurity", icon: FaShieldHalved },
        { text: "Reliable Infrastructure", icon: FaServer },
        { text: "Web Solutions", icon: FaLaptopCode },
        { text: "24/7 Technical Support", icon: FaHeadset },
      ];

  return (
    <section className="relative w-full transition-colors duration-300 hidden lg:block">
      {/* رجعنا العرض لـ 1600px */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* الشريط (زودنا التدوير لـ rounded-[2rem]) */}
        <div className="relative w-full h-[100px] bg-gradient-to-r rtl:bg-gradient-to-l from-valict-navy to-valict-dark rounded-[2rem] px-8 md:px-10 shadow-2xl overflow-hidden flex items-center justify-center">
          
          {/* الـ Watermark */}
          <div className="absolute top-1/2 -translate-y-1/2 w-[300px] h-[300px] opacity-[0.08] pointer-events-none ltr:left-0 rtl:right-0">
            <Image
              src="/JustV.png"
              alt=""
              fill
              className="object-contain"
              aria-hidden="true"
            />
          </div>

          {/* المحتوى (النص + الأيقونات) */}
          <div className="relative z-10 w-full flex items-center justify-center gap-8 md:gap-16 flex-wrap">
            {highlights.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* الأيقونة داخل مربع */}
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-valict-cyan" />
                </div>
                {/* النص */}
                <span className="text-white font-black text-lg md:text-xl whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
