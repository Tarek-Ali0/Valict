import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import dynamic from "next/dynamic";

// 1. حل مشكلة Network dependency tree: تحميل المكونات مع عزل كامل لحزم الجافا سكريبت والأيقونات الخاصة بها
const Services = dynamic(() => import("@/components/Services").then((mod) => mod.Services), {
  ssr: true,
  loading: () => <div className="min-h-[400px] bg-slate-50 dark:bg-[#0B1120] animate-pulse" /> // مساحة محجوزة تمنع تشتت المتصفح أثناء البناء
});

const WhyUs = dynamic(() => import("@/components/WhyUs").then((mod) => mod.WhyUs), {
  ssr: true,
});

const HowItWorks = dynamic(() => import("@/components/HowItWorks").then((mod) => mod.HowItWorks), {
  ssr: true,
});

const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact), {
  ssr: true,
});

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <main className="w-full selection:bg-valict-cyan selection:text-valict-navy transition-colors duration-300">
      <Navbar lang={lang} dict={dict} />
      
      {/* المكونات الرئيسية العلوية تظل ثابتة لتحميل أسرع (LCP) */}
      <Hero dict={dict} />
      
      {/* المكونات السفلية المحملة ديناميكياً بذكاء لتفتيت شجرة الاعتماديات */}
      <Services dict={dict} lang={lang} />
      
      <WhyUs dict={dict} />
      
      <HowItWorks dict={dict} />
      
      <Contact dict={dict} />
    </main>
  );
}
