import { useState } from 'react';
import './App.css';
import Navigation from "./components/Navigation";
import React from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import db from '../db';
import ListManager from './components/ListManager';

const Lists = [
];

function App() {
  const [task, setTodo] = useState("");
  const [lists, setLists] = useState(Lists);

  const handleListCreated = (listKey) => {
    const newList = {
      id: lists.length,
      slug: listKey,
      name: listKey.split("/").pop(),
    };
    setLists([...lists, newList]);
  };

  const handleListDeleted = async (key) => {
    try {
      await deleteDoc(doc(db, "lists", key));
      setLists(lists.filter((list) => list.key !== key));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <Logo />
        <h1>Task Manager</h1>
        <p> Please check all the tasks below </p>
      </div>
      <Navigation lists={lists} onListDeleted={handleListDeleted} />
      <ListManager onListCreated={handleListCreated} lists={lists} setLists={setLists} />
      <TaskList />
      <Warning course='Motion Graphics II' overdue='Overdue' />
      <Footer />
    </div>
  );
}

export default App;
