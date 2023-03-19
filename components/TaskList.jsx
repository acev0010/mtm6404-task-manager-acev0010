import React from "react";

export default function TaskList() {
  const tasks = [
    { 
      id: 1,
    title: 'Web apps',
    priority: "Low", 
    status: "complete",
    dueDate: "Mon Nov 1st"
   },
    { 
      id: 2,
      title: 'Applied Projects',
      priority: "Medium" , 
      status: "complete",
      dueDate: "Mon Nov 1st"
    },
    { 
      id: 3, 
      title: 'A sense of Humour',
      priority: "Medium" , 
      status: "complete",
      dueDate: "Mon Nov 1st"
     },
    { 
      id: 4,
      title: 'Motion Graphics II',
      priority: "High" , 
      status: "complete",
      dueDate: "Mon Nov 1st"
     },
    { 
      id: 5, 
      title: 'Digital Portfolio',
      priority: "Low", 
      status: "complete"
    },
  ];

  return (
    <div className="tasklist">
      <ul className="list-group">
        {tasks.map((task) => (
          <li key={task.id} className="list-group-item">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}





// this goes in here

// const List = {props} => {
//     return <li> {props.data.title}

//     </li>
// }