import type { APIRoute } from 'astro';

// KEY DIRECTIVE: This tells Astro not to pre-render this endpoint at build time.
// It must be treated as a dynamic, server-side resource.
export const prerender = false;

interface GeminiResponse {
  candidates?: Array<{ content?: { parts?: Array<{ text: string }> } }>;
  error?: { message: string };
}

export const POST: APIRoute = async ({ request }) => {
  // Use a try...catch block to handle any potential errors gracefully,
  // such as invalid JSON in the request body or network issues.
  try {
    // STEP 1: Parse the request body. This is a potential failure point.
    const body = await request.json();

    // STEP 2: Handle the special "warmup" action.
    // This allows the client to "wake up" the serverless function without
    // making a costly API call to Gemini.
    if (body.action === 'warmup') {
      console.log('🔥 Warmup request received. Function is now warm.');
      return new Response(JSON.stringify({ status: 'warmed-up' }), { status: 200 });
    }

    // STEP 3: If it's not a warmup, proceed with the normal logic.
    // Validate the incoming 'keyword'.
    const { keyword } = body;
    if (!keyword || typeof keyword !== 'string') {
      return new Response(JSON.stringify({ error: 'Keyword is required.' }), { status: 400 });
    }

    // STEP 4: Securely get the API key from environment variables.
    // This key is NEVER exposed to the client.
    const apiKey = import.meta.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Critical Server Error: GEMINI_API_KEY is not set.");
      return new Response(JSON.stringify({ error: 'Server configuration error.' }), { status: 500 });
    }

    // STEP 5: Prepare the request to the Gemini API.
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const prompt = `Zaproponuj krótki, kreatywny pomysł na projekt z dziedziny Data Science/AI, związany z "${keyword}". Skup się na problemie do rozwiązania, potencjalnych danych i modelu ML/DL. Odpowiedź sformułuj zwięźle i profesjonalnie, jako gotowy tekst do wyświetlenia.`;

    // STEP 6: Call the external Gemini API. This is another potential failure point.
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });

    const result: GeminiResponse = await geminiResponse.json();

    // Handle non-200 responses from the Gemini API.
    if (!geminiResponse.ok) {
        console.error('Error response from Gemini API:', result);
        const errorMessage = result?.error?.message || 'Error communicating with the AI.';
        return new Response(JSON.stringify({ error: errorMessage }), { status: geminiResponse.status });
    }

    // STEP 7: Extract the generated text and send it back to the client.
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return new Response(JSON.stringify({ idea: text.trim() }), { status: 200 });
    } else {
      console.error('Unexpected response structure from Gemini API:', result);
      return new Response(JSON.stringify({ error: 'Failed to generate an idea from the AI response.' }), { status: 500 });
    }

  } catch (error) {
    // The catch block will handle any errors from the steps above,
    // including parsing the request body or network failures.
    console.error("Critical error in the API endpoint:", error);
    return new Response(JSON.stringify({ error: 'Internal Server Error.', details: error.message }), { status: 500 });
  }
};