import React, { useState, useEffect } from "react";

export default function TaskList() {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskTitle !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        priority: newTaskPriority,
        status: "incomplete",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskPriority("Low");
    }
  };

  const handleToggleStatus = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: task.status === "complete" ? "incomplete" : "complete" } : task
      )
    );
  };

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  tasks.sort((task1, task2) => {
    const priorities = ["High", "Medium", "Low"];
    return priorities.indexOf(task2.priority) - priorities.indexOf(task1.priority);
  });

  return (
    <div className="tasklist">
      <ul className="list-group">
        {tasks
          .filter((task) => task.status === "incomplete")
          .map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <span className="me-3">{task.title} ({task.priority})</span>
                <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleToggleStatus(task.id)}>
                  {task.status === "complete" ? "Incomplete" : "Complete"}
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleRemoveTask(task.id)}>
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
};
