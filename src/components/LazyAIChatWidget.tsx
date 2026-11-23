"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

/**
 * ChatWidgetSkeleton — نسخة طبق الأصل من زرار فالكتا (الحالة المقفولة).
 *
 * [إصلاح] النسخة السابقة من الـ skeleton كانت فيها غلطتين:
 * 1. كانت بتتوضّع حسب اللغة (isRtl ? left-6 : right-6) بينما الزرار الحقيقي
 *    (AIChatWidget.tsx سطر 326) ثابت دائمًا في fixed bottom-6 left-6 في كل
 *    اللغات. نتيجة ده: في صفحات en الـ skeleton كان بيظهر في اليمين فوق
 *    زرار ScrollToTop (fixed bottom-6 right-6) لحد ما الـ widget يحمّل.
 * 2. كانت شكلها مختلف تمامًا عن الزرار الحقيقي (حرف V على خلفية navy،
 *    بينما الحقيقي صورة valicta.webp على خلفية بيضاء بـ border) → jump واضح
 *    عند الاستبدال.
 *
 * الحل: الـ skeleton بقى نسخة طبق الأصل من الزرار الحقيقي — نفس المكان
 * (bottom-6 left-6)، نفس الحجم (h-14 w-14)، نفس الألوان (bg-white +
 * border)، نفس صورة فالكتا، ونفس نبضة الـ ping. كده الانتقال من الـ
 * skeleton للزرار الحقيقي invisible تمامًا — مفيش لا flicker ولا jump.
 *
 * ملاحظات:
 * - ما بقيناش محتاجين lang في الـ skeleton خالص (المكان ثابت) → المشكلة
 *   الأصلية بتاعة "loading function ما بيوصلهاش props" اتحلّت بالجذر.
 * - الصورة بـ priority عشان تتحمّل فورًا في الـ first paint وتقعد في الـ
 *   browser cache — فلما الزرار الحقيقي يرندر، الصورة جاهزة على طول.
 * - pointer-events-none عشان المستخدم ما يقدرش يدوس على الـ skeleton —
 *   أول ما الـ JS يخلّص بيتستبدل بالزرار الحقيقي الـ clickable.
 */
function ChatWidgetSkeleton() {
  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <div
        aria-hidden="true"
        className="relative h-14 w-14 flex items-center justify-center rounded-full bg-white dark:bg-[#0F172A] shadow-lg border-2 border-valict-navy/20 dark:border-valict-cyan/30 pointer-events-none"
      >
        {/* نفس نبضة الـ ping اللي في الزرار الحقيقي (الحالة المقفولة) */}
        <span className="absolute inset-0 rounded-full bg-valict-cyan opacity-20 animate-ping" />
        <span className="relative z-10 flex items-center justify-center w-full h-full rounded-full overflow-hidden">
          <Image
            src="/valicta.webp"
            alt=""
            width={50}
            height={50}
            className="object-contain scale-110"
            priority
            sizes="50px"
          />
        </span>
      </div>
    </div>
  );
}

/**
 * AIChatWidget — code-split مع ssr:false.
 *
 * [تحسين أداء]
 * - ssr:false → الـ widget نفسه ما بيتعملهوش SSR.
 * - loading: ChatWidgetSkeleton → placeholder فوري مطابق للزرار الحقيقي.
 * - الـ JS الثقيل (AIChatWidget كامل: state + fetch logic) بيتحمّل async
 *   بعد الـ first paint من غير ما يأثّر على الـ Core Web Vitals.
 *
 * [ملاحظة Next.js 16] ssr:false مسموح بس جوّه Client Components — وده
 * client component ("use client" فوق) فالـ pattern ده سليم حسب الـ docs.
 */
const AIChatWidget = dynamic(
  () => import("@/components/AIChatWidget").then((m) => m.AIChatWidget),
  {
    ssr: false,
    loading: () => <ChatWidgetSkeleton />,
  }
);

export function LazyAIChatWidget({ lang }: { lang: string }) {
  return <AIChatWidget lang={lang} />;
}
