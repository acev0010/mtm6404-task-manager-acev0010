import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2hnYG53a0hcVGFoE4OFOPGlWVi8awSUc",
  authDomain: "task-manager-76444.firebaseapp.com",
  projectId: "task-manager-76444",
  storageBucket: "task-manager-76444.appspot.com",
  messagingSenderId: "179432340354",
  appId: "1:179432340354:web:2b87cd0cdc777796336d9b",
  measurementId: "G-1CN90SSX5X"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export default function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // load tasks from Firebase
  useEffect(() => {
    const unsubscribe = firestore
      .collection("tasks")
      .onSnapshot((snapshot) => {
        const loadedTasks = [];
        snapshot.forEach((doc) => {
          loadedTasks.push({ ...doc.data(), id: doc.id });
        });
        setTasks(loadedTasks);
      });

    return unsubscribe;
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle !== "") {
      const newTask = {
        title: newTaskTitle,
        priority: newTaskPriority,
        status: "incomplete",
      };

      // add task to Firebase
      firestore.collection("tasks").add(newTask);

      // reset input fields
      setNewTaskTitle("");
      setNewTaskPriority("Low");
    }
  };

  function handleToggleStatus(id) {
    const taskRef = firestore.collection("tasks").doc(id);
    taskRef.get().then((doc) => {
      if (doc.exists) {
        const updatedTask = { ...doc.data(), status: doc.data().status === "complete" ? "incomplete" : "complete" };
        taskRef.update(updatedTask);
      }
    });
  }

  function handleRemoveTask(id) {
    firestore.collection("tasks").doc(id).delete();
  }

  tasks.sort((task1, task2) => {
    const priorities = ["High", "Medium", "Low"];
    return priorities.indexOf(task2.priority) - priorities.indexOf(task1.priority);
  });

  function handleToggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  return (
    <div className="tasklist">
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-outline-secondary"
          onClick={handleToggleShowCompleted}
        >
          {showCompleted ? "Hide Completed" : "Show Completed"}
        </button>
      </div>
      <ul className="list-group">
        {tasks
          .filter((task) =>
            showCompleted ? true : task.status === "incomplete"
          )
          .map((task) => (
            <li
              key={task.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <span className="me-3">
                  {task.title} ({task.priority})
                </span>
                <button
                  className="btn btn-outline-primary btn-sm me-2"
                  onClick={() => handleToggleStatus(task.id)}
                >
                  {task.status === "complete" ? "Incomplete" : "Complete"}
                </button>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => handleRemoveTask(task.id)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
      </ul>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <select
          className="form-select"
          value={newTaskPriority}
          onChange={(e) => setNewTaskPriority(e.target.value)}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddTask} disabled={!newTaskTitle}>
          Add
        </button>
      </div>
    </div>
  );
          }
