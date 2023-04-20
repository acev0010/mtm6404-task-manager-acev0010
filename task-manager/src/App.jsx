import { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from "./components/Navigation";
import React from "react";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";
import ListForm from "./components/ListForm";
import List from "./components/List";

const Lists = [
  { id: 0, slug: "/list/groceries", name: "groceries" },
  { id: 1, slug: "/list/home", name: "home" },
];

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <div className="header">
        <Logo />
        <h1>Task Manager</h1>
        <p>Please check all the tasks below</p>
      </div>
      <ListForm />
      <Navigation />
      <Switch>
        {Lists.map((list) => (
          <Route key={list.id} path={list.slug}>
            <List id={list.id} />
          </Route>
        ))}
      </Switch>
      <TaskList />
      <Warning course="Motion Graphics II" overdue="Overdue" />
      <Footer />
    </div>
  );
}

export default App;
