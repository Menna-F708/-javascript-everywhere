 // ======================================================
// grade-lib.js
// ======================================================

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

function isPassing({ score, passMark = 60 }) {
  return score >= passMark;
}

function isAtRisk({ score = 0, attendance = 0 }) {
  return score < 60 || attendance < 70;
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

function minMaxStudent(students) {
  let low = students[0];
  let high = students[0];

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

function countByGrade(students) {
  const countGrade = {};

  for (const { score } of students) {
    const grade = letterGrade(score);

    countGrade[grade] = (countGrade[grade] ?? 0) + 1;
  }

  return countGrade;
}

function formatRow({ name, score, attendance } = {}) {
  return `${String(name).padEnd(12)}${String(score).padStart(
    5
  )}${String(attendance).padStart(12)}`;
}

function withBonus({ score, ...student }, bonus = 5) {
  return {
    ...student,
    score: score + bonus,
  };
}

function withoutField({ ...student }, field) {
  const { [field]: removed, ...rest } = student;

  return rest;
}

// ======================================================
// Students data
// ======================================================

const students = [
  {
    id: 1,
    name: "Menna",
    score: 95,
    attendance: 92,
  },
  {
    id: 2,
    name: "Ahmed",
    score: 85,
    attendance: 88,
  },
  {
    id: 3,
    name: "Sara",
    score: 75,
    attendance: 95,
  },
  {
    id: 4,
    name: "Omar",
    score: 65,
    attendance: 80,
  },
  {
    id: 5,
    name: "Nour",
    score: 55,
    attendance: 85,
  },
  {
    id: 6,
    name: "Youssef",
    score: 90,
    attendance: 65,
  },
  {
    id: 7,
    name: "Mariam",
    score: 70,
    attendance: 75,
  },
  {
    id: 8,
    name: "Karim",
    score: 45,
    attendance: 60,
  },
  {
    id: 9,
    name: "Laila",
    score: "82",
    attendance: 91,
  },
  {
    id: 10,
    name: "Hassan",
    score: 68,
    attendance: 78,
  },
];

// ======================================================
// 7.4 Printing the report
// ======================================================

let invalidCount = 0;

const validStudents = [];

// ------------------------------------------------------
// Header
// ------------------------------------------------------

console.log("=================================");
console.log("         STUDENT REPORT");
console.log("=================================");

console.log(
  `${"Name".padEnd(12)}${"Score".padStart(5)}${"Attendance".padStart(
    12
  )}`
);

console.log("-".repeat(29));

// ------------------------------------------------------
// Loop through students
// ------------------------------------------------------

for (const { name, score, attendance } of students) {
  // Skip invalid students
  if (!isValidScore(score)) {
    invalidCount++;
    continue;
  }

  // Keep valid students for summary
  validStudents.push({
    name,
    score,
    attendance,
  });

  // Print one row
  console.log(
    formatRow({
      name,
      score,
      attendance,
    })
  );
}

// ------------------------------------------------------
// Separator
// ------------------------------------------------------

console.log("-".repeat(29));

// ------------------------------------------------------
// Invalid records
// ------------------------------------------------------

console.log(`Invalid records: ${invalidCount}`);

// ------------------------------------------------------
// Summary
// ------------------------------------------------------

const [lowest, highest] = minMaxStudent(validStudents);

console.log(
  `Lowest score: ${lowest.name} - ${lowest.score}`
);

console.log(
  `Highest score: ${highest.name} - ${highest.score}`
);

// ------------------------------------------------------
// Grade tally
// ------------------------------------------------------

console.log("\nGrade tally:");

const gradeTally = countByGrade(validStudents);

for (const [grade, count] of Object.entries(gradeTally)) {
  console.log(`${grade}: ${count}`);
}

// ------------------------------------------------------
// Bonus
// ------------------------------------------------------

console.log("\nBonus test:");

const original = validStudents[0];

const boosted = withBonus(original);

console.log(`Original score: ${original.score}`);
console.log(`Boosted score: ${boosted.score}`);

// Prove that the original object was NOT changed
console.log(`Original after bonus: ${original.score}`);
