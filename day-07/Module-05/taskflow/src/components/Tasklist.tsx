import { useState } from "react";
import TaskCard from "./Taskcard";
import Section from "./Section";
import Badge from "./Badge";
import initialTasks from "../data/data";
import type { Status, Task, SortOption } from "../types/type";
import  useDocumentTitle  from "../hooks/useDocumentTitle";
import countBy from "../utils/countBy";
type StatusFilter = Status | "all";

type TaskListProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: StatusFilter;
  onStatusChange: (value: StatusFilter) => void;
};

export default function TaskList({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: TaskListProps) {
  const [tasks, setTasks] = useState(initialTasks);
const statusCounts = countBy(tasks, (task) => task.status);
  const [lastDeletedTask, setLastDeletedTask] = useState<Task | null>(null);

  const [sortMode, setSortMode] = useState<SortOption>("default");



  // Delete task
  function handleDelete(id: number) {
    const deletedTask = tasks.find((task) => task.id === id);

    if (!deletedTask) return;

    setLastDeletedTask(deletedTask);

    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Undo delete
  function handleUndo() {
    if (!lastDeletedTask) return;

    setTasks((prevTasks) => [...prevTasks, lastDeletedTask]);

    setLastDeletedTask(null);
  }

  // Change task status
  function handleStatusChange(id: number, newStatus: Status) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task,
      ),
    );
  }

  // Duplicate task
  function handleDuplicate(task: Omit<Task, "id">) {
    setTasks((prevTasks) => {
      const newId = Math.max(0, ...prevTasks.map((task) => task.id)) + 1;

      return [
        ...prevTasks,
        {
          ...task,
          id: newId,
          status: "todo",
        },
      ];
    });
  }

  // Calculate progress
  const doneTasks = tasks.reduce((count, task) => {
    return task.status === "done" ? count + 1 : count;
  }, 0);
 const openTasks = tasks.length - doneTasks;

 useDocumentTitle(`Tasks (${openTasks} open)`);
  const progress =
    tasks.length === 0 ? 0 : Math.round((doneTasks / tasks.length) * 100);

  // Search filter
  const searchedTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.trim().toLowerCase()),
  );

  // Status filter
  const filteredTasks = searchedTasks.filter((task) => {
    if (statusFilter === "all") return true;

    return task.status === statusFilter;
  });

  // Sorting
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortMode === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortMode === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    return 0;
  });

  const displayedTasks = sortedTasks;

  // Check active filters
  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    statusFilter !== "all" ||
    sortMode !== "default";

  // Clear all filters
  function handleClearFilters() {
    onSearchChange("");
    onStatusChange("all");
    setSortMode("default");
  }

  return (
    <Section title="My Tasks" action={<Badge>{tasks.length} tasks</Badge>}>
      <div className="stats">
        <div className="stat todo">To do: {statusCounts.todo ?? 0}</div>

        <div className="stat doing">In progress: {statusCounts.doing ?? 0}</div>

        <div className="stat done">Done: {statusCounts.done ?? 0}</div>
      </div>

      {/* Progress */}
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

      {/* Filters */}
      <div className="task-filters">
        <select
          className="status-select"
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value as StatusFilter)}
          aria-label="Filter tasks by status"
        >
          <option value="all">All statuses</option>
          <option value="todo">To do</option>
          <option value="doing">In progress</option>
          <option value="done">Done</option>
        </select>

        <select
          className="sort-select"
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortOption)}
          aria-label="Sort tasks"
        >
          <option value="default">Default</option>
          <option value="title">Title (A–Z)</option>
          <option value="dueDate">Due date</option>
        </select>
      </div>

      {/* Undo deleted task */}
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

      {/* Results Summary */}
      <div className="results-summary">
        <p>
          Showing {displayedTasks.length} of {tasks.length}
        </p>

        {hasActiveFilters && (
          <button
            type="button"
            className="clear-filters-btn"
            onClick={handleClearFilters}
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Tasks */}
      <div className="task-list">
        {displayedTasks.length > 0 ? (
          displayedTasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
              onDuplicate={handleDuplicate}
            />
          ))
        ) : (
          <p className="empty-results">No tasks found.</p>
        )}
      </div>
    </Section>
  );
}
