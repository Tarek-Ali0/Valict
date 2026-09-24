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
  const [isLoading, setIsLoading] = useState(false); // حالة لمعرفة إذا كان البوت يفكر ويحمل الرد
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isAr = lang === "ar";
  const translations = {
    title: isAr ? "فاليكتا | المساعد الذكي لـ فالكت" : "Valicta | Valict Smart Assistant",
    subtitle: isAr ? "خبير حلول تقنية المعلومات المتكاملة" : "Integrated IT Solutions Expert",
    placeholder: isAr ? "اسأل فاليكتا عن خدماتنا وحلولنا التقنية..." : "Ask Valicta about our IT solutions & services...",
    thinking: isAr ? "فاليكتا تكتب الآن..." : "Valicta is typing...",
    
    // 2. تحديث الرسالة الترحيبية باسم فاليكتا
    welcome: isAr 
      ? "مرحباً بك! أنا 'فاليكتا' مساعدتك الرقمية الذكية في فالكت. 🤖☁️ يسعدني جداً إجابتك على أي استفسار يخص حلول وإدارة تقنية المعلومات، البنية التحتية، الحوسبة السحابية، أو خدمات الأمن السيبراني المتقدمة لتطوير وحماية أعمالك. كيف يمكنني مساعدتك اليوم؟" 
      : "Welcome! I am 'Valicta', your smart digital assistant at Valict. 🤖☁️ I'm here to assist you with any inquiries regarding IT solutions & management, infrastructure, cloud computing, or advanced cybersecurity services to empower and secure your business. How can I help you today?",
    
    errorMsg: isAr
      ? "عذراً، واجهت مشكلة في الاتصال بالسيرفر الذكي. يرجى المحاولة مرة أخرى لاحقاً."
      : "Sorry, I encountered an error connecting to the AI server. Please try again later.",
  };

  const [messages, setMessages] = useState([
    { id: 1, text: translations.welcome, isBot: true }
  ]);

  // تفعيل المكون الذكي بعد أول تفاعل لحماية سرعة وأداء الـ PageSpeed 
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
  }, [messages, isOpen, isLoading]);

  if (!isLoaded) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMsg = { id: Date.now(), text: userText, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true); // تفعيل مؤشر التحميل أثناء انتظار جوجل Gemini

    try {
      // إرسال الرسالة واللغة الحالية للمسار الخلفي بأمان
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userText, lang }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, text: data.reply, isBot: true },
        ]);
      } else {
        throw new Error("No reply received");
      }
    } catch (error) {
      console.error("Failed to fetch AI reply:", error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: translations.errorMsg, isBot: true },
      ]);
    } finally {
      setIsLoading(false); // إغلاق مؤشر التحميل فور رجوع الرد
    }
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

          {/* تأثير لودينج "جاري الكتابة" يظهر أثناء معالجة الذكاء الاصطناعي للرد */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-3 text-xs bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 rounded-bl-none shadow-sm animate-pulse">
                {translations.thinking}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder={translations.placeholder}
            className={`flex-1 bg-gray-50 dark:bg-[#1E293B] border-none text-xs rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-valict-navy ${isAr ? "text-right" : "text-left"} disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#1E293B] text-valict-navy dark:text-valict-cyan hover:bg-valict-navy hover:text-white dark:hover:bg-valict-cyan dark:hover:text-[#0B1120] transition-colors disabled:opacity-30"
          >
            <FaPaperPlane className={`w-3.5 h-3.5 transform ${isAr ? "rotate-180" : ""}`} />
          </button>
        </form>
      </div>
    </div>
  );
}
