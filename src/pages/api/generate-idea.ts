import type { APIRoute } from "astro";
import { useTranslations } from "@/i18n/utils";
import type { Language } from "@/types";

// KEY DIRECTIVE: This tells Astro not to pre-render this endpoint at build time.
// It must be treated as a dynamic, server-side resource.
export const prerender = false;

// Interface for type-checking the expected response structure from the Gemini API.
// Using optional chaining (`?`) makes it robust against missing fields.
interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text: string }> } }>;
  error?: { message: string };
}

// The main API route handler, triggered by a POST request.
export const POST: APIRoute = async ({ request }) => {
  // Use a try...catch block to handle any potential errors gracefully,
  // such as invalid JSON in the request body or network issues.
  try {
    // STEP 1: Parse the request body. This is a potential failure point.
    const body = await request.json();

    // STEP 2: Handle the special "warmup" action.
    // This allows the client to "wake up" the serverless function without
    // making a costly API call to Gemini.
    if (body.action === "warmup") {
      console.log("🔥 Warmup request received. Function is now warm.");
      return new Response(JSON.stringify({ status: "warmed-up" }), { status: 200 });
    }

    // STEP 3: If it's not a warmup, proceed with the normal logic.
    // Securely extract and validate the client-provided inputs.
    const { keyword, lang } = body as { keyword: string; lang: Language['lang'] };

    if (!keyword || typeof keyword !== "string") {
      return new Response(JSON.stringify({ error: "Keyword is required." }), { status: 400 });
    }
    // Validate that the language is one of the supported ones.
    if (!lang || (lang !== 'en' && lang !== 'pl')) {
      return new Response(JSON.stringify({ error: "A valid language ('en' or 'pl') is required." }), { status: 400 });
    }

    // STEP 4: Securely get the API key from server-side environment variables.
    // This key is NEVER exposed to the client.
    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Critical Server Error: GEMINI_API_KEY is not set.");
      return new Response(JSON.stringify({ error: "Server configuration error." }), {
        status: 500,
      });
    }

    // STEP 5: Prepare the language-specific request for the Gemini API.
    // Initialize the translation function for the language provided by the client.
    const t = useTranslations(lang);

    // Generate the translated prompt using the `t` function and placeholder replacement.
    const prompt = t('api.gemini.prompt', { keyword: keyword });

    // Ensure we use the :generateContent endpoint for POST requests
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // STEP 6: Call the external Gemini API. This is another potential failure point.
    const geminiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    // Handle non-200 responses properly, even if they aren't JSON
    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error(`Gemini API Error (${geminiResponse.status}):`, errorText);
      let errorMessage = "Error communicating with the AI.";
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson?.error?.message || errorMessage;
      } catch (e) {
        // Response was not JSON, use the raw text if it's short
        if (errorText.length < 200) errorMessage = errorText;
      }
      return new Response(JSON.stringify({ error: errorMessage }), {
        status: geminiResponse.status,
      });
    }

    const result: GeminiResponse = await geminiResponse.json();

    // STEP 7: Safely extract the generated text and send it back to the client.
    // Optional chaining (`?.`) prevents runtime errors if the structure is unexpected.
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return new Response(JSON.stringify({ idea: text.trim() }), { status: 200 });
    } else {
      // This case handles a 200 OK response that has an unexpected body structure.
      console.error("Unexpected response structure from Gemini API:", result);
      return new Response(
        JSON.stringify({ error: "Failed to generate an idea from the AI response." }),
        { status: 500 },
      );
    }
  } catch (error) {
    // The catch block will handle any errors from the steps above,
    // including parsing the request body or network failures.
    console.error("Critical error in the API endpoint:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error.", details: error.message }),
      { status: 500 },
    );
  }
};