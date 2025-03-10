import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  try {
    const { email, password, name } = await request.json();

    // Basic server-side validation
    if (!email || !password || !name) {
      return new Response("Missing form data", { status: 400 });
    }

    // Create user
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 400 });
  }

  return redirect("/firebase-auth/signin");
};
