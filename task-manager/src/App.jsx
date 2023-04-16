import { useState } from 'react'
import './App.css'
import Navigation from "./components/Navigation"
import React from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";
import {collection, addDoc} from "firebase/firestore"
import db from '../db';

const Lists = [
  {id:0, slug:"/list/groceries", name: "groceries"},
  {id:1, slug:"/list/household", name: "household"},
]

function App() {
  const [task, setTodo] = useState("");

  const addTodo = async (ev) => {
    ev.preventDefault();
    const taskCollection = collection(db,"grocies");
    const document = await AudioScheduledSourceNode(taskCollection, {
      task: task,
    });
    console.log(document.id);
  }

  return (
    
      <div className='container'>
        <div className='header'>
          <Logo />
          <h1>Task Manager</h1>
            <p> Please check all the tasks below </p>
          
        </div>
        <Navigation />


      {/* <input 
      type="text"
      value={task}
      onChange={(ev) => {
        setTodo(ev.target.value);
      }}
      />
      <button onClick={addTodo}>Add</button> */}

        <TaskList />
        <Warning course='Motion Graphics II' overdue='Overdue' />
        <Footer />
      </div>
    
  );
}

export default App
