import React, { useState, useEffect } from "react";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import Navigation from "./Navigation";
import { Route, Routes, useNavigate } from "react-router-dom";
import ListForm from "./ListForm";

function ListManager() {
  const [lists, setLists] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "lists"), (snapshot) => {
      const newLists = snapshot.docs.map((doc) => ({
        key: doc.id,
        ...doc.data(),
      }));
      setLists(newLists);
      localStorage.setItem("lists", JSON.stringify(newLists));
    });

    const localLists = JSON.parse(localStorage.getItem("lists"));
    if (localLists && localLists.length > 0) {
      setLists(localLists);
    }

    return () => {
      unsubscribe();
    };
  }, [db]);

  const handleListCreated = (listKey) => {
    navigate(`/list/${listKey}`);
  };

  const handleListDeleted = (key) => {
    const newLists = lists.filter((list) => list.key !== key);
    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists)); // Update local storage
  };

  const handleAddList = async (listName, listKey) => {
    const newList = {
      name: listName,
      key: listKey,
      items: [],
    };
    try {
      const docRef = await addDoc(collection(db, "lists"), newList);
      const newLists = [...lists, { key: docRef.id, ...newList }];
      setLists(newLists);
      handleListCreated(docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Navigation lists={lists} onListDeleted={handleListDeleted} db={db} />
      <Routes>
        {lists.map((list) => (
          <Route key={list.key} path={`/list/${list.key}`} element={<h1>{list.name}</h1>} />
        ))}
      </Routes>
      <ListForm onListCreated={handleListCreated} onAddList={handleAddList} />
    </div>
  );
}

export default ListManager;
