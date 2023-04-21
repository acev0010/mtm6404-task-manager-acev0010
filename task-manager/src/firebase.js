import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyD2hnYG53a0hcVGFoE4OFOPGlWVi8awSUc",
    authDomain: "task-manager-76444.firebaseapp.com",
    projectId: "task-manager-76444",
    storageBucket: "task-manager-76444.appspot.com",
    messagingSenderId: "179432340354",
    appId: "1:179432340354:web:2b87cd0cdc777796336d9b",
    measurementId: "G-1CN90SSX5X"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const database = firebase.database();

export { db, database };
export default firebase;
