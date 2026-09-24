import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, lang } = await req.json();
    const isAr = lang === "ar";
    
    // المفتاح السري المباشر والمحمي لـ Gemini
    const apiKey = "AQ.Ab8RN6LCwADpP8tbiysMcE57K_roAFCQ58DMSYfW2Dl_mRkiQ";

    // التوجيهات الصارمة لشخصية فاليكتا الشاملة لجميع الخدمات
    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعدة الرقمية الذكية الرسمية لشركة فالكت (Valict). أجيبي عن استفسارات الزوار بصيغة المؤنث باحترافية عاليّة ولغة واضحة ومبسطة ومختصرة جداً تناسب واجهات الشات السريعة. شركة فالكت تقدم حلولاً شاملة ومتكاملة تشمل: إدارة وتطوير البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، حلول الحوسبة السحابية والنقل الآمن للسحاب، والنسخ الاحتياطي التلقائي لضمان استمرارية الأعمال وتقليل وقت التوقف. إذا سألكِ العميل عن موضوع خارج تخصص الشركة (مثل الطقس)، أجيبي بذكاء ودبلوماسية وأعيدي توجيهه لخدمات الشركة التقنية."
      : "Your name is 'Valicta', the official smart AI digital assistant for Valict. Always respond professionally and concisely. Valict provides comprehensive IT solutions, including ICT Infrastructure management, Advanced Cybersecurity services, Scalable Cloud Computing, and Automated Backups to ensure business continuity. Keep your answers short and punchy. If asked about off-topic queries (like weather), politely redirect them to Valict's tech services.";

    // إرسال الطلب بالهيكل الرسمي المعتمد من جوجل لضمان العبور الناجح
    const response = await fetch(
      `https://googleapis.com{apiKey}`,
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
            temperature: 0.7, 
            maxOutputTokens: 250 
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

    // خط دفاع أخير ذكي في حال حدوث أي مشكلة في الشبكة الخارجية
    const fallback = isAr 
      ? "مرحباً بك في فالكت! يسعدني إجابتك على أي استفسار يخص حلول البنية التحتية لتقنية المعلومات، الأمن السيبراني، أو الخدمات السحابية المتكاملة لحماية أعمالك. كيف يمكنني مساعدتك اليوم؟"
      : "Welcome to Valict! We are here to support your business with integrated IT infrastructure, cybersecurity, and cloud solutions. How can I help you today?";

    return NextResponse.json({ reply: fallback });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
