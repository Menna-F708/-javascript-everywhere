import { useState } from "react";
import type { SubmitEvent } from "react";
import type { Priority } from "../types";

interface AddTaskFormProps {
  onAdd: (title: string, priority: Priority) => void;
}

export function AddTaskForm({ onAdd }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (trimmed === "") return;
    onAdd(trimmed, priority);
    setTitle("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label htmlFor="new-title" className="visually-hidden">
        New task
      </label>
      <input
        id="new-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task…"
      />
      <label htmlFor="new-priority" className="visually-hidden">
        Priority
      </label>
      <select
        id="new-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
}
 