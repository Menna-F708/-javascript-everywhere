 // ======================================================
// PURE LOGIC
// ======================================================

let students = [];

function describe({ name, score, city = "Unknown" }) {
  return `${name} scored ${score} and lives in ${city}.`;
}

function isValidScore(score) {
  return (
    typeof score === "number" &&
    !Number.isNaN(score) &&
    score >= 0 &&
    score <= 100
  );
}

function calculateAverage(students) {
  if (students.length === 0) {
    return 0;
  }

  const total = students.reduce(
    (sum, student) => sum + student.score,
    0
  );

  return total / students.length;
}

function createStudent(name, score, city) {
  const newStudent = {
    name,
    score,
  };

  if (city.trim() !== "") {
    return {
      ...newStudent,
      city: city.trim(),
    };
  }

  return newStudent;
}


// ======================================================
// FAKE SERVER
// ======================================================

function fetchStudents(callback) {
  const delay = 1500;

  setTimeout(() => {
    const shouldFail = Math.random() < 0.25;

    if (shouldFail) {
      return callback(
        new Error("Failed to load students from server")
      );
    }

    const serverStudents = [
      {
        name: "Mariam",
        score: 88,
        city: "Alexandria",
      },
      {
        name: "Omar",
        score: 76,
        city: "Cairo",
      },
      {
        name: "Nour",
        score: 94,
      },
    ];

    callback(null, serverStudents);
  }, delay);
}


// ======================================================
// DOM HANDLING
// ======================================================

const form = document.querySelector("#studentForm");

const nameInput = document.querySelector("#nameInput");
const scoreInput = document.querySelector("#scoreInput");
const cityInput = document.querySelector("#cityInput");

const clearButton = document.querySelector("#clearButton");
const loadButton = document.querySelector("#loadButton");

const freezeButton = document.querySelector("#freezeButton");
const chunkedButton = document.querySelector("#chunkedButton");

const studentList = document.querySelector("#studentList");
const summary = document.querySelector("#summary");
const message = document.querySelector("#message");


// ======================================================
// RENDER
// ======================================================

function render() {
  studentList.innerHTML = "";

  for (const student of students) {
    const li = document.createElement("li");

    li.textContent = describe(student);

    studentList.appendChild(li);
  }

  const average = calculateAverage(students);

  summary.textContent =
    `Students: ${students.length} | Average: ${average.toFixed(1)}`;
}


// ======================================================
// ADD STUDENT
// ======================================================

function handleAddStudent(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const scoreText = scoreInput.value.trim();
  const city = cityInput.value.trim();

  // Empty name
  if (name === "") {
    message.textContent = "Please enter a name.";
    return;
  }

  // Empty score
  if (scoreText === "") {
    message.textContent = "Please enter a score.";
    return;
  }

  const score = Number(scoreText);

  // Invalid score
  if (!isValidScore(score)) {
    message.textContent =
      "Score must be a number between 0 and 100.";

    return;
  }

  const newStudent = createStudent(
    name,
    score,
    city
  );

  students = [...students, newStudent];

  message.textContent = "Student added successfully.";

  form.reset();

  render();
}

form.addEventListener("submit", handleAddStudent);


// ======================================================
// CLEAR
// ======================================================

function handleClear() {
  students = [];

  message.textContent = "All students cleared.";

  render();
}

clearButton.addEventListener("click", handleClear);


// ======================================================
// LOAD FROM SERVER
// ======================================================

function handleLoad() {
  loadButton.disabled = true;

  message.textContent = "Loading…";

  fetchStudents((err, loadedStudents) => {
    // ----------------------------------------------
    // Error
    // ----------------------------------------------

    if (err) {
      message.textContent = `Error: ${err.message}`;

      loadButton.disabled = false;

      return;
    }

    // ----------------------------------------------
    // Success
    // ----------------------------------------------

    students = [...students, ...loadedStudents];

    message.textContent = "Students loaded successfully.";

    render();

    loadButton.disabled = false;
  });

  console.log("Request sent — the page can continue.");
}

loadButton.addEventListener("click", handleLoad);


// ======================================================
// FREEZE VS CHUNKED
// ======================================================

// ------------------------------------------------------
// FREEZE
// ------------------------------------------------------

function blockFor(ms) {
  const start = Date.now();

  while (Date.now() - start < ms) {
   }
}

function handleFreeze() {
  message.textContent = "Freezing...";

  blockFor(3000);

  message.textContent = "Freeze finished!";
}

freezeButton.addEventListener("click", handleFreeze);


// ------------------------------------------------------
// CHUNKED
// ------------------------------------------------------

function chunkedWork(updateProgress, done) {
  let progress = 0;

  function step() {
     const start = Date.now();

    while (Date.now() - start < 30) {
     }

    progress += 10;

    updateProgress(progress);

    if (progress < 100) {
      setTimeout(step, 0);
    } else {
      done();
    }
  }

  step();
}

function handleChunked() {
  message.textContent = "Chunked: 0%";

  chunkedWork(
    (progress) => {
      message.textContent = `Chunked: ${progress}%`;
    },
    () => {
      message.textContent = "Chunked: Done!";
    }
  );
}

chunkedButton.addEventListener("click", handleChunked);


// ======================================================
// INITIAL RENDER
// ======================================================

render();
 // Handle chunked loading