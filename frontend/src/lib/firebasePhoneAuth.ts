import { RecaptchaVerifier, signInWithPhoneNumber, type ConfirmationResult } from 'firebase/auth';
import { getFirebaseAuth } from './firebase';

let confirmation: ConfirmationResult | null = null;
let verifier: RecaptchaVerifier | null = null;

function clearVerifier(): void {
    try {
        verifier?.clear();
    } catch {
        // ignore
    }
    verifier = null;
}

/** Call when closing login UI or before a new send. */
export async function resetFirebasePhoneAuth(): Promise<void> {
    clearVerifier();
    confirmation = null;
}

/**
 * Send SMS OTP via Firebase Phone Auth.
 * @param e164Phone e.g. +919876543210
 * @param recaptchaContainerId DOM id for Recaptcha (use invisible size)
 */
export async function sendFirebasePhoneOtp(
    e164Phone: string,
    recaptchaContainerId: string
): Promise<void> {
    await resetFirebasePhoneAuth();
    const auth = getFirebaseAuth();
    verifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
        size: 'invisible',
    });
    confirmation = await signInWithPhoneNumber(auth, e164Phone, verifier);
}

/** Confirm SMS code and return Firebase ID token for your backend. */
export async function confirmFirebaseSmsCode(code: string): Promise<string> {
    if (!confirmation) {
        throw new Error('Please tap Get OTP first.');
    }
    const result = await confirmation.confirm(code);
    const idToken = await result.user.getIdToken();
    await resetFirebasePhoneAuth();
    return idToken;
}
