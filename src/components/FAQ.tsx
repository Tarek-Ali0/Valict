"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa6";

interface FAQProps {
  dict: any;
  lang: string;
}

export function FAQ({ dict, lang }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const isRTL = lang === "ar";

  return (
    <section className="bg-white dark:bg-slate-900 py-8 md:py-12 transition-colors duration-300">
      {/* تم تغيير max-w-4xl إلى max-w-6xl ليكون بعرض صفحة "من نحن" */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card */}
        <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
          
          {/* Blob داخلي في الزاوية */}
          <div
            className={`absolute -top-20 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full blur-3xl pointer-events-none bg-valict-cyan/20 dark:bg-valict-cyan/15 ${
              isRTL ? "-right-20" : "-left-20"
            }`}
          ></div>

          {/* المحتوى فوق الـ blob */}
          <div className="relative z-10">
            
            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-cyan-600 dark:text-cyan-400 font-black text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 flex items-center justify-center gap-2">
                <span className="w-8 h-[2px] bg-cyan-600 dark:bg-cyan-400 inline-block rounded-full"></span>
                {dict.faq.subtitle}
                <span className="w-8 h-[2px] bg-cyan-600 dark:bg-cyan-400 inline-block rounded-full"></span>
              </h2>
              <h3 className="text-3xl md:text-5xl font-bold text-valict-navy dark:text-white tracking-tight">
                {dict.faq.title}
              </h3>
            </div>

            {/* Categories */}
            <div className="space-y-10">
              {dict.faq.categories.map((category: any, catIndex: number) => (
                <div key={catIndex}>
                  <h4 className="text-xl md:text-2xl font-bold text-valict-navy dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-valict-cyan"></span>
                    {category.title}
                  </h4>
                  
                  <div className="space-y-4">
                    {category.items.map((item: any, itemIndex: number) => {
                      const uniqueId = `${catIndex}-${itemIndex}`;
                      const isOpen = openIndex === uniqueId;

                      return (
                        <div 
                          key={uniqueId} 
                          className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors duration-300 hover:border-valict-cyan/30 dark:hover:border-valict-cyan/30"
                        >
                          <button
                            onClick={() => toggleItem(uniqueId)}
                            className="w-full flex items-center justify-between p-5 md:p-6 text-start focus:outline-none"
                          >
                            <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base pe-4">
                              {item.q}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="flex-shrink-0 w-8 h-8 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center text-valict-navy dark:text-valict-cyan shadow-sm"
                            >
                              <FaChevronDown className="w-3 h-3" />
                            </motion.div>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                              >
                                <div className="px-5 md:px-6 pb-5 md:pb-6 text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed border-t border-slate-200 dark:border-slate-700/50 pt-4">
                                  {item.a}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}
