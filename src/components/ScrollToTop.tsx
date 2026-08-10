"use client";

import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // مراقبة حركة التمرير في الصفحة
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // دالة الصعود لأعلى الصفحة بسلاسة
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none"
        >
          <FaArrowUp className="w-4 h-4" />
        </button>
      )}
    </>
  );
}
