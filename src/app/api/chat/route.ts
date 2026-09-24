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

    // رابط الـ API المباشر والمستقر
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد، بدقة، وبأسلوب مهني واحترافي باللغة العربية بناءً على سؤال العميل التالي."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely, accurately, and professionally in English based on the following user question.";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nسؤال العميل / User Question: ${message}` }
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
      console.error("Gemini API Error:", data);
      return NextResponse.json({ 
        reply: lang === "ar" ? "عذراً، واجهت ضغطاً مؤقتاً في السيرفر، يرجى المحاولة مرة أخرى." : "Sorry, temporary server load, please try again." 
      }, { status: 200 });
    }

    // استخراج الإجابة بدقة من هيكل استجابة جوجل
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } async (error: any) {
    console.error("Chat API Catch Error:", error);
    return NextResponse.json({ 
      reply: "أهلاً بك في فالكت! نحن هنا لخدمتك وتوفير حلول تقنية المعلومات المتقدمة." 
    }, { status: 200 });
  }
}
