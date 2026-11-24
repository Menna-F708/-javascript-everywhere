// import Section from "./Section";
// import Badge from "./Badge";
// import type { Task } from "../types/type";

// type ProjectHeaderProps = {
//   name: string;
//   tasks: Task[];
// };

// export default function ProjectHeader({ name, tasks }: ProjectHeaderProps) {
//   // كله متحسب من tasks: مفيش state جديد
//   const doneCount = tasks.filter((task) => task.status === "done").length;
//   const percent =
//     tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

//   return (
//     <Section title={name} action={<Badge>{tasks.length} tasks</Badge>}>
//       <div className="progress-section">
//         <div className="progress-info">
//           <span>Progress</span>
//           <span>
//             {doneCount} of {tasks.length} done
//           </span>
//         </div>

//         <div
//           className="progress-track"
//           role="progressbar"
//           aria-valuenow={percent}
//           aria-valuemin={0}
//           aria-valuemax={100}
//           aria-label={`${name} progress`}
//         >
//           <div className="progress-fill" style={{ width: `${percent}%` }} />
//         </div>
//       </div>
//     </Section>
//   );
// }