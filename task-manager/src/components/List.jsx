<<<<<<< HEAD
import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDocs, deleteDoc } from "firebase/firestore";

const List = ({ onListDeleted, db }) => {
  const { id } = useParams();
  const [myList, setMyList] = useState([]);

  useEffect(() => {
    const fetchListItems = async () => {
      const querySnapshot = await getDocs(collection(db, "lists", id, "items"));
      const items = querySnapshot.docs.map(doc => doc.data());
      setMyList(items);
    }
    fetchListItems();
  }, [db, id]);

  const handleListItemDeleted = async (itemId) => {
    try {
      await deleteDoc(doc(collection(db, "lists", id, "items"), itemId));
      setMyList(myList.filter(item => item.id !== itemId));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleListDeleted = async () => {
    try {
      const listRef = doc(collection(db, "lists"), id);
      const querySnapshot = await getDocs(collection(listRef, "items"));
      const batch = db.batch();
      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      batch.delete(listRef);
      await batch.commit();
      onListDeleted(id);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div>
      <Navigation onListDeleted={handleListDeleted} db={db} />
      {myList?.map((item) => (
        <div key={item.id}>
          <p>{item.title}</p>
          <button onClick={() => handleListItemDeleted(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};


=======
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function List({ id, deleteList }) {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const navigate = useNavigate();

  // Retrieve items from local storage on mount
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(id)) || [];
    setItems(storedItems);
  }, [id]);

  // Update local storage whenever items change
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(items));
  }, [id, items]);

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      name: itemName,
      done: false,
    };
    setItems([...items, newItem]);
    setItemName("");
  };

  const handleDeleteList = () => {
    const confirmed = window.confirm("Are you sure you want to delete this list?");
    if (confirmed) {
      localStorage.removeItem(id);
      deleteList(id);
      navigate("/");
    }
  };

  // Retrieve lists from local storage and parse as array
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  return (
    <div>
      <h2>{id}</h2>
      <Navigation lists={lists} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.done} /> {item.name}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={itemName} onChange={handleItemNameChange} />
        <button type="submit">Add Item</button>
      </form>
      <button onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

>>>>>>> d2cca0065963983cf6d2671ca7372b3217ae5091
export default List;
