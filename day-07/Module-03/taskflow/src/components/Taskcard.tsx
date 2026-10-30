 
import type { TaskCardProps, Status } from "../types/type";
import Badge from "./Badge";

const options: { value: Status; label: string }[] = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "In Progress" },
  { value: "done", label: "Done" },
];

function nextStatus(status: Status): Status {
  if (status === "todo") {
    return "doing";
  } else if (status === "doing") {
    return "done";
  } else {
    return "todo";
  }
}

export default function TaskCard({
  id,
  title,
  description,
  dueDate,
  status,
  priority,
  late,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
 
  const taskPriority = priority ?? "medium";

  let tone: "neutral" | "warning" | "danger";

  if (taskPriority === "high") {
    tone = "danger";
  } else if (taskPriority === "low") {
    tone = "neutral";
  } else {
    tone = "warning";
  }

  const next = nextStatus(status);
  const nextOption = options.find((option) => option.value === next);

  return (
    <article className={`cardTask ${status}`}>
      <div className="head">
        <span className="dot" aria-hidden="true" />
        <h3>{title}</h3>
        <Badge tone={tone}>{taskPriority}</Badge>
      </div>

      <p>{description}</p>

      <div className="task-actions">
        <button
          className={`segment-btn ${status}`}
          onClick={() => onStatusChange(id, next)}
        >
          Mark {nextOption?.label}
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${title}`}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6m4 4v6m6-6v6" />
          </svg>
          Delete
        </button>
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
 