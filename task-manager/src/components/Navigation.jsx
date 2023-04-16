import React from "react";
import { Link } from 'react-router-dom';


export default function Navigation() {
  return (
    <div className="card text-center">
      <div className="card-header">
        <ul className="nav nav-tabs card-header-tabs">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/school" className="nav-link">
              School
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/work" className="nav-link">
              Work
            </Link>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Household
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}