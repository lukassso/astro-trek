import { initializeApp } from "firebase/app";

const isNetlify = import.meta.env.MODE === 'production';

const envPrefix = isNetlify ? 'VITE_' : 'PUBLIC_';

function getEnvVariable(name: string) {
    const variable = import.meta.env[`${envPrefix}${name}`];
    if (!variable) {
        throw new Error(`Missing environment variable: ${envPrefix}${name}`);
    }
    return variable;
}

const firebaseConfig = {
    apiKey: getEnvVariable('FIREBASE_API_KEY'),
    authDomain: getEnvVariable('FIREBASE_AUTH_DOMAIN'),
    projectId: getEnvVariable('FIREBASE_PROJECT_ID'),
    storageBucket: getEnvVariable('FIREBASE_STORAGE_BUCKET'),
    messagingSenderId: getEnvVariable('FIREBASE_MESSAGING_SENDER_ID'),
    appId: getEnvVariable('FIREBASE_APP_ID'),
    measurementId: getEnvVariable('MEASUREMENT_ID'),
};

export const app = initializeApp(firebaseConfig);
