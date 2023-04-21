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

  // load list name and items from Firebase on component mount
  useEffect(() => {
    const listRef = firebase.database().ref(`lists/${id}`);
    listRef.once("value", (snapshot) => {
      const listData = snapshot.val();
      if (listData) {
        setListName(listData.name);
        setItems(listData.items || []);
      }
    });
    return () => listRef.off();
  }, [id]);

  // update list name when route parameters change
  useEffect(() => {
    setListName("");
  }, [id]);

  // update Firebase whenever items change
  useEffect(() => {
    const listRef = firebase.database().ref(`lists/${id}`);
    listRef.update({ items });
    return () => listRef.off();
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

  const handleUpdateListName = (newName) => {
    const listRef = firebase.database().ref(`lists/${id}`);
    listRef.update({ name: newName });
    setListName(newName);
  };

  const handleDeleteList = () => {
    const listRef = firebase.database().ref(`lists/${listName}`);
    listRef.remove();
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
      <Navigation />
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
