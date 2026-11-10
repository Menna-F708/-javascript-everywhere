 import dayjs from "dayjs";
import { readFile } from "node:fs/promises";

import {
  isStudent,
  isPassing,
  average,
  minMaxStudent,
  countByGrade,
  formatRow,
  getAttendance,
  withTimeout,
  retry,
  errorMessage,
} from "./lib/index.ts";

import type { Student, GradedStudent } from "./types.ts";

console.log("Loading...");

const startTime = Date.now();

try {
  const fileUrl = new URL("../students.json", import.meta.url);

  // Read students.json with a timeout
  const fileContent = await withTimeout(
    readFile(fileUrl, "utf8"),
    2000,
  );

  // JSON.parse returns unknown
  const rawStudents: unknown = JSON.parse(fileContent);

  if (!Array.isArray(rawStudents)) {
    throw new Error("Students data must be an array");
  }

  // Validate records using the type guard
  const validStudents: Student[] = [];
  let skipped = 0;

  for (const student of rawStudents) {
    if (!isStudent(student)) {
      skipped++;
      continue;
    }

    validStudents.push(student);
  }

  // Get attendance using retry + Promise.allSettled
  const attendanceResults = await Promise.allSettled(
    validStudents.map((student) =>
      retry(() => getAttendance(student.id), 3, 100),
    ),
  );

  const studentsWithAttendance: GradedStudent[] = validStudents.map(
    (student, index) => {
      const result = attendanceResults[index];

      if (!result) {
        return {
          ...student,
          attendance: null,
        };
      }

      return {
        ...student,
        attendance:
          result.status === "fulfilled" ? result.value : null,
      };
    },
  );

  // Header + one row per valid student
  console.log("Students:");

  for (const student of studentsWithAttendance) {
    console.log(
      formatRow(student),
      `Attendance: ${student.attendance ?? "—"}`,
    );
  }

  console.log("----------------");

  // Report calculations
  const scores = studentsWithAttendance.map(
    (student) => student.score,
  );

  const averageScore = average(scores);

  const { lowest, highest } =
    minMaxStudent(studentsWithAttendance);

  const gradeTally = countByGrade(studentsWithAttendance);

  const passed = studentsWithAttendance.filter((student) =>
    isPassing(student),
  ).length;

  console.log(`Average: ${averageScore}`);

  if (lowest) {
    console.log(`Lowest: ${lowest.name} - ${lowest.score}`);
  }

  if (highest) {
    console.log(`Highest: ${highest.name} - ${highest.score}`);
  }

  console.log(`Passed: ${passed}`);

  console.log(`Skipped: ${skipped}`);

  console.log("Grade tally:");

  for (const [grade, count] of Object.entries(gradeTally)) {
    console.log(`${grade}: ${count}`);
  }
} catch (error: unknown) {
  console.log(`Error: ${errorMessage(error)}`);
} finally {
  const elapsed = Date.now() - startTime;

  console.log(`Total time: ${elapsed}ms`);
}

console.log(
  "Report date:",
  dayjs().format("YYYY-MM-DD"),
);
