import type { Handler } from "@netlify/functions";

const handler: Handler = async () => {
	try {
		const clearCookie = "__session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly";

		return {
			statusCode: 302,
			headers: {
				"Set-Cookie": clearCookie,
				Location: "/signin/",
			},
			body: JSON.stringify({ message: "Successfully signed out" }),
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error }),
		};
	}
};

export { handler };
