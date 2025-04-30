import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

/**
 * Generuje SQL dla zapytania użytkownika.
 * @param prompt Tekst pytania od użytkownika, np. "List survivors under 30"
 * @returns Zapytanie SQL jako string, np. SELECT ... FROM titanic
 */

export async function generateSQL(prompt: string): Promise<string> {
  const systemPrompt = `
You are a PostgreSQL expert. You only generate safe SELECT queries for the Titanic dataset.
Table name: titanic

Columns:
- name (text)
- age (integer)
- ticket (text)
- survived (integer)

Rules:
- Always use the full list of columns: SELECT name, age, ticket, survived
- Never use SELECT *
-For the "survived" column, use 1 for survivors and 0 for non-survivors
- Do not use INSERT, UPDATE, DELETE or DROP.
- Always return valid SQL.
- Always reference only the table "titanic".
- You can include WHERE, ORDER BY, LIMIT, etc.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ],
    temperature: 0,
  });

  return completion.choices[0].message?.content?.trim().replace(/;+$/, '') || "";
}
