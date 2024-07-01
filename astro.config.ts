import { defineConfig } from "astro/config";
import icon from "astro-icon";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import { expressiveCodeOptions } from "./src/site.config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import dotenv from "dotenv";

dotenv.config();

// https://astro.build/config
export default defineConfig({
	site: "https://zetkolek.netlify.app/",
	trailingSlash: 'always',
	integrations: [
		expressiveCode(expressiveCodeOptions),
		icon({
			include: {
				tabler: ["*"],
			},
		}),
		tailwind({
			applyBaseStyles: true,
		}),
		mdx(),
		react(),
	],
	output: "hybrid",
	adapter: netlify({
		edgeMiddleware: true,
	}),
	vite: {
		define: {
			"process.env.PUBLIC_MOVIE_API_KEY": JSON.stringify(process.env.PUBLIC_MOVIE_API_KEY),
			"process.env.MOVIE_API_KEY": JSON.stringify(process.env.MOVIE_API_KEY),
			"process.env.PUBLIC_OPENAI_API_KEY": JSON.stringify(process.env.PUBLIC_OPENAI_API_KEY),
			"process.env.OPENAI_API_KEY": JSON.stringify(process.env.OPENAI_API_KEY),
			"process.env.PUBLIC_FIREBASE_PROJECT_ID": JSON.stringify(
				process.env.PUBLIC_FIREBASE_PROJECT_ID,
			),
			"process.env.PUBLIC_FIREBASE_PRIVATE_KEY_ID": JSON.stringify(
				process.env.PUBLIC_FIREBASE_PRIVATE_KEY_ID,
			),
			"process.env.PUBLIC_FIREBASE_PRIVATE_KEY": JSON.stringify(
				process.env.PUBLIC_FIREBASE_PRIVATE_KEY,
			),
			"process.env.PUBLIC_FIREBASE_CLIENT_EMAIL": JSON.stringify(
				process.env.PUBLIC_FIREBASE_CLIENT_EMAIL,
			),
			"process.env.PUBLIC_FIREBASE_CLIENT_ID": JSON.stringify(
				process.env.PUBLIC_FIREBASE_CLIENT_ID,
			),
			"process.env.PUBLIC_FIREBASE_AUTH_URI": JSON.stringify(process.env.PUBLIC_FIREBASE_AUTH_URI),
			"process.env.PUBLIC_FIREBASE_TOKEN_URI": JSON.stringify(
				process.env.PUBLIC_FIREBASE_TOKEN_URI,
			),
			"process.env.PUBLIC_FIREBASE_AUTH_CERT_URL": JSON.stringify(
				process.env.PUBLIC_FIREBASE_AUTH_CERT_URL,
			),
			"process.env.PUBLIC_FIREBASE_CLIENT_CERT_URL": JSON.stringify(
				process.env.PUBLIC_FIREBASE_CLIENT_CERT_URL,
			),
			"process.env.PUBLIC_FIREBASE_API_KEY": JSON.stringify(process.env.PUBLIC_FIREBASE_API_KEY),
			"process.env.PUBLIC_FIREBASE_AUTH_DOMAIN": JSON.stringify(
				process.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
			),
			"process.env.PUBLIC_FIREBASE_STORAGE_BUCKET": JSON.stringify(
				process.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
			),
			"process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
				process.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
			),
			"process.env.PUBLIC_FIREBASE_APP_ID": JSON.stringify(process.env.PUBLIC_FIREBASE_APP_ID),
			"process.env.PUBLIC_MEASUREMENT_ID": JSON.stringify(process.env.PUBLIC_MEASUREMENT_ID),

			"process.env.VITE_FIREBASE_API_KEY": JSON.stringify(process.env.VITE_FIREBASE_API_KEY),
			"process.env.VITE_FIREBASE_AUTH_DOMAIN": JSON.stringify(
				process.env.VITE_FIREBASE_AUTH_DOMAIN,
			),
			"process.env.VITE_FIREBASE_PROJECT_ID": JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
			"process.env.VITE_FIREBASE_PRIVATE_KEY": JSON.stringify(
				process.env.VITE_FIREBASE_PRIVATE_KEY,
			),
			"process.env.VITE_FIREBASE_CLIENT_EMAIL": JSON.stringify(
				process.env.VITE_FIREBASE_CLIENT_EMAIL,
			),
			"process.env.VITE_FIREBASE_CLIENT_ID": JSON.stringify(process.env.VITE_FIREBASE_CLIENT_ID),
			"process.env.VITE_FIREBASE_AUTH_URI": JSON.stringify(process.env.VITE_FIREBASE_AUTH_URI),
			"process.env.VITE_FIREBASE_TOKEN_URI": JSON.stringify(process.env.VITE_FIREBASE_TOKEN_URI),
			"process.env.VITE_FIREBASE_AUTH_CERT_URL": JSON.stringify(
				process.env.VITE_FIREBASE_AUTH_CERT_URL,
			),
			"process.env.VITE_FIREBASE_CLIENT_CERT_URL": JSON.stringify(
				process.env.VITE_FIREBASE_CLIENT_CERT_URL,
			),
			"process.env.VITE_FIREBASE_STORAGE_BUCKET": JSON.stringify(
				process.env.VITE_FIREBASE_STORAGE_BUCKET,
			),
			"process.env.VITE_FIREBASE_MESSAGING_SENDER_ID": JSON.stringify(
				process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
			),
			"process.env.VITE_FIREBASE_APP_ID": JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
			"process.env.VITE_MEASUREMENT_ID": JSON.stringify(process.env.VITE_MEASUREMENT_ID),
		},
	},
});
