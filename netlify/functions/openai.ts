import type { Handler, HandlerEvent } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const { messages, temperature, max_tokens, top_p, frequency_penalty, presence_penalty } =
      JSON.parse(event.body || "{}");

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return { statusCode: 400, body: JSON.stringify({ error: "Messages are required" }) };
    }

    const response = await fetch(apiUrl, {
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
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: JSON.stringify({ error: "Internal Server Error" }) };
  }
};

export { handler };
