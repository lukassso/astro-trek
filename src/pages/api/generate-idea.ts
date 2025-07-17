import type { APIRoute } from 'astro';

export const prerender = false;

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text: string }>;
    };
  }>;
  error?: {
    message: string;
  };
}

export const POST: APIRoute = async ({ request }) => {
  const { keyword } = await request.json();

  if (!keyword) {
    return new Response(JSON.stringify({ error: 'Słowo kluczowe jest wymagane' }), { status: 400 });
  }

  const apiKey = import.meta.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('Brak klucza GEMINI_API_KEY w zmiennych środowiskowych');
    return new Response(JSON.stringify({ error: 'Błąd konfiguracji serwera' }), { status: 500 });
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  const prompt = `Zaproponuj krótki, kreatywny pomysł na projekt z dziedziny Data Science/AI, związany z "${keyword}". Skup się na problemie do rozwiązania, potencjalnych danych i modelu ML/DL. Odpowiedź sformułuj zwięźle i profesjonalnie, jako gotowy tekst do wyświetlenia.`;

  try {
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error('Błąd z Gemini API:', errorData);
      return new Response(JSON.stringify({ error: 'Błąd podczas komunikacji z AI.' }), { status: geminiResponse.status });
    }

    const result: GeminiResponse = await geminiResponse.json();

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;

    if (text) {
      return new Response(JSON.stringify({ idea: text.trim() }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: 'Nie udało się wygenerować pomysłu.' }), { status: 500 });
    }

  } catch (error) {
    console.error('Błąd serwera podczas wywołania API:', error);
    return new Response(JSON.stringify({ error: 'Wewnętrzny błąd serwera' }), { status: 500 });
  }
};