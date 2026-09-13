 // ========================================
// PURE LOGIC
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


// ========================================
// DOM HANDLING
// ========================================

const nameInput = document.querySelector("#studentName");
const scoreInput = document.querySelector("#studentScore");

const addButton = document.querySelector("#addButton");
const clearButton = document.querySelector("#clearButton");

const message = document.querySelector("#message");
const studentsList = document.querySelector("#studentsList");
const summary = document.querySelector("#summary");

const students = [];


// ========================================
// RENDER
// ========================================

function render() {
  studentsList.innerHTML = "";

  for (const student of students) {
    const studentElement = document.createElement("p");

    studentElement.textContent =
      `${student.name} - ${student.score} - Grade: ${letterGrade(
        student.score
      )}`;

    studentsList.appendChild(studentElement);
  }

  const scores = [];

  for (const student of students) {
    scores.push(student.score);
  }

  const classAverage = average(scores);

  summary.textContent =
    `Students: ${students.length} | Average: ${classAverage.toFixed(1)}`;
}


// ========================================
// ADD STUDENT
// ========================================

function handleAdd() {
  const name = nameInput.value.trim();
  const score = Number(scoreInput.value);

   if (name === "") {
    message.textContent = "Please enter a student name.";
    return;
  }

   if (scoreInput.value.trim() === "") {
    message.textContent = "Please enter a score.";
    return;
  }

   if (!isValidScore(score)) {
    message.textContent = "Score must be a number between 0 and 100.";
    return;
  }

  const student = {
    name: name,
    score: score,
  };

  students.push(student);

  console.log(students);

  message.textContent = "";

  nameInput.value = "";
  scoreInput.value = "";

  render();
}


// ========================================
// CLEAR
// ========================================

function handleClear() {
  students.length = 0;

  message.textContent = "";

  render();
}


// ========================================
// EVENTS
// ========================================

addButton.addEventListener("click", handleAdd);

clearButton.addEventListener("click", handleClear);


 render(); 