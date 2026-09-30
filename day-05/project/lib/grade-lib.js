 export function isValidScore(score) {
  return typeof score === "number" && score >= 0 && score <= 100;
}

export function letterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function isPassing({ score, passMark = 60 }) {
  return isValidScore(score) && score >= passMark;
}

export function isAtRisk({ score, attendance }) {
  return score < 60 || attendance < 70;
}

export function average(scores) {
  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);

  return total / scores.length;
}

export function minMaxStudent(students) {
  if (students.length === 0) {
    return {
      lowest: null,
      highest: null,
    };
  }

  let lowest = students[0];
  let highest = students[0];

  for (const student of students) {
    if (student.score < lowest.score) {
      lowest = student;
    }

    if (student.score > highest.score) {
      highest = student;
    }
  }

  return {
    lowest,
    highest,
  };
}

export function countByGrade(students) {
  const tally = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    F: 0,
  };

  for (const student of students) {
    const grade = letterGrade(student.score);
    tally[grade]++;
  }

  return tally;
}

export function formatRow(student) {
  return `${student.name}: ${student.score} (${letterGrade(student.score)})`;
}

export function withBonus(student, bonus) {
  return {
    ...student,
    score: student.score + bonus,
  };
}

export function withoutField(student, field) {
  const copy = { ...student };

  delete copy[field];

  return copy;
}
 