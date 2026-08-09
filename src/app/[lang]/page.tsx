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
      
      {/* فاصل إضاءة */}
      <div className="w-full flex justify-center py-4 bg-transparent">
        <div className="w-3/4 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-valict-cyan,#22d3ee)]/40 to-transparent"></div>
      </div>
      
      <Services dict={dict} />
      
      {/* فاصل إضاءة */}
      <div className="w-full flex justify-center py-4 bg-transparent">
        <div className="w-3/4 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-valict-cyan,#22d3ee)]/40 to-transparent"></div>
      </div>
      
      <WhyUs dict={dict} />
      
      {/* فاصل إضاءة */}
      <div className="w-full flex justify-center py-4 bg-transparent">
        <div className="w-3/4 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-valict-cyan,#22d3ee)]/40 to-transparent"></div>
      </div>
      
      <HowItWorks dict={dict} />
      
      {/* فاصل إضاءة */}
      <div className="w-full flex justify-center py-4 bg-transparent">
        <div className="w-3/4 max-w-xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-valict-cyan,#22d3ee)]/40 to-transparent"></div>
      </div>
      
      <Contact dict={dict} />
      
      <Footer dict={dict} />
    </main>
  );
}
