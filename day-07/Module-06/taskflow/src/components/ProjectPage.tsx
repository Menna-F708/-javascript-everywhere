// import { Link, useParams } from "react-router-dom";
// import initialTasks from "../data/data";
// import { projectNames } from "../data/Projects";
// import type { Status } from "../types/type";
// import Layout from "./Layout";
// import ProjectHeader from "./ProjectHeader";
// import EmptyState from "./EmptyState";

// const statusLabel: Record<Status, string> = {
//   todo: "To Do",
//   doing: "In Progress",
//   done: "Done",
// };

// export default function ProjectPage() {
//   const { projectId } = useParams();
//   const id = Number(projectId);

//   const projectTasks = initialTasks.filter((task) => task.projectId === id);
//   const name = projectNames[id - 1] ?? `Project ${projectId}`;

//   if (projectTasks.length === 0) {
//     return (
//       <Layout>
//         <EmptyState
//           title="No tasks in this project"
//           description="This project doesn't have any tasks yet."
//           action={
//             <Link to="/" className="empty-btn">
//               Back to all tasks
//             </Link>
//           }
//         />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <ProjectHeader name={name} tasks={projectTasks} />

//       <ul className="project-tasks">
//         {projectTasks.map((task) => (
//           <li key={task.id}>
//             <Link
//               to={`/projects/${task.projectId}/tasks/${task.id}`}
//               className={`project-task ${task.status}`}
//             >
//               <span className="dot" aria-hidden="true" />
//               <span className="project-task-title">{task.title}</span>
//               <span className="project-task-status">
//                 {statusLabel[task.status]}
//               </span>
//               <span className="arrow">
//                 <svg viewBox="0 0 24 24" aria-hidden="true">
//                   <path d="M9 6l6 6-6 6" />
//                 </svg>
//               </span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </Layout>
//   );
// }