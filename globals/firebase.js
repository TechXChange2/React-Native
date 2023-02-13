// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBD3RvFFxLovNpQ0A0SX5RUBRM0cFJmBY",
  authDomain: "techxchange-auth.firebaseapp.com",
  projectId: "techxchange-auth",
  storageBucket: "techxchange-auth.appspot.com",
  messagingSenderId: "1043099080878",
  appId: "1:1043099080878:web:b474cc5cce0ef65ddfb53f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth };