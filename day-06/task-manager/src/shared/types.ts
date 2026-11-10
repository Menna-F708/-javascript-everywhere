export type Priority = "low" | "medium" | "high";

export type Task = {
 readonly id:  number;
  title: string;
  done: boolean;
  priority: Priority;
  readonly createdAt: string;
};

export type NewTask = Pick<Task, "title" | "priority">;
export type TaskUpdate = Partial<Pick<Task,"title"| "done"| "priority">>;

export interface ApiErrorBody{
   error:string
}