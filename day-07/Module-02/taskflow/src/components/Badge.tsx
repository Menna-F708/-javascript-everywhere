import type { BadgeProps } from "../types/type";
export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <div className={`badge badge-${tone}`}>
    {children}
  </div>;
}