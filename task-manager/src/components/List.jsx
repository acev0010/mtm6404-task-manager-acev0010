import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";

function List({ id, deleteList }) {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
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

  const handleItemNameChange = (event) => {
    setItemName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      id: new Date().getTime(),
      name: itemName,
      done: false,
    };
    setItems([...items, newItem]);
    setItemName("");
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
      <h2>{id}</h2>
      <Navigation lists={lists} />
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <label>
              <input type="checkbox" checked={item.done} /> {item.name}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" value={itemName} onChange={handleItemNameChange} />
        <button type="submit">Add Item</button>
      </form>
      <button onClick={handleDeleteList}>Delete List</button>
    </div>
  );
}

export default List;
