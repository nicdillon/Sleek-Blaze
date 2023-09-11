import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChfxOzl0GWryBOh8VZSeD1qirFSfrh8jM",
    authDomain: "sleek-blaze.firebaseapp.com",
    projectId: "sleek-blaze",
    storageBucket: "sleek-blaze.appspot.com",
    messagingSenderId: "711665034901",
    appId: "1:711665034901:web:17de01a635770569fa1d9c",
    measurementId: "G-MVPZP6D0Y6"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();