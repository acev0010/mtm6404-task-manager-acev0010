

import React from "react";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import TaskList from "./components/TaskList";
import Warning from "./components/Warning";
import Logo from "./components/Logo";

import { BrowserRouter as Router } from "react-router-dom";

function Time(props) {
  const date = new Date();
  const hours = date.getHours();
  let timeOfDay;

  if (hours < 12) {
    timeOfDay = "morning";
  } else if (hours >= 12 && hours < 17) {
    timeOfDay = "afternoon";
  } else {
    timeOfDay = "night";
  }

  return (
    <div>
      <h1>
        Good {timeOfDay} {props.user}!
      </h1>
      {props.children}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className='container'>
        <div className='header'>
          <Logo />
          <Time user='Isabel'>
            <p> Please check all the tasks below </p>
          </Time>
        </div>
        <Navigation />
        <TaskList />
        <Warning course='Motion Graphics II' overdue='Overdue' />
        <Footer />
      </div>
    </Router>
  );
}