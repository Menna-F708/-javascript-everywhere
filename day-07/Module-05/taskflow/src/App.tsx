import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
// import TaskStats from "./components/TaskStats";
import TaskList from "./components/Tasklist";
import TaskForm from "./components/Taskform";
import Footer from "./components/Footer";
import type { StatusFilter } from "./types/type";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useLocalStorage<string>(
    "task-search",
    "",
  );

  const [statusFilter, setStatusFilter] = useLocalStorage<StatusFilter>(
    "task-status",
    "all",
  );
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
        <Toolbar
          onAdd={() => setFormOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* <TaskStats /> */}

        <TaskList
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
        />

        <Footer />
      </main>

      <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
    </div>
  );
}
