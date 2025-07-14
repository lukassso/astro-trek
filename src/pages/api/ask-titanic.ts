import { generateSQL } from "../../features/rag-assistant/generate-sql";
import { supabase } from "@/supabase/client";
import { askOpenAI } from "./ask-open-ai";

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
    console.error("Błąd: GEnerated empty SQL");
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
    throw new Error("Query execution failed");
  }

  if (error) {
    console.error("SQL Error:", error);
    return new Response(JSON.stringify({ response: "SQL execution error." }), { status: 500 });
  }

  const context = JSON.stringify(data);
  const response = await askOpenAI(userMessage, context);

  return new Response(JSON.stringify({ role: "assistant", content: response }), { status: 200 });
}
