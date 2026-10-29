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
          {projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
       
      </aside>
    </>
  );
}
