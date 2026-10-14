import type { APIRoute } from "astro";
import { getNoteLikes, incrementNoteLikes } from "@/utils/notesBlobStorage";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const noteId = url.searchParams.get("noteId");

  if (!noteId) {
    return new Response(
      JSON.stringify({ error: "Missing noteId query param" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const initialLikesRaw = url.searchParams.get("initialLikes");
  const fallbackLikes = initialLikesRaw ? Number.parseInt(initialLikesRaw, 10) : 0;

  try {
    const likes = await getNoteLikes(noteId, Number.isNaN(fallbackLikes) ? 0 : fallbackLikes);
    return new Response(
      JSON.stringify({ noteId, likes }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, s-maxage=10, stale-while-revalidate=59",
        },
      }
    );
  } catch (error) {
    console.error("[api/notes/like GET] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch likes" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const noteId = body?.noteId;
    const delta = typeof body?.delta === "number" && body.delta > 0 ? Math.min(body.delta, 50) : 1;
    const initialLikes = typeof body?.initialLikes === "number" ? body.initialLikes : 0;

    if (!noteId || typeof noteId !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing or invalid noteId" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const likes = await incrementNoteLikes(noteId, delta, initialLikes);
    return new Response(
      JSON.stringify({ noteId, likes }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[api/notes/like POST] Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to increment likes" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
