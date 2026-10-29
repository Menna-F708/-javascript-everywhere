type ToolbarProps = {
  onAdd: () => void;
};

export default function Toolbar({ onAdd }: ToolbarProps) {
  return (
    <div className="toolbar">
      <label className="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4-4" />
        </svg>
        <input type="search" placeholder="Search tasks..." />
      </label>

      <button className="add-btn" onClick={onAdd} aria-label="Add task">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 12h14" />
        </svg>
        <span>Add task</span>
      </button>
    </div>
  );
}
