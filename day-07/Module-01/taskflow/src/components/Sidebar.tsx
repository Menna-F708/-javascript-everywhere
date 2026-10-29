type SidebarProps = {
  open: boolean;
  onClose: () => void;
};

export default function Sidebar({ open, onClose }: SidebarProps) {
  return (
    <>
      <div className={`overlay ${open ? "show" : ""}`} onClick={onClose} />

      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-top">
          <h2>Projects</h2>
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
          <li className="p1 active">Website Redesign</li>
          <li className="p2">Mobile App</li>
          <li className="p3">Marketing</li>
        </ul>
      </aside>
    </>
  );
}