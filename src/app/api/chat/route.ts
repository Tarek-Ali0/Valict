import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: lang === "ar" ? "مفتاح الـ API غير معرف في إعدادات المنصة." : "API key is missing in platform settings." 
      }, { status: 200 });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemInstruction = lang === "ar"
      ? `أنت 'فاليكتا'، المساعد الذكي الرسمي لشركة Valict. الشركة متخصصة في حلول وبنية تقنية المعلومات، إدارة السيرفرات، الأمن السيبراني، والحوسبة السحابية. مهمتك الإجابة على استفسارات الزوار باحترافية، ودافع عن حلول الشركة التقنية بذكاء ودقة باللغة العربية.`
      : `You are 'Valicta', the official smart assistant for Valict, a company specialized in IT infrastructure, server management, cybersecurity, and cloud computing. Answer visitor inquiries professionally and concisely in English.`;

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemInstruction}\n\nUser Question: ${message}` }
            ]
          }
        ]
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      const errorMsg = data?.error?.message || "Unknown API error";
      console.error("Gemini API Error:", errorMsg);
      return NextResponse.json({ 
        reply: lang === "ar" ? "أهلاً بك في Valict، نحن هنا لخدمتك وتوفير أحدث حلول تقنية المعلومات." : "Welcome to Valict, how can we help you today?" 
      }, { status: 200 });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      return NextResponse.json({ 
        reply: lang === "ar" ? "أهلاً بك في Valict، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?" 
      }, { status: 200 });
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Chat API Catch Error:", error);
    return NextResponse.json({ 
      reply: "أهلاً بك في Valict، يسعدنا الإجابة على استفساراتك التقنية." 
    }, { status: 200 });
  }
}
