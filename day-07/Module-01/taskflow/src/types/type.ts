export type Priority = "low" | "medium" | "high";
export type Status = "todo" | "doing" | "done";
export type TaskCardProps = {
  title: string;
  description: string;
  dueDate?: string;
  status: Status;
  priority?: Priority;
  late?: boolean;
};

export type BadgeTone = "neutral" | "warning" | "danger";
export type BadgeProps = {
  children: React.ReactNode;
  tone?: BadgeTone;
};