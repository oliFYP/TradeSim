import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjW0VdDVD3BYHraRfclO9ncUL5SGIPbwY",
  authDomain: "tradesim-cd716.firebaseapp.com",
  projectId: "tradesim-cd716",
  storageBucket: "tradesim-cd716.firebasestorage.app",
  messagingSenderId: "717628854935",
  appId: "1:717628854935:web:a8adc5994b13c02e218fd2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
