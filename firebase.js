// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANsADHkHwbYjlFXRsZR7tE0eiYhSnEXao",
  authDomain: "tinder-clone-3f017.firebaseapp.com",
  projectId: "tinder-clone-3f017",
  storageBucket: "tinder-clone-3f017.appspot.com",
  messagingSenderId: "347959046486",
  appId: "1:347959046486:web:4c0f9f82bc19ab7e1026f7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db }