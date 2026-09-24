import { NextResponse } from "next/server";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, lang } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message payload" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ reply: "Error: GEMINI_API_KEY is missing." }, { status: 200 });
    }

    const modelName = "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          role: "user",
          parts: [
            { text: message }
          ]
        }
      ]
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();

    if (!response.ok) {
      // نعيد نص الخطأ القادم من جوجل مباشرة للشات لكي نراه على الموقع ونعرف السبب بدقة
      return NextResponse.json({ reply: `API Error: ${responseText}` }, { status: 200 });
    }

    const data = JSON.parse(responseText);
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";

    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    return NextResponse.json({ reply: `Catch Error: ${error.message}` }, { status: 200 });
  }
}
