import { useState } from 'react'
import { Link } from 'react-router-dom';
import './App.css'
import Navigation from "./components/Navigation"
import React from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";

const Lists = [
  {id:0, slug:"/list/groceries", name: "groceries"},
  {id:0, slug:"/list/home", name: "home"},
]

function App() {
  const [count, setCount] = useState(0)

  return (
    
      <div className='container'>
        <div className='header'>
          <Logo />
          <h1>Task Manager</h1>
            <p> Please check all the tasks below </p>
          
        </div>
        <Navigation />
        <TaskList />
        <Warning course='Motion Graphics II' overdue='Overdue' />
        <Footer />
      </div>
    
  );
}

export default App
