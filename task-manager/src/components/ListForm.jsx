import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { useNavigate } from "react-router-dom";

function ListForm({ onAddList }) {
  const [listName, setListName] = useState("");
  const [listKey, setListKey] = useState("");
  const navigate = useNavigate();
>>>>>>> d2cca0065963983cf6d2671ca7372b3217ae5091

  const handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleListKeyChange = (event) => {
    setListKey(event.target.value);
  };

<<<<<<< HEAD
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
=======
  const handleSubmit = (event) => {
    event.preventDefault();
    const newList = {
      name: listName,
      items: [],
    };
    localStorage.setItem(listKey, JSON.stringify(newList));
    setListName("");
    setListKey("");
    onAddList(listKey); // <-- call onAddList with the new list key
    navigate(`/list/${listKey}`);
>>>>>>> d2cca0065963983cf6d2671ca7372b3217ae5091
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
