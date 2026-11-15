 
import { useState } from "react";

type TaskFormProps = {
  open: boolean;
  onClose: () => void;
};

const options = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "In Progress" },
  { value: "done", label: "Done" },
];

export default function TaskForm({ open, onClose }: TaskFormProps) {
  const [dueDate, setDueDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [description, setDescription] = useState("");

  function dueDatePast(date: string): boolean {
    if (!date) {
      return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(`${date}T00:00:00`);

    return selectedDate < today;
  }

  function handleDateChange(value: string) {
    setDueDate(value);

    if (dueDatePast(value)) {
      setDateError("Due date cannot be in the past");
    } else {
      setDateError("");
    }
  }

  function handleDescriptionChange(value: string) {
    setDescription(value);
  }

  return (
    <div className={`modal-backdrop ${open ? "show" : ""}`} onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();

          if (dueDatePast(dueDate)) {
            setDateError("Due date cannot be in the past");
            return;
          }

          onClose();
        }}
      >
        <div className="modal-head">
          <div>
            <h2>New task</h2>
            <p>Add something small and doable.</p>
          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className="input"
            type="text"
            placeholder="What do you need to do?"
          />
        </div>

        <div className="field">
          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            className="input"
            rows={3}
            placeholder="A few details (optional)"
            value={description}
            maxLength={200}
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />

          <p
            className={description.length > 180 ? "counter danger" : "counter"}
          >
            {description.length} / 200
          </p>
        </div>

        <div className="field">
          <label htmlFor="due">
            Due date <em>optional</em>
          </label>

          <input
            id="due"
            className="input"
            type="date"
            value={dueDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />

          {dateError && <p role="alert">{dateError}</p>}
        </div>

        <div className="field">
          <label>Status</label>

          <div className="choices">
            {options.map((o) => (
              <div key={o.value} className={`choice ${o.value}`}>
                <input
                  type="radio"
                  name="status"
                  id={`s-${o.value}`}
                  value={o.value}
                  defaultChecked={o.value === "todo"}
                />
                <label htmlFor={`s-${o.value}`}>{o.label}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <button type="button" className="btn ghost" onClick={onClose}>
            Cancel
          </button>

          <button type="submit" className="btn primary">
            Create task
          </button>
        </div>
      </form>
    </div>
  );
}
