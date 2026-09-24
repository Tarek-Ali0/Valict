import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Message is required" }, { status: 400 });
    }

    const text = message.toLowerCase();
    let reply = "";

    if (lang === "ar") {
      if (text.includes("أمن") || text.includes("سيبراني") || text.includes("حماية") || text.includes("اختراق")) {
        reply = "نحن في Valict نوفر درع حماية متكامل لأصولك الرقمية، يشمل اختبار الاختراق، مراقبة التهديدات، وتأمين البنية التحتية ضد أي هجمات سيبرانية محتملة.";
      } else if (text.includes("سحابية") || text.includes("سحابي") || text.includes("cloud") || text.includes("استضافة")) {
        reply = "حلولنا السحابية مصممة خصيصاً لتمنح شركتك مرونة كاملة، سرعة فائقة في معالجة البيانات، واستضافة آمنة وموثوقة على مدار الساعة.";
      } else if (text.includes("سعر") || text.includes("تكلفة") || text.includes("باقة") || text.includes("اشتراك")) {
        reply = "تختلف الأسعار بناءً على حجم احتياجات شركتك والبنية التقنية المطلوبة. يمكنك حجز استشارة مجانية عبر موقعنا لنقدم لك عرض سعر مخصص.";
      } else {
        reply = "سؤال مهم جداً! في Valict، نعمل على تصميم بنية تقنية معلومات متكاملة ترفع من كفاءة أعمالك وتضمن استمرارية خدماتك بأعلى معايير الجودة.";
      }
    } else {
      if (text.includes("security") || text.includes("cyber")) {
        reply = "Valict delivers robust cybersecurity frameworks, including vulnerability assessments, threat monitoring, and infrastructure hardening.";
      } else if (text.includes("cloud")) {
        reply = "Our cloud services provide scalable architecture, high availability, and secure data management tailored to enterprise needs.";
      } else {
        reply = "That's a great question! At Valict, we specialize in delivering enterprise-grade IT infrastructure and digital solutions to empower your business.";
      }
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ reply: "أهلاً بك في Valict، كيف يمكننا مساعدتك اليوم؟" }, { status: 200 });
  }
}
