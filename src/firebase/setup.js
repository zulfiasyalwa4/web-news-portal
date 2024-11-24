import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Directly use import.meta.env.VITE_FIREBASE_CONFIG without JSON.parse()
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleprovider = new GoogleAuthProvider();
