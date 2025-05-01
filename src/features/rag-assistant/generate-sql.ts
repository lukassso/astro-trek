import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.PUBLIC_OPENAI_API_KEY,
});

/**
 * Generates SQL for the user's query.
 * @param prompt The user's question text, e.g. 
 * 
 * * Basic Selection
 * 
 * * List all passengers.
 * * Show the names and ages of all passengers.
 * * Display all passengers’ tickets and survival status.
 * 
 * * Filtering by Survival
 * 
 * * List all passengers who survived.
 * * Show all passengers who did not survive.
 * * Show the names of survivors under 18 years old.
 * * List all passengers who did not survive and were older than 50.
 * 
 * * Filtering by Class or Ticket
 * 
 * * Show all first class passengers.
 * * List all second class passengers who survived.
 * * Show all passengers with ticket number 113803.
 * * Display third class passengers who did not survive.
 * 
 * * Filtering by Age
 * 
 * * List all passengers younger than 18.
 * * Show passengers older than 60.
 * * Display all passengers between 20 and 30 years old.
 * 
 * * Filtering by Name
 * 
 * * List all passengers named John.
 * * Show all passengers with the surname Smith.
 * 
 * * Filtering by Gender (if gender column exists, otherwise skip)
 * 
 * * Show all female passengers.
 * * List all male passengers from second class.
 * 
 * * Combined Filters
 * 
 * * Show all first class survivors under 30 years old.
 * * List third class passengers who did not survive and were children.
 * * Show passengers older than 40 who survived.
 * 
 * * Sorting
 * 
 * * List all passengers sorted by age.
 * * Show survivors sorted by ticket number.
 * * Display third class passengers sorted by age in descending order.
 * 
 * * Limiting Results
 * 
 * * Show the first 10 passengers.
 * * List the 5 youngest survivors.
 * * Display 20 oldest passengers who did not survive.
 * 
 * @returns An SQL query as a string, e.g. SELECT ... FROM titanic
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
- pclass (integer)

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
