import { initializeApp } from "firebase/app";

if (!process.env.VITE_FIREBASE_API_KEY) {
	throw new Error("Missing VITE_FIREBASE_API_KEY");
}

const firebaseConfig = {
	apiKey: process.env.VITE_FIREBASE_API_KEY,
	authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.VITE_FIREBASE_APP_ID,
	measurementId: process.env.VITE_MEASUREMENT_ID,
};

export const app = initializeApp(firebaseConfig);
