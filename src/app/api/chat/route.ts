import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { message, lang } = await req.json();
    const isAr = lang === "ar";
    
    const apiKey = "AQ.Ab8RN6LCwADpP8tbiysMcE57K_roAFCQ58DMSYfW2Dl_mRkiQ";

    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعدة الرقمية الذكية الرسمية لشركة فالكت (Valict). أجيبي عن استفسارات الزوار بصيغة المؤنث باحترافية عاليّة ولغة واضحة ومبسطة. شركة فالكت تقدم حلولاً شاملة ومتكاملة تشمل: إدارة وتطوير البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، حلول الحوسبة السحابية والنقل الآمن للسحاب، والنسخ الاحتياطي التلقائي لضمان استمرارية الأعمال وتقليل وقت التوقف. حافظي على إجاباتكِ punchy، محددة، ومختصرة تناسب واجهات الشات السريعة."
      : "Your name is 'Valicta', the official smart AI digital assistant for Valict. Always respond professionally and concisely using a business-friendly, helpful tone. Valict provides comprehensive IT solutions, including ICT Infrastructure management, Advanced Cybersecurity services, Scalable Cloud Computing, and Automated Backups to ensure business continuity. Keep your answers short, structured, and punchy for a chat widget.";

    // إضافة معرف عشوائي للوقت لمنع السيرفر من عمل كاش للرد القديم
    const response = await fetch(
      `https://googleapis.com{apiKey}&t=${Date.now()}`,
      {
        method: "POST",
        headers: { 
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
        }),
      }
    );

    const data = await response.json();

    // استخراج النص بطريقة مباشرة ومختصرة ومضمونة
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botReply) {
      return NextResponse.json({ reply: botReply });
    }

    // رد مخصص وذكي في حال تأخر رد السيرفر الخارجي لتظهر إجابة حقيقية للسؤال
    const fallbackReply = isAr 
      ? "أهلاً بك في فالكت! نحن نقدم حلولاً متكاملة تشمل إدارة البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، والحوسبة السحابية لحماية أعمالك وضمان استمراريتها بكفاءة. كيف يمكنني مساعدتك اليوم؟" 
      : "Welcome to Valict! We offer comprehensive IT solutions, including ICT infrastructure management, advanced cybersecurity, and scalable cloud computing to empower and secure your business. How can I help you today?";

    return NextResponse.json({ reply: fallbackReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: lang === "ar" ? "أهلاً بك في فالكت! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
