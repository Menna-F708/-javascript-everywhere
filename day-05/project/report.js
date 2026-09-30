import dayjs from "dayjs";
import { readFile } from "node:fs/promises";

import {
  isValidScore,
  average,
  minMaxStudent,
  countByGrade,
  formatRow,
  withBonus,
  getAttendance,
  withTimeout,
  retry,
} from "./lib/index.js";

console.log("Loading...");

const startTime = Date.now();

try {
  const fileUrl = new URL("./students.json", import.meta.url);

  const fileContent = await withTimeout(
    readFile(fileUrl, "utf8"),
    2000
  );

  const students = JSON.parse(fileContent);

  const attendanceResults = await Promise.allSettled(
    students.map((student) =>
      retry(
        () => getAttendance(student.id),
        3,
        100
      )
    )
  );

  const studentsWithAttendance = students.map(
    (student, index) => {
      const result = attendanceResults[index];

      return {
        ...student,
        attendance:
          result.status === "fulfilled"
            ? result.value
            : null,
      };
    }
  );

  const validStudents = [];
  let invalidCount = 0;

  for (const student of studentsWithAttendance) {
    if (!isValidScore(student.score)) {
      invalidCount++;
      continue;
    }

    validStudents.push(student);
  }

  console.log("Students:");

  for (const student of validStudents) {
    console.log(
      formatRow(student),
      `Attendance: ${student.attendance ?? "—"}`
    );
  }

  console.log("----------------");

  const scores = validStudents.map(
    (student) => student.score
  );

  const { lowest, highest } = minMaxStudent(validStudents);

  const averageScore = average(scores);

  const gradeTally = countByGrade(validStudents);

  console.log(`Average: ${averageScore}`);
  console.log(
    `Lowest: ${lowest.name} - ${lowest.score}`
  );
  console.log(
    `Highest: ${highest.name} - ${highest.score}`
  );

  console.log(`Invalid students: ${invalidCount}`);

  console.log("Grade tally:");

  for (const [grade, count] of Object.entries(gradeTally)) {
    console.log(`${grade}: ${count}`);
  }

  const originalStudent = validStudents[0];

  const boostedStudent = withBonus(
    originalStudent,
    5
  );

  console.log(
    `Bonus test: ${originalStudent.score} -> ${boostedStudent.score}`
  );

  console.log(
    `Original after bonus: ${originalStudent.score}`
  );
} catch (error) {
  console.log(`Error: ${error.message}`);
} finally {
  const elapsed = Date.now() - startTime;

  console.log(`Total time: ${elapsed}ms`);
}

console.log("Report date:", dayjs().format("YYYY-MM-DD"));
 