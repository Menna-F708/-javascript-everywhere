//  3.1 Copy vs alias
const a = [1, 2, 3];
const b = a;
b.push(4);
console.log(a);

const c = [...a];
c.push(5);
console.log(a);
// An alias points to the same array, while a spread copy creates a new array.

// 3.2 Arrays without mutation
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "Express"];
const skills = [...frontend, ...backend];
const addEnd = [...skills, "React"];
const addFront = ["TypeScript", ...skills];
console.log(skills.length);
console.log(addEnd.length);
console.log(addFront.length);
const remove = [...skills.slice(0, 1), ...skills.slice(2)];
console.log(remove);
console.log(skills);

// 3.3 Objects without mutation
const student = {
  name: "Menna",
  score: 90,
  attendance: 85,
};
const update = { ...student, score: 95 };
console.log(student.score);
console.log(update.score);

const withId = { ...student, id: 1 };
const { attendance, ...without } = student;

console.log(attendance);
console.log(without);
console.log(student);

// 3.4 Merge order
const defaults = {
  theme: "light",
  language: "English",
};

const custom = {
  theme: "dark",
};

const merged = {
  ...defaults,
  ...custom,
};

console.log(merged);

const wrongMerge = {
  ...custom,
  ...defaults,
};

console.log(wrongMerge);
// Custom comes last so its values override the defaults.
// Reversing the order is a bug because defaults would overwrite custom values.

// 3.5 The shallow copy trap
const personInfo = {
  name: "Menna",
  score: 90,

  profile: {
    city: "Alex",
    age: 24,
  },
};

const copy = {
  ...personInfo,
};

copy.profile.city = "Cairo";
console.log(personInfo.profile.city);
console.log(copy.profile.city);

const safeCopy = {
  ...personInfo,
  profile: {
    ...personInfo.profile,
  },
};

safeCopy.profile.city = "Giza";
console.log(personInfo.profile.city);
console.log(safeCopy.profile.city);

// 3.6 Rest in functions
function total(...numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += number;
  }

  return sum;
}
console.log(total(10, 20));

function logAll(label, ...items) {
  console.log(label);

  for (const item of items) {
    console.log(item);
  }
}
logAll("Skills", "HTML", "CSS", "JavaScript");




function moveFirstToEnd(first, ...others) {
  return [...others, first];
}
console.log(
  moveFirstToEnd("A", "B", "C", "D")
);

// function test(...rest, another) {
// }




// 3.7 Spread into arguments
const numbers = [10, 25, 7, 42, 18];
console.log(Math.max(numbers))
console.log(Math.max(...numbers));
// Without spread, the array is passed as one argument.
// With spread, the array elements are passed as separate arguments.