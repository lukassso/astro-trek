import { initializeApp } from "firebase/app";

function getEnvVariable(key: string) {
	const isProduction = process.env.NODE_ENV === "production";

	if (isProduction) {
		const prodKey = `VITE_${key}`;
		if (!process.env[prodKey]) {
			throw new Error(`Missing environment variable: ${prodKey}`);
		}
		return process.env[prodKey];
	} else {
		const devKey = `PUBLIC_${key}`;
		if (!import.meta.env[devKey]) {
			throw new Error(`Missing environment variable: ${devKey}`);
		}
		return import.meta.env[devKey];
	}
}

const firebaseConfig = {
	apiKey: getEnvVariable("FIREBASE_API_KEY"),
	authDomain: getEnvVariable("FIREBASE_AUTH_DOMAIN"),
	projectId: getEnvVariable("FIREBASE_PROJECT_ID"),
	storageBucket: getEnvVariable("FIREBASE_STORAGE_BUCKET"),
	messagingSenderId: getEnvVariable("FIREBASE_MESSAGING_SENDER_ID"),
	appId: getEnvVariable("FIREBASE_APP_ID"),
	measurementId: getEnvVariable("MEASUREMENT_ID"),
};

export const app = initializeApp(firebaseConfig);
