import type { Priority, Task } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  hasTasks: boolean;
  editingId: number | null;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onStartEdit: (id: number) => void;
  onSaveTitle: (id: number, title: string) => void;
  onCancelEdit: (id: number) => void;
}

export function TaskList({
  tasks,
  hasTasks,
  editingId,
  onToggle,
  onRemove,
  onPriorityChange,
  onStartEdit,
  onSaveTitle,
  onCancelEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="empty">
        {hasTasks
          ? "No tasks match your filter."
          : "No tasks yet — add your first one."}
      </p>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          isEditing={editingId === task.id}
          onToggle={onToggle}
          onRemove={onRemove}
          onPriorityChange={onPriorityChange}
          onStartEdit={onStartEdit}
          onSaveTitle={onSaveTitle}
          onCancelEdit={onCancelEdit}
        />
      ))}
    </ul>
  );
}