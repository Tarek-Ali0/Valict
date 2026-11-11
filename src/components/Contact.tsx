import React from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

interface ContactProps {
  dict: any;
}

export function Contact({ dict }: ContactProps) {
  return (
    <section id="contact" className="relative transition-colors duration-300 overflow-hidden">
      
      {/* --- Premium Background Elements --- */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-cyan/[0.10] dark:bg-valict-cyan/[0.07] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-valict-navy/[0.07] dark:bg-valict-cyan/[0.05] rounded-full blur-[90px] md:blur-[120px] -z-10 pointer-events-none"></div>
      {/* ----------------------------------- */}

      <div className="w-full py-12 md:py-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* الشريط (مستطيل بحواف دائرية وتدرج لوني) */}
          <div className="relative w-full bg-gradient-to-r from-valict-navy to-valict-cyan rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            
            {/* الـ Watermark (صورة JustV) */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[400px] h-[400px] opacity-[0.05] pointer-events-none">
              <Image
                src="/JustV.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-start">
              
              {/* 1. العنوان */}
              <div className="lg:col-span-5">
                <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                  {dict.cta.headline}
                </h2>
              </div>

              {/* 2. النص + معلومات التواصل */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <p className="text-blue-50 text-base md:text-lg font-light leading-relaxed">
                  {dict.cta.sub}
                </p>
                
                <div className="flex flex-col gap-3 mt-2">
                  <a
                    href={`mailto:${dict.contact.email}`}
                    className="group flex items-center gap-3 text-white hover:text-valict-navy transition-colors"
                    aria-label={`Send an email to ${dict.contact.email}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaEnvelope className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base font-medium">{dict.contact.email}</span>
                  </a>
                  <a
                    href={`tel:${dict.contact.phone}`}
                    className="group flex items-center gap-3 text-white hover:text-valict-navy transition-colors"
                    aria-label={`Call Valict support team at ${dict.contact.phone}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaPhone className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm md:text-base font-medium" dir="ltr">{dict.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* 3. الزرار (متوازي أضلاع بحواف دائرية) */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end w-full">
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="group relative bg-white text-valict-navy text-center py-4 px-8 font-bold text-base md:text-lg shadow-lg hover:bg-valict-cyan hover:text-valict-dark transition-all duration-300 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                  style={{
                    clipPath: "polygon(5% 0%, 100% 0%, 95% 100%, 0% 100%)",
                    borderRadius: "12px",
                  }}
                >
                  {dict.cta.button}
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-black">
                    →
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
