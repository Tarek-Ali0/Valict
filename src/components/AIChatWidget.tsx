"use client";

import { useState, useEffect, useRef } from "react";
import { FaCommentDots, FaXmark, FaPaperPlane } from "react-icons/fa6";

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // مصفوفة تجريبية للرسائل الافتراضية للـ AI
  const [messages, setMessages] = useState([
    { id: 1, text: "مرحباً بك في فالكت للحلول السحابية! كيف يمكنني مساعدتك اليوم؟", isBot: true }
  ]);

  // تأخير تفعيل المكون تماماً لحين تفاعل المستخدم (سر الأداء الفائق 100%)
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

  // نزول الشات تلقائياً لآخر رسالة
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  if (!isLoaded) return null; // لا يتم تحميل أي كود أو عنصر في الـ DOM حتى يتحرك الزائر

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // إضافة رسالة المستخدم
    const userMsg = { id: Date.now(), text: input, isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // محاكاة رد الذكاء الاصطناعي (يمكنك ربطه لاحقاً بـ API الخاص بك)
    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: "شكراً لتواصلك مع فالكت. نحن نقوم حالياً بمعالجة استفسارك حول الأنظمة السحابية.",
        isBot: true
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* زر فتح وإغلاق الشات الثابت في اليسار */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="الدعم الذكي"
        className="h-12 w-12 flex items-center justify-center rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        {isOpen ? <FaXmark className="w-5 h-5" /> : <FaCommentDots className="w-5 h-5" />}
      </button>

      {/* نافذة الشات المنبثقة (تظهر وتختفي بسلاسة) */}
      <div
        className={`absolute bottom-16 left-0 w-[350px] h-[450px] bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-left ${
          isOpen ? "scale-100 opacity-100 visible" : "scale-75 opacity-0 invisible"
        }`}
      >
        {/* رأس النافذة (Header) */}
        <div className="bg-valict-navy dark:bg-valict-cyan p-4 text-white dark:text-[#0B1120] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm">الدعم الفني للمنصة</h3>
            <p className="text-xs opacity-80">بوت ذكي متصل بـ فالكت</p>
          </div>
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
        </div>

        {/* منطقة الرسائل (Messages Body) */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-[#0B1120]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 text-xs leading-relaxed ${
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

        {/* صندوق الإدخال (Input Form) */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب رسالتك هنا..."
            className="flex-1 bg-gray-50 dark:bg-[#1E293B] border-none text-xs rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-valict-navy"
          />
          <button
            type="submit"
            className="p-2 rounded-xl bg-gray-100 dark:bg-[#1E293B] text-valict-navy dark:text-valict-cyan hover:bg-valict-navy hover:text-white dark:hover:bg-valict-cyan dark:hover:text-[#0B1120] transition-colors"
          >
            <FaPaperPlane className="w-3.5 h-3.5 transform rotate-180" />
          </button>
        </form>
      </div>
    </div>
  );
}
