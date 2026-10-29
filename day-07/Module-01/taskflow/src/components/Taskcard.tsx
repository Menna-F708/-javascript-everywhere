import { useState } from "react";
import type { TaskCardProps, Status } from "../types/type";
import Badge from "./Badge";
const options: { value: Status; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskCard({
  title,
  description,
  dueDate,
  status: initialStatus,
  priority,
  late,
}: TaskCardProps) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const taskPriority = priority ?? "medium";

  let tone: "neutral" | "warning" | "danger";

  if (taskPriority === "high") {
    tone = "danger";
  } else if (taskPriority === "low") {
    tone = "neutral";
  } else {
    tone = "warning";
  }
  return (
    <article className={`cardTask ${status}`}>
      <div className="head">
        <span className="dot" aria-hidden="true" />

        <h3>{title}</h3>
        <Badge tone={tone}>{taskPriority}</Badge>
      </div>

      <p>{description}</p>

      <div className="segment" role="group" aria-label="Task status">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className={status === option.value ? "on" : ""}
            aria-pressed={status === option.value}
            onClick={() => setStatus(option.value)}
          >
            {option.label}
          </button> 
        ))}
      </div>

      <div className="foot">
        <span className={`due ${late ? "late" : ""} ${dueDate ? "" : "none"}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="4" y="5" width="16" height="15" rx="4" />
            <path d="M8 3v4M16 3v4M4 11h16" />
          </svg>

          {dueDate ?? "No due date"}
        </span>

        <span className="details">
          Details
          <span className="arrow">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </span>
      </div>
    </article>
  );
}
