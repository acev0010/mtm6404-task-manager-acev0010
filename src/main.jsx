import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import School from "./components/School"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/school",
    element: <School />
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);