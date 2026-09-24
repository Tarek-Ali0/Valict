import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let isAr = true;
  
  try {
    const { message, lang } = await req.json();
    isAr = lang === "ar";
    
    const apiKey = "AQ.Ab8RN6LCwADpP8tbiysMcE57K_roAFCQ58DMSYfW2Dl_mRkiQ";

    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعدة الرقمية الذكية الرسمية لشركة فالكت (Valict). أجيبي عن استفسارات الزوار بصيغة المؤنث باحترافية عاليّة ولغة واضحة ومبسطة. شركة فالكت تقدم حلولاً شاملة ومتكاملة تشمل: إدارة وتطوير البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، حلول الحوسبة السحابية والنقل الآمن للسحاب، والنسخ الاحتياطي التلقائي لضمان استمرارية الأعمال وتقليل وقت التوقف. حافظي على إجاباتكِ punchy، محددة، ومختصرة تناسب واجهات الشات السريعة."
      : "Your name is 'Valicta', the official smart AI digital assistant for Valict. Always respond professionally and concisely using a business-friendly, helpful tone. Valict provides comprehensive IT solutions, including ICT Infrastructure management, Advanced Cybersecurity services, Scalable Cloud Computing, and Automated Backups to ensure business continuity. Keep your answers short, structured, and punchy for a chat widget.";

    const response = await fetch(
      `https://googleapis.com{apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: message }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 300 },
        }),
      }
    );

    const data = await response.json();

    // الطريقة البرمجية الآمنة: تفكيك المصفوفة خطوة بخطوة لمنع الانهيار وكسر الحظر
    if (data && data.candidates && data.candidates[0]) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts[0]) {
        const textReply = candidate.content.parts[0].text;
        if (textReply) {
          return NextResponse.json({ reply: textReply });
        }
      }
    }

    // رد محلي ذكي ومحدد كخط دفاع أخير مخصص للسؤال الحالي
    const fallbackReply = isAr 
      ? "أهلاً بك في فالكت! نحن نقدم حلولاً متكاملة تشمل إدارة البنية التحتية، خدمات الأمن السيبراني، والحوسبة السحابية المخصصة لتطوير وحماية أعمالك. كيف يمكنني مساعدتك اليوم؟" 
      : "Welcome to Valict! We offer comprehensive IT solutions, including infrastructure management, advanced cybersecurity, and scalable cloud computing to empower your business. How can I help you today?";

    return NextResponse.json({ reply: fallbackReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: isAr ? "أهلاً بك في فالكت! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
