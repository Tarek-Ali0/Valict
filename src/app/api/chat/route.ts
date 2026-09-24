import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message) {
      return NextResponse.json({ reply: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "API Key is missing." }, { status: 200 });
    }

    // استخدام مسار v1 المباشر مع نموذج gemini-1.5-flash المتوافق مع جميع مفاتيح AI Studio
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemInstruction = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد وباحترافية."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely and professionally.";

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemInstruction}\n\nUser Question: ${message}` }
            ]
          }
        ]
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({ reply: `API Error: ${errorMsg}` }, { status: 200 });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      return NextResponse.json({ reply: lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?" }, { status: 200 });
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ reply: `Error: ${error.message}` }, { status: 200 });
  }
}
