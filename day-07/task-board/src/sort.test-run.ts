import { sortTasks } from "./tasks.ts";
import type { Task } from "./types.ts";

const tasks: Task[] = [
  { id: 1, title: "Read the Day 07 README", done: true, priority: "high" },
  { id: 2, title: "Set up Vite", done: true, priority: "low" },
  { id: 3, title: "Build the Task Board", done: false, priority: "high" },
];
const titles = (list: Task[]) => list.map((t) => t.title).join(" · ");

console.log("original before:", titles(tasks));
console.log("1 priority:", titles(sortTasks(tasks, "priority")));
console.log("2 title   :", titles(sortTasks(tasks, "title")));
console.log("original after :", titles(tasks)); // لازم تطلع زي before

const withApply: Task[] = [
  ...tasks,
  { id: 4, title: "apply to 3 jobs", done: false, priority: "medium" },
];
console.log("3 title + apply:", titles(sortTasks(withApply, "title")));
console.log("4 added:", titles(sortTasks(withApply, "added")));
