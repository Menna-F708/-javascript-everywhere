const students = [
  { name: "Sara", score: 95 },
  { name: "Omar", score: 68 },
  { name: "Lina", score: 82 },
  { name: "Maya", score: 91 },
  { name: "Ali", score: 74 },
];

let excellentCount = 0;
let goodCount = 0;
let needsWorkCount = 0;

for (const student of students) {
  if (student.score >= 90) {
    console.log(`${student.name}: ${student.score} → Excellent`);
    excellentCount++;
  } else if (student.score >= 70) {
    console.log(`${student.name}: ${student.score} → Good`);
    goodCount++;
  } else {
    console.log(`${student.name}: ${student.score} → Needs work`);
    needsWorkCount++;
  }
}

console.log(
  `Summary: ${excellentCount} Excellent, ${goodCount} Good, ${needsWorkCount} Needs work.`,
);
