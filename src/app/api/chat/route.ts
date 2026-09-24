import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

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

    // السطر القياسي والمصلح لقراءة ردود جوجل الحية بدون أي تعارض مع التايب سكريبت
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botReply) {
      return NextResponse.json({ reply: botReply });
    }

    // إذا لم يرجع رد حي من السيرفر نستخدم الذاكرة المحلية الذكية الشاملة
    let fallbackReply = "";
    const lowerText = message.toLowerCase();
    if (isAr) {
      if (lowerText.includes("حلول") || lowerText.includes("خدمات") || lowerText.includes("تقدمونها")) {
        fallbackReply = "أهلاً بك! نحن في فالكت (Valict) نقدم حلولاً متكاملة تشمل إدارة البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، وحلول الحوسبة السحابية المخصصة لحماية أصولك الرقمية وضمان استمرارية أعمالك بكفاءة.";
      } else {
        fallbackReply = "أهلاً بك في فالكت! شكراً لتواصلك معنا، نحن هنا لتقديم الدعم الفني وحلول تقنية المعلومات المتكاملة لأعمالك. كيف يمكنني مساعدتك اليوم؟";
      }
    } else {
      if (lowerText.includes("solutions") || lowerText.includes("services") || lowerText.includes("offer") || lowerText.includes("provide")) {
        fallbackReply = "At Valict, we provide comprehensive IT solutions including ICT Infrastructure management, advanced Cybersecurity services, and scalable Cloud Computing tailored to secure and empower your business.";
      } else {
        fallbackReply = "Welcome to Valict! Thank you for reaching out. We are here to support your business with integrated IT infrastructure and cloud solutions. How can I help you today?";
      }
    }

    return NextResponse.json({ reply: fallbackReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: isAr ? "أهلاً بك في فالكت! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
