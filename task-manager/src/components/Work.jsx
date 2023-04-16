import Navigation from "./Navigation"
import Footer from "./Footer";
import TaskList from "./TaskList";
import Warning from "./Warning";
import Logo from "./Logo";

export default function Work() {
  return (
    <div className='container'>
    <div className='header'>
      <Logo />
      <h1>Work list</h1>
        <p> This is the Work list </p>
      
    </div>
    <Navigation />
    <TaskList />
    <Warning course='Motion Graphics II' overdue='Overdue' />
    <Footer />
  </div>
  );
}

