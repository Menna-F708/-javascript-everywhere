import { useState } from "react";
import type { Priority, Task } from "../types";

export interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
  onStartEdit: (id: number) => void;
  onSaveTitle: (id: number, title: string) => void;
  onCancelEdit: (id: number) => void;
}

interface TitleEditorProps {
  initial: string;
  onSave: (title: string) => void;
  onCancel: () => void;
}

// يتعمله mount لما التعديل يبدأ، فالـ draft بيبدأ دايماً بالعنوان الحالي
function TitleEditor({ initial, onSave, onCancel }: TitleEditorProps) {
  const [draft, setDraft] = useState(initial);
  return (
    <input
      className="task-title-input"
      value={draft}
      aria-label="Edit task title"
      ref={(el) => el?.focus()}
      onChange={(e) => setDraft(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") onSave(draft);
        else if (e.key === "Escape") onCancel();
      }}
      onBlur={onCancel}
    />
  );
}

export function TaskItem({
  task,
  isEditing,
  onToggle,
  onRemove,
  onPriorityChange,
  onStartEdit,
  onSaveTitle,
  onCancelEdit,
}: TaskItemProps) {
  return (
    <li className={task.done ? "task done" : "task"}>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as done`}
      />{" "}
      {isEditing ? (
        <TitleEditor
          initial={task.title}
          onSave={(title) => onSaveTitle(task.id, title)}
          onCancel={() => onCancelEdit(task.id)}
        />
      ) : (
        <span
          className="task-title"
          title="Double-click to edit"
          onDoubleClick={() => onStartEdit(task.id)}
        >
          {task.title}
        </span>
      )}
      <select
        value={task.priority}
        onChange={(e) => onPriorityChange(task.id, e.target.value as Priority)}
        aria-label={`Priority for "${task.title}"`}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        onClick={() => onRemove(task.id)}
        aria-label={`Delete "${task.title}"`}
      >
        ×
      </button>
    </li>
  );
}