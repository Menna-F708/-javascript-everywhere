// 2.1 Objects, four ways
const student = { name: "Sara", score: 92, city: "Cairo" };
const { name, score } = student;
const { city: hometown } = student;
const { attendance = 0 } = student;
const { level: tier = "high" } = student;

// 2.2 Nested
const person = {
  profile: {
    email: "menna@gmail.com",
    github: "sara-dev",
  },
};

//  const {profile: { email } } = person;
//  console.log(person.profile)

const {
  profile,
  profile: { email },
} = person;

//  2.3 Arrays
const arrDes = ["menna", "sara", "yusuf", "sagda", "toka"];
const [firstName, secondName] = arrDes;
const [, , , fourth] = arrDes;
const [one, two, three, four, five, six = "nermeen"] = arrDes;
let a = "menna";
let b = "sara";
[a, b] = [b, a];
const [head, ...tail] = arrDes;
console.log(head);
console.log(tail);

// 2.4 Parameters
function describe({ name, score, city = "Unknown" }) {
  return `${name}: ${score} - ${city}`;
}

console.log(describe({ name: "Menna", score: 95 }));

function summarise({ name, score = 0, passMark = 60 } = {}) {
  if (score >= passMark) {
    return `${name}: PASS`;
  }

  return `${name}: FAIL`;
}

console.log(
  summarise({
    name: "Yara",
    score: 90,
    passMark: 60,
  }),
);

console.log(
  summarise({
    name: "Sara",
  }),
);

console.log(summarise());

// 2.5 In a loop
const students = [
  { name: "Menna", score: 95 },
  { name: "Sara", score: 82 },
  { name: "Yara", score: 65 },
  { name: "Omar", score: 50 },
];

function letterGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

const gradyTally = {};
for (const { name, score } of students) {
  const grade = letterGrade(score);

  console.log(`${name} : ${score}  - ${grade}`);
  if (gradyTally[grade]) {
    gradyTally++;
  } else {
     gradyTally[grade] = 1;
  }
}

for (const [grade, count] of Object.entries(gradyTally)) {
  console.log(`${grade}: ${count}`);
} 