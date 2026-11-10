  
## 1. The three ideas from Days 01–06 I'd teach a friend first, and why

**1. Synchronous and Asynchronous JavaScript**

I'd teach this first because understanding the difference between synchronous and asynchronous code helps explain how JavaScript executes tasks and handles operations that take time without blocking the rest of the program.

**2. Promises**

Promises are important because they help us handle asynchronous operations and understand how to deal with successful results and errors using `.then()`, `.catch()`, and `async/await`.

**3. JavaScript Modules**

I'd teach modules because they help organize code into smaller, reusable files. They make projects easier to maintain, understand, and scale as they grow.

## 2. The hardest day, and what finally made it click

Day 06 was the hardest day for me because I needed to adapt to TypeScript after working with JavaScript.

At first, getting used to types and TypeScript syntax was challenging. However, as I continued solving the exercises and working with the code, I gradually became more comfortable with it and started understanding how TypeScript helps catch errors and make code more reliable.

## 3. One piece of Day 02 or 03 code I'd now write differently — before and after

I'd improve my Student Report code by separating responsibilities into smaller reusable functions instead of putting all the logic inside one large loop.

### Before

The original code handled several responsibilities in one place:
- Validating student records.
- Calculating grades.
- Checking student status.
- Calculating class statistics.
- Printing student reports and summaries.

Most of the logic was inside one loop, which made the code harder to read and maintain.

### After

I'd split the logic into smaller functions, where each function has one clear responsibility.

```js
function isValidStudent(student) {
  return (
    student.name !== undefined &&
    student.score !== undefined &&
    student.attendance !== undefined
  );
}

function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function getStudentStatus(student) {
  return student.score < 60 || student.attendance < 70
    ? "At risk"
    : "Safe";
}

function getClassAverage(students) {
  if (students.length === 0) return 0;

  const totalScore = students.reduce(
    (total, student) => total + student.score,
    0
  );

  return totalScore / students.length;
}
```

**Why I'd change it:**

This approach makes the code easier to read, test, reuse, and maintain. Each function has a single responsibility, so changing one part of the logic doesn't require modifying the entire program.

## 4. What I want to be able to build by the end of Track 2

By the end of Track 2, I want to be able to build a full-stack CRM (Customer Relationship Management) application.

I want to build a real-world application with a frontend, backend, database, authentication, and CRUD operations.

My goal is to understand how all these parts work together and become more confident building complete applications, not just frontend interfaces.