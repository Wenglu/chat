import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsF2kW7T9WSh8awel8RTEe7FBvRKDpdek",
  authDomain: "chat-4528d.firebaseapp.com",
  projectId: "chat-4528d",
  storageBucket: "chat-4528d.appspot.com",
  messagingSenderId: "287703792838",
  appId: "1:287703792838:web:ab4ad9b72fd9fe9d36abc7",
  measurementId: "G-4C7EQ636YJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(); 