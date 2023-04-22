import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as firebase from "../firebase";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db } from "../firebase";

export default function TaskList() {
  const { id } = useParams();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    const tasksRef = db.collection(`lists/${id}/tasks`);
    tasksRef.onSnapshot((snapshot) => {
      const updatedTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(updatedTasks);
    });
  }, [id]);

  const handleAddTask = () => {
    if (newTaskTitle !== "") {
      const newTask = {
        id: uuidv4(),
        title: newTaskTitle,
        priority: newTaskPriority,
        status: "incomplete",
      };

      const tasksRef = db.collection(`lists/${id}/tasks`);
      tasksRef.doc(newTask.id).set(newTask);

      setNewTaskTitle("");
      setNewTaskPriority("Low");
    }
  };

  function handleToggleStatus(doc) {
    console.log('doc:', doc);
    console.log('doc instanceof firebase.firestore.DocumentSnapshot:', doc instanceof firebase.firestore.DocumentSnapshot);
  
    if (doc && doc instanceof firebase.firestore.DocumentSnapshot) {
      const updatedTask = {
        ...doc.data(),
        status: doc.data().status === "complete" ? "incomplete" : "complete",
      };
  
      // update task in Firebase
      db.collection("lists")
        .doc(id)
        .collection("tasks")
        .doc(doc.id)
        .set(updatedTask);
    }
  }
  

  function handleRemoveTask(task) {
    // remove task from Firebase
    db.collection(`lists/${id}/tasks`).doc(task.id).delete();
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
          .map((task) =>
            task.status === "complete" ? (
              showCompleted && (
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
                      onClick={() => handleToggleStatus(task)}
                    >
                      Incomplete
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleRemoveTask(task)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              )
            ) : (
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
      onClick={() => handleToggleStatus(task)}
    >
      {task.status === "complete" ? "Incomplete" : "Complete"}
    </button>
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={() => handleRemoveTask(task)}
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