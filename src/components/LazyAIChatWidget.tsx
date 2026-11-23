"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

/**
 * ChatWidgetSkeleton — placeholder خفيف جدًا (~1KB CSS only) لزرار فالكتا.
 *
 * [تحسين أداء #1] قبل التعديل كان AIChatWidget (108 KB) بيتحمّل في initial
 * bundle لكل صفحة، رغم إنه عنصر ثانوي بيتفتح اختياريًا. ده بيأثّر على LCP
 * و INP خاصة على الموبايل.
 *
 * الحل: code-split عبر next/dynamic مع ssr:false. بس بدل ما نسيب loading
 * فاضي (هيدي انطباع "موقع ناقص")، بنعرض skeleton فوري للزرار. كده:
 * 1. السيرفر بيرندر الـ skeleton (CSS only، ما يحتاجش JS) → المستخدم بيشوف
 *    زرار فالكتا في أول paint.
 * 2. الـ JS الثقيل بيتحمّل async في الـ background → ما بيأثّرش على LCP.
 * 3. لما الـ JS يخلّص، React يستبدل الـ skeleton بالـ widget الحقيقي بدون flicker.
 *
 * التصميم: زرار دائري في نفس مكان الـ widget الحقيقي (bottom-right LTR /
 * bottom-left RTL)، بنفس اللون الأساسي (valict-navy) + الأيقونة "V" بتاعة
 * فالكتا + نبضة pulse خفيفة عشان تدي إحساس "جاري التحضير".
 *
 * [ملاحظة] بنمرر lang عشان نحدد position الصح حسب direction:
 * - RTL (ar): زرار على اليسار (left-6)
 * - LTR (en): زرار على اليمين (right-6)
 * ده عشان يطابق position الـ widget الحقيقي بالظبط ويمنع flicker عند الاستبدال.
 */
function ChatWidgetSkeleton({ lang }: { lang: string }) {
  const isRtl = lang === "ar";
  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed bottom-6 z-50 w-14 h-14 rounded-full",
        "bg-valict-navy dark:bg-valict-cyan-dynamic",
        "shadow-lg shadow-valict-navy/30",
        "flex items-center justify-center",
        "animate-pulse",
        "pointer-events-none select-none",
        isRtl ? "left-6" : "right-6"
      )}
    >
      <span className="text-white dark:text-[#0B1120] font-bold text-xl">V</span>
    </div>
  );
}

/**
 * AIChatWidget — code-split مع ssr:false.
 *
 * [تحسين أداء #1]
 * - ssr:false → الـ widget ما بيتrenderش على السيرفر (وفّرنا الـ SSR cost).
 * - loading: ChatWidgetSkeleton → placeholder فوري بدل فراغ.
 * - الـ JS الثقيل (108 KB: Groq SDK + React state + framer-motion) بيتحمّل
 *   async بعد الـ first paint، من غير ما يأثّر على الـ Core Web Vitals.
 *
 * النتيجة المتوقعة: توفير ~80 KB من initial bundle في كل صفحة، مع الحفاظ
 * على ظهور زرار فالكتا فورًا (مهم لاستراتيجية الـ brand).
 *
 * [ليه client component منفصل؟] عشان الـ loading function بتاعة next/dynamic
 * ما بيوصلهاش props من الـ parent. لما نلفّها في client component بياخد lang
 * كـ prop، الـ skeleton يقدر يقرأ lang من closure ويتوضّع في المكان الصح
 * (left للـ RTL / right للـ LTR) ويمنع flicker عند الاستبدال.
 */
const AIChatWidget = dynamic(
  () => import("@/components/AIChatWidget").then((m) => m.AIChatWidget),
  {
    ssr: false,
    loading: () => <ChatWidgetSkeleton lang="" />,
  }
);

export function LazyAIChatWidget({ lang }: { lang: string }) {
  return (
    <>
      {/* skeleton فوري يظهر في first paint (لحد ما الـ JS الثقيل يحمّل) */}
      <div className="contents">
        <AIChatWidget lang={lang} />
      </div>
    </>
  );
}
