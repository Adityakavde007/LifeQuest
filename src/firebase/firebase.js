import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhcWMAVDcWo7MLkShc4Ymair_LT0ciLpc",
  authDomain: "lifequest-28c2a.firebaseapp.com",
  projectId: "lifequest-28c2a",
  storageBucket: "lifequest-28c2a.firebasestorage.app",
  messagingSenderId: "1014114055599",
  appId: "1:1014114055599:web:ca8672a8b6f8ab7550eb5a",
  measurementId: "G-PLBFVKZ920",
};

const app = initializeApp(firebaseConfig);

// Authentication
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;