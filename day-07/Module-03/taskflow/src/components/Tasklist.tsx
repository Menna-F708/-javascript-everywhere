import { useState } from "react";
import TaskCard from "./Taskcard";
import Section from "./Section";
import Badge from "./Badge";
import initialTasks from "../data/data";
import type { Status, Task } from "../types/type";

export default function TaskList() {
  const [tasks, setTasks] = useState(initialTasks);
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null);
  const [sortMode, setsortMode] = useState("default");

  function handleDelete(id: number) {
    const deletedTask = tasks.find((task) => task.id === id);
    if (!deletedTask) return;
    setLastDeletedTask(deletedTask);
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function handleUndo() {
    if (!lastDeletedTask) return;
    setTasks((prevTasks) => [...prevTasks, lastDeletedTask]);
    setLastDeletedTask(null);
  }

  function handleStatusChange(id: number, newStatus: Status) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  }

  const doneTasks = tasks.reduce((count, task) => {
    return task.status === "done" ? count + 1 : count;
  }, 0);

  const progress =
    tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  const sortedTasks = [...tasks].sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const displayedTasks = sortMode === "default" ? tasks : sortedTasks;
  return (
    <Section title="My Tasks" action={<Badge>{tasks.length} tasks</Badge>}>
      <div className="progress-section">
        <div className="progress-info">
          <span>Progress</span>
          <span>
            {doneTasks} of {tasks.length} done ({progress}%)
          </span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tasks completion progress"
        >
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <select
        className="sort-select"
        value={sortMode}
        onChange={(eo) => setsortMode(eo.target.value)}
      >
        <option value="default">Default</option>
        <option value="title">Title (A–Z)</option>
      </select>
      {lastDeletedTask && (
        <div className="undo-overlay">
          <div className="undo-modal">
            <button
              className="undo-close"
              onClick={() => setLastDeletedTask(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <div className="undo-icon">✓</div>

            <h3>Task Deleted!</h3>

            <p>
              <strong>{lastDeletedTask.title}</strong> has been deleted.
            </p>

            <div className="undo-actions">
              <button
                className="undo-cancel"
                onClick={() => setLastDeletedTask(null)}
              >
                Cancel
              </button>

              <button className="undo-confirm" onClick={handleUndo}>
                Undo
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="task-list">
        {displayedTasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>
    </Section>
  );
}
