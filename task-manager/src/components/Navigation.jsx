import React from "react";
import { Link } from "react-router-dom";

export default function Navigation({ lists }) {
  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {lists &&
            lists.map((list) => (
              <li key={list.key} className="nav-item">
                <Link to={`/list/${list.name}`} className="nav-link">
                  {list.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

