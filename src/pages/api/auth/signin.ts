import type { APIRoute } from "astro";
import { app } from "../../../firebase/server";
import { getAuth } from "firebase-admin/auth";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
	const auth = getAuth(app);
  const { idToken } = await request.json();

	try {
		if (!idToken) {
			return new Response("Missing idToken", { status: 400 });
		}

		const decodedToken = await auth.verifyIdToken(idToken);
		if (!decodedToken) {
			return new Response("Invalid token", { status: 401 });
		}

		const sessionCookie = await auth.createSessionCookie(idToken, {
			expiresIn: 60 * 60 * 24 * 5 * 1000,
		});

		cookies.set("__session", sessionCookie, {
			path: "/",
		});

		return redirect("/firebase-auth/dashboard");
	} catch (error) {
		console.error("Error during sign-in:", error);
		return new Response("Something went wrong", { status: 500 });
	}
};
