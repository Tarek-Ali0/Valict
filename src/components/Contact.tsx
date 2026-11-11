import React from "react";
import Image from "next/image";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

interface ContactProps {
  dict: any;
  lang?: string;
}

export function Contact({ dict, lang = "en" }: ContactProps) {
  return (
    <section id="contact" className="relative transition-colors duration-300 overflow-hidden">
      
      <div className="w-full pt-0 pb-6 md:pb-8">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* الشريط (إرتفاع ثابت) */}
          <div className="relative w-full h-[200px] bg-gradient-to-r rtl:bg-gradient-to-l from-valict-navy to-valict-dark rounded-2xl px-8 md:px-10 shadow-xl overflow-hidden flex items-center">
            
            {/* الـ Watermark (صورة JustV) - بيستخدم rtl/ltr عشان يشتغل صح */}
            <div className="absolute top-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.08] pointer-events-none ltr:left-0 rtl:right-0">
              <Image
                src="/JustV.png"
                alt=""
                fill
                className="object-contain"
                aria-hidden="true"
              />
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center text-start w-full">
              
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
                  {/* لينك الإيميل - inline-flex عشان ياخد مساحة المحتوى بس */}
                  <a
                    href={`mailto:${dict.contact.email}`}
                    className="group inline-flex items-center gap-3 text-white hover:text-valict-cyan transition-colors w-fit"
                    aria-label={`Send an email to ${dict.contact.email}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaEnvelope className="w-4 h-4 text-valict-cyan" />
                    </div>
                    <span className="text-sm md:text-base font-medium">{dict.contact.email}</span>
                  </a>
                  {/* لينك التليفون - inline-flex عشان ياخد مساحة المحتوى بس */}
                  <a
                    href={`tel:${dict.contact.phone}`}
                    className="group inline-flex items-center gap-3 text-white hover:text-valict-cyan transition-colors w-fit"
                    aria-label={`Call Valict support team at ${dict.contact.phone}`}
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-all">
                      <FaPhone className="w-4 h-4 text-valict-cyan" />
                    </div>
                    <span className="text-sm md:text-base font-medium" dir="ltr">{dict.contact.phone}</span>
                  </a>
                </div>
              </div>

              {/* 3. الزرار */}
              <div className="lg:col-span-3 flex justify-center lg:justify-end w-full">
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="group relative bg-white text-valict-navy text-center py-3 px-7 rounded-xl font-bold text-base md:text-lg shadow-lg hover:bg-valict-navy hover:text-white transition-all duration-300 inline-flex items-center justify-center gap-1.5 whitespace-nowrap overflow-hidden"
                >
                  {/* تأثير المراية - ديناميكي حسب اللغة */}
                  <span 
                    className="absolute top-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform transition-all duration-700 
                    ltr:left-[-100%] ltr:skew-x-[-20deg] ltr:group-hover:left-[100%] 
                    rtl:right-[-100%] rtl:skew-x-[20deg] rtl:group-hover:right-[100%]"
                  ></span>
                  
                  {/* النص */}
                  <span className="relative z-10">{dict.cta.button}</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
