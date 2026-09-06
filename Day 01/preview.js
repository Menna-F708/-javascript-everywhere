let name = "Menna";
const city = "Alexandria";

console.log(name);
console.log(city);

const student = {
  name: "Menna",
  age: 20,
  isStudent: false,
  favoriteLanguage: "JavaScript",
};

console.log(student);
console.log(student.favoriteLanguage);

const score = 50;

if (score >= 90) {
  console.log("Excellent!");
} else if (score >= 50) {
  console.log("Passed!");
} else {
  console.log("Failed!");
}

const tracks = ["JavaScript", "React", "TypeScript", "Node.js", "Automation"];

for (let i = 0; i < tracks.length; i++) {
  if (tracks[i].length > 6) {
    console.log(tracks[i]);
  }
}

const students = [
  { name: "Sara", score: 92 },
  { name: "Omar", score: 68 },
  { name: "Lina", score: 79 },
];

let passedCount = 0;

for (let i = 0; i < students.length; i++) {
  const student = students[i];

  if (student.score >= 70) {
    console.log(`${student.name}: ${student.score} → PASS`);
    passedCount++;
  } else {
    console.log(`${student.name}: ${student.score} → FAIL`);
  }
}

console.log(`\n${passedCount} of ${students.length} students passed.`);