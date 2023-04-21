import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ListForm from "./ListForm";
import TaskList from "./TaskList";
import firebase from "../firebase";
import Logo from "./Logo";
import Navigation from "./Navigation";

function List({ deleteList }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listName, setListName] = useState("");
  const [items, setItems] = useState([]);

  // load list name from Firebase on component mount
  useEffect(() => {
    const listRef = firebase.database().ref(`lists/${id}`);
    listRef.once("value", (snapshot) => {
      const listData = snapshot.val();
      if (listData) {
        setListName(listData.name);
      }
    });
    return () => listRef.off();
  }, [id]);

  // update list name when route parameters change
  useEffect(() => {
    setListName("");
  }, [id]);

  // Update local storage whenever items change
  useEffect(() => {
    localStorage.setItem(id, JSON.stringify(items));
  }, [id, items]);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (idToDelete) => {
    const updatedItems = items.filter((item) => item.id !== idToDelete);
    setItems(updatedItems);
  };

  const handleToggleDone = (idToToggle) => {
    const updatedItems = items.map((item) => {
      if (item.id === idToToggle) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    setItems(updatedItems);
  };

  // Retrieve lists from local storage and parse as array
  const lists = JSON.parse(localStorage.getItem("lists")) || [];

  // Function to update list name
  const handleUpdateListName = (newName) => {
    setListName(newName);
  };

  const handleDeleteList = () => {
    const listRef = firebase.database().ref(`lists/${id}`);
    listRef.remove();
    const updatedLists = lists.filter((list) => list.id !== id);
    localStorage.setItem("lists", JSON.stringify(updatedLists));
    navigate("/");
  };

  return (
    <div>
      <Logo />
      <h2>{listName}</h2>
      <button className="btn btn-danger" onClick={handleDeleteList}>
        Delete List
      </button>
      <ListForm onAddList={handleUpdateListName} />
      <p>Please check all the tasks below</p>
      <Navigation lists={lists} />
      <TaskList
        items={items}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onToggleDone={handleToggleDone}
      />
    </div>
  );
}

export default List;
