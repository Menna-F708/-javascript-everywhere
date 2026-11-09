 export {};

 // ========================================
 // 5.4 — Callbacks: sync vs async
 // ========================================

 type Callback = () => void;

 const callback: Callback = () => {
   console.log("callback");
 };

 function repeat(times: number, callback: Callback): void {
   for (let i = 0; i < times; i++) {
     callback();
     console.log("done");
   }
 }

 function repeatLater(times: number, callback: Callback): void {
   for (let i = 0; i < times; i++) {
     console.log("done");

     
setTimeout(() => {
  callback();
}, 100);

   }
 }

 repeat(3, callback);
 repeatLater(3, callback);

 // ========================================
 // 5.5 — You can't return from the future
 // ========================================

 function getScoreLaterWrong(): void {
   setTimeout(() => {
     const score = 85;
     return score;
   }, 100);
 }

 const result = getScoreLaterWrong();
 console.log("Wrong result:", result);

 // Correct approach

 type ScoreCallback = (score: number) => void;

 function getScoreLater(callback: ScoreCallback): void {
   setTimeout(() => {
     const score = 85;
     callback(score);
   }, 100);
 }

 function letterGrade(score: number): string {
   if (score >= 90) return "A";
   if (score >= 80) return "B";
   if (score >= 70) return "C";
   if (score >= 60) return "D";
   return "F";
 }

 getScoreLater((score) => {
   const grade = letterGrade(score);

   console.log(`Score: ${score}`);
   console.log(`Grade: ${grade}`);
 });

 // ========================================
 // 5.6 — Error-first callbacks
 // ========================================

 type Student = {
   id: number;
   name: string;
   score: number;
 };

 type FindStudentCallback = (error: Error | null, student?: Student) => void;

 const students: Student[] = [
   { id: 1, name: "Menna", score: 95 },
   { id: 2, name: "Sara", score: 85 },
   { id: 3, name: "Omar", score: 75 },
 ];

 function findStudent(id: number, callback: FindStudentCallback): void {
   const student = students.find((student) => student.id === id);

   if (student === undefined) {
     callback(new Error("Student not found"));
     return;
   }

   callback(null, student);
 }

 // Good ID

 findStudent(2, (error, student) => {
   if (error !== null) {
     console.log("Error:", error.message);
     return;
   }

   if (student === undefined) {
     console.log("Error: Student data missing");
     return;
   }

   const { name, score } = student;
   console.log(`Found: ${name} - ${score}`);
 });

 // Bad ID

 findStudent(99, (error, student) => {
   if (error !== null) {
     console.log("Error:", error.message);
     return;
   }

   if (student === undefined) {
     console.log("Error: Student data missing");
     return;
   }

   const { name, score } = student;
   console.log(`Found: ${name} - ${score}`);
 });

 // ========================================
 // 5.7 — try/catch can't save you
 // ========================================

 // The intentionally crashing experiment remains commented out.

 // Correct approach

 type AsyncErrorHandler = (error: Error | null) => void;

 function doSomething(callback: AsyncErrorHandler): void {
   setTimeout(() => {
     const error = new Error("Something went wrong");
     callback(error);
   }, 100);
 }

 doSomething((error) => {
   if (error !== null) {
     console.log("Handled:", error.message);
     return;
   }

   console.log("Success!");
 });
