 // ========================================
// 5.4 — Callbacks: sync vs async
// ========================================

const callback = () => {
  console.log("callback");
};


// Synchronous callback

function repeat(times, callback) {
  for (let i = 0; i < times; i++) {
    callback();
    console.log("done");
  }
}


// Asynchronous callback

function repeatLater(times, callback) {
  for (let i = 0; i < times; i++) {
    console.log("done");

    setTimeout(() => {
      callback();
    }, 100);
  }
}

repeat(3, callback);

repeatLater(3, callback);

// How to tell them apart without running:
// A callback called directly is synchronous.
// A callback placed inside setTimeout is asynchronous.


// ========================================
// 5.5 — You can't return from the future
// ========================================

// Wrong approach:
// return from inside setTimeout does NOT return
// from getScoreLater.

function getScoreLaterWrong() {
  setTimeout(() => {
    const score = 85;

    return score;
  }, 100);
}

const result = getScoreLaterWrong();

console.log("Wrong result:", result);
// undefined


// Correct approach:
// Pass a callback and give it the score when it is ready.

function getScoreLater(callback) {
  setTimeout(() => {
    const score = 85;

    callback(score);
  }, 100);
}

getScoreLater((score) => {
  function letterGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  }

  const grade = letterGrade(score);

  console.log(`Score: ${score}`);
  console.log(`Grade: ${grade}`);
});


// ========================================
// 5.6 — Error-first callbacks
// ========================================

const students = [
  { id: 1, name: "Menna", score: 95 },
  { id: 2, name: "Sara", score: 85 },
  { id: 3, name: "Omar", score: 75 },
];

function findStudent(id, callback) {
  const student = students.find((student) => student.id === id);

  if (!student) {
    return callback(new Error("Student not found"));
  }

  callback(null, student);
}


// Good ID

findStudent(2, (err, { name, score }) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }

  console.log(`Found: ${name} - ${score}`);
});


// Bad ID

findStudent(99, (err, { name, score } = {}) => {
  if (err) {
    console.log("Error:", err.message);
    return;
  }

  console.log(`Found: ${name} - ${score}`);
});


// Error-first pattern:
// callback(error, data)


// ========================================
// 5.7 — try/catch can't save you
// ========================================

// IMPORTANT:
// This experiment intentionally crashes.
// Keep it commented when running the whole file.

/*
try {
  setTimeout(() => {
    throw new Error("Something went wrong");
  }, 100);
} catch (err) {
  console.log("Caught:", err.message);
}

// The catch doesn't run because the error is thrown asynchronously
// after the try/catch block has already finished.
*/


// Correct approach:
// Pass the error to a callback.

function doSomething(callback) {
  setTimeout(() => {
    const error = new Error("Something went wrong");

    callback(error);
  }, 100);
}

doSomething((err) => {
  if (err) {
    console.log("Handled:", err.message);
    return;
  }

  console.log("Success!");
});