import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "firebase/compat/firestore";
import "firebase/compat/database";
import firebase from "../firebase";


export default function Navigation() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // Fetch the lists from Firestore
    const db = firebase.firestore();
    db.collection("lists")
      .get()
      .then((querySnapshot) => {
        const lists = querySnapshot.docs.map((doc) => doc.id);
        setLists(lists);
      });
  }, []);

  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {lists.map((list) => (
            <li key={list} className="nav-item">
              <Link to={`/list/${list}`} className="nav-link">
                {list}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
