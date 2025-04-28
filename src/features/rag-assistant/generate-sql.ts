// utils/generateSQL.ts
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

export async function generateSQL(prompt: string) {
  const systemPrompt = `
You are an expert SQL generator. 
Given user questions, generate PostgreSQL queries for the Titanic dataset.
Always select exactly these columns: name, age, ticket, survived.

Table: titanic
Columns: 
- name (text)
- age (integer)
- ticket (text)
- survived (boolean)
`;

  const messages = [
    { role: "system", content: systemPrompt },
    { role: "user", content: prompt },
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages,
  });

  return completion.choices[0].message?.content?.trim();
}
