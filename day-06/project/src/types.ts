export type Student = {
  readonly id: number;
  name: string;
  score: number;
};

export type LetterGrade = "A" | "B" | "C" | "D" | "F";

export interface GradedStudent extends Student {
  attendance?: number | null;
}

export interface GradeTally {
  A: number;
  B: number;
  C: number;
  D: number;
  F: number;
}