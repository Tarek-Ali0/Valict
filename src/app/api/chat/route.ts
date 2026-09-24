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
      if (text.includes("أمن") || text.includes("سيبراني") || text.includes("حماية")) {
        reply = "نقدم في Valict حلول أمن سيبراني متقدمة تشمل حماية البنية التحتية، اختبار الاختراق، وتأمين البيانات ضد الهجمات السيبرانية.";
      } else if (text.includes("سحابية") || text.includes("سحابي") || text.includes("cloud")) {
        reply = "نوفر حلول حوسبة سحابية مرنة وآمنة تساعد شركتك على التوسع وإدارة مواردها بكفاءة عالية على مدار الساعة.";
      } else if (text.includes("بنية") || text.includes("شبكات") || text.includes("it")) {
        reply = "نتخصص في تصميم وتطوير بنية تقنية المعلومات والشبكات للمؤسسات بأعلى معايير الكفاءة والموثوقية.";
      } else {
        reply = "أهلاً بك في Valict! نحن هنا لمساعدتك في تقديم أفضل حلول تقنية المعلومات، الأمن السيبراني، والحوسبة السحابية. كيف يمكننا دعم أعمالك اليوم؟";
      }
    } else {
      if (text.includes("security") || text.includes("cyber")) {
        reply = "Valict offers advanced cybersecurity solutions including infrastructure protection, penetration testing, and data security.";
      } else if (text.includes("cloud")) {
        reply = "We provide flexible and secure cloud computing solutions to help your business scale efficiently.";
      } else if (text.includes("infrastructure") || text.includes("it")) {
        reply = "We specialize in designing and managing robust IT infrastructure and enterprise networks.";
      } else {
        reply = "Welcome to Valict! We are here to provide top-tier IT, cybersecurity, and cloud solutions. How can we help you today?";
      }
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ reply: "أهلاً بك في Valict، كيف يمكننا مساعدتك اليوم؟" }, { status: 200 });
  }
}
