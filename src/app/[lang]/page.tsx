import { getDictionary } from "@/lib/dictionaries";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyUs } from "@/components/WhyUs";
import { HowItWorks } from "@/components/HowItWorks";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default async function Home({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;
  const dict = await getDictionary(lang);

  return (
    <main className="w-full selection:bg-valict-cyan selection:text-valict-navy transition-colors duration-300">
      <Navbar lang={lang} dict={dict} />
      
      <Hero dict={dict} />
      
      <Services dict={dict} />
      
      <WhyUs dict={dict} />
      
      <HowItWorks dict={dict} />
      
      <Contact dict={dict} />
      
      <Footer dict={dict} />
    </main>
  );
}

