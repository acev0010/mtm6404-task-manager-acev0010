import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import School from "./components/School"
import Work from "./components/Work"
import List from "./components/List"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path:"/school",
    element: <School />
  },
  {
    path:"/list/:id",
    element: <List />
  },
  {
    path:"/work",
    element: <Work />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
