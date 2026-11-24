
export type Project = {
  name: string;
  id: string;
  message: string;
};

export const projects: Project[] = [
  {
    name: "Task Board",
    id: "task-board",
    message: "No tasks yet. Start by creating your first task!",
  },
  {
    name: "Finance Tracker",
    id: "finance-tracker",
    message: "No transactions yet. Start tracking your finances!",
  },
  {
    name: "Country Explorer",
    id: "country-explorer",
    message: "No countries found. Start exploring countries!",
  },
  {
    name: "Design System",
    id: "design-system",
    message: "Your design system is empty. Start adding your first component!",
  },
];

export const projectNames = projects.map((project) => project.name);
