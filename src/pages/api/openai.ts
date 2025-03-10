import type { APIRoute } from "astro";

const API_URL = "https://api.openai.com/v1/chat/completions";

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.DEV
    ? import.meta.env.PUBLIC_OPENAI_API_KEY
    : import.meta.env.OPENAI_API_KEY;

  try {
    const { messages, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } =
      await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "Messages are required" }), { status: 400 });
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.userMessage,
        })),
        temperature,
        max_tokens,
        top_p,
        frequency_penalty,
        presence_penalty,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
};
