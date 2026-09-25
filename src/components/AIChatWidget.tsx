"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  FaCommentDots,
  FaXmark,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa6";

interface AIChatWidgetProps {
  lang: string;
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

const MAX_INPUT_LENGTH = 1000;

export function AIChatWidget({ lang }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isAr = lang === "ar";

  // الترجمات memoized حسب اللغة
  const t = useMemo(
    () => ({
      title: isAr
        ? "فاليكتا | المساعد الذكي لـ فالكت"
        : "Valicta | Valict Smart Assistant",
      subtitle: isAr
        ? "خبير حلول تقنية المعلومات المتكاملة"
        : "Integrated IT Solutions Expert",
      status: isAr ? "متصل الآن" : "Online now",
      placeholder: isAr
        ? "اسأل فاليكتا عن خدماتنا وحلولنا التقنية..."
        : "Ask Valicta about our IT solutions & services...",
      thinking: isAr ? "فاليكتا تكتب الآن..." : "Valicta is typing...",
      clearChat: isAr ? "مسح المحادثة" : "Clear chat",
      clearConfirm: isAr
        ? "هل أنت متأكد من مسح المحادثة؟"
        : "Clear the conversation?",
      welcomePart1: isAr
        ? "مرحباً بك في فالكت! 👋\nأنا 'فاليكتا' مساعدتك الرقمية الذكية."
        : "Welcome to Valict! 👋\nI am 'Valicta', your smart digital assistant.",
      welcomePart2: isAr
        ? "كيف يمكنني دعم أعمالك اليوم؟"
        : "How can I support your business today?",
      errorMsg: isAr
        ? "عذراً، واجهت مشكلة في الاتصال بالسيرفر الذكي. يرجى المحاولة مرة أخرى لاحقاً."
        : "Sorry, I encountered an error connecting to the AI server. Please try again later.",
    }),
    [isAr]
  );

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // رسالة الترحيب تظهر بعد ثانية من فتح الشات (سطر بسطر)
  useEffect(() => {
    if (!isOpen) {
      // لما يقفل الشات، نرجع نجهز لفتح جديد
      setMessages([]);
      setShowWelcome(false);
      return;
    }

    if (messages.length > 0) return;

    let timer1: ReturnType<typeof setTimeout> | null = null;
    let timer2: ReturnType<typeof setTimeout> | null = null;
    let timer3: ReturnType<typeof setTimeout> | null = null;

    // 1) "فاليكتا بتكتب..." تظهر بعد 300ms
    timer1 = setTimeout(() => {
      setIsBotTyping(true);
    }, 300);

    // 2) الجزء الأول يظهر بعد 1300ms
    timer2 = setTimeout(() => {
      setIsBotTyping(false);
      setShowWelcome(true);
      setMessages([
        {
          id: crypto.randomUUID(),
          text: t.welcomePart1,
          isBot: true,
          timestamp: Date.now(),
        },
      ]);
    }, 1300);

    // 3) الجزء التاني يظهر بعد 2000ms
    timer3 = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: t.welcomePart2,
          isBot: true,
          timestamp: Date.now(),
        },
      ]);
    }, 2000);

    return () => {
      if (timer1) clearTimeout(timer1);
      if (timer2) clearTimeout(timer2);
      if (timer3) clearTimeout(timer3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, t.welcomePart1, t.welcomePart2]);

  // تفعيل الويدجت بعد أول تفاعل
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

  // التمرير التلقائي لآخر رسالة
  useEffect(() => {
    if (messages.length > 0 || isBotTyping || isLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping, isLoading]);

  // مسح المحادثة
  const handleClearChat = useCallback(() => {
    if (!confirm(t.clearConfirm)) return;
    setMessages([]);
    setShowWelcome(false);
    // إعادة تشغيل أنيميشن الترحيب
    setTimeout(() => setShowWelcome(true), 100);
  }, [t.clearConfirm]);

  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || isLoading) return;

      const userMsg: ChatMessage = {
        id: crypto.randomUUID(),
        text,
        isBot: false,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, lang }),
        });

        let finalReply = t.errorMsg;

        if (res.ok) {
          const data = await res.json().catch(() => null);
          finalReply = data?.reply || t.errorMsg;
        } else if (res.status === 429) {
          const data = await res.json().catch(() => null);
          finalReply =
            data?.reply ||
            (isAr
              ? "عدد الرسائل كبير، يرجى المحاولة بعد قليل."
              : "Too many messages, please try again shortly.");
        }

        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: finalReply,
            isBot: true,
            timestamp: Date.now(),
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch AI reply:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: crypto.randomUUID(),
            text: t.errorMsg,
            isBot: true,
            timestamp: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, lang, t.errorMsg, isAr]
  );

  // تنسيق الوقت
  const formatTime = (ts: number) => {
    const d = new Date(ts);
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  if (!isLoaded) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      {/* زر الفتح/الإغلاق */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t.title}
        className="relative h-12 w-12 flex items-center justify-center rounded-full bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-valict-navy dark:bg-valict-cyan opacity-40 animate-ping" />
        )}
        <span className="relative z-10">
          {isOpen ? (
            <FaXmark className="w-5 h-5" />
          ) : (
            <FaCommentDots className="w-5 h-5" />
          )}
        </span>
      </button>

      {/* نافذة الشات */}
      <div
        className={`absolute bottom-16 left-0 w-[350px] h-[480px] bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 origin-bottom-left overflow-hidden ${
          isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-75 opacity-0 invisible"
        }`}
      >
        {/* الهيدر الملون */}
        <div className="relative bg-gradient-to-r from-valict-navy to-blue-600 dark:from-[#0F172A] dark:to-blue-900 px-3 py-3 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center gap-2">
            {/* Avatar صغير */}
            <div className="relative w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-6 h-6"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="32"
                  cy="34"
                  r="20"
                  fill="#FFFFFF"
                  stroke="#00D2FF"
                  strokeWidth="2"
                />
                <rect x="18" y="24" width="28" height="16" rx="8" fill="#1E293B" />
                <path
                  d="M23 30C23 30 24 28 26 28C28 28 29 30 29 30"
                  stroke="#00D2FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M35 30C35 30 36 28 38 28C40 28 41 30 41 30"
                  stroke="#00D2FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M28 36C29 38 31 39 32 39C33 39 35 38 36 36"
                  stroke="#00D2FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-white animate-pulse" />
            </div>

            <div className="flex flex-col">
              <span className="text-white text-xs font-bold leading-tight">
                {isAr ? "فاليكتا" : "Valicta"}
              </span>
              <span className="text-white/70 text-[10px] leading-tight">
                {t.status}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {/* زر مسح المحادثة */}
            <button
              onClick={handleClearChat}
              aria-label={t.clearChat}
              title={t.clearChat}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FaTrash className="w-3.5 h-3.5" />
            </button>

            {/* زر الإغلاق */}
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <FaXmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* الرسائل */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-[#0F172A] scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200/80 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700">
          {messages.map((msg, idx) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${
                msg.isBot ? "justify-start" : "justify-end"
              }`}
              style={{
                animation: "msgFadeIn 0.4s ease-out",
                animationDelay: `${idx === 0 ? 0 : 0.1}s`,
              }}
            >
              {/* Avatar للبوت فقط */}
              {msg.isBot && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-valict-navy to-blue-600 flex items-center justify-center flex-shrink-0 mb-1">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="32"
                      cy="34"
                      r="20"
                      fill="#FFFFFF"
                      stroke="#00D2FF"
                      strokeWidth="2"
                    />
                    <rect
                      x="18"
                      y="24"
                      width="28"
                      height="16"
                      rx="8"
                      fill="#1E293B"
                    />
                    <path
                      d="M23 30C23 30 24 28 26 28C28 28 29 30 29 30"
                      stroke="#00D2FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M35 30C35 30 36 28 38 28C40 28 41 30 41 30"
                      stroke="#00D2FF"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M28 36C29 38 31 39 32 39C33 39 35 38 36 36"
                      stroke="#00D2FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              <div className={`flex flex-col ${msg.isBot ? "items-start" : "items-end"} max-w-[78%]`}>
                <div
                  className={`rounded-2xl px-3 py-2 text-xs leading-relaxed whitespace-pre-line ${
                    isAr ? "text-right" : "text-left"
                  } ${
                    msg.isBot
                      ? "bg-white dark:bg-[#1E293B] text-gray-800 dark:text-gray-200 rounded-bl-sm shadow-sm border border-gray-100 dark:border-gray-800/40"
                      : "bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] rounded-br-sm shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
                <span
                  className={`text-[9px] text-gray-400 dark:text-gray-500 mt-0.5 px-1 ${
                    isAr ? "self-start" : "self-end"
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* مؤشر الكتابة بثلاث نقط متحركة */}
          {(isLoading || isBotTyping) && (
            <div className="flex items-end gap-2 justify-start">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-valict-navy to-blue-600 flex items-center justify-center flex-shrink-0 mb-1">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32"
                    cy="34"
                    r="20"
                    fill="#FFFFFF"
                    stroke="#00D2FF"
                    strokeWidth="2"
                  />
                  <rect
                    x="18"
                    y="24"
                    width="28"
                    height="16"
                    rx="8"
                    fill="#1E293B"
                  />
                  <path
                    d="M23 30C23 30 24 28 26 28C28 28 29 30 29 30"
                    stroke="#00D2FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M35 30C35 30 36 28 38 28C40 28 41 30 41 30"
                    stroke="#00D2FF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 36C29 38 31 39 32 39C33 39 35 38 36 36"
                    stroke="#00D2FF"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="bg-white dark:bg-[#1E293B] rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-800/40 flex items-center gap-1">
                <span className="dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                <span className="dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                <span className="dot w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* نموذج الإدخال */}
        <form
          onSubmit={handleSendMessage}
          className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) =>
              setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))
            }
            disabled={isLoading}
            maxLength={MAX_INPUT_LENGTH}
            placeholder={t.placeholder}
            className={`flex-1 bg-gray-50 dark:bg-[#1E293B] border-none text-xs rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-valict-navy ${
              isAr ? "text-right" : "text-left"
            } disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="p-2 rounded-xl bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-all disabled:opacity-30"
          >
            <FaPaperPlane
              className={`w-3.5 h-3.5 transform ${isAr ? "rotate-180" : ""}`}
            />
          </button>
        </form>
      </div>

      {/* الأنيميشن المخصص */}
      <style jsx>{`
        @keyframes msgFadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .dot {
          animation: dotBounce 1.4s infinite ease-in-out;
        }

        .dot:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dot:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes dotBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
          30% {
            transform: translateY(-4px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
