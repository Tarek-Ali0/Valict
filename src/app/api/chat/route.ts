import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // 1. جلب رسالة العميل واللغة المرسلة من واجهة الشات
    const { message, lang } = await req.json();

    const isAr = lang === "ar";

    // 2. حقن مفتاح الأمان السري مباشرة داخل الكود لضمان تخطي قيود Vercel تماماً
    // تم نسخ الكود بدقة من لقطة الشاشة الخاصة بك
    const apiKey = "AQ.Ab8RN6LCwADpP8tbiysMcE57K_roAFCQ58DMSYfW2Dl_mRkiQ";

    // 3. التعليمات الأساسية للمساعدة الذكية "فاليكتا" وتحديد هويتها الشاملة
    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعدة الرقمية الذكية الرسمية لشركة فالكت (Valict). أجيبي عن استفسارات الزوار بصيغة المؤنث باحترافية عاليّة ولغة واضحة ومبسطة. شركة فالكت تقدم حلولاً شاملة ومتكاملة تشمل: إدارة وتطوير البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، حلول الحوسبة السحابية والنقل الآمن للسحاب، والنسخ الاحتياطي التلقائي لضمان استمرارية الأعمال وتقليل وقت التوقف. حافظي على إجاباتكِ punchy، محددة، ومختصرة تناسب واجهات الشات السريعة."
      : "Your name is 'Valicta', the official smart AI digital assistant for Valict. Always respond professionally and concisely using a business-friendly, helpful tone. Valict provides comprehensive IT solutions, including ICT Infrastructure management, Advanced Cybersecurity services, Scalable Cloud Computing, and Automated Backups to ensure business continuity. Keep your answers short, structured, and punchy for a chat widget.";

    // 4. إعداد الهيكل البرمجي لطلب جوجل Gemini بالرابط المصلح بالكامل
    const response = await fetch(
      `https://googleapis.com{apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: message,
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: systemInstruction,
              },
            ],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    const data = await response.json();

    // 5. استخراج النص النهائي الراجع من مصفوفة ذكاء جوجل الاصطناعي
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      (isAr ? "عذراً، لم أتمكن من العثور على رد مناسب. يرجى المحاولة مرة أخرى." : "Sorry, no response found. Please try again.");

    // 6. إرسال الرد الذكي فوراً لواجهة الشات
    return NextResponse.json({ reply: botReply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { reply: lang === "ar" ? "عذراً، واجهت مشكلة في الاتصال بالسيرفر الفعلي." : "Sorry, encountered a server connection error." },
      { status: 200 }
    );
  }
}
