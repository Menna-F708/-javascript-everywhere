const globalVar = "global";

function outerFunction() {
  const functionVar = "function scoped";

  if (true) {
    const blockVar = "block scoped";

    console.log(globalVar);
    console.log(functionVar);
    console.log(blockVar);
  }

//   console.log(blockVar);
}

outerFunction();

if (true) {
  let innerLet = "innerLet";
  var innerVar = "innerConst";
}

console.log(innerLet);
console.log(innerVar);
// var escaped the block, which can cause unexpected changes outside the block.

let status = "Global Status";
function checkStatus() {
  let status = "Local Status";

  console.log(status);
}
checkStatus();
console.log(status);
// The local status is used inside the function because it is defined there.

sayHello();

function sayHello() {
  console.log("Hello");
}

console.log(age);
var age = 25;

// console.log(score);
let score = 100;

// sayBye();

const sayBye = () => {
  console.log("Bye");
};
// Function declarations are safe to call before they are defined.
// var does not throw an error, but it can return undefined unexpectedly.
// let and arrow functions are not safe to use before their declaration.

const varFns = [];

for (var i = 0; i < 3; i++) {
  varFns.push(() => i);
}

varFns.forEach((f) => console.log(f()));

const letFns = [];

for (let j = 0; j < 3; j++) {
  letFns.push(() => j);
}

letFns.forEach((f) => console.log(f()));

// Difference:
// var uses the same variable for all functions, so they all return 3.
// let creates a new variable for each loop iteration, so they return 0, 1, 2.
