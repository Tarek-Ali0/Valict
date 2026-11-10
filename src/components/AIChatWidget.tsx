"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import {
  FaCommentDots,
  FaXmark,
  FaPaperPlane,
  FaTrash,
} from "react-icons/fa6";

interface AIChatWidgetProps {
  lang: string;
  quickReplies?: {
    services: string;
    technicalIssue: string;
    consultation: string;
    pricing: string;
  };
}

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: number;
}

const MAX_INPUT_LENGTH = 1000;
const STORAGE_KEY_MESSAGES = "valict-chat-messages";
const STORAGE_KEY_OPEN = "valict-chat-open";

function detectLang(text: string): "ar" | "en" {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text) ? "ar" : "en";
}

function getTextDirection(text: string): "rtl" | "ltr" {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text) ? "rtl" : "ltr";
}

function ValictaAvatar({
  size = 48,
  className = "",
  priority = false,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/valicta.webp"
      alt="Valicta"
      width={size}
      height={size}
      className={`object-contain ${className}`}
      priority={priority}
      sizes={`${size}px`}
    />
  );
}

export function AIChatWidget({ lang, quickReplies }: AIChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
        ? "إسأل فاليكتا..."
        : "Ask Valicta...",
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
      rateLimitMsg: isAr
        ? "عدد الرسائل كبير، يرجى المحاولة بعد قليل."
        : "Too many messages, please try again shortly.",
    }),
    [isAr]
  );

  // Quick Replies (fallback لو مش موجودة)
  const defaultQuickReplies = useMemo(
    () => ({
      services: isAr ? "إيه هي خدماتكم؟" : "What are your services?",
      technicalIssue: isAr ? "عندي مشكلة تقنية" : "I have a technical issue",
      consultation: isAr ? "عايز أحجز استشارة مجانية" : "Book a free consultation",
      pricing: isAr ? "إيه هي أسعاركم؟" : "What is your pricing?",
    }),
    [isAr]
  );

  const replies = quickReplies || defaultQuickReplies;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    try {
      const savedMessages = sessionStorage.getItem(STORAGE_KEY_MESSAGES);
      const savedOpen = sessionStorage.getItem(STORAGE_KEY_OPEN);

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }

      if (savedOpen === "true") {
        setIsOpen(true);
      }
    } catch (err) {
      console.error("[chat] Failed to restore session:", err);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem(
        STORAGE_KEY_MESSAGES,
        JSON.stringify(messages)
      );
    } catch (err) {
      console.error("[chat] Failed to save messages:", err);
    }
  }, [messages, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY_OPEN, String(isOpen));
    } catch (err) {
      console.error("[chat] Failed to save open state:", err);
    }
  }, [isOpen, isHydrated]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    if (isOpen && !isLoading) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isLoading]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isOpen) return;
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

      const timer3 = setTimeout(() => {
        setIsBotTyping(true);
      }, 500);

      const timer4 = setTimeout(()
