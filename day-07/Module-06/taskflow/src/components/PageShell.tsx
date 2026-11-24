import type { ReactNode } from "react";
import Logo from "./Logo";

type PageShellProps = {
  children: ReactNode;
};

export default function PageShell({ children }: PageShellProps) {
  return (
    <div className="page">
      <div className="page-brand">
        <Logo size={28} />
        Taskflow
      </div>

      <div className="page-deco" aria-hidden="true">
        <span className="d1" />
        <span className="d2" />
        <span className="d3" />
        <span className="d4" />
        <span className="d5" />
        <span className="d6" />
      </div>

      <div className="page-body">{children}</div>
    </div>
  );
}
