import { createClient } from "@supabase/supabase-js";

const getEnvVar = (key: string): string => {
  const value = import.meta.env.SSR ? process.env[key] : import.meta.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value as string;
};

const supabaseUrl = getEnvVar(import.meta.env.SSR ? "SUPABASE_URL" : "PUBLIC_SUPABASE_URL");
const supabaseKey = getEnvVar(import.meta.env.SSR ? "SUPABASE_KEY" : "PUBLIC_SUPABASE_KEY");

export const supabase = createClient(supabaseUrl, supabaseKey);
