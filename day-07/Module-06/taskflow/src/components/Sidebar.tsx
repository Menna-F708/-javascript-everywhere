 import { NavLink } from "react-router-dom";
type SidebarProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  projects: string[];
};

export default function Sidebar({
  open,
  onClose,
  title,
  projects,
}: SidebarProps) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <h2>{title}</h2>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul>
         {projects.map((project, index) => (
  <li key={project}>
    <NavLink
      to={`/projects/${project.toLowerCase().replaceAll(" ", "-")}`}
      onClick={onClose}
      className={({ isActive }) =>
        `project-link p${index + 1} ${isActive ? "active" : ""}`
      }
    >
      {project}
    </NavLink>
  </li>
))}
          
        </ul>
      </aside>
    </>
  );
}
