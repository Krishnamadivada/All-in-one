// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAigx5BGbZkIZPbI92LnzjnVvZULi4RaQE",
  authDomain: "todo-abf07.firebaseapp.com",
  projectId: "todo-abf07",
  storageBucket: "todo-abf07.appspot.com",
  messagingSenderId: "859588978869",
  appId: "1:859588978869:web:fc56caf79dcaf124dff6fc",
  measurementId: "G-03S7LYDBKC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
