
// ========================================
// Task 4.1 — Functions & Narrowing Lab
// ========================================


// ========================================
// 1. Typed function + typed arrow function
// ========================================

function add(a: number, b: number): number {
  return a + b;
}

const multiply = (a: number, b: number): number => {
  return a * b;
};

console.log(add(10, 20));
console.log(multiply(30, 50));


// ========================================
// 2. Default + Optional parameter + ??
// ========================================

// Default parameter
function greet(name: string = "Guest"): string {
  return `Hello ${name}`;
}

console.log(greet("Menna"));
console.log(greet());

// Optional parameter
function welcome(name?: string): string {
  return `Welcome ${name ?? "Guest"}`;
}

console.log(welcome("Menna"));
console.log(welcome());


// ========================================
// 3. Rest parameter
// ========================================

function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}

console.log(sum());
console.log(sum(10));
console.log(sum(10, 20, 30, 40, 50));


// ========================================
// 4. Destructured object parameter
// ========================================

function printUser(
  { name, age }: { name: string; age: number }
): void {
  console.log(name);
  console.log(age);
}

printUser({
  name: "Menna",
  age: 22,
});


// ========================================
// 5. Function type alias
// ========================================

type MathOperation = (a: number, b: number) => number;

const addNumbers: MathOperation = (a, b) => {
  return a + b;
};

const subtractNumbers: MathOperation = (a, b) => {
  return a - b;
};

console.log(addNumbers(10, 5));
console.log(subtractNumbers(10, 5));


// ========================================
// 6. Function taking the callback type
// ========================================

function calculate(
  a: number,
  b: number,
  operation: MathOperation
): number {
  return operation(a, b);
}

// TypeScript knows that operation is:
// (a: number, b: number) => number
//
// Hover over "operation" in the editor to see the type.

console.log(calculate(10, 5, addNumbers));
console.log(calculate(10, 5, subtractNumbers));


// ========================================
// 7. Async function + Promise
// ========================================

async function getUserName(): Promise<string> {
  const userName = await Promise.resolve("Menna");

  return userName;
}

getUserName().then((name) => {
  console.log(name);
});


// Without await — wrong:
//
// const userName: string = Promise.resolve("Menna");
//
// Error:
// Type 'Promise<string>' is not assignable to type 'string'.
//
// Promise.resolve("Menna") returns Promise<string>,
// not a plain string.
//
// Correct:
// const userName = await Promise.resolve("Menna");


// ========================================
// 8. Function overloading
// ========================================

// Overload signatures
function formatValue(value: string): string;
function formatValue(value: number): number;

// Implementation
function formatValue(value: string | number): string | number {
  if (typeof value === "string") {
    return value.toUpperCase();
  }

  return value * 2;
}


// Hover results:
//
// formatValue("hello")
// -> string
//
// formatValue(10)
// -> number

console.log(formatValue("hello"));
console.log(formatValue(10));


// ========================================
// 9. Wrong argument count + wrong type
// ========================================

// Wrong argument count:
//
// Error:
// Expected 2 arguments, but got 1.
//
// add(10);


// Wrong type:
//
// Error:
// Argument of type 'string' is not assignable
// to parameter of type 'number'.
//
// add("10", 20);


// Fixed versions:

console.log(add(10, 20));
console.log(add(10, 20));


export {};