import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  User,
  Auth
} from "firebase/auth";

// Public Firebase client configuration loaded strictly from environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Singleton pattern to prevent multiple Firebase app initializations in Next.js
function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined" && !firebaseConfig.apiKey) {
    // Graceful handling during static pre-rendering when env vars might be undefined
    return null;
  }
  if (!getApps().length) {
    if (!firebaseConfig.apiKey) {
      console.warn("Firebase API key missing from environment variables.");
      return null;
    }
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

const app = getFirebaseApp();
const auth: Auth | null = app ? getAuth(app) : null;

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export { app, auth, googleProvider };

/**
 * Sign in client using Google Popup with automatic Redirect fallback
 */
export async function signInWithGoogle() {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please verify environment configuration.");
  }
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("popup-blocked") || msg.includes("cancelled-popup-request")) {
      // Fallback seamlessly to redirect flow
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw err;
  }
}

/**
 * Handle user returning from Google Redirect
 */
export async function checkRedirectAuth(): Promise<User | null> {
  if (!auth) return null;
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (err) {
    console.error("Redirect auth error:", err);
    return null;
  }
}

/**
 * Register client using Email & Password
 */
export async function registerWithCredentials(email: string, pass: string, displayName: string) {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please verify environment configuration.");
  }
  const credential = await createUserWithEmailAndPassword(auth, email, pass);
  if (displayName) {
    await updateProfile(credential.user, {
      displayName: displayName.trim(),
    });
  }
  return credential.user;
}

/**
 * Sign in client using Email & Password
 */
export async function signInWithCredentials(email: string, pass: string) {
  if (!auth) {
    throw new Error("Firebase Auth is not initialized. Please verify environment configuration.");
  }
  const credential = await signInWithEmailAndPassword(auth, email, pass);
  return credential.user;
}

/**
 * Sign out current client
 */
export async function signOutClient() {
  if (!auth) return;
  await signOut(auth);
}
