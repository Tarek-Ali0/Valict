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
    
    // تقسيم الرسالة الترحيبية على أسطر مريحة للعين ومبسطة جداً كما طلبت
    welcome: isAr 
      ? "مرحباً بك في فالكت! 👋\nأنا 'فاليكتا' مساعدتك الرقمية الذكية.\n\nيسعدني مساعدتك في استفسارات:\n• إدارة البنية التحتية وIT 🌐\n• خدمات الأمن السيبراني 🛡️\n• حلول الحوسبة السحابية ☁️\n\nكيف يمكنني دعم أعمالك اليوم؟" 
      : "Welcome to Valict! 👋\nI am 'Valicta', your smart digital assistant.\n\nHow can I help you today with:\n• IT Infrastructure 🌐\n• Cybersecurity Services 🛡️\n• Cloud Computing Solutions ☁️",

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

  // يعمل التمرير التلقائي لأسفل فقط عند إرسال رسائل جديدة وليس عند فتح البوت لأول مرة لكي يرى الزائر الترحيب كاملاً
  useEffect(() => {
    if (messages.length > 1 || isLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  if (!isLoaded) return null;

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    const userMsg = { id: Date.now(), text: userText, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true); // تفعيل مؤشر التحميل أثناء انتظار السيرفر

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
      {/* زر الشات الدائري الخارجي مع تأثير النبض الاحترافي الجاذب للانتباه */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Smart Support"
        className="relative h-12 w-12 flex items-center justify-center rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-valict-navy dark:bg-valict-cyan opacity-40 animate-ping"></span>
        )}
        <span className="relative z-10">
          {isOpen ? <FaXmark className="w-5 h-5" /> : <FaCommentDots className="w-5 h-5" />}
        </span>
      </button>

      <div
        className={`absolute bottom-16 left-0 w-[350px] h-[480px] bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 origin-bottom-left ${
          isOpen ? "scale-100 opacity-100 visible" : "scale-75 opacity-0 invisible"
        } overflow-visible`} // إلغاء أي قص علوي أو سفلي للسماح بانحناء الحواف بالكامل
      >
        {/* شريط التصفح (Header) الرفيع المضاف إليه كلاس rounded-t-2xl لتلتف الحواف العلوية بنعومة */}
        <div className="bg-valict-navy dark:bg-valict-cyan p-2.5 text-white dark:text-[#0B1120] flex items-center justify-between border-b border-white/10 relative rounded-t-2xl">
          <div className={`flex items-center gap-3 ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}>
            
            {/* الأفاتار المنبثق والخارج للأعلى متجاوزاً حدود الصندوق بشكل ثلاثي الأبعاد */}
            <div className="relative -top-5 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white dark:border-[#0F172A] bg-gray-900 shadow-xl flex-shrink-0 z-20">
              <svg className="w-8 h-8" viewBox="0 0 64 64" fill="none" xmlns="http://w3.org">
                <circle cx="32" cy="34" r="20" fill="#FFFFFF" stroke="#00D2FF" strokeWidth="2"/>
                <rect x="18" y="24" width="28" height="16" rx="8" fill="#1E293B"/>
                <path d="M23 30C23 30 24 28 26 28C28 28 29 30 29 30" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M35 30C35 30 36 28 38 28C40 28 41 30 41 30" stroke="#00D2FF" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M28 36C29 38 31 39 32 39C33 39 35 38 36 36" stroke="#00D2FF" strokeWidth="2" strokeLinecap="round"/>
                <path d="M14 26L8 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="7" cy="14" r="2" fill="#00D2FF"/>
                <path d="M48 26L54 16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="55" cy="14" r="2" fill="#00D2FF"/>
              </svg>
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-white dark:border-[#0F172A] animate-pulse"></span>
            </div>
            
            <div className={isAr ? "text-right" : "text-left"}>
              <h3 className="font-bold text-xs tracking-wide">{translations.title}</h3>
              <p className="text-[10px] opacity-75 font-medium">{translations.subtitle}</p>
            </div>
          </div>
        </div>

        {/* صندوق الرسائل المطور والمعدل بالكامل لترتيب المحتوى منطقياً */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#0B1120]">
          
          {/* 1. عرض الرسائل الحية (بما فيها الرسالة الترحيبية والتعريف أولاً في المقدمة) */}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed whitespace-pre-line ${isAr ? "text-right" : "text-left"} ${
                  msg.isBot
                    ? "bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200 rounded-bl-none shadow-sm"
                    : "bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] rounded-br-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* 2. قسم الاستفسارات الشائعة ينزل هنا بالأسفل تحت الترحيب والتعريف بالظبط وببطاقات أنيقة جداً */}
          {messages.length <= 1 && (
            <div className="space-y-2 mt-4 pt-2 border-t border-gray-200/50 dark:border-gray-800/50">
              <div className={`text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 ${isAr ? "text-right" : "text-left"}`}>
                {isAr ? "استفسارات شائعة" : "Common Inquiries"}
              </div>
              
              <button 
                onClick={() => setInput(isAr ? "ما هي خدمات شركة فالكت؟" : "What solutions do you offer?")}
                className={`w-full p-2.5 text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all font-medium flex items-center justify-between ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}
              >
                <span>{isAr ? "خدمات وحلول شركة فالكت" : "Valict Solutions & Services"}</span>
                <span className="text-gray-400 text-xs">→</span>
              </button>
              
              <button 
                onClick={() => setInput(isAr ? "كيف تحمون الأنظمة من الاختراق؟" : "How do you protect systems?")}
                className={`w-full p-2.5 text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all font-medium flex items-center justify-between ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}
              >
                <span>{isAr ? "خدمات الأمن السيبراني المتقدمة" : "Advanced Cybersecurity"}</span>
                <span className="text-gray-400 text-xs">→</span>
              </button>
              
              <button 
                onClick={() => setInput(isAr ? "كيف تعالجون مشكلة توقف السيرفرات؟" : "How do you eliminate downtime?")}
                className={`w-full p-2.5 text-xs text-gray-700 dark:text-gray-300 bg-white dark:bg-[#1E293B] hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all font-medium flex items-center justify-between ${isAr ? "flex-row-reverse text-right" : "flex-row text-left"}`}
              >
                <span>{isAr ? "حلول توقف النظام (Downtime)" : "System Downtime Solutions"}</span>
                <span className="text-gray-400 text-xs">→</span>
              </button>
            </div>
          )}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-2xl p-3 text-xs bg-white dark:bg-[#1E293B] text-gray-500 dark:text-gray-400 rounded-bl-none shadow-sm animate-pulse">
                {translations.thinking}
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* نموذج الإدخال (Form) المضاف إليه كلاس rounded-b-2xl ليلتف ويتطابق مع حواف قاعدة الشات الدائرية تماماً */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex gap-2 rounded-b-2xl">
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
