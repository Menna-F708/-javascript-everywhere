import Logo from "./Logo";

type HeaderProps = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand">
        <Logo />
        Taskflow
      </div>

      <div className="greeting">
        Hi, Menna 👋 let's keep things calm today
      </div>

      <button className="menu-btn" onClick={onMenuClick} aria-label="Open menu">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 7h16M4 12h16M10 17h10" />
        </svg>
      </button>
    </header>
  );
}