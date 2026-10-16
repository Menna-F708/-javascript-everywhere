import { calcValue } from "./calcValue";
import type { RatingProps } from "./calcValue";

export default function Rating({ value, max = 5, label }: RatingProps) {
  if (!Number.isInteger(max) || max <= 0) {
    return null;
  }

  const filled = calcValue(value, max);
  const filledStars = "★".repeat(filled);
  const emptyStars = "☆".repeat(max - filled);

  return (
    <div>
      {label && `${label}: `}
      <span role="img" aria-label={`${filled} out of ${max}`}>
        <span aria-hidden="true">
          {filledStars}
          {emptyStars}
        </span>
      </span> 
      {` (${filled}/${max})`}
    </div>
  );
}