const students = [
  { name: "Menna", score: 95, attendance: 92 },
  { name: "Ahmed", score: 85, attendance: 88 },
  { name: "Sara", score: 75, attendance: 95 },
  { name: "Omar", score: 65, attendance: 80 },
  { name: "Nour", score: 55, attendance: 85 },
  { name: "Youssef", score: 90, attendance: 65 },
  { name: "Mariam", score: 70 }, // broken record
  { name: "Karim", score: 45, attendance: 60 },
];

let aCount = 0;
let bCount = 0;
let cCount = 0;
let dCount = 0;
let fCount = 0;

let totalScore = 0;
let validCount = 0;
let atRiskCount = 0;
let invalidCount = 0;

let highestStudent = null;
let lowestStudent = null;

// Header
console.log(
  `${"Name".padEnd(10)}${"Score".padEnd(8)}${"Attendance".padEnd(13)}${"Grade".padEnd(8)}Status`,
);

console.log("-".repeat(55));

 for (const student of students) {
   if (
    student.name === undefined ||
    student.score === undefined ||
    student.attendance === undefined
  ) {
    invalidCount++;
    continue;
  }

   let grade;

  if (student.score >= 90) {
    grade = "A";
    aCount++;
  } else if (student.score >= 80) {
    grade = "B";
    bCount++;
  } else if (student.score >= 70) {
    grade = "C";
    cCount++;
  } else if (student.score >= 60) {
    grade = "D";
    dCount++;
  } else {
    grade = "F";
    fCount++;
  }

   let status;

  if (student.score < 60 || student.attendance < 70) {
    status = "At risk";
    atRiskCount++;
  } else {
    status = "Safe";
  }

  // Total score
  totalScore += student.score;
  validCount++;

  // Highest student
  if (highestStudent === null || student.score > highestStudent.score) {
    highestStudent = student;
  }

  // Lowest student
  if (lowestStudent === null || student.score < lowestStudent.score) {
    lowestStudent = student;
  }

  // Student report
  console.log(
    `${student.name.padEnd(10)}${String(student.score).padEnd(8)}${String(
      student.attendance + "%",
    ).padEnd(13)}${grade.padEnd(8)}${status}`,
  );
}

// Average
const classAverage = totalScore / validCount;

// Summary
console.log("");
console.log("--------------- SUMMARY ---------------");

console.log(`A students: ${aCount}`);
console.log(`B students: ${bCount}`);
console.log(`C students: ${cCount}`);
console.log(`D students: ${dCount}`);
console.log(`F students: ${fCount}`);

console.log(`Class average: ${classAverage.toFixed(1)}`);

console.log(
  `Highest scoring student: ${highestStudent.name} (${highestStudent.score})`,
);

console.log(
  `Lowest scoring student: ${lowestStudent.name} (${lowestStudent.score})`,
);

console.log(`Students at risk: ${atRiskCount}`);

console.log(`Invalid records skipped: ${invalidCount}`);