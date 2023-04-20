import React, { useState } from "react";
import { useHistory } from "react-router";


function ListForm(props) {
  const [listName, setListName] = useState("");
  const [listKey, setListKey] = useState("");
  const history = useHistory();

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
    history.push(`/list/${listKey}`);
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
