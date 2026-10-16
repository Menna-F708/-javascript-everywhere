import type { Filter } from "../types";
import type { Sort } from "../tasks";

const FILTERS: Filter[] = ["all", "open", "done"];

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  search: string;
  onSearchChange: (s: string) => void;
  sort: Sort;
  onSortChange: (s: Sort) => void;
}

export function FilterBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div role="group" aria-label="Filter tasks">
        {FILTERS.map((f) => (
          <button
            key={f}
            aria-pressed={filter === f}
            onClick={() => onFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search…"
        aria-label="Search tasks"
      />
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as Sort)}
        aria-label="Sort tasks"
      >
        <option value="added">Added</option>
        <option value="priority">Priority</option>
        <option value="title">A → Z</option>
      </select>
    </div>
  );
}