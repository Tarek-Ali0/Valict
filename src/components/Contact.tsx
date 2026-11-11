import React from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

interface ContactProps {
  dict: any;
}

export function Contact({ dict }: ContactProps) {
  return (
    <section id="contact" className="relative transition-colors duration-300 overflow-hidden">
      
      <div className="w-full pt-0 pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* الشريط */}
          <div className="relative w-full bg-gradient-to-r from-valict-navy to-valict-dark rounded-2xl p-8 md:p-10 shadow-xl overflow-hidden">
            
            {/* الـ Watermark (صورة JustV) على الشمال */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.08] pointer-events-none">
              <Image
                src="/JustV.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-start">
              
              {/* 1. العنوان */}
              <div className="lg:col-span-5">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-2 leading-tight tracking-tight">
                  {dict.cta.headline}
                </h2>
              </div>

              {/* 2. النص + معلومات التواصل */}
              <div className="lg:col-span-4 flex flex-col gap-3">
                <p className="text-blue-50 text-base md:text-lg font-light leading-relaxed">
                  {dict.cta.sub}
                </p>
                
                <div className="flex flex-col gap-2 mt-1">
                  <a
                    href={`mailto:${dict.contact.email}`}
                    className="group flex items-center gap-3 text-white hover:text-valict-cyan transition-colors"
                    aria-label={`Send an email to ${dict.contact.email}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaEnvelope className="w-4 h-4 text-valict-cyan" />
                    </div>
                    <span className="text-sm md:text-base font-medium">{dict.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${dict.contact.phone}`}
                    className="group flex items-center gap-3 text-white hover:text-valict-cyan transition-colors"
                    aria-label={`Call Valict support team at ${dict.contact.phone}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaPhone className="w-4 h-4 text-valict-cyan" />
                    </div>
                    <span className="text-sm md:text-base font-medium" dir="ltr">{dict.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* 3. الزرار (مع 3 نقط + تأثير المراية) */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end w-full">
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="group relative bg-white text-valict-navy text-center py-3 px-7 rounded-xl font-bold text-base md:text-lg shadow-lg hover:bg-valict-cyan hover:text-valict-dark transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden"
                >
                  {/* تأثير المراية (Shine Effect) */}
                  <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-[-20deg] transition-all duration-700 group-hover:left-[100%]"></span>
                  
                  {/* النص */}
                  <span className="relative z-10">{dict.cta.button}</span>

                  {/* 3 نقط */}
                  <span className="relative z-10 flex items-center gap-0.5 font-black">
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                  </span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
