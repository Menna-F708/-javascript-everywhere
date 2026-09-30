const { letterGrade, average, formatRow } = require("./lib/grade-lib");
const delay = require("./lib/delay");
const students = require("./students.json");


async function report() {
  console.log("Students:");

  for (const student of students) {
    console.log(formatRow(student));
  }

  const scores = students.map((student) => student.score);

  console.log(`Average: ${average(scores)}`);
  console.log(`Grade of Menna: ${letterGrade(students[0].score)}`);

  await delay(500);

  console.log("Report finished");
}

report();

 
  