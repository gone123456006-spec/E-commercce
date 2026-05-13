import admin from 'firebase-admin';

/**
 * Initialize Firebase Admin from FIREBASE_SERVICE_ACCOUNT_JSON (full JSON string).
 * Required for POST /api/auth/firebase-verify.
 */
export function initFirebaseAdmin() {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    if (!raw || !String(raw).trim()) {
        console.warn('⚠️  FIREBASE_SERVICE_ACCOUNT_JSON not set — Firebase ID token verify route disabled');
        return false;
    }
    try {
        if (admin.apps.length === 0) {
            const cred = JSON.parse(String(raw));
            admin.initializeApp({
                credential: admin.credential.cert(cred),
            });
        }
        console.log('✅ Firebase Admin initialized');
        return true;
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error('❌ Firebase Admin init failed:', msg);
        return false;
    }
}

export function isFirebaseAdminReady() {
    return admin.apps.length > 0;
}

export async function verifyFirebaseIdToken(idToken) {
    return admin.auth().verifyIdToken(idToken);
}
