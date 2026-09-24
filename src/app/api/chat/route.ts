import { NextResponse } from "next/server";

// 1. تفعيل بيئة الـ Edge لتجاوز قيود Vercel وسرعة الاستجابة المطلقة
export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    // 2. التحقق من اسم متغير الـ API Key بدقة ليتطابق مع Vercel
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in environment variables.");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    // 3. تحديد نموذج Gemini المستقر والسريع
    const modelName = "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    // صياغة الهوية والتوجيهات (System Instruction & Payload)
    const systemPrompt = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict) المتخصصة في حلول وبنية تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. أجب باختصار شديد (Punchy)، بدقة، وبأسلوب مهني واحترافي."
      : "You are 'Valicta', the smart assistant for Valict, specialized in IT infrastructure, cybersecurity, and cloud solutions. Answer concisely, accurately, and professionally.";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nسؤال العميل: ${message}` }
          ]
        }
      ]
    };

    // تنفيذ طلب الـ Fetch الخارجي لـ جوجل
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API Error Response:", errorData);
      return NextResponse.json({ reply: "عذراً، واجهت ضغطاً مؤقتاً في السيرفر، يرجى المحاولة مرة أخرى." }, { status: 200 });
    }

    const data = await response.json();
    
    // الفحص والتفكيك البرمجي الآمن للمصفوفة الراجعة لتجنب الانهيار
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } catch (error) {
    console.error("Chat API Internal Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
