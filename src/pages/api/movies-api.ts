import type { APIRoute } from "astro";
import { API_ENDPOINT } from "@/features/movie-app/const";

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const searchParam = url.searchParams.get("s") || "robot";
  const id = url.searchParams.get("i");
  const page = url.searchParams.get("page") || "1";
  const apiKey = import.meta.env.MOVIE_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error" }),
      { status: 500 }
    );
  }

  let apiUrl = `${API_ENDPOINT}?apikey=${apiKey}`;

  if (id) {
    apiUrl += `&i=${encodeURIComponent(id)}`;
  } else if (searchParam) {
    apiUrl += `&s=${encodeURIComponent(searchParam)}&page=${encodeURIComponent(page)}`;
  } else {
    return new Response(JSON.stringify({ error: "Search parameter or ID is required" }), {
      status: 400,
    });
  }

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      const errMsg = await response.text();
      return new Response(
        JSON.stringify({ error: `API request failed with status ${response.status}: ${errMsg}` }),
        { status: response.status },
      );
    }
    const result = await response.json();
    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), { status: 500 });
  }
};
