import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { db } from "../firebase";

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newList = {
      name: listName,
      items: [],
    };
    const docRef = await db.collection("lists").doc(listName).set(newList);
    setListName("");
    setListKey("");
    onAddList(listName);
    navigate(`/list/${listName}`);
  };

  const handleDelete = async (event) => {
    event.preventDefault();
    await db.collection("lists").doc(listName).delete();
    setListName("");
    setListKey("");
    navigate("/");
  };

  return (
    <div>
      <h2>Create a new list</h2>
      <form onSubmit={handleSubmit}>
        <label>
          List name:
          <input
            type="text"
            className="form-control"
            placeholder="Add List name..."
            value={listName}
            onChange={handleListNameChange}
          />
        </label>
        <label>
          List key:
          <input
            type="text"
            className="form-control"
            placeholder="Add unique Key..."
            value={listKey}
            onChange={handleListKeyChange}
          />
        </label>
        <button className="btn btn-primary" type="submit">
          Create List
        </button>
      </form>
      {listName && (
        <form onSubmit={handleDelete}>
          <button className="btn btn-danger mt-2" type="submit">
            Delete list
          </button>
        </form>
      )}
    </div>
  );
}

export default ListForm;
