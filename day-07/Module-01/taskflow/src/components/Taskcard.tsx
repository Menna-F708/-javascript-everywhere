import { useState } from "react";

type Status = "todo" | "doing" | "done";

type TaskCardProps = {
  title: string;
  description: string;
  dueDate?: string;
  status: Status;
  late?: boolean;
};

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
  late,
}: TaskCardProps) {
  const [status, setStatus] = useState<Status>(initialStatus);

  return (
    <article className={`cardTask ${status}`}>
      <div className="head">
        <span className="dot" />
        <h3>{title}</h3>
      </div>

      <p>{description}</p>

      <div className="segment" role="group" aria-label="Task status">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            className={status === o.value ? "on" : ""}
            onClick={() => setStatus(o.value)}
          >
            {o.label}
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