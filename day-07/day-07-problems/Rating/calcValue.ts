export interface RatingProps {
  value: number;
  max?: number;
  label?: string;
}

export function calcValue(value: number, max: number): number {
  if (Number.isNaN(value)) {
    value = 0;
  }

  value = Math.round(value);
  value = Math.max(0, value);
  value = Math.min(max, value);

  return value;
}
