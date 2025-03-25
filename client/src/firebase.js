// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f39b4.firebaseapp.com",
  projectId: "mern-blog-f39b4",
  storageBucket: "mern-blog-f39b4.appspot.com",
  messagingSenderId: "934100938884",
  appId: "1:934100938884:web:44bd8c4fb3f52c779992d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app }; // Ensure you're exporting `app`