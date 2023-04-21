import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import TaskList from "./TaskList";
import Logo from "./Logo";

function List({ id, deleteList }) {
  const [items, setItems] = useState([]);
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
      <Logo />
      <h2>{id}</h2>
        <p>Please check all the tasks below</p>
      <Navigation lists={lists} />
      <TaskList
        items={items}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onToggleDone={handleToggleDone}
      />
      <button onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

export default List;
