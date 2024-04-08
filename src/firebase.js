// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

require('dotenv').config();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_firebase_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_firebase_authDomain,
  projectId: process.env.NEXT_PUBLIC_firebase_projectId,
  storageBucket: process.env.NEXT_PUBLIC_firebase_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_firebase_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_firebase_appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);