// import "./report.ts";
 import {
average,
formatRow,
isPassing,
isStudent,
letterGrade,
getAttendance,
withTimeout,
} from "./lib/index.ts";

import type { GradedStudent } from "./types.ts";

const PASS_MARK = 40;

let students: GradedStudent[] = [];

// -------------------------
// Page State
// -------------------------

type PageState =
| { status: "idle" }
| { status: "loading" }
| {
status: "success";
skipped: number;
failedAttendance: number;
}
| {
status: "error";
message: string;
};

let pageState: PageState = {
status: "idle",
};

// -------------------------
// Typed DOM helper
// -------------------------

function getElement<T extends Element>(selector: string): T {
const element = document.querySelector<T>(selector);

if (!element) {
throw new Error(`Element not found: ${selector}`);
}

return element;
}

// -------------------------
// DOM Elements
// -------------------------

const loadBtn =
getElement<HTMLButtonElement>("#loadBtn");

const slowNetwork =
getElement<HTMLInputElement>("#slowNetwork");

const status =
getElement<HTMLParagraphElement>("#status");

const studentsList =
getElement<HTMLDivElement>("#studentsList");

const summary =
getElement<HTMLParagraphElement>("#summary");

const studentForm =
getElement<HTMLFormElement>("#studentForm");

const studentName =
getElement<HTMLInputElement>("#studentName");

const studentScore =
getElement<HTMLInputElement>("#studentScore");

const timeBtn =
getElement<HTMLButtonElement>("#timeBtn");

const timing =
getElement<HTMLParagraphElement>("#timing");

// -------------------------
// Exhaustive Page State
// -------------------------

function renderPageState(state: PageState): void {
switch (state.status) {
case "idle":
status.textContent = "Ready";
break;

case "loading":
  status.textContent = "Loading…";
  break;

case "success":
  if (state.skipped > 0) {
    status.textContent =
      `Loaded successfully. ` +
      `${state.skipped} student(s) skipped.`;
  } else {
    status.textContent =
      "Loaded successfully.";
  }

  if (state.failedAttendance > 0) {
    status.textContent +=
      ` ${state.failedAttendance} attendance lookup(s) failed.`;
  }

  break;

case "error":
  status.textContent =
    `Error: ${state.message}`;
  break;

default: {
  const exhaustiveCheck: never = state;
  return exhaustiveCheck;
}


}
}

// -------------------------
// Render Students
// -------------------------

function renderStudents(): void {
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

const scores = students.map(
(student) => student.score
);

const averageScore = average(scores);

const averageGrade =
scores.length > 0
? letterGrade(averageScore)
: "—";

summary.textContent =
`Average: ${averageScore} (${averageGrade})`;
}

// -------------------------
// Load Students
// -------------------------

async function loadStudents(): Promise<void> {
loadBtn.disabled = true;

pageState = {
status: "loading",
};

renderPageState(pageState);

try {
const fetchPromise = (async (): Promise<unknown> => {
if (slowNetwork.checked) {
await new Promise<void>((resolve) => {
setTimeout(resolve, 2500);
});
}


  const response = await fetch("./students.json");

  if (!response.ok) {
    throw new Error(
      `HTTP error: ${response.status}`
    );
  }

  const data: unknown = await response.json();

  return data;
})();

const data = await withTimeout(
  fetchPromise,
  2000
);

// JSON is unknown.
// Only valid Student records are accepted.
if (!Array.isArray(data)) {
  throw new Error(
    "Students data must be an array"
  );
}

const validStudents = data.filter(
  isStudent
);

const skipped =
  data.length - validStudents.length;

// Fetch attendance in parallel
const attendanceResults =
  await Promise.allSettled(
    validStudents.map((student) =>
      getAttendance(student.id)
    )
  );

let failedAttendance = 0;

students = validStudents.map(
  (student, index): GradedStudent => {
    const result =
      attendanceResults[index];

    if (!result) {
      failedAttendance++;

      return {
        ...student,
        attendance: null,
      };
    }

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
  }
);

renderStudents();

pageState = {
  status: "success",
  skipped,
  failedAttendance,
};

renderPageState(pageState);


} catch (error: unknown) {
const message =
error instanceof Error
? error.message
: String(error);


pageState = {
  status: "error",
  message,
};

renderPageState(pageState);

console.error(error);

} finally {
// Button is re-enabled ONLY here
loadBtn.disabled = false;
}
}

// -------------------------
// Add Student
// -------------------------

studentForm.addEventListener(
"submit",
(event: SubmitEvent): void => {
event.preventDefault();


const name =
  studentName.value.trim();

const score =
  studentScore.valueAsNumber;

// Reject empty name,
// NaN and out-of-range scores.
if (
  !name ||
  Number.isNaN(score) ||
  score < 0 ||
  score > 100
) {
  return;
}

const newStudent: GradedStudent = {
  id: Date.now(),
  name,
  score,
  attendance: null,
};

students = [
  ...students,
  newStudent,
];

renderStudents();

studentForm.reset();


}
);

// -------------------------
// Sequential Timing
// -------------------------

async function timeSequential(): Promise<number> {
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

// -------------------------
// Parallel Timing
// -------------------------

async function timeParallel(): Promise<number> {
const start = performance.now();

await Promise.allSettled(
students.map((student) =>
getAttendance(student.id)
)
);

return performance.now() - start;
}

// -------------------------
// Timing Button
// -------------------------

timeBtn.addEventListener(
"click",
async (_event: MouseEvent): Promise<void> => {
if (students.length === 0) {
timing.textContent =
"Load students first.";
return;
}


timeBtn.disabled = true;
timing.textContent = "Timing…";

try {
  const sequentialTime =
    await timeSequential();

  const parallelTime =
    await timeParallel();

  timing.textContent =
    `Sequential: ${sequentialTime.toFixed(0)}ms | ` +
    `Parallel: ${parallelTime.toFixed(0)}ms`;

} finally {
  timeBtn.disabled = false;
}


}
);

// -------------------------
// Load Button
// -------------------------

loadBtn.addEventListener(
"click",
(_event: MouseEvent): void => {
void loadStudents();
}
);
