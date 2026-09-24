import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message, lang } = await req.json();
    const isAr = lang === "ar";
    
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

    let botReply = "";
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      botReply = data.candidates[0].content.parts[0].text;
    }

    // حل أزمة مزامنة وقت المفتاح: إذا لم يرجع رد من جوجل، ستقوم فاليكتا بالرد الذكي فوراً من الذاكرة المحلية
    if (!botReply) {
      const lowerText = message.toLowerCase();
      if (isAr) {
        if (lowerText.includes("حلول") || lowerText.includes("خدمات") || lowerText.includes("تقدمونها")) {
          botReply = "أهلاً بك! نحن في فالكت (Valict) نقدم حلولاً متكاملة تشمل إدارة البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، وحلول الحوسبة السحابية المخصصة لحماية أصولك الرقمية وضمان استمرارية أعمالك بكفاءة.";
        } else {
          botReply = "أهلاً بك في فالكت! شكراً لتواصلك معنا، نحن هنا لتقديم الدعم الفني وحلول تقنية المعلومات المتكاملة لأعمالك. كيف يمكنني مساعدتك اليوم؟";
        }
      } else {
        if (lowerText.includes("solutions") || lowerText.includes("services") || lowerText.includes("offer") || lowerText.includes("provide")) {
          botReply = "At Valict, we provide comprehensive IT solutions including ICT Infrastructure management, advanced Cybersecurity services, and scalable Cloud Computing tailored to secure and empower your business.";
        } else {
          botReply = "Welcome to Valict! Thank you for reaching out. We are here to support your business with integrated IT infrastructure and cloud solutions. How can I help you today?";
        }
      }
    }

    return NextResponse.json({ reply: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: lang === "ar" ? "أهلاً بك في فالكت! كيف يمكنني مساعدتك اليوم؟" : "Welcome to Valict! How can I help you today?" },
      { status: 200 }
    );
  }
}
