let nameStudent = "Menna";
let ageStudent = 23;
let isGraduated = true;
let something = null;
let anotherThing = undefined;

let person = {
  name: "Menna",
  age: 23,
  isGrad: true,
};

let colors = ["red", "blue", "green"];

// Primitive values
console.log(`nameStudent → "${nameStudent}" → ${typeof nameStudent}`);
console.log(`ageStudent → ${ageStudent} → ${typeof ageStudent}`);
console.log(`isGraduated → ${isGraduated} → ${typeof isGraduated}`);
console.log(`something → ${something} → ${typeof something}`);
console.log(`anotherThing → ${anotherThing} → ${typeof anotherThing}`);

// Object
console.log(`person.name → "${person.name}" → ${typeof person.name}`);
console.log(`person.age → ${person.age} → ${typeof person.age}`);
console.log(`person.isGrad → ${person.isGrad} → ${typeof person.isGrad}`);

// Array
console.log(`colors → ${colors} → ${typeof colors}`);

// typeof null returns "object", which is misleading.
// null is not actually an object; this is a historical JavaScript bug.
console.log(typeof null);

// typeof [] returns "object", which is misleading.
// An array is technically an object in JavaScript.
console.log(typeof []);

// The correct way to check if a value is an array
console.log(Array.isArray([]));

// Converted
let num = "42";
let convertedNum = Number(num);
console.log(convertedNum);
console.log(typeof convertedNum);

let str = 42;
let convertedStr = String(str);
console.log(convertedStr);
console.log(typeof convertedStr);

let result = Number("hello");
console.log(result);
console.log(typeof result);

console.log(parseInt("42px"));
console.log(Number("42px"));

console.log(typeof NaN);

const values = [
  false,
  0,
  -0,
  0n,
  "",
  null,
  undefined,
  NaN,
  [],
  {},
  "0",
  "hello",
];

for (let value of values) {
  console.log(value, value ? "Truthy" : "Falsy");
}

let value = 0;
// When 0 is a valid value, I want ?? because it keeps 0.
console.log(value || "Fallback");
console.log(value ?? "Fallback");
