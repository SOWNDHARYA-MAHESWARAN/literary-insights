// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpTSxI5atNcrhBSdhbjbVd--8ksQDaYwk",
  authDomain: "bookdashboard-8ad59.firebaseapp.com",
  projectId: "bookdashboard-8ad59",
  storageBucket: "bookdashboard-8ad59.appspot.com",
  messagingSenderId: "575144369040",
  appId: "1:575144369040:web:044902d999a16c2e50b115",
  measurementId: "G-3LYE8RC2YX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
