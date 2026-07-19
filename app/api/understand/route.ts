import { NextResponse } from "next/server";

type UnderstandRequest = { text?: string; language?: "zh" | "en" };

const fallback = {
  summary: "You find small satisfaction in ordinary life and want to be seen without needing a crowd.",
  summary_zh: "你在普通日常里感到一点满足，想被看见，但不需要热闹。",
  traits: ["Everyday glow", "Light sharing", "No reply pressure"],
  traits_zh: ["日常微光", "轻量分享", "不需要回复压力"],
};

export async function POST(request: Request) {
  const body = (await request.json()) as UnderstandRequest;
  const text = body.text?.trim();
  const language = body.language === "en" ? "en" : "zh";

  if (!text || text.length > 1000) {
    return NextResponse.json({ error: "Please provide between 1 and 1000 characters." }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      configured: false,
      model: "demo-fallback",
      summary: language === "zh" ? fallback.summary_zh : fallback.summary,
      traits: language === "zh" ? fallback.traits_zh : fallback.traits,
    });
  }

  const model = process.env.OPENAI_MODEL || "gpt-5.6-terra";
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model,
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content: `You are Tongchen's careful understanding layer. Interpret a user's current state without diagnosing, stereotyping, or assigning a permanent personality. Return ONLY valid JSON in this shape: {"summary":"one warm sentence","traits":["three concise, temporary, non-sensitive observations"]}. Respond in ${language === "zh" ? "Simplified Chinese" : "English"}. Do not infer sensitive identity, mental illness, politics, sexuality, religion, or medical conditions.`,
        },
        { role: "user", content: text },
      ],
      max_output_tokens: 260,
    }),
  });

  if (!response.ok) {
    const requestId = response.headers.get("x-request-id");
    return NextResponse.json({ error: "OpenAI understanding request failed.", requestId }, { status: 502 });
  }

  const result = await response.json();
  const outputText = result.output
    ?.flatMap((item: { content?: Array<{ type?: string; text?: string }> }) => item.content || [])
    .find((item: { type?: string }) => item.type === "output_text")?.text;

  try {
    const parsed = JSON.parse(outputText || "{}");
    if (typeof parsed.summary !== "string" || !Array.isArray(parsed.traits)) throw new Error("Invalid model output");
    return NextResponse.json({ configured: true, model, summary: parsed.summary, traits: parsed.traits.slice(0, 3) });
  } catch {
    return NextResponse.json({ error: "The model returned an unexpected format." }, { status: 502 });
  }
}
