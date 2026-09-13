// Function Declaration
function celsiusToF(celsius) {
  return (celsius * 9) / 5 + 32;
}
console.log(celsiusToF(25));

// Function Expression
const celsiusToFExpression = function (celsius) {
  return (celsius * 9) / 5 + 32;
};
console.log(celsiusToFExpression(25));

// Arrow Function with implicit return
const celsiusToFArrow = (celsius) => (celsius * 9) / 5 + 32;
console.log(celsiusToFArrow(25));

// Return, not log
function addLog(a, b) {
  console.log(a + b);
}
const doubledLog = addLog(5, 3) * 2;
console.log(doubledLog);
// Because console.log() displays the value but does not return it,
// so the function returns undefined, and undefined * 2 gives NaN.

// With Return
function addReturn(a, b) {
  return a + b;
}
const doubledReturn = addReturn(5, 3) * 2;
console.log(doubledReturn);

function greet(name = "guest", greeting = "Hello") {
  return `${greeting} , ${name}`;
}

console.log(greet());
console.log(greet("Menna"));
console.log(greet("Menna", "Good morning"));
console.log(greet(undefined, "Welcome"));
console.log(greet(null));
// null is an actual value, so the default parameter does not apply.

// Rest
function sumAll(...numbers) {
  let total = 0;

  for (const number of numbers) {
    total += number;
  }

  return total;
}

console.log(sumAll());
console.log(sumAll(5));
console.log(sumAll(1, 2, 3, 4, 5));

function describe(label, ...values) {
  return `${label}: ${values.join(", ")}`;
}

console.log(describe("Numbers", 10, 20, 30));

// Guard clauses
function safeDivide(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Error: both values must be numbers";
  }

  if (b === 0) {
    return "Error: cannot divide by zero";
  }

  return a / b;
}

console.log(safeDivide(10, 2));
console.log(safeDivide(10, 0));
console.log(safeDivide(10, "2"));