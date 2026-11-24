import { useParams } from "react-router-dom";
import Section from "./Section";
import Badge from "./Badge";
import EmptyState from "./EmptyState";
import type { Task } from "../types/type";

type ProjectHeaderProps = {
  tasks: Task[];
};

export default function ProjectHeader({ tasks }: ProjectHeaderProps) {
  const { projectId } = useParams();

  // مشتقة من tasks: مفيش state جديد
  const projectTasks = tasks.filter(
    (task) => task.projectId === Number(projectId),
  );
  const doneCount = projectTasks.filter(
    (task) => task.status === "done",
  ).length;
  const percent =
    projectTasks.length === 0
      ? 0
      : Math.round((doneCount / projectTasks.length) * 100);

  if (projectTasks.length === 0) {
    return (
      <EmptyState
        title="No tasks in this project"
        description="Add a task to start tracking progress."
      />
    );
  }

  return (
    <Section
      title={`Project ${projectId}`}
      action={<Badge>{projectTasks.length} tasks</Badge>}
    >
      <div className="progress-section">
        <div className="progress-info">
          <span>Progress</span>
          <span>
            {doneCount} of {projectTasks.length} done
          </span>
        </div>
        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Project progress"
        >
          <div className="progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </Section>
  );
}