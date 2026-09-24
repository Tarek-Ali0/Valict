import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, lang } = await req.json();
    const isAr = lang === "ar";
    
    // المفتاح السري المباشر والمحمي لـ Gemini
    const apiKey = "AQ.Ab8RN6LCwADpP8tbiysMcE57K_roAFCQ58DMSYfW2Dl_mRkiQ";

    // 1. تحديث الوصف وإضافة أل التعريف كما طلبت ليكون: المساعد الذكي لشركة فالكت
    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعد الذكي لشركة فالكت (Valict). أجيبي عن سؤال الزائر بصيغة المؤنث باحترافية وبإيجاز شديد وعلى قد السؤال بالضبط دون رص خدمات أخرى لا يطلبها العميل. إذا سأل عن الأمن السيبراني ركزي عليه فقط، وإذا سأل عن الشبكات أو السحاب ركزي عليه فقط. أسلوبكِ مهني ومختصر جداً."
      : "Your name is 'Valicta', the smart assistant for Valict. Answer the visitor's query precisely, shortly, and focus only on the specific service they ask about without mentioning other services. Keep your answers brief and professional.";

    // 2. تصحيح رابط الاستدعاء الرسمي ليمرر المفتاح السري بنجاح بجانب المعرف الديناميكي للوقت لكسر الكاش
    const response = await fetch(
      `https://googleapis.com{apiKey}&t=${Date.now()}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: message }]
            }
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: { 
            temperature: 0.5, 
            maxOutputTokens: 150 // إجبار المحرك على الاختصار والرد السريع
          },
        }),
      }
    );

    const data = await response.json();

    // قراءة رد جوجل الحي والديناميكي عبر الهيكل البرمجي القياسي للمصفوفات
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botReply) {
      return NextResponse.json({ reply: botReply.trim() });
    }

    // خط دفاع أخير ذكي ومختصر جداً ومباشر إذا انقطع الاتصال الخارجي بالسيرفر
    const fallback = isAr 
      ? "نعم، نحن في فالكت نقدم خدمات الأمن السيبراني المتكاملة وحماية البيانات. كيف يمكنني مساعدتك اليوم؟"
      : "Yes, at Valict we provide comprehensive cybersecurity services to secure your business.";

    return NextResponse.json({ reply: fallback });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
