
// ========================================
// Task 4.2 — Narrowing Lab
// Literal Unions
// ========================================


// ========================================
// 1. Literal union — LetterGrade
// ========================================

type LetterGrade = "A" | "B" | "C" | "D" | "F";


// ========================================
// 2. Function returning LetterGrade
// ========================================

function letterGrade(score: number): LetterGrade {
  if (score >= 90) {
    return "A";
  }

  if (score >= 80) {
    return "B";
  }

  if (score >= 70) {
    return "C";
  }

  if (score >= 60) {
    return "D";
  }

  return "F";
}


// Test the function

console.log(letterGrade(95)); // A
console.log(letterGrade(85)); // B
console.log(letterGrade(75)); // C
console.log(letterGrade(65)); // D
console.log(letterGrade(40)); // F


// ========================================
// 3. Switch over every LetterGrade
// ========================================

function describeGrade(grade: LetterGrade): string {
  switch (grade) {
    case "A":
      return "Excellent";

    case "B":
      return "Very Good";

    case "C":
      return "Good";

    case "D":
      return "Pass";

    case "F":
      return "Fail";
  }
}


// Test every case

console.log(describeGrade("A"));
console.log(describeGrade("B"));
console.log(describeGrade("C"));
console.log(describeGrade("D"));
console.log(describeGrade("F"));


// ========================================
// 4. Deleted case experiment
// ========================================

// The "F" case was intentionally removed:
//
// function describeGrade(grade: LetterGrade): string {
//   switch (grade) {
//     case "A":
//       return "Excellent";
//
//     case "B":
//       return "Very Good";
//
//     case "C":
//       return "Good";
//
//     case "D":
//       return "Pass";
//   }
// }
//
// Error:
// Function lacks ending return statement and return type
// does not include 'undefined'.
//
// This happens because LetterGrade also includes "F",
// but the switch no longer handles it.
//
// The "F" case was restored above.




 
// ========================================
// 1. parseScore
// ========================================

function parseScore(
  input: number | string | null | undefined
): number | null {

  // number branch
  if (typeof input === "number") {
    // Narrowed type: number
    return input;
  }

  // string branch
  if (typeof input === "string") {
    // Narrowed type: string

    const score = Number(input);

    if (Number.isNaN(score)) {
      return null;
    }

    return score;
  }

  // null branch
  if (input === null) {
    // Narrowed type: null
    return null;
  }

  // undefined branch
  // Narrowed type: undefined
  return null;
}


// Test every member

console.log(parseScore(95));       // 95
console.log(parseScore("85"));     // 85
console.log(parseScore("hello"));  // null
console.log(parseScore(null));     // null
console.log(parseScore(undefined)); // null


// ========================================
// 2. string | string[]
// ========================================

function toStringArray(input: string | string[]): string[] {

  if (Array.isArray(input)) {
    // Narrowed type: string[]
    return input;
  }

  // Narrowed type: string
  return [input];
}


// Test

console.log(toStringArray("Menna"));
console.log(toStringArray(["Menna", "Sara"]));


// ========================================
// 3. Error | string
// ========================================

function getErrorMessage(value: Error | string): string {

  if (value instanceof Error) {
    // Narrowed type: Error
    return value.message;
  }

  // Narrowed type: string
  return value;
}


// Test

console.log(getErrorMessage(new Error("Something went wrong")));
console.log(getErrorMessage("Invalid input"));


// ========================================
// 4. { name } | { title }
// ========================================

function getLabel(
  item: { name: string } | { title: string }
): string {

  if ("name" in item) {
    // Narrowed type: { name: string }
    return item.name;
  }

  // Narrowed type: { title: string }
  return item.title;
}


// Test

console.log(getLabel({ name: "Menna" }));
console.log(getLabel({ title: "TypeScript Course" }));




// ========================================
// Task 4.4 — Null and Undefined
// ========================================


// ========================================
// 1. Handling .find() result with if
// ========================================

const students = ["Menna", "Sara", "Omar"];

const studentWithIf = students.find(
  (student) => student === "Menna"
);

// .find() returns: string | undefined

if (studentWithIf !== undefined) {
  // Narrowed type: string
  console.log("Found:", studentWithIf);
} else {
  // Narrowed type: undefined
  console.log("Student not found");
}


// ========================================
// 2. Handling .find() result with ?.
// ========================================

const studentWithOptionalChaining = students.find(
  (student) => student === "Sara"
);

// Type: string | undefined

console.log(
  "Name length:",
  studentWithOptionalChaining?.length
);

// If the student exists:
// returns the length.
//
// If the student is undefined:
// returns undefined instead of throwing an error.


// ========================================
// 3. Handling .find() result with ??
// ========================================

const studentWithNullish = students.find(
  (student) => student === "Ahmed"
);

// Type: string | undefined

const studentName = studentWithNullish ?? "Guest";

console.log("Student:", studentName);

// If the result is undefined:
// "Guest" is used.
//
// If the result exists:
// the actual student name is used.


// ========================================
// 4. noUncheckedIndexedAccess
// ========================================

const scores: number[] = [90, 85, 95];

const firstScore = scores[0];

// With noUncheckedIndexedAccess enabled:
//
// Type:
// number | undefined

if (firstScore !== undefined) {
  // Narrowed type: number
  console.log("First score:", firstScore);
} else {
  // Narrowed type: undefined
  console.log("No score found");
}


// ========================================
// 5. Index that may not exist
// ========================================

const scoreAtIndex10 = scores[10];

// Type:
// number | undefined

if (scoreAtIndex10 !== undefined) {
  // Narrowed type: number
  console.log("Score:", scoreAtIndex10);
} else {
  // Narrowed type: undefined
  console.log("No score at index 10");
}



export {};