import type { APIRoute } from "astro";
import { OpenAI } from "openai";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.OPENAI_API_KEY;

  if (!apiKey) {
    console.error("Critical Server Error: OPENAI_API_KEY is not set.");
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const { prompt, context } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return new Response(
        JSON.stringify({ error: "Prompt is required" }),
        { status: 400 }
      );
    }

    const messages: Array<{ role: "system" | "user"; content: string }> = [
      { role: "system", content: "You are a Titanic data analyst." },
      { role: "user", content: `${prompt}\n\nTitanic data:\n${context || ""}` },
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages,
    });

    return new Response(
      JSON.stringify({ content: completion.choices[0].message?.content }),
      { status: 200 }
    );
  } catch (error) {
    console.error("OpenAI API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500 }
    );
  }
};
