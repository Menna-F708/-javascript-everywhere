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
  return (
    <div className={`modal-backdrop ${open ? "show" : ""}`} onClick={onClose}>
      <form
        className="modal"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault();
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
          />
        </div>

        <div className="field">
          <label htmlFor="due">
            Due date <em>optional</em>
          </label>
          <input id="due" className="input" type="date" />
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
