 // ========================================
// GRADE LIBRARY
// ========================================

function isValidScore(score) {
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

function letterGrade(score) {
  if (score >= 90) {
    return "A";
  } else if (score >= 80) {
    return "B";
  } else if (score >= 70) {
    return "C";
  } else if (score >= 60) {
    return "D";
  } else {
    return "F";
  }
}

function isPassing(score, passMark = 60) {
  return score >= passMark;
}

function isAtRisk(student) {
  return student.score < 60 || student.attendance < 70;
}

function average(numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total / numbers.length;
}

function highest(students) {
  if (students.length === 0) {
    return null;
  }

  let highestStudent = students[0];

  for (const student of students) {
    if (student.score > highestStudent.score) {
      highestStudent = student;
    }
  }

  return highestStudent;
}

function lowest(students) {
  if (students.length === 0) {
    return null;
  }

  let lowestStudent = students[0];

  for (const student of students) {
    if (student.score < lowestStudent.score) {
      lowestStudent = student;
    }
  }

  return lowestStudent;
}

function countByGrade(students) {
  const counts = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  for (const student of students) {
    const grade = letterGrade(student.score);
    counts[grade]++;
  }

  return counts;
}

function formatRow(student) {
  const grade = letterGrade(student.score);

  let status;

  if (isAtRisk(student)) {
    status = "At risk";
  } else {
    status = "Safe";
  }

  return `${student.name.padEnd(10)}${String(student.score).padEnd(8)}${String(
    student.attendance + "%"
  ).padEnd(13)}${grade.padEnd(8)}${status}`;
}


// ========================================
// REPORT PROGRAM
// ========================================

const students = [
  { name: "Menna", score: 95, attendance: 92 },
  { name: "Ahmed", score: 85, attendance: 88 },
  { name: "Sara", score: 75, attendance: 95 },
  { name: "Omar", score: 65, attendance: 80 },
  { name: "Nour", score: 55, attendance: 85 },
  { name: "Youssef", score: 90, attendance: 65 },
  { name: "Mariam", score: 70, attendance: 75 },
  { name: "Karim", score: 45, attendance: 60 },
  { name: "Laila", score: 82, attendance: 91 },
  { name: "Hassan", score: 68, attendance: 78 },

  // Broken record: score is a string
  { name: "Ali", score: "95", attendance: 90 },

  // Broken record: score is null
  { name: "Hana", score: null, attendance: 85 },
];

console.log(
  `${"Name".padEnd(10)}${"Score".padEnd(8)}${"Attendance".padEnd(
    13
  )}${"Grade".padEnd(8)}Status`
);

console.log("-".repeat(55));

let invalidCount = 0;
let atRiskCount = 0;

const validStudents = [];

for (const student of students) {
  if (!isValidScore(student.score)) {
    invalidCount++;
    continue;
  }

  validStudents.push(student);

  console.log(formatRow(student));

  if (isAtRisk(student)) {
    atRiskCount++;
  }
}

const gradeCounts = countByGrade(validStudents);

const scores = [];

for (const student of validStudents) {
  scores.push(student.score);
}

const classAverage = average(scores);

const highestStudent = highest(validStudents);
const lowestStudent = lowest(validStudents);

console.log("");

console.log("--------------- SUMMARY ---------------");

console.log(`A students: ${gradeCounts.A}`);
console.log(`B students: ${gradeCounts.B}`);
console.log(`C students: ${gradeCounts.C}`);
console.log(`D students: ${gradeCounts.D}`);
console.log(`F students: ${gradeCounts.F}`);

console.log(`Class average: ${classAverage.toFixed(1)}`);

console.log(
  `Highest scoring student: ${highestStudent.name} (${highestStudent.score})`
);

console.log(
  `Lowest scoring student: ${lowestStudent.name} (${lowestStudent.score})`
);

console.log(`Students at risk: ${atRiskCount}`);

console.log(`Invalid records skipped: ${invalidCount}`);