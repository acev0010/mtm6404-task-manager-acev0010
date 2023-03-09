import React from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";

// ask about this

const listOfTasks = [
    { id:1, title: "Web Apps", dueDate: "Mon Nov 1st" },
    { id:2, title: "Applied Projects", dueDate: "Tue Nov 2nd" },
    { id:3, title: "Web Apps", dueDate: "Mon Nov 1st" }
]

function Time(props) {
    const date = new Date()
    const hours = date.getHours()
    let timeOfDay
    
    if (hours < 12) {
        timeOfDay = "morning"
    } else if (hours >= 12 && hours < 17) {
        timeOfDay = "afternoon"
    } else {
        timeOfDay = "night"
    }
    
    return (
        <div>
        <h1>Good {timeOfDay} {props.user}!</h1>
        {props.children}
        </div>
    )
}


export default function App() {
    return (
        <div className="container">
            <div className="header">
            <Logo />
            
            <Time user="Isabel">
                <p> Please check all the tasks below </p>  
            </Time>
            </div>
            <Navigation />
            <TaskList />
            <Warning 
            course="Motion Graphics II"
            overdue="Overdue"
            />
            <Footer />
        </div>
    )
}

// ask about this 

{/* <ul>
    {listOfTasks.map((otherItem) => {
        return <List data={otherItem} />
   } )
}
    <List />
</ul> */}

