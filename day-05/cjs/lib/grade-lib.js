console.log("grade-lib.js loaded");
function letterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function average(scores) {
  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce((sum, score) => sum + score, 0);

  return total / scores.length;
}

// Private helper
function makeSeparator() {
  return "----------------";
}

function formatRow(student) {
  return `${student.name}: ${student.score} (${letterGrade(student.score)})`;
}

module.exports = {
  letterGrade,
  average,
  formatRow,
};



exports = {
  letterGrade,
  average,
  formatRow,
};