import type { ReactNode } from "react";

type EmptyStateProps = {
  title?: string;
  description?: string;
  onAdd?: () => void;
  action?: ReactNode;
};

export default function EmptyState({
  title = "No tasks yet",
  description = "Your list is clear. Add your first task and start the day calmly.",
  onAdd,
  action,
}: EmptyStateProps) {
  return (
    <section className="empty">
      <svg
        className="empty-art"
        viewBox="0 0 200 170"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="emptyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#B7ADEE" />
            <stop offset="1" stopColor="#86B6E8" />
          </linearGradient>
        </defs>

        <path
          d="M100 14c34 0 70 20 76 54 6 34-14 66-48 78-30 10-70 4-88-24C24 94 30 58 52 36c14-14 30-22 48-22z"
          fill="#ECE9FA"
        />
        <rect
          x="52"
          y="46"
          width="96"
          height="84"
          rx="22"
          fill="#fff"
          fillOpacity=".7"
          transform="rotate(-8 100 88)"
        />
        <rect
          x="56"
          y="40"
          width="96"
          height="90"
          rx="24"
          fill="#fff"
          stroke="#E7E4F5"
        />
        <circle cx="84" cy="72" r="14" fill="url(#emptyGrad)" />
        <path
          d="M78 72.5l4.2 4.2 8-8.4"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="106" y="65" width="34" height="6" rx="3" fill="#E7E4F5" />
        <rect x="106" y="77" width="22" height="6" rx="3" fill="#F0EEF9" />
        <rect x="70" y="98" width="68" height="6" rx="3" fill="#F0EEF9" />
        <rect x="70" y="110" width="44" height="6" rx="3" fill="#F0EEF9" />

        <circle cx="38" cy="58" r="5" fill="#F6C9B0" />
        <circle cx="170" cy="48" r="4" fill="#A9CBF0" />
        <circle cx="164" cy="128" r="6" fill="#B8E2CC" />
        <circle cx="30" cy="118" r="3" fill="#CFC8F3" />
      </svg>

      <h2>{title}</h2>
      <p>{description}</p>

      {action ?? (
        <button type="button" className="empty-btn" onClick={onAdd}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add task
        </button>
      )}
    </section>
  );
}