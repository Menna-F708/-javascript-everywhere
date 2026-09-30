import {
  average,
  formatRow,
  isPassing,
  letterGrade,
  getAttendance,
  withTimeout,
} from "./lib/index.js";

const PASS_MARK = 60;

let students = [];

const loadBtn = document.querySelector("#loadBtn");
const slowNetwork = document.querySelector("#slowNetwork");
const status = document.querySelector("#status");
const studentsList = document.querySelector("#studentsList");
const summary = document.querySelector("#summary");

const studentForm = document.querySelector("#studentForm");
const studentName = document.querySelector("#studentName");
const studentScore = document.querySelector("#studentScore");

const timeBtn = document.querySelector("#timeBtn");
const timing = document.querySelector("#timing");

function renderStudents() {
  studentsList.innerHTML = "";

  for (const student of students) {
    const row = document.createElement("p");

    const attendance =
      student.attendance === null ||
      student.attendance === undefined
        ? "—"
        : student.attendance;

    const passStatus = isPassing({
      score: student.score,
      passMark: PASS_MARK,
    })
      ? "PASS"
      : "FAIL";

    row.textContent =
      `${formatRow(student)} | ` +
      `Attendance: ${attendance} | ` +
      `${passStatus}`;

    studentsList.appendChild(row);
  }

  const scores = students.map((student) => student.score);

  summary.textContent = `Average: ${average(scores)}`;
}

async function loadStudents() {
  loadBtn.disabled = true;
  status.textContent = "Loading…";

  try {
    const fetchPromise = (async () => {
      if (slowNetwork.checked) {
        await new Promise((resolve) => {
          setTimeout(resolve, 2500);
        });
      }

      const res = await fetch("./students.json");

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      return data;
    })();

    const loadedStudents = await withTimeout(
      fetchPromise,
      2000
    );

    const attendanceResults = await Promise.allSettled(
      loadedStudents.map((student) =>
        getAttendance(student.id)
      )
    );

    let failedAttendance = 0;

    students = loadedStudents.map((student, index) => {
      const result = attendanceResults[index];

      if (result.status === "fulfilled") {
        return {
          ...student,
          attendance: result.value,
        };
      }

      failedAttendance++;

      return {
        ...student,
        attendance: null,
      };
    });

    renderStudents();

    if (failedAttendance > 0) {
      status.textContent =
        `Loaded successfully. ` +
        `${failedAttendance} attendance lookup(s) failed.`;
    } else {
      status.textContent = "Loaded successfully.";
    }
  } catch (error) {
    status.textContent = `Error: ${error.message}`;

    console.error(error);
  } finally {
    loadBtn.disabled = false;
  }
}

studentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = studentName.value.trim();
  const score = Number(studentScore.value);

  if (!name || Number.isNaN(score)) {
    return;
  }

  const newStudent = {
    id: Date.now(),
    name,
    score,
    attendance: null,
  };

  students = [...students, newStudent];

  renderStudents();

  studentForm.reset();
});

async function timeSequential() {
  const start = performance.now();

  for (const student of students) {
    try {
      await getAttendance(student.id);
    } catch {
      // Ignore failed attendance for timing.
    }
  }

  return performance.now() - start;
}

async function timeParallel() {
  const start = performance.now();

  await Promise.allSettled(
    students.map((student) =>
      getAttendance(student.id)
    )
  );

  return performance.now() - start;
}

timeBtn.addEventListener("click", async () => {
  if (students.length === 0) {
    timing.textContent = "Load students first.";
    return;
  }

  timeBtn.disabled = true;
  timing.textContent = "Timing…";

  try {
    const sequentialTime = await timeSequential();
    const parallelTime = await timeParallel();

    timing.textContent =
      `Sequential: ${sequentialTime.toFixed(0)}ms | ` +
      `Parallel: ${parallelTime.toFixed(0)}ms`;
  } finally {
    timeBtn.disabled = false;
  }
});

loadBtn.addEventListener("click", loadStudents);
 