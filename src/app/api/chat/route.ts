import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: lang === "ar" ? "خطأ في إعدادات الخادم." : "Server configuration error." }, { status: 200 });
    }

    // استخدام أحدث وأبسط نقطة اتصال مستقرة
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد وباحترافية باللغة العربية بناءً على سؤال العميل."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely and professionally.";

    const payload = {
      contents: [
        {
          parts: [
            { text: `${systemPrompt}\n\nUser Question: ${message}` }
          ]
        }
      ]
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error Details:", data);
      return NextResponse.json({ 
        reply: lang === "ar" ? "أهلاً بك في فالكت! أنا هنا لمساعدتك في استفسارات البنية التحتية وحلول التقنية." : "Welcome to Valict! I am here to help you with IT solutions." 
      }, { status: 200 });
    }

    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error("Catch Error:", error);
    return NextResponse.json({ 
      reply: "أهلاً بك في فالكت! نحن هنا لخدمتك وتوفير حلول تقنية المعلومات المتقدمة." 
    }, { status: 200 });
  }
}
