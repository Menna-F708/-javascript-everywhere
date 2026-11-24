import { useParams, Link } from "react-router-dom";
import initialTasks from "../data/data";
import type { Status } from "../types/type";
import EmptyState from "./EmptyState";
import PageShell from "./PageShell";

const statusLabel: Record<Status, string> = {
  todo: "To Do",
  doing: "In Progress",
  done: "Completed",
};

function StatusIcon({ status }: { status: Status }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {status === "todo" && <circle cx="12" cy="12" r="6.5" />}
      {status === "doing" && (
        <>
          <circle cx="12" cy="12" r="6.5" />
          <path d="M12 5.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
        </>
      )}
      {status === "done" && <path d="M7 12.5l3.5 3.5L17 9" />}
    </svg>
  );
}

export default function TaskDetails() {
  const { projectId, taskId } = useParams();

  const task = initialTasks.find(
    (item) =>
      item.id === Number(taskId) && item.projectId === Number(projectId),
  );

  if (!task) {
    return (
      <PageShell>
        <EmptyState
          title="Task not found"
          description="This task doesn't exist or may have been removed."
          action={
            <Link to={`/projects/${projectId}`} className="empty-btn">
              Back to project
            </Link>
          }
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="details-page">
        <Link to={`/projects/${projectId}`} className="back-btn">
          <span className="arrow">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </span>
          Back to project
        </Link>

        <article className={`detail-card ${task.status}`}>
          <span className="detail-badge">
            <StatusIcon status={task.status} />
          </span>

          <span className="eyebrow">Task #{task.id}</span>
          <h2>{task.title}</h2>

          <div className="detail-block">
            <h3>Description</h3>
            <p>{task.description}</p>
          </div>

          <div className="info-grid">
            <div className="info">
              <span className="info-icon">
                <StatusIcon status={task.status} />
              </span>
              <div>
                <span className="info-label">Status</span>
                <strong className="info-value accent">
                  {statusLabel[task.status]}
                </strong>
              </div>
            </div>

            <div className="info">
              <span className="info-icon">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="4" y="5" width="16" height="15" rx="4" />
                  <path d="M8 3v4M16 3v4M4 11h16" />
                </svg>
              </span>
              <div>
                <span className="info-label">Due Date</span>
                <strong className={`info-value ${task.late ? "late" : ""}`}>
                  {task.dueDate ?? "No due date"}
                </strong>
              </div>
            </div>
          </div>
        </article>
      </section>
    </PageShell>
  );
}