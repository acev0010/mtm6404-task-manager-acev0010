import React from "react";

export default function TaskList() {
  const tasks = [
    { id: 1, title: 'Web apps' },
    { id: 2, title: 'Applied Projects' },
    { id: 3, title: 'A sense of Humour' },
    { id: 4, title: 'Motion Graphics II' },
    { id: 5, title: 'Digital Portfolio' },
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