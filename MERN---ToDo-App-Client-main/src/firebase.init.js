// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_ss_XNSzmRBdda2OV0sDDE2LrYSFGqh0",
  authDomain: "todo-soft-it.firebaseapp.com",
  projectId: "todo-soft-it",
  storageBucket: "todo-soft-it.appspot.com",
  messagingSenderId: "682282881007",
  appId: "1:682282881007:web:982d413bf545028999701a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;