export const prerender = false;
export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url).searchParams.get("url");
  if (!url) {
    return new Response(JSON.stringify({ error: "Missing URL" }), { status: 400 });
  }

  const apiKey = import.meta.env.PARSERA_API_KEY;

  try {
    const parseraRes = await fetch("https://api.parsera.org/v1/extract", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
      body: JSON.stringify({
        url,
        attributes: {
          "title": "Extract the title of the page or article.",
          "data": "Capture the most important data points presented on the page.",
          "summary": "Generate a summary of the content in bullet points."
        },
      }),
    });

    if (!parseraRes.ok) {
      throw new Error(`Parsera error: ${parseraRes.statusText}`);
    }

    const data = await parseraRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
