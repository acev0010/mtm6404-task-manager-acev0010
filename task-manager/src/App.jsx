import React, { useState, useEffect } from "react";
import { Link, Route, Routes, useParams, useNavigate } from "react-router-dom";
import "./App.css";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import TaskList from "./components/TaskList";
import Logo from "./components/Logo";
import ListForm from "./components/ListForm";
import List from "./components/List";
import firebase from "./firebase";

function App() {
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);

  // load lists from Firebase on component mount
  useEffect(() => {
    const listsRef = firebase.database().ref("lists");
    listsRef.on("value", (snapshot) => {
      const listsData = snapshot.val();
      if (listsData) {
        const listsArray = Object.keys(listsData).map((key) => ({
          key,
          name: listsData[key].name,
          items: listsData[key].items || [],
        }));
        setLists(listsArray);
      }
    });
    return () => listsRef.off();
  }, []);

  const addList = (listName) => {
    const newListKey = firebase.database().ref().child("lists").push().key;
    const newList = {
      name: listName,
      items: [],
    };
    const updates = {};
    updates["/lists/" + newListKey] = newList;
    firebase.database().ref().update(updates);
    setCurrentList({ key: newListKey, name: listName });
  };

  const deleteList = (listKey) => {
    firebase.database().ref(`/lists/${listKey}`).remove();
    setCurrentList(null);
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
            key={list.key}
            path={`/list/${list.key}`}
            element={
              <>
                <h2>{currentList?.name || list.name}</h2>
                <List id={list.key} deleteList={deleteList} />
              </>
            }
          />
        ))}
      </Routes>
      <TaskList />
      <Footer />
    </div>
  );
}

export default App;
