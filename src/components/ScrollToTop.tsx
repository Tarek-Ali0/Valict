"use client";

import { useState, useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  // تحديد نوع الـ Ref ليكون متوافقاً مع مسارات الـ SVG في TypeScript
  const pathRef = useRef<SVGPathElement>(null);
  const pathLengthRef = useRef<number>(0);

  useEffect(() => {
    // 1. حساب طول محيط الدائرة مرة واحدة فقط عند تحميل المكون
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathLengthRef.current = length;
      pathRef.current.style.strokeDasharray = `${length} ${length}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }

    const handleScroll = () => {
      const scroll = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;

      // 2. تحديث رسمة الدائرة برمجياً مباشرة (تجنب الـ Re-render للمحافظة على الأداء الفائق)
      if (pathRef.current && height > 0) {
        const progress = pathLengthRef.current - (scroll * pathLengthRef.current) / height;
        pathRef.current.style.strokeDashoffset = `${progress}`;
      }

      // 3. إظهار أو إخفاء الزرار
      if (scroll > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 h-11 w-11 flex items-center justify-center rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* دائرة التحميل SVG المحيطة بالسهم */}
      <svg
        className="absolute top-0 left-0 w-full h-full transform -rotate-90 p-[2px]"
        viewBox="-1 -1 102 102"
      >
        <path
          ref={pathRef}
          d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="transition-[stroke-dashoffset] duration-75 ease-linear"
        />
      </svg>

      {/* أيقونة السهم الحالية كما هي */}
      <FaArrowUp className="w-4 h-4 relative z-10" />
    </button>
  );
}
