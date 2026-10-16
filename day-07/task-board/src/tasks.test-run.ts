import { nextId, visibleTasks } from "./tasks.ts";
import type { Task } from "./types.ts";

const tasks: Task[] = [
  { id: 1, title: "Read the README", done: true, priority: "high" },
  { id: 2, title: "Set up Vite", done: false, priority: "low" },
];

console.log(visibleTasks(tasks, "all", "").length); // 2
console.log(visibleTasks(tasks, "open", "").length); // 1
console.log(visibleTasks(tasks, "done", "vite").length); // 0
console.log(visibleTasks(tasks, "all", "READ").length); // 1 — case-insensitive
console.log(nextId([])); // 1
console.log(nextId(tasks)); // 3
