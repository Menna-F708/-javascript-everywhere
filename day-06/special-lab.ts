 // ========================================
// 2.4 — any, unknown, void, never
// ========================================


// ----------------------------------------
// 1. any
// ----------------------------------------

let something: any = "hello";

try {
  something();
} catch (err) {
  console.log("any error:", err);
}


// ----------------------------------------
// 2. unknown
// ----------------------------------------

let somethingUnknown: unknown = "hello";

try {
  if (typeof somethingUnknown === "function") {
    somethingUnknown();
  } else {
    throw new TypeError("Value is not a function");
  }
} catch (err: unknown) {
  console.log("unknown error:", err);

  if (err instanceof Error) {
    console.log("Error message:", err.message);
  }
}


// ----------------------------------------
// 3. void vs undefined
// ----------------------------------------

function sayHello(): void {
  console.log("Hello Menna");
}

function getUndefined(): undefined {
  return undefined;
}

// void means the function's return value is not intended to be used.
// undefined is an actual value that a function can explicitly return.
// A void function can finish without a return statement,
// while a function typed as undefined must return undefined.


// ----------------------------------------
// 4. never
// ----------------------------------------

function getErr(): never {
  throw new Error("Boom");
}

try {
  getErr();
} catch (error) {
  console.log(error);
}


// ----------------------------------------
// 5. Implicit any
// ----------------------------------------

// Without a type annotation, the parameter
// gets an implicit 'any' type when noImplicitAny is enabled.

// Error:
// Parameter 'person' implicitly has an 'any' type.

// function greet(person) {
//   console.log(person);
// }


// ========================================
// 3.2 — Literals, Unions, Intersections
// ========================================


// ----------------------------------------
// 1. Literal unions
// ----------------------------------------

type Color = "red" | "blue" | "green";

// Error:
// Type '"black"' is not assignable to type 'Color'.

// const color: Color = "black";


type Rating = 1 | 2 | 3 | 4 | 5;

// Error:
// Type '7' is not assignable to type 'Rating'.

// const rating: Rating = 7;


// ----------------------------------------
// 2. string | number union
// ----------------------------------------

type StringOrNumber = string | number;

function printValue(value: StringOrNumber) {
  console.log(value);
}

printValue("Menna");
printValue(22);


// ----------------------------------------
// 3. Intersection types
// ----------------------------------------

type User = {
  name: string;
};

type Admin = {
  employeeId: number;
};

type UserEmployee = User & Admin;


// ----------------------------------------
// 4. Variable of intersection type
// ----------------------------------------

const adminUser: UserEmployee = {
  name: "Menna",
  employeeId: 12,
};

// Error:
// Property 'employeeId' is missing in type '{ name: string; }'
// but required in type 'Admin'.

// const forgetProperty: UserEmployee = {
//   name: "Menna"
// };


// ========================================
// 3.3 — Enums and as const
// ========================================


// ----------------------------------------
// 1. Real enum experiment
// ----------------------------------------

// We first created a real enum:
//
// enum Role {
//   Admin,
//   User,
//   Guest
// }
//
// Editor error:
//
// const invalidRole = Role.Manager;
//
// Error:
// Property 'Manager' does not exist on type 'typeof Role'.
//
// Runtime test:
//
// console.log(Role.Manager.toLowerCase());
//
// Node runtime error:
//
// TypeError: Cannot read properties of undefined
// (reading 'toLowerCase')
//
// The real enum was deleted after recording the errors.


// ----------------------------------------
// 2. Rebuild using as const
// ----------------------------------------

const roles = {
  Admin: "admin",
  User: "user",
  Guest: "guest",
} as const;


// ----------------------------------------
// 3. Derived union type
// ----------------------------------------

type Role = (typeof roles)[keyof typeof roles];

// Hover result:
//
// type Role = "admin" | "user" | "guest"


// ----------------------------------------
// 4. Function taking the derived union
// ----------------------------------------

function checkRole(role: Role) {
  console.log(`Role: ${role}`);
}


// Property
checkRole(roles.Admin);


// Plain string
checkRole("user");


// Invalid call
// Error:
// Argument of type '"manager"' is not assignable to parameter of type 'Role'.

// checkRole("manager");


// ========================================
// 3.4 — Assertions
// ========================================


// ----------------------------------------
// 1. `as` with JSON
// ----------------------------------------

type JsonUser = {
  name: string;
  age: number;
};


// JSON that matches the type
const validJson = '{"name":"Menna","age":22}';

const validUser = JSON.parse(validJson) as JsonUser;

console.log(validUser.name);
console.log(validUser.age);


// JSON that does NOT match the type
const invalidJson = '{"name":"Menna"}';

const invalidUser = JSON.parse(invalidJson) as JsonUser;

// TypeScript believes `age` is a number,
// but the actual JSON does not contain `age`.

console.log(invalidUser.age); // undefined


// ----------------------------------------
// 2. as const
// ----------------------------------------

const account = {
  name: "Menna",
  role: "admin",
} as const;


// Error:
// Cannot assign to 'role' because it is a read-only property.

// account.role = "user";


// ----------------------------------------
// 3. Non-null assertion `!`
// ----------------------------------------

function getUserName(element: HTMLElement | null) {
  return element!.textContent;
}


// Correct usage
const existingElement = document.createElement("div");

existingElement.textContent = "Menna";

console.log(getUserName(existingElement));


// Wrong usage — runtime crash:
//
// const missingElement = null;
// console.log(getUserName(missingElement));


// Proper check instead of `!`
function getUserNameSafely(element: HTMLElement | null) {
  if (element === null) {
    return "Element not found";
  }

  return element.textContent;
}


// ----------------------------------------
// 4. When `as` is acceptable
// ----------------------------------------

// `as` can be acceptable when we know
// something more specific than TypeScript can infer.
//
// Example:
//
// const button =
//   document.querySelector("#save") as HTMLButtonElement;
//
// But `as` does NOT validate the value at runtime.
//
// For outside/untrusted data such as:
//
// - API responses
// - JSON
// - User input
// - localStorage
//
// Prefer runtime validation and type narrowing
// instead of blindly using `as`.

export {};