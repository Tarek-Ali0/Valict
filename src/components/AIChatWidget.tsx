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

/**
 * شخصية فاليكتا (SVG)
 */
function ValictaAvatar({
  size = 48,
  variant = "full",
}: {
  size?: number;
  variant?: "full" | "compact";
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Valicta"
    >
      <circle cx="50" cy="50" r="48" fill="url(#bgGradient)" />
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke="#00D2FF"
        strokeOpacity="0.4"
        strokeWidth="1"
      />
      <rect
        x="22"
        y="28"
        width="56"
        height="44"
        rx="14"
        fill="#0B1120"
        stroke="#00D2FF"
        strokeWidth="1.5"
      />
      <path
        d="M38 42 L50 58 L62 42"
        stroke="#00D2FF"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M42 42 L50 52 L58 42"
        stroke="#00D2FF"
        strokeOpacity="0.4"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="50"
        y1="28"
        x2="50"
        y2="16"
        stroke="#00D2FF"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="50" cy="14" r="3" fill="#22C55E">
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      {variant === "full" && (
        <>
          <rect
            x="38"
            y="74"
            width="24"
            height="6"
            rx="3"
            fill="#0B1120"
            stroke="#00D2FF"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
          <circle cx="44" cy="77" r="1" fill="#00D2FF" />
          <circle cx="50" cy="77" r="1" fill="#22C55E" />
          <circle cx="56" cy="77" r="1" fill="#00D2FF" />
        </>
      )}
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1E3A5F" />
          <stop offset="100%" stopColor="#0B1120" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function AIChatWidget({ lang }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isAr = lang === "ar";

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

  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      return;
    }

    if (messages.length > 0) return;

    const timer1 = setTimeout(() => {
      setIsBotTyping(true);
    }, 300);

    const timer2 = setTimeout(() => {
      setIsBotTyping(false);
      setMessages([
        {
          id: crypto.randomUUID(),
          text: t.welcomePart1,
          isBot: true,
          timestamp: Date.now(),
        },
      ]);
    }, 1300);

    const timer3 = setTimeout(() => {
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
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, t.welcomePart1, t.welcomePart2]);

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
    if (messages.length > 0 || isBotTyping || isLoading) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isBotTyping, isLoading]);

  const handleClearChat = useCallback(() => {
    if (!confirm(t.clearConfirm)) return;
    setMessages([]);
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
        className="relative h-14 w-14 flex items-center justify-center rounded-full bg-white dark:bg-[#0F172A] shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 border-valict-navy/20 dark:border-valict-cyan/30 overflow-hidden"
      >
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-valict-cyan opacity-20 animate-ping" />
        )}
        <span className="relative z-10 flex items-center justify-center">
          {isOpen ? (
            <FaXmark className="w-5 h-5 text-valict-navy dark:text-valict-cyan" />
          ) : (
            <ValictaAvatar size={48} variant="compact" />
          )}
        </span>
      </button>

      {/* نافذة الشات */}
      <div
        className={`absolute bottom-20 left-0 w-[350px] h-[500px] bg-white dark:bg-[#0F172A] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 origin-bottom-left ${
          isOpen
            ? "scale-100 opacity-100 visible"
            : "scale-75 opacity-0 invisible"
        }`}
      >
        {/* الهيدر مع الـ Avatar المنبثق */}
        <div className="relative bg-gradient-to-r from-valict-navy to-blue-600 dark:from-[#0F172A] dark:to-blue-900 rounded-t-2xl pt-12 pb-3 px-3">
          {/* Avatar المنبثق فوق الهيدر */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-10 w-20 h-20 rounded-full bg-white dark:bg-[#0F172A] border-4 border-white dark:border-[#0F172A] shadow-2xl flex items-center justify-center z-20">
            <div className="relative w-full h-full rounded-full flex items-center justify-center">
              <ValictaAvatar size={72} variant="full" />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-white dark:border-[#0F172A] animate-pulse" />
            </div>
          </div>

          {/* محتوى الهيدر */}
          <div className="flex items-center justify-between mt-1">
            {/* العنوان في المنتصف */}
            <div className="flex-1 flex flex-col items-center">
              <span className="text-white text-sm font-bold leading-tight">
                {isAr ? "فاليكتا" : "Valicta"}
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white/80 text-[10px] leading-tight">
                  {t.status}
                </span>
              </div>
            </div>

            {/* الأزرار */}
            <div className="absolute top-2 right-2 flex items-center gap-1">
              <button
                onClick={handleClearChat}
                aria-label={t.clearChat}
                title={t.clearChat}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FaTrash className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <FaXmark className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* الرسائل */}
        <div className="flex-1 px-4 py-4 overflow-y-auto space-y-3 bg-gray-50/50 dark:bg-[#0F172A] scrollbar-thin [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-200/80 dark:[&::-webkit-scrollbar-thumb]:bg-gray-800/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 dark:hover:[&::-webkit-scrollbar-thumb]:bg-gray-700">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 msg-fade-in ${
                msg.isBot ? "justify-start" : "justify-end"
              }`}
            >
              {msg.isBot && (
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 overflow-hidden border border-valict-navy/10 dark:border-valict-cyan/20">
                  <ValictaAvatar size={32} variant="compact" />
                </div>
              )}

              <div
                className={`flex flex-col ${
                  msg.isBot ? "items-start" : "items-end"
                } max-w-[78%]`}
              >
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

          {/* مؤشر الكتابة */}
          {(isLoading || isBotTyping) && (
            <div className="flex items-end gap-2 justify-start msg-fade-in">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mb-1 overflow-hidden border border-valict-navy/10 dark:border-valict-cyan/20">
                <ValictaAvatar size={32} variant="compact" />
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
          dir={isAr ? "rtl" : "ltr"}
          className="p-3 bg-white dark:bg-[#0F172A] border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 rounded-b-2xl"
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
            dir={isAr ? "rtl" : "ltr"}
            className={`flex-1 min-w-0 bg-gray-50 dark:bg-[#1E293B] border-none text-xs rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-valict-navy ${
              isAr ? "text-right" : "text-left"
            } disabled:opacity-50`}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="p-2 rounded-xl bg-valict-navy dark:bg-valict-cyan text-white dark:text-[#0B1120] hover:opacity-90 transition-all disabled:opacity-30 flex-shrink-0"
          >
            <FaPaperPlane className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* الأنيميشن */}
      <style jsx>{`
        .msg-fade-in {
          animation: msgFadeIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes msgFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
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
