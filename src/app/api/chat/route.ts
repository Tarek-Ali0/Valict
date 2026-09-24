import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message) {
      return NextResponse.json({ reply: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "API Key is missing in Vercel settings." }, { status: 200 });
    }

    // استخدام الرابط الأبسط والمباشر كـ POST عادي
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const apiResponse = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `Answer this question professionally as Valict assistant: ${message}` }
            ]
          }
        ]
      }),
    });

    const data = await apiResponse.json();

    // لو الـ API رجع خطأ، هنعرض الخطأ الحقيقي صريحاً عشان نعرف سببه من الآخر
    if (!apiResponse.ok) {
      const errorMsg = data?.error?.message || JSON.stringify(data);
      return NextResponse.json({ reply: `Gemini Error: ${errorMsg}` }, { status: 200 });
    }

    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!reply) {
      return NextResponse.json({ reply: "Received empty response from Gemini." }, { status: 200 });
    }

    return NextResponse.json({ reply });

  } catch (error: any) {
    return NextResponse.json({ reply: `Server Error: ${error.message}` }, { status: 200 });
  }
}
