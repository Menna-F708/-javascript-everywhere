 // shared/validate.ts — one set of rules, used on BOTH sides:
// the browser checks before it sends, the server checks what it receives.

import type { NewTask, Priority, Task, TaskUpdate } from "./types.ts";

export const PRIORITIES: readonly Priority[] = ["low", "medium", "high"];
export const TITLE_MAX = 120;

export type Checked<T> = { ok: true; value: T } | { ok: false; error: string };

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPriority(value: unknown): value is Priority {
  return PRIORITIES.includes(value as Priority);
}

function checkTitle(value: unknown): Checked<string> {
  if (typeof value !== "string") return { ok: false, error: "title must be a string" };
  const title = value.trim();
  if (title.length === 0) return { ok: false, error: "title is required" };
  if (title.length > TITLE_MAX) return { ok: false, error: `title must be ${TITLE_MAX} characters or fewer` };
  return { ok: true, value: title };
}

export function validateNewTask(input: unknown): Checked<NewTask> {
  if (!isObject(input)) return { ok: false, error: "body must be a JSON object" };
  const title = checkTitle(input.title);
  if (!title.ok) return title;
  const priority = input.priority ?? "medium";
  if (!isPriority(priority)) return { ok: false, error: `priority must be one of: ${PRIORITIES.join(", ")}` };
  return { ok: true, value: { title: title.value, priority } };
}

export function validateTaskUpdate(input: unknown): Checked<TaskUpdate> {
  if (!isObject(input)) return { ok: false, error: "body must be a JSON object" };
  const update: TaskUpdate = {};
  if ("title" in input) {
    const title = checkTitle(input.title);
    if (!title.ok) return title;
    update.title = title.value;
  }
  if ("done" in input) {
    if (typeof input.done !== "boolean") return { ok: false, error: "done must be true or false" };
    update.done = input.done;
  }
  if ("priority" in input) {
    if (!isPriority(input.priority)) return { ok: false, error: `priority must be one of: ${PRIORITIES.join(", ")}` };
    update.priority = input.priority;
  }
  if (Object.keys(update).length === 0) return { ok: false, error: "nothing to update" };
  return { ok: true, value: update };
}

// A type guard for what comes BACK from the API
export function isTask(value: unknown): value is Task {
  return (
    isObject(value) &&
    typeof value.id === "number" &&
    typeof value.title === "string" &&
    typeof value.done === "boolean" &&
    isPriority(value.priority) &&
    typeof value.createdAt === "string"
  );
}

export function isTaskList(value: unknown): value is Task[] {
  return Array.isArray(value) && value.every(isTask);
}