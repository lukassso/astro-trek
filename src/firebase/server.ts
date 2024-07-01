import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();

const serviceAccount = {
	projectId: process.env.VITE_FIREBASE_PROJECT_ID,
	privateKey: process.env.VITE_FIREBASE_PRIVATE_KEY,
	privateKeyId: process.env.VITE_FIREBASE_PRIVATE_KEY_ID,
	clientEmail: process.env.VITE_FIREBASE_CLIENT_EMAIL,
	clientId: process.env.VITE_FIREBASE_CLIENT_ID,
	authUri: process.env.VITE_FIREBASE_AUTH_URI,
	tokenUri: process.env.VITE_FIREBASE_TOKEN_URI,
	authProviderX509CertUrl: process.env.VITE_FIREBASE_AUTH_CERT_URL,
	clientC509CertUrl: process.env.VITE_FIREBASE_CLIENT_CERT_URL,
};

const initApp = () => {
	console.info(`Project ID: ${serviceAccount.projectId}`);

	if (!serviceAccount.projectId) {
		throw new Error("Missing projectId in serviceAccount.");
	}
	console.info("Loading service account from env.");
	return initializeApp({
		credential: cert(serviceAccount as ServiceAccount),
		projectId: serviceAccount.projectId,
	});
};

const app = activeApps.length === 0 ? initApp() : activeApps[0];

export { app };
