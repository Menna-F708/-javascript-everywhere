import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import TaskStats from "./components/TaskStats";
import TaskList from "./components/Tasklist";
import TaskForm from "./components/Taskform";
import Footer from "./components/Footer";
import "./App.css";
 
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="app">
      <Header onMenuClick={() => setMenuOpen(true)} />
      <Sidebar
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="My Workspace"
        projects={["Task Board", "Finance Tracker", "Country Explorer"]}
      />

      <main className="main">
        <h1>My Tasks</h1>
        <Toolbar onAdd={() => setFormOpen(true)} />
        <TaskStats />
        <TaskList />
        <Footer />
      </main>

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}