// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB73CygLnFEgoX29Kc2ZcUOu4Ez0HzcxX8",
  authDomain: "kapscare-e7841.firebaseapp.com",
  projectId: "kapscare-e7841",
  storageBucket: "kapscare-e7841.firebasestorage.app",
  messagingSenderId: "375514761613",
  appId: "1:375514761613:web:a5c3cae302beb17e7cd5c4",
  measurementId: "G-G4983TB7D6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;