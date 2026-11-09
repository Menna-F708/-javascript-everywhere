 export {};

 // ======================================================
 // Types
 // ======================================================

 type LetterGrade = "A" | "B" | "C" | "D" | "F";

 type RawStudent = {
   id: number;
   name: string;
   score: number | string;
   attendance: number;
 };

 type Student = {
   name: string;
   score: number;
   attendance: number;
 };

 type GradeTally = Partial<Record<LetterGrade, number>>;

 // ======================================================
 // grade-lib functions
 // ======================================================

 function isValidScore(score: unknown): score is number {
   if (typeof score !== "number") {
     return false;
   }

   if (Number.isNaN(score)) {
     return false;
   }

   if (score < 0 || score > 100) {
     return false;
   }

   return true;
 }

 function letterGrade(score: number): LetterGrade {
   if (score >= 90) {
     return "A";
   } else if (score >= 80) {
     return "B";
   } else if (score >= 70) {
     return "C";
   } else if (score >= 60) {
     return "D";
   }

   return "F";
 }

 function isPassing({
   score,
   passMark = 60,
 }: {
   score: number;
   passMark?: number;
 }): boolean {
   return score >= passMark;
 }

 function isAtRisk({
   score = 0,
   attendance = 0,
 }: {
   score?: number;
   attendance?: number;
 }): boolean {
   return score < 60 || attendance < 70;
 }

 function average(numbers: number[]): number {
   if (numbers.length === 0) {
     return 0;
   }

   let total = 0;

   for (const number of numbers) {
     total += number;
   }

   return total / numbers.length;
 }

 function minMaxStudent(students: Student[]): [Student, Student] | null {
   const firstStudent = students[0];

   if (firstStudent === undefined) {
     return null;
   }

   let low = firstStudent;
   let high = firstStudent;

   for (const student of students) {
     if (student.score < low.score) {
       low = student;
     }

if (student.score > high.score) {
  high = student;
}
   }

   return [low, high];
 }

 function countByGrade(students: Student[]): GradeTally {
   const countGrade: GradeTally = {};

   for (const { score } of students) {
     const grade = letterGrade(score);
     countGrade[grade] = (countGrade[grade] ?? 0) + 1;
   }

   return countGrade;
 }

 function formatRow({ name, score, attendance }: Student): string {
   return `${String(name).padEnd(12)}${String(score).padStart(
     5,
   )}${String(attendance).padStart(12)}`;
 }

 function withBonus({ score, ...student }: Student, bonus = 5): Student {
   return {
     ...student,
     score: score + bonus,
   };
 }

 function withoutField<K extends keyof Student>(
   { ...student }: Student,
   field: K,
 ): Omit<Student, K> {
   const { [field]: removed, ...rest } = student;
   return rest;
 }

 // ======================================================
 // Students data
 // ======================================================

 const students: RawStudent[] = [
   { id: 1, name: "Menna", score: 95, attendance: 92 },
   { id: 2, name: "Ahmed", score: 85, attendance: 88 },
   { id: 3, name: "Sara", score: 75, attendance: 95 },
   { id: 4, name: "Omar", score: 65, attendance: 80 },
   { id: 5, name: "Nour", score: 55, attendance: 85 },
   { id: 6, name: "Youssef", score: 90, attendance: 65 },
   { id: 7, name: "Mariam", score: 70, attendance: 75 },
   { id: 8, name: "Karim", score: 45, attendance: 60 },
   { id: 9, name: "Laila", score: "82", attendance: 91 },
   { id: 10, name: "Hassan", score: 68, attendance: 78 },
 ];

 // ======================================================
 // Printing the report
 // ======================================================

 let invalidCount = 0;
 const validStudents: Student[] = [];

 console.log("=================================");
 console.log("         STUDENT REPORT");
 console.log("=================================");

 console.log(
   `${"Name".padEnd(12)}${"Score".padStart(5)}${"Attendance".padStart(12)}`,
 );

 console.log("-".repeat(29));

 for (const { name, score, attendance } of students) {
   if (!isValidScore(score)) {
     invalidCount++;
     continue;
   }

   validStudents.push({
     name,
     score,
     attendance,
   });

   console.log(formatRow({ name, score, attendance }));
 }

 console.log("-".repeat(29));
 console.log(`Invalid records: ${invalidCount}`);

 const minMax = minMaxStudent(validStudents);

 if (minMax !== null) {
   const [lowest, highest] = minMax;

   console.log(`Lowest score: ${lowest.name} - ${lowest.score}`);
   console.log(`Highest score: ${highest.name} - ${highest.score}`);
 }

 console.log("\nGrade tally:");

 const gradeTally = countByGrade(validStudents);
 const grades: LetterGrade[] = ["A", "B", "C", "D", "F"];

 for (const grade of grades) {
   const count = gradeTally[grade];

   if (count !== undefined) {
     console.log(`${grade}: ${count}`);
   }
 }

 console.log("\nBonus test:");

 const original = validStudents[0];

 if (original !== undefined) {
   const boosted = withBonus(original);

   console.log(`Original score: ${original.score}`);
   console.log(`Boosted score: ${boosted.score}`);
   console.log(`Original after bonus: ${original.score}`);
 }
