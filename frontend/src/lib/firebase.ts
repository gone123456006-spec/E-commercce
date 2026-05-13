import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';

const env = (key: string): string =>
    String((import.meta.env as Record<string, string | undefined>)[key] || '').trim();

const REQUIRED_KEYS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
] as const;

/** True when all required web config keys are set (Phone Auth can run). */
export function isFirebaseAuthConfigured(): boolean {
    return REQUIRED_KEYS.every((k) => !!env(k));
}

let app: FirebaseApp | null = null;
let auth: Auth | null = null;

export function getFirebaseAuth(): Auth {
    if (!isFirebaseAuthConfigured()) {
        throw new Error('Firebase web config missing. Copy frontend/.env.example into .env and set VITE_FIREBASE_*.');
    }
    if (!app) {
        app = initializeApp({
            apiKey: env('VITE_FIREBASE_API_KEY'),
            authDomain: env('VITE_FIREBASE_AUTH_DOMAIN'),
            projectId: env('VITE_FIREBASE_PROJECT_ID'),
            storageBucket: env('VITE_FIREBASE_STORAGE_BUCKET'),
            messagingSenderId: env('VITE_FIREBASE_MESSAGING_SENDER_ID'),
            appId: env('VITE_FIREBASE_APP_ID'),
            measurementId: env('VITE_FIREBASE_MEASUREMENT_ID') || undefined,
        });
        auth = getAuth(app);
    }
    return auth;
}
