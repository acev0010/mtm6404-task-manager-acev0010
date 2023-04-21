import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ListForm({ onAddList }) {
  const [listName, setListName] = useState("");
  const [listKey, setListKey] = useState("");
  const navigate = useNavigate();

  const handleListNameChange = (event) => {
    setListName(event.target.value);
  };

  const handleListKeyChange = (event) => {
    setListKey(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newList = {
      name: listName,
      items: [],
    };
    localStorage.setItem(listKey, JSON.stringify(newList));
    setListName("");
    setListKey("");
    onAddList(listKey); // <-- call onAddList with the new list key
    navigate(`/list/${listKey}`);
  };

  return (
    <div>
      <h2>Create a new list</h2>
      <form onSubmit={handleSubmit}>
        <label>
          List name:
          <input type="text" value={listName} onChange={handleListNameChange} />
        </label>
        <label>
          List key:
          <input type="text" value={listKey} onChange={handleListKeyChange} />
        </label>
        <button type="submit">Create List</button>
      </form>
    </div>
  );
}

export default ListForm;
