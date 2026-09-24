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

    // استخدام النموذج المباشر بالصيغة المعتمدة للـ v1
    const endpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const systemPrompt = lang === "ar"
      ? "أنت 'فاليكتا'، المساعد الذكي لشركة فالكت (Valict). أجب باختصار شديد وباحترافية."
      : "You are 'Valicta', the smart assistant for Valict. Answer concisely and professionally.";

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: `${systemPrompt}\n\nالسؤال: ${message}` }
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
      // في حال حدث أي خطأ، سنعرض رسالة بديلة نظيفة بدلاً من كود الخطأ التقني المزعج
      return NextResponse.json({ 
        reply: lang === "ar" ? "أهلاً بك في فالكت! أنا هنا لمساعدتك في استفسارات البنية التحتية وحلول التقنية، كيف يمكنني دعم أعمالك اليوم؟" : "Welcome to Valict! I am here to help you with IT solutions. How can I assist you today?" 
      }, { status: 200 });
    }

    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || 
      (lang === "ar" ? "أهلاً بك في فالكت، كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict, how can I help you today?");

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    return NextResponse.json({ 
      reply: "أهلاً بك في فالكت! نحن هنا لخدمتك وتوفير حلول تقنية المعلومات المتقدمة." 
    }, { status: 200 });
  }
}
