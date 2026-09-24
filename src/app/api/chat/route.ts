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
        reply: lang === "ar" ? "أهلاً بك، مفتاح الـ API غير معرّف حالياً." : "API key is missing." 
      }, { status: 200 });
    }

    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemInstruction = lang === "ar"
      ? `أنت 'فاليكتا'، المساعد الذكي الرسمي لشركة Valict المتخصصة في البنية التحتية لتقنية المعلومات، إدارة السيرفرات، الأمن السيبراني، والحوسبة السحابية. أجب على السؤال التالي بشكل مباشر، احترافي، ومرتبط بمجال الشركة باللغة العربية:`
      : `You are 'Valicta', the official smart assistant for Valict (IT infrastructure, cybersecurity, and cloud solutions). Answer the following question professionally and concisely in English:`;

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              { text: `${systemInstruction}\n\n${message}` }
            ]
          }
        ]
      }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error("Gemini API Error details:", data);
      return NextResponse.json({ 
        reply: lang === "ar" ? "نحن في Valict نرحب بك، ونسعد بالإجابة على استفساراتك التقنية عبر حجز استشارة مباشرة." : "Welcome to Valict. How can we assist your business today?" 
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
