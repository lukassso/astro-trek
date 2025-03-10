import type { SettingsStoreType, Message } from "./types";

export const fetchOpenAi = async (params: { messages: Message[]; settings: SettingsStoreType }) => {
  const setPath = import.meta.env.DEV ? "/api/openai" : "/.netlify/functions/openai";
  const response = await fetch(setPath, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
