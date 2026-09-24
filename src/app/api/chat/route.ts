import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // 1. جلب رسالة العميل واللغة المرسلة من واجهة الشات
    const { message, lang } = await req.json();

    // 2. التحقق من وجود مفتاح الأمان السري في البيئة المحلية
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    // 3. كتابة التعليمات الأساسية للبوت (System Instructions) لتحديد شخصيته وهوية شركتك
    const isAr = lang === "ar";
    const systemInstruction = isAr
      ? "أنت المساعد الذكي الرسمي لشركة فالكت (Valict) للحلول السحابية وتقنية المعلومات. وظيفتك الإجابة على استفسارات الزوار باحترافية، ودبلوماسية، وبلغة عربية واضحة ومبسطة. ركّز على أن فالكت تقدم حلول إدارة تقنية المعلومات، والنسخ الاحتياطي، والأمن السيبراني، والحوسبة السحابية لتقليل وقت التوقف وضمان استمرارية الأعمال. اجعل إجاباتك punchy ومختصرة ومريحة للقراءة."
      : "You are the official smart AI assistant for Valict (Cloud & IT Solutions). Your job is to answer visitor inquiries professionally, concisely, and clearly. Focus on Valict's core services: Managed IT Services, ICT Infrastructure, Cloud Computing, and Cybersecurity. Keep your responses short, professional, and business-friendly.";

    // 4. إعداد الهيكل البرمجي لطلب جوجل Gemini (باستخدام نموذج 1.5 Flash السريع والمجاني)
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
          // تمرير شخصية البوت لجوجل لحقن الهوية داخل الإجابة
          systemInstruction: {
            parts: [
              {
                text: systemInstruction,
              },
            ],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300, // تحديد حجم الرد ليظل الشات خفيفاً وسريع القراءة
          },
        }),
      }
    );

    const data = await response.json();

    // 5. استخراج النص النهائي الراجع من ذكاء جوجل الاصطناعي
    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      (isAr ? "عذراً، واجهت مشكلة في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى." : "Sorry, I encountered an error. Please try again.");

    // 6. إرسال الرد الذكي فوراً لواجهة الشات
    return NextResponse.json({ reply: botReply });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
