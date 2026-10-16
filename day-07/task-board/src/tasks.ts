// src/tasks.ts
import type { Filter, Priority, Task } from "./types";

export type Sort = "added" | "priority" | "title";

const PRIORITY_RANK: Record<Priority, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

export function sortTasks(tasks: Task[], sort: Sort): Task[] {
  const copy = [...tasks];
  if (sort === "added") {
    return copy.sort((a, b) => a.id - b.id);
  }

  if (sort === "priority") {
    return copy.sort(
      (a, b) =>
        PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority] || a.id - b.id,
    );
  }

  if (sort === "title") {
    return copy.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
    );
  }

  return copy.sort((a, b) => a.id - b.id);
}

export function visibleTasks(
  tasks: Task[],
  filter: Filter,
  search: string,
): Task[] {
  const q = search.trim().toLowerCase();
  return tasks.filter((t) => {
    const matchesFilter =
      filter === "all" || (filter === "done" ? t.done : !t.done);
    const matchesSearch = q === "" || t.title.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });
}

export function nextId(tasks: Task[]): number {
  return tasks.reduce((max, t) => Math.max(max, t.id), 0) + 1;
}
