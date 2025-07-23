import { supabase } from "@/supabase/client";

export async function fetchTitanicContext(limit = 5) {
  const { data, error } = await supabase.from("titanic").select("*").ilike("name", "%John%");

  if (error) {
    console.error("Supabase error:", error);
    return "";
  }

  return data
    .map(
      (row) =>
        `${row.name}, ${row.age} years old, ticket ${row.ticket}, ${
          row.survived ? "survived" : "did not survive"
        }`,
    )
    .join("\n");
}
