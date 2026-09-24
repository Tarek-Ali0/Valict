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
      return NextResponse.json({ reply: "Error: GEMINI_API_KEY is missing." }, { status: 200 });
    }

    // استخدام الإصدار المستقر عبر مسار v1 المباشر
    const modelName = "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/${modelName}:generateContent?key=${apiKey}`;

    const systemInstructionText = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد، بدقة، وبأسلوب مهني."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely and professionally.";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemInstructionText}\n\nسؤال العميل: ${message}` }
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

    const responseText = await response.text();

    if (!response.ok) {
      return NextResponse.json({ reply: `API Error: ${responseText}` }, { status: 200 });
    }

    const data = JSON.parse(responseText);
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    return NextResponse.json({ reply: `Catch Error: ${error.message}` }, { status: 200 });
  }
}
