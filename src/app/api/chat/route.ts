import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export const runtime = "edge";
export const dynamic = "force-dynamic";

// تهيئة الـ SDK بالطريقة الرسمية الصحيحة
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ reply: lang === "ar" ? "خطأ في إعدادات الخادم." : "Server configuration error." }, { status: 200 });
    }

    const systemInstruction = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد وباحترافية."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely and professionally.";

    // استدعاء النموذج بالطريقة الأحدث والأكثر استقراراً
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const replyText = response.text || (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error("Gemini SDK Error:", error);
    return NextResponse.json({ 
      reply: "أهلاً بك في فالكت! نحن هنا لخدمتك وتوفير حلول تقنية المعلومات المتقدمة." 
    }, { status: 200 });
  }
}
