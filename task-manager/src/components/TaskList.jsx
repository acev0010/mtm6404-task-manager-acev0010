import React, { useState, useEffect } from "react";
import * as firebase from "../firebase"
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";



export default function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // load tasks from Firebase
  useEffect(() => {
    db.collection("tasks").onSnapshot((snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });
  }, []);

  const handleAddTask = () => {
    if (newTaskTitle !== "") {
      const newTask = {
        id: uuidv4(),
        title: newTaskTitle,
        priority: newTaskPriority,
        status: "incomplete",
      };

      // add task to Firebase
      db.collection("tasks").doc(newTask.id).set(newTask);

      // reset input fields
      setNewTaskTitle("");
      setNewTaskPriority("Low");
    }
  };

  function handleToggleStatus(id) {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = {
      ...taskToUpdate,
      status: taskToUpdate.status === "complete" ? "incomplete" : "complete",
    };

    // update task in Firebase
    db.collection("tasks").doc(id).set(updatedTask);
  }

  function handleRemoveTask(id) {
    // remove task from Firebase
    db.collection("tasks").doc(id).delete();
  }

  function handleToggleShowCompleted() {
    setShowCompleted(!showCompleted);
  }

  const sortedTasks = [...tasks].sort((task1, task2) => {
    const priorities = ["High", "Medium", "Low"];
    return priorities.indexOf(task2.priority) - priorities.indexOf(task1.priority);
  });

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
        {sortedTasks
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