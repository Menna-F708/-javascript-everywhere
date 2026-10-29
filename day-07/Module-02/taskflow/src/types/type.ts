import type { ReactNode } from "react";
export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "doing" | "done";
 export type Task = {
   id: number;
   title: string;
   description: string;
   dueDate?: string;
   status: Status;
   priority?: Priority;
   late?: boolean;
 };

 export type TaskCardProps = Task & {
   onDelete: (id: number) => void;
 };
export type BadgeTone = "neutral" | "warning" | "danger";
export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};

export type SectionProps = {
  title: string;
  action?: ReactNode;
  children: ReactNode;
};
