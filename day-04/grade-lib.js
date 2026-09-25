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
  return `${String(name).padEnd(12)}${String(score).padStart(5)}${String(attendance).padStart(5)}`;
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