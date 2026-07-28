import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa6";

interface ContactProps {
  dict: any;
}

export function Contact({ dict }: ContactProps) {
  return (
    <section id="contact" className="transition-colors duration-300">
      <div className="w-full bg-valict-navy shadow-2xl">
        <div className="max-w-7xl mx-auto relative px-6  py-20 overflow-hidden ">
 

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
              <div className="mt-4 text-center">
                <a
                  href={`mailto:${dict.contact.email}`}
                  className="block text-white/80 hover:text-white mb-2 font-medium transition-colors"
                >
                  <FaEnvelope className="inline-block w-5 h-5 mr-2 text-valict-cyan rtl:ml-2 rtl:mr-0" />
                  {dict.contact.email}
                </a>
                <a
                  href={`tel:${dict.contact.phone}`}
                  className="block text-white/80 hover:text-white font-medium transition-colors"
                >
                  <FaPhone className="inline-block w-5 h-5 mr-2 text-valict-cyan rtl:ml-2 rtl:mr-0" />
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
