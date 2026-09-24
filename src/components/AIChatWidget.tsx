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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText, lang }),
      });

      const data = await res.json();
      let finalReply = data.reply;

      // إذا رجع رد عام ترحيبي أو تعليق، يتدخل عقل الواجهة الفوري لتعديل الرد حسب السؤال
      if (!finalReply || finalReply.includes("Welcome to Valict") || finalReply.includes("مرحباً بك")) {
        const lowerText = userText.toLowerCase().trim();
        
        if (isAr) {
          if (lowerText.includes("حلول") || lowerText.includes("خدمات") || lowerText.includes("تقدمونها")) {
            finalReply = "أهلاً بك! نحن في فالكت (Valict) نقدم حلولاً تقنية متكاملة تشمل: 1. إدارة وتطوير البنية التحتية لتقنية المعلومات. 2. خدمات الأمن السيبراني المتقدمة. 3. حلول الحوسبة السحابية والنقل الآمن للسحاب لضمان استمرارية أعمالك.";
          } else if (lowerText.includes("توقف") || lowerText.includes("مشكلة") || lowerText.includes("عطل") || lowerText.includes("أعطال")) {
            finalReply = "فالكت تساعدك في تقليل وقت التوقف عن العمل (Downtime) إلى الصفر من خلال تصميم بنية تحتية ذات توفر عالٍ (High Availability)، وتقديم خدمات النسخ الاحتياطي التلقائي والمراقبة الاستباقية للأنظمة على مدار الساعة.";
          } else {
            finalReply = "أهلاً بك في فالكت! شكراً لتواصلك معنا، نحن هنا لتقديم حلول البنية التحتية لتقنية المعلومات والخدمات السحابية المتكاملة لحماية أعمالك. كيف يمكنني مساعدتك اليوم؟";
          }
        } else {
          if (lowerText.includes("solution") || lowerText.includes("service") || lowerText.includes("provide") || lowerText.includes("offer")) {
            finalReply = "Welcome! At Valict, we provide comprehensive IT solutions including: 1. ICT Infrastructure management and development. 2. Advanced Cybersecurity services to secure your assets. 3. Scalable Cloud Computing solutions to ensure business continuity.";
          } else if (lowerText.includes("downtime") || lowerText.includes("frequent") || lowerText.includes("issue") || lowerText.includes("fail") || lowerText.includes("down")) {
            finalReply = "Valict helps you eliminate system downtime by implementing high-availability infrastructure architectures, continuous 24/7 network monitoring, and automated backup solutions to guarantee your business continuity.";
          } else {
            finalReply = "Welcome to Valict! Thank you for reaching out. We are here to support your business with integrated IT infrastructure and cloud solutions. How can I help you today?";
          }
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, text: finalReply, isBot: true },
      ]);

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
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
            {/* دائرة الصورة الشخصية (Avatar) لـ فاليكتا */}
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-sm bg-gray-100 flex-shrink-0">
              <img 
                src="https://unsplash.com" 
                alt="Valicta" 
                className="w-full h-full object-cover"
              />
              {/* نقطة الاتصال الخضراء الحية مدمجة فوق الصورة */}
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white dark:border-[#0F172A] animate-pulse"></span>
            </div>
            
            <div>
              <h3 className="font-bold text-sm tracking-wide">{translations.title}</h3>
              <p className="text-xs opacity-80 font-medium">{translations.subtitle}</p>
            </div>
          </div>
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
