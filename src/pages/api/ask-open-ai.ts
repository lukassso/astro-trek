// utils/askOpenAI.ts
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY
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

// pages/api/askTitanic.ts (lub w backendzie)
import { fetchTitanicContext } from "../../features/rag-assistant/fetchTitanicContext";

export default async function handler(req, res) {
  const { prompt } = req.body;

  const context = await fetchTitanicContext(10); // Pobierz dane z Supabase
  const response = await askOpenAI(prompt, context); // Zapytaj model z kontekstem

  res.status(200).json({ response });
}

