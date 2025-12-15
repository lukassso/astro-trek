import { generateSQL } from "../../features/rag-assistant/generate-sql";
import { supabase } from "@/supabase/client";

export const prerender = false;

export async function POST({ request }: { request: Request }) {
  const { messages } = await request.json();
  const userMessage = messages?.find((msg) => msg.role === "user")?.content;

  if (!userMessage) {
    return new Response(JSON.stringify({ response: "No user message provided." }), { status: 400 });
  }

  const sqlQuery = await generateSQL(userMessage);
  console.log("Generated SQL:", sqlQuery);

  if (!sqlQuery || sqlQuery.trim() === "") {
    console.error("Błąd: Generated empty SQL");
    return new Response(JSON.stringify({ response: "Error generating SQL query." }), {
      status: 500,
    });
  }

  const { data, error } = await supabase
    .rpc("execute_sql", {
      query: sqlQuery,
    })
    .select("*");

  if (error) {
    console.error("SQL Error Details:", {
      generatedQuery: sqlQuery,
      supabaseError: error,
    });
    return new Response(JSON.stringify({ response: "SQL execution error." }), { status: 500 });
  }

  // Call the secure OpenAI API endpoint instead of direct function
  const context = JSON.stringify(data);

  try {
    const openaiResponse = await fetch("/api/ask-open-ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage, context }),
    });

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.status}`);
    }

    const { content } = await openaiResponse.json();
    return new Response(JSON.stringify({ role: "assistant", content }), { status: 200 });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    return new Response(
      JSON.stringify({ response: "Error generating AI response." }),
      { status: 500 }
    );
  }
}

