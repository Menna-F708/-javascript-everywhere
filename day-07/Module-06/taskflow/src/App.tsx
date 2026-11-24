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
 import initialTasks from "./data/data";
import { useParams } from "react-router-dom";
import { projects, projectNames } from "./data/Projects";
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
   const [tasks, setTasks] = useState(initialTasks);
 const { projectId } = useParams();

 const currentProject = projects.find((project) => project.id === projectId);
   return (
     <div className="app">
       <Header onMenuClick={() => setMenuOpen(true)} />

       <Sidebar
         open={menuOpen}
         onClose={() => setMenuOpen(false)}
         title="My Workspace"
         projects={projectNames}
       />

       <main className="main">
         <Toolbar
           onAdd={() => setFormOpen(true)}
           searchTerm={searchTerm}
           onSearchChange={setSearchTerm}
         />

         {/* <TaskStats /> */}

         {currentProject?.id === "task-board" || !currentProject ? (
           <TaskList
             searchTerm={searchTerm}
             onSearchChange={setSearchTerm}
             statusFilter={statusFilter}
             onStatusChange={setStatusFilter}
             tasks={tasks}
             setTasks={setTasks}
           />
         ) : (
           <div className="empty-state">
             <h2>{currentProject.name}</h2>
             <p>{currentProject.message}</p>
           </div>
         )}

         <Footer />
       </main>

       <TaskForm open={formOpen} onClose={() => setFormOpen(false)} />
     </div>
   );
 }
