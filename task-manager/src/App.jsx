import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";
import ListForm from "./components/ListForm";
import List from "./components/List";

function App() {
  const [lists, setLists] = useState(() => {
    const storedLists = JSON.parse(localStorage.getItem("lists"));
    return storedLists || ["groceries", "home"];
  });

  const navigate = useNavigate();

  const addList = (listName) => {
    const newLists = [...lists, listName];
    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
    navigate(`/list/${listName}`);
  };
  

  const deleteList = (listName) => {
    const newLists = lists.filter((list) => list !== listName);
    setLists(newLists);
    localStorage.setItem("lists", JSON.stringify(newLists));
    navigate("/");
    localStorage.removeItem(listName);
  };

  return (
    <div className="container">
      <div className="header">
        <Logo />
        <h1>Task Manager</h1>
        <p>Please check all the tasks below</p>
      </div>
      <ListForm onAddList={addList} />
      <Navigation lists={lists} />
      <Routes>
        {lists.map((list) => (
          <Route
            key={list}
            path={`/list/${list}`}
            element={<List id={list} deleteList={deleteList} />}
          />
        ))}
      </Routes>
      <TaskList />
      <Warning course="Motion Graphics II" overdue="Overdue" />
      <Footer />
    </div>
  );
}

export default App;
