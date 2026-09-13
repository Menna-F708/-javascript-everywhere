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
    student.attendance + "%",
  ).padEnd(13)}${grade.padEnd(8)}${status}`;
}