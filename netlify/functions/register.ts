import type { Handler } from "@netlify/functions";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../src/firebase/server";
import querystring from "querystring";

const handler: Handler = async (event) => {
	const auth = getAuth(app);
	let data: { [key: string]: string } = {};

	const contentType = event.headers["content-type"] || event.headers["Content-Type"];
	if (contentType?.includes("application/json")) {
		if (event.body !== null) {
			data = JSON.parse(event.body);
		} else {
			return {
				statusCode: 400,
				body: JSON.stringify({ message: "Invalid request body" }),
			};
		}
	} else if (contentType?.includes("application/x-www-form-urlencoded")) {
		data = querystring.parse(event.body || "") as { [key: string]: string };
	}

	const { email, password, name } = data;

	if (!email || !password || !name) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: "Missing form data" }),
		};
	}

	try {
		const userRecord = await auth.createUser({
			email,
			password,
			displayName: name,
		});

		return {
			statusCode: 302,
			headers: {
				Location: "/signin/",
			},
			body: JSON.stringify({ uid: userRecord.uid }),
		};
	} catch (error: any) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message }),
		};
	}
};

export { handler };
