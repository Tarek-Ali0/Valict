import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

interface ContactProps {
  dict: any;
}

export function Contact({ dict }: ContactProps) {
  return (
    <section id="contact" className="transition-colors duration-300">
      <div className="w-full bg-valict-navy shadow-2xl">
        <div className="max-w-7xl mx-auto relative px-6 py-20 overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 text-start">
            <div className="lg:w-2/3">
              <h2 className="text-3xl text-start md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {dict.cta.headline}
              </h2>
              <p className="text-blue-100 text-start text-xl font-light">
                {dict.cta.sub}
              </p>
            </div>
            <div className="lg:w-1/3 flex flex-col gap-4 w-full">
              <a
                href={`mailto:${dict.contact.email}`}
                className="bg-white dark:bg-slate-900 text-valict-navy dark:text-white text-center py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-valict-cyan hover:text-valict-dark transition-all duration-300 transform hover:-translate-y-1"
              >
                {dict.cta.button}
              </a>
              <div className="mt-4 flex flex-col items-start gap-2.5 w-full">
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white font-medium transition-colors group rtl:flex-row-reverse"
                >
                  <FaEnvelope className="w-5 h-5 text-valict-cyan shrink-0" />
                  <span>{dict.contact.email}</span>
                </a>
                <a
                  href={`tel:${dict.contact.phone}`}
                  className="flex items-center gap-3 text-white/80 hover:text-white font-medium transition-colors group rtl:flex-row-reverse"
                >
                  <FaPhone className="w-5 h-5 text-valict-cyan shrink-0" />
                  <span dir="ltr">{dict.contact.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
