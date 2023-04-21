import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD2hnYG53a0hcVGFoE4OFOPGlWVi8awSUc",
    authDomain: "task-manager-76444.firebaseapp.com",
    projectId: "task-manager-76444",
    storageBucket: "task-manager-76444.appspot.com",
    messagingSenderId: "179432340354",
    appId: "1:179432340354:web:2b87cd0cdc777796336d9b",
    measurementId: "G-1CN90SSX5X"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

function ListForm(props) {
  const [listName, setListName] = useState("");
  const [listKey, setListKey] = useState("");

  const handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleListKeyChange = (event) => {
    setListKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newList = {
      name: listName,
      key: listKey,
      items: [],
    };
    try {
      const docRef = await addDoc(collection(db, "lists"), newList);
      setListName("");
      setListKey("");
      props.onListCreated(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <h2>Create a new list</h2>
      <form onSubmit={handleSubmit}>
        <label>
          List name:
          <input type="text" value={listName} onChange={handleListNameChange} />
        </label>
        <label>
          List key:
          <input type="text" value={listKey} onChange={handleListKeyChange} />
        </label>
        <button type="submit">Create List</button>
      </form>
    </div>
  );
}

export default ListForm;
