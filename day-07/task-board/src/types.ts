// src/types.ts
export type Priority = "low" | "medium" | "high";
export type Filter = "all" | "open" | "done";

export interface Task {
  readonly id: number;
  title: string;
  done: boolean;
  priority: Priority;
}