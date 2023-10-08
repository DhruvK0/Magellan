// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIYATBu6Dzreswmx7HfUvg6BlIjKdeU4o",
  authDomain: "magellan-62c66.firebaseapp.com",
  projectId: "magellan-62c66",
  storageBucket: "magellan-62c66.appspot.com",
  messagingSenderId: "769493190655",
  appId: "1:769493190655:web:a4adbce66a79a08f3049ca",
  measurementId: "G-9HJKSD7L9W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);