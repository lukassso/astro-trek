import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

export async function askOpenAI(prompt: string, context: string) {
  const messages = [
    { role: "system", content: "You are a Titanic data analyst." },
    { role: "user", content: `${prompt}\n\nTitanic data:\n${context}` },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  return completion.choices[0].message?.content;
}
