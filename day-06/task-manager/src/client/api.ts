// client/api.ts — the Task API as four typed functions. Nothing else talks to the server.

import type { NewTask, Task, TaskUpdate } from "../shared/types.ts";
import { isTask, isTaskList } from "../shared/validate.ts";
import { request, type Result } from "./http.ts";

let baseUrl = "/api"; // same origin in the browser

// Node has no "current page", so scripts pass a full URL
export function setBaseUrl(url: string): void {
  baseUrl = url;
}

const isNothing = (value: unknown): value is void => value === undefined;

export function listTasks(signal?: AbortSignal): Promise<Result<Task[]>> {
  return request(`${baseUrl}/tasks`, { check: isTaskList, signal });
}

export function createTask(input: NewTask): Promise<Result<Task>> {
  return request(`${baseUrl}/tasks`, {
    method: "POST",
    body: input,
    check: isTask,
  });
}

export function updateTask(
  id: number,
  changes: TaskUpdate,
): Promise<Result<Task>> {
  return request(`${baseUrl}/tasks/${id}`, {
    method: "PATCH",
    body: changes,
    check: isTask,
  });
}

export function deleteTask(id: number): Promise<Result<void>> {
  return request(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
    check: isNothing,
  });
}
