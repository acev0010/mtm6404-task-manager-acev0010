import { useEffect, useState } from "react";
import Navigation from "./Navigation";
import { useParams } from "react-router-dom";
import { getFirestore, collection, doc, getDocs, deleteDoc } from "firebase/firestore";


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