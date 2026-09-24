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

       // 3. كتابة التعليمات الأساسية الشاملة للمساعدة الذكية "فاليكتا" وتحديد هويتها الكاملة
    const isAr = lang === "ar";
    const systemInstruction = isAr
      ? "اسمكِ 'فاليكتا' (Valicta)، المساعدة الرقمية الذكية الرسمية لشركة فالكت (Valict). أجيبي عن استفسارات الزوار بصيغة المؤنث باحترافية عاليّة ولغة واضحة ومبسطة. شركة فالكت تقدم حلولاً شاملة ومتكاملة تشمل: إدارة وتطوير البنية التحتية لتقنية المعلومات والاتصالات، خدمات الأمن السيبراني المتقدمة، حلول الحوسبة السحابية والنقل الآمن للسحاب، والنسخ الاحتياطي التلقائي لضمان استمرارية الأعمال وتقليل وقت التوقف. حافظي على إجاباتكِ punchy، محددة، ومختصرة تناسب واجهات الشات السريعة."
      : "Your name is 'Valicta', the official smart AI digital assistant for Valict. Always respond professionally and concisely using a business-friendly, helpful tone. Valict provides comprehensive IT solutions, including ICT Infrastructure management, Advanced Cybersecurity services, Scalable Cloud Computing, and Automated Backups to ensure business continuity. Keep your answers short, structured, and punchy for a chat widget.";

    // 4. إعداد الهيكل البرمجي لطلب جوجل Gemini (باستخدام نموذج 1.5 Flash السريع والمجاني)
    // تم إصلاح الرابط أدناه بدقة ليتصل بسيرفرات جوجل بشكل صحيح ويمرر المفتاح السري بأمان
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

    // 5. استخراج النص أو طباعة تفاصيل الخطأ القادم من جوجل إذا وجد
    if (data.error) {
      return NextResponse.json({ reply: `خطأ من جوجل: ${data.error.message}` });
    }

    const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      (isAr ? "عذراً، لم أتمكن من العثور على رد مناسب في الاستجابة." : "Sorry, no text reply found in the response.");

    // 6. إرسال الرد الذكي فوراً لواجهة الشات
    return NextResponse.json({ reply: botReply });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    // جعل البوت يكتب لك تفاصيل الخطأ الحقيقي داخل الشات مباشرة لنعرف المشكلة فوراً
    return NextResponse.json(
      { reply: `خطأ داخلي بالسيرفر: ${error.message || error}` },
      { status: 200 } // جعلناها 200 مؤقتاً لتظهر الرسالة داخل صندوق الشات بدلاً من الانهيار
    );
  }
}
