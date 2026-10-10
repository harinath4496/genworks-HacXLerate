import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnNXRiq-Xiouj83RDnXqxu_1N_S2fY1xc",
  authDomain: "genworks-acd49.firebaseapp.com",
  projectId: "genworks-acd49",
  storageBucket: "genworks-acd49.firebasestorage.app",
  messagingSenderId: "507970018920",
  appId: "1:507970018920:web:20588ec92898aed3a825dd",
  measurementId: "G-7RYSZDZ1H8"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, auth, googleProvider, signInWithPopup, signOut };
