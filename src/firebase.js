import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEVTc5aCZGZ0nsrMXM04oTD5z-S8Znlls",
  authDomain: "meganhart-f65e3.firebaseapp.com",
  projectId: "meganhart-f65e3",
  storageBucket: "meganhart-f65e3.firebasestorage.app", // ← probabil asta
  messagingSenderId: "14053566025",
  appId: "1:14053566025:web:07292b23ba522cbddbc198",
  measurementId: "G-447LFHSRTV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// persistență locală (opțional, dar util)
setPersistence(auth, browserLocalPersistence).catch(() => { /* ignore */ });

if (typeof window !== "undefined") {
  isSupported().then(ok => { if (ok) getAnalytics(app); });
}

export default app;
