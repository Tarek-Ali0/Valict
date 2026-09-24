"use client";

import { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaXmark, FaPaperPlane } from "react-icons/fa6";

interface AIChatWidgetProps {
  lang: string;
}

export function AIChatWidget({ lang }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // النصوص حسب لغة الصفحة
  const isAr = lang === "ar";
  const translations = {
    title: isAr ? "الدعم الفني للمنصة" : "Platform Technical Support",
    subtitle: isAr ? "بوت ذكي متصل بـ فالكت" : "Smart Bot connected to Valict",
    placeholder: isAr ? "اكتب رسالتك هنا..." : "Type your message here...",
    welcome: isAr 
      ? "مرحباً بك في فالكت للحلول السحابية وتقنية المعلومات! كيف يمكنني مساعدتك اليوم؟" 
      : "Welcome to Valict for Cloud & IT Solutions! How can I help you today?",
    fallbackResponse: isAr
      ? "شكراً لتواصلك معنا. نحن نقوم حالياً بمعالجة استفسارك، أو يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني الخاص بشركتنا."
      : "Thank you for contacting us. We are currently processing your inquiry, or you can email us directly.",
  };

  const [messages, setMessages] = useState([
    { id: 1, text: translations.welcome, isBot: true }
  ]);

  // تأخير تفعيل المكون تماماً لحين تفاعل المستخدم لحماية الأداء
  useEffect(() => {
    const enableWidget = () => {
      setIsLoaded(true);
      window.removeEventListener("scroll", enableWidget);
      window.removeEventListener("mousemove", enableWidget);
    };

    window.addEventListener("scroll", enableWidget, { passive: true });
    window.addEventListener("mousemove", enableWidget, { passive: true });

    return () => {
      window.removeEventListener("scroll", enableWidget);
      window.removeEventListener("mousemove", enableWidget);
    };
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!isLoaded) return null;

  // دالة ذكية مبسطة للرد بناءً على الكلمات المفتاحية واللغة
  const getSmartResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    if (isAr) {
      if (lowerText.includes("حلول") || lowerText.includes("خدمات") || lowerText.includes("تقدمونها")) {
        return "نحن في فالكت نقدم حلولاً متكاملة تشمل: 1. إدارة البنية التحتية لتقنية المعلومات، 2. الحوسبة السحابية والنقل الآمن للسحاب، 3. الأمن السيبراني المتقدم لحماية أصولك الرقمية.";
      }
      if (lowerText.includes("سحاب") || lowerText.includes("كلاود")) {
        return "الحلول السحابية لدينا تركز على تصميم بيئات هجينة (Hybrid Cloud)، والنسخ الاحتياطي التلقائي، وضمان استمرارية الأعمال دون انقطاع.";
      }
      return translations.fallbackResponse;
    } else {
      if (lowerText.includes("solutions") || lowerText.includes("services") || lowerText.includes("offer") || lowerText.includes("provide")) {
        return "At Valict, we provide comprehensive solutions including: 1. Managed IT Services, 2. Network & Infrastructure, 3. Scalable Cloud Solutions, and 4. Advanced Cybersecurity.";
      }
      if (lowerText.includes("cloud")) {
        return "Our cloud solutions focus on Hybrid Cloud setups, automated backup, high availability, and optimizing your monthly infrastructure costs.";
      }
      return translations.fallbackResponse;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const currentInput = input;
    setInput("");

    // تشغيل الرد التلقائي الفوري بناءً على سؤالك
    setTimeout(() => {
      const replyText = getSmartResponse(currentInput);
      const botMsg = {
        id: Date.now() + 1,
        text: replyText,
        isBot: true
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800); // الرد سيظهر فوراً بعد أقل من ثانية
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Smart Support"
        className="h-12 w-12 flex items-center justify-center rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        {isOpen ? <FaXmark className="w-5 h-5" /> : <FaCommentDots className="w-5 h-5" />}
      </button>

      <div
        className={`absolute bottom-16 left-0 w-[350px] h-[450px] bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left ${
          isOpen ? "scale-100 opacity-100 visible" : "scale-75 opacity-0 invisible"
        }`}
      >
        <div className="bg-valict-navy dark:bg-valict-cyan p-4 text-white dark:text-[#0B1120] flex items-center justify-between">
          <div className={isAr ? "text-right" : "text-left"}>
            <h3 className="font-bold text-sm">{translations.title}</h3>
            <p className="text-xs opacity-80">{translations.subtitle}</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#0B1120]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${isAr ? "text-right" : "text-left"} ${
                  msg.isBot
                    ? "bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm"
                    : "bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] rounded-br-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={translations.placeholder}
            className={`flex-1 bg-gray-50 dark:bg-[#1E293B] border-none text-xs rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-valict-navy ${isAr ? "text-right" : "text-left"}`}
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#1E293B] text-valict-navy dark:text-valict-cyan hover:bg-valict-navy hover:text-white dark:hover:bg-valict-cyan dark:hover:text-[#0B1120] transition-colors"
          >
            <FaPaperPlane className={`w-3.5 h-3.5 transform ${isAr ? "rotate-180" : ""}`} />
          </button>
        </form>
      </div>
    </div>
  );
}
