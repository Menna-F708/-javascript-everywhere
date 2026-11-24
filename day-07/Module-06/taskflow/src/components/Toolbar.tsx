
import { useEffect, useRef } from "react";

type ToolbarProps = {
  onAdd: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export default function Toolbar({
  onAdd,
  searchTerm,
  onSearchChange,
}: ToolbarProps) {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(event: KeyboardEvent) {
    console.log("Key:", event.key);
    console.log("Code:", event.code);
 if (
   (event.target instanceof HTMLInputElement &&
     event.target !== searchRef.current) ||
   event.target instanceof HTMLTextAreaElement ||
   event.target instanceof HTMLSelectElement ||
   (event.target instanceof HTMLElement && event.target.isContentEditable)
 ) {
   return;
 }
    if (event.key === "/") {
      event.preventDefault();
      searchRef.current?.focus();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="toolbar">
      <label className="search">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="6.5" />
          <path d="M20 20l-4-4" />
        </svg>

        <input
          ref={searchRef}
          type="search"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
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
