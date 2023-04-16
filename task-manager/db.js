// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2hnYG53a0hcVGFoE4OFOPGlWVi8awSUc",
  authDomain: "task-manager-76444.firebaseapp.com",
  projectId: "task-manager-76444",
  storageBucket: "task-manager-76444.appspot.com",
  messagingSenderId: "179432340354",
  appId: "1:179432340354:web:2b87cd0cdc777796336d9b",
  measurementId: "G-1CN90SSX5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export default db;