# TypeScript Migration Notes

## First `npm run check`

Command:

```bash
npm run check 

Found 26 errors in 3 files.

Errors  Files
     5  src/lib/async-utils.ts:1
     6  src/lib/db.ts:28
    15  src/lib/grade-lib.ts:1 

    1. Changed `import type { Student }` to `import { Student }`.
   npm run report → Node threw:
   "The requested module './types.ts' does not provide an export named 'Student'."
   Reason: Student is a TypeScript interface, so it does not exist at runtime.

2. Renamed `name` to `fullName` in `Student`.
   npm run check → TypeScript reported errors in every place still using `student.name`.
   Reason: changing the interface property breaks all code that depends on the old property.

3. Removed `?` from `result?.status`.
   npm run check → "'result' is possibly 'undefined'."
   Reason: noUncheckedIndexedAccess makes array indexing return a type that may be undefined.
=============================================================================================================================
# Day 06 — My TypeScript Notes

## Part 1 — Understanding TypeScript

### 1. What TypeScript is, and what "types are erased" means

TypeScript is JavaScript with a type system.

It helps me describe what kind of values my variables, functions, and objects should receive and return.

For example:

```ts
let age: number = 25;

function greet(name: string): string {
  return `Hello ${name}`;
}
```

TypeScript checks my code before running it and warns me when I use a value in a way that doesn't match its type.

But TypeScript does not run directly in the browser or Node.js as TypeScript. It gets transformed into JavaScript.

**Types are erased** means that type annotations and interfaces disappear when TypeScript becomes JavaScript. They are only used during development and type checking.

My drawing:

```text
TypeScript code
      |
      v
Type checking
      |
      v
Remove type information
      |
      v
JavaScript code
      |
      v
Runtime execution
```

For example:

```ts
const age: number = 25;
```

Becomes approximately:

```js
const age = 25;
```

The `: number` part does not exist at runtime.

### 2. Why `node file.ts` running is not proof my code is correct

Modern Node.js versions can run some TypeScript files by stripping type syntax.

That does not mean Node.js checks all TypeScript rules.

For example, Node might run a file even if it contains a type error that `tsc` would catch.

The difference:

- `node file.ts` runs the code.
- `tsc --noEmit` checks TypeScript errors without generating JavaScript.
- `tsc` builds JavaScript output according to the compiler configuration.

So a program running successfully is not proof that its types are correct.

I should use the TypeScript compiler to check my code.

### 3. How to read an error: the five parts, and the three codes I met most

When I read a TypeScript error, I should look for:

1. **Error code:** identifies the type of problem.
2. **Location:** the file and line where TypeScript reports the problem.
3. **Message:** explains what is wrong.
4. **Expected type:** what TypeScript wanted.
5. **Actual type:** what my code provided.

Example:

```text
Type 'string' is not assignable to type 'number'.
```

This means I provided a string where a number was expected.

I should not just change code randomly. I need to understand the expected type and why my value does not match it.

 ### The three TypeScript error codes I learned about

**1. TS2322 — Type is not assignable to type**

This happens when I assign a value to a variable or property that has a different type.

For example, assigning a string to a number variable:

```ts
let taskId: number = "10";
```

TypeScript catches this because `"10"` is a string, not a number.

**2. TS2339 — Property does not exist on type**

This happens when I try to access a property that TypeScript doesn't know exists on an object.

For example:

```ts
const task = {
  id: 1,
  title: "Learn TypeScript"
};

console.log(task.status);
```

The object doesn't have a `status` property, so TypeScript reports an error.

**3. TS2345 — Argument is not assignable to parameter**

This happens when I pass an argument with the wrong type to a function.

For example:

```ts
function deleteTask(id: number) {
  // delete task
}

deleteTask("1");
```

The function expects a number, but I passed a string.

**What I learned:** TypeScript error codes help me understand whether the problem is a wrong assignment, accessing a missing property, or passing an argument with the wrong type.

I should copy these codes from my actual terminal/compiler output, not guess them.

---

## Part 2 — Types and Values

### 4. When I annotate vs infer — and why `let` and `const` infer differently

TypeScript can sometimes understand a variable's type automatically. This is called **type inference**.

```ts
const name = "Menna";
let age = 25;
```

TypeScript infers:

- `name` as the literal type `"Menna"` because it cannot be reassigned.
- `age` as `number` because a `let` variable can receive another number later.

With `const`, TypeScript can keep a more specific literal type.

With `let`, TypeScript usually chooses a wider type because the variable may change.

I use annotation when:

- A function parameter needs a clear type.
- A function's return type should be explicit.
- A variable's initial value does not give enough information.
- I want to document an important contract.

Example:

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

I do not need to annotate every variable if TypeScript can infer its type clearly.

### 5. The seven primitives, one line each, with one surprise from `number`

The seven JavaScript primitive types are:

1. `string`: text, like `"Hello"`.
2. `number`: numbers, including integers and decimals.
3. `boolean`: `true` or `false`.
4. `undefined`: a value that has not been assigned.
5. `null`: an intentional absence of a value.
6. `bigint`: very large integers, such as `123n`.
7. `symbol`: a unique primitive value.

**A surprise about number:** JavaScript uses one main `number` type for integers and decimals. It also has special numeric values like `NaN`, `Infinity`, and `-Infinity`.

For example:

```ts
let price: number = 99.5;
let count: number = 10;
let result: number = NaN;
```

### 6. `null` vs `undefined`, and what `strict` changes

`undefined` usually means that a value was not assigned or does not exist.

`null` means that I intentionally set a value to represent no value.

```ts
let username: string | undefined;
let selectedUser: string | null = null;
```

With `strictNullChecks`, TypeScript does not allow me to use `null` or `undefined` where a normal value is expected unless I include them in the type.

For example:

```ts
let name: string = "Menna";

// Error with strictNullChecks:
name = null;
```

The `strict` option enables a group of stricter checks. It helps catch problems earlier instead of allowing unsafe assumptions.

### 7. Arrays vs tuples vs object types — when I'd use each

**Array:** when I have a collection of values with the same general type.

```ts
const names: string[] = ["Ali", "Menna", "Sara"];
```

**Tuple:** when I have a fixed structure and each position has a specific type.

```ts
const userEntry: [number, string] = [1, "Menna"];
```

The first item must be a number and the second must be a string.

**Object type:** when I want to describe an entity with named properties.

```ts
type User = {
  id: number;
  name: string;
  active: boolean;
};
```

I use arrays for lists, tuples for fixed-position structures, and object types for real-world entities with named properties.

### 8. `any` vs `unknown` vs `as`, and which I use for outside data

`any` disables most type checking for that value.

```ts
let value: any = "hello";
value.toFixed();
```

TypeScript allows this even though it may fail at runtime.

`unknown` means I do not know the value's type yet. I must check it before using it.

```ts
let value: unknown = "hello";

if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

`as` is a type assertion. It tells TypeScript to treat a value as a particular type.

```ts
const input = document.querySelector("input") as HTMLInputElement;
```

But `as` does not validate the value at runtime.

For outside data, such as API responses, I prefer `unknown` because I should not trust external data before checking it.

**My rule:** use `unknown` for data I have not verified, then narrow or validate it.

### 9. Why `enum` doesn't work in today's setup, and the `as const` replacement

TypeScript enums are runtime features. They generate JavaScript code, unlike normal type annotations that are erased.

In a setup that uses direct TypeScript type stripping, some enums are not supported because they require JavaScript generation.

A useful alternative is `as const`:

```ts
const PRIORITIES = ["low", "medium", "high"] as const;

type Priority = (typeof PRIORITIES)[number];
```

Now `Priority` becomes:

```ts
type Priority = "low" | "medium" | "high";
```

`as const` keeps the values as literal types and makes the array readonly.

This is useful when I want a list of allowed values without creating an enum.

---

## Part 3 — Functions and Narrowing

### 10. Optional, default and rest parameters, one example each

**Optional parameter:** the caller can provide it or leave it out.

```ts
function greet(name?: string) {
  return name ?? "Guest";
}
```

**Default parameter:** the function uses a default value when the argument is missing or `undefined`.

```ts
function greet(name: string = "Guest") {
  return `Hello ${name}`;
}
```

**Rest parameter:** collects multiple arguments into an array.

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, number) => total + number, 0);
}
```

### 11. Narrowing, with an example

Narrowing means making a broad type more specific after checking it.

For example, a value can be a string or a number:

```ts
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
```

Inside the first branch, TypeScript knows the value is a string.

Inside the second branch, it knows the value is a number.

Narrowing helps me safely use values from union types.

### 12. Why discriminated unions beat a `loading` boolean plus an `error` string

Using separate state variables can create impossible combinations.

For example:

```ts
type State = {
  loading: boolean;
  error?: string;
  data?: string[];
};
```

This structure can accidentally represent confusing situations, such as loading and error being true at the same time.

A discriminated union describes the possible states explicitly:

```ts
type State =
  | { status: "loading" }
  | { status: "success"; data: string[] }
  | { status: "error"; message: string };
```

Now each state has its own required data.

I can use `status` to know which properties are available.

This makes the code safer and easier to understand.

### 13. Type guards: "types describe; guards verify"

A type describes the expected structure of a value.

But a type does not prove that an external value actually has that structure.

A type guard checks the value at runtime.

Example:

```ts
type User = {
  id: number;
  name: string;
};

function isUser(value: unknown): value is User {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const user = value as Record<string, unknown>;

  return (
    typeof user.id === "number" &&
    typeof user.name === "string"
  );
}
```

The return type `value is User` is called a type predicate.

It tells TypeScript that when the function returns `true`, the value can be treated as a `User`.

This is especially important when working with API responses.

---

## Part 4 — Object Types and Classes

### 14. `interface` vs `type`, and the rule I'll follow

Both `interface` and `type` can describe object shapes.

Example with an interface:

```ts
interface User {
  id: number;
  name: string;
}
```

Example with a type:

```ts
type User = {
  id: number;
  name: string;
};
```

An interface can be extended:

```ts
interface Admin extends User {
  role: string;
}
```

A type alias can describe more than object shapes, such as unions and literal types:

```ts
type Priority = "low" | "medium" | "high";
```

My rule:

- I can use `interface` for object contracts that may be extended.
- I can use `type` for unions, primitives, tuples, and combinations of types.

Both are useful. Consistency in the project matters more than choosing one for everything.

### 15. Structural typing: why `fromForm` fits but the `scor` typo didn't

TypeScript uses structural typing.

This means that compatibility is usually based on the properties and their types, not just the name of the type.

For example:

```ts
type User = {
  name: string;
  score: number;
};

const fromForm = {
  name: "Menna",
  score: 90,
};

const user: User = fromForm;
```

This works because `fromForm` has the required properties with the correct types.

But:

```ts
const fromForm = {
  name: "Menna",
  scor: 90,
};
```

This does not satisfy `User` because `score` is missing. The property `scor` is a different name.

The lesson is that TypeScript checks the structure and property names, not what I intended to write.

### 16. `#private` vs `private`, and `readonly` — what each protects

`private` is a TypeScript access modifier. It prevents access from outside the class during TypeScript checking.

```ts
class User {
  private password = "secret";
}
```

Its restriction is removed from the generated JavaScript.

`#private` is JavaScript's native private field syntax. It remains private at runtime.

```ts
class User {
  #password = "secret";
}
```

`readonly` prevents reassignment of a property after initialization.

```ts
type User = {
  readonly id: number;
  name: string;
};
```

I can change `name`, but I cannot reassign `id` through this type.

These features protect different things:

- `private`: TypeScript-level access restriction.
- `#private`: runtime private field.
- `readonly`: prevents reassignment through the typed reference.

### 17. Why `instanceof` works on a class but not on an interface

`instanceof` checks whether an object was created from a particular constructor or class in its prototype chain.

```ts
class User {
  name = "Menna";
}

const user = new User();

console.log(user instanceof User); // true
```

An interface disappears when TypeScript becomes JavaScript. It does not exist at runtime.

Therefore, I cannot use an interface with `instanceof`.

For interfaces, I need runtime checks such as `typeof`, property checks, or custom type guards.

---

## Part 5 — Generics, Utilities and Configuration

### 18. Why generics exist, in my own example

Generics let me write reusable code that works with different types while preserving type information.

Without generics, I might write separate functions for strings, numbers, and users.

With generics:

```ts
function identity<T>(value: T): T {
  return value;
}

const name = identity("Menna");
const age = identity(25);
```

TypeScript infers the type of `T` from the argument.

The function works with different types without losing the relationship between the input and output.

Generics are useful when the same logic can work with different data types.

### 19. What `<T extends { id: number }>` and `<K extends keyof T>` mean

`<T extends { id: number }>` means that `T` can be any type, but it must contain an `id` property whose type is `number`.

```ts
function getId<T extends { id: number }>(item: T): number {
  return item.id;
}
```

`<K extends keyof T>` means that `K` must be one of the keys of `T`.

```ts
function getProperty<T, K extends keyof T>(
  object: T,
  key: K
): T[K] {
  return object[key];
}
```

If `T` is:

```ts
type User = {
  id: number;
  name: string;
};
```

Then `key` can only be `"id"` or `"name"`.

The return type `T[K]` depends on the selected key.

This keeps property access type-safe.

### 20. My three most useful utility types, with a real use for each

**Partial<T>**

Makes all properties optional.

Useful when updating an existing object because I may only want to change some fields.

```ts
type TaskUpdate = Partial<Task>;
```

**Pick<T, K>**

Selects specific properties from an existing type.

Useful when I only need a small part of a bigger object.

```ts
type TaskPreview = Pick<Task, "id" | "title">;
```

**Omit<T, K>**

Creates a type without selected properties.

Useful when creating a new object that should not include an existing ID.

```ts
type NewTask = Omit<Task, "id">;
```

Utility types help me reuse existing types instead of repeating their structure.

### 21. Every line of my `tsconfig.json`, one sentence each

### Explain every line of my tsconfig.json

My `tsconfig.json` tells TypeScript how to compile my TypeScript files into JavaScript.

**1. `compilerOptions`**

Contains the settings that control how TypeScript compiles the code.

**2. `target: "ES2020"`**

Specifies the JavaScript version that TypeScript generates. My output JavaScript uses ES2020 features.

**3. `module: "CommonJS"`**

Specifies the module system used in the generated JavaScript. CommonJS uses `require` and `module.exports`.

**4. `strict: true`**

Enables strict type-checking rules. It helps catch potential type errors, including cases where values might be `null` or `undefined`.

**5. `outDir: "./dist"`**

Specifies the output folder where the compiled JavaScript files are placed.

**6. `include: ["./*.ts"]`**

Tells TypeScript to include `.ts` files directly inside the current folder.

**7. `exclude`**

Tells TypeScript not to include these folders when discovering source files:
- `./dist`: because it contains generated JavaScript output.
- `./predictions-api`: because I don't want TypeScript to include this folder in this project.

**What I learned:** `tsconfig.json` controls which files TypeScript checks, how strictly it checks them, which JavaScript version and module system it generates, and where the compiled files are saved.

### 22. Node runs / `tsc` checks / `tsc` builds — which script I run when

- `node file.ts`: runs a TypeScript file using Node's supported type-stripping behavior.
- `tsc --noEmit`: checks TypeScript types without producing JavaScript.
- `tsc`: compiles TypeScript into JavaScript according to `tsconfig.json`.

I use Node to execute a script, `tsc --noEmit` to check types, and `tsc` to build output.

A successful Node run does not replace type checking.

### 23. Why `import type` and `.ts` extensions are needed, and why the browser loads `dist/`

`import type` makes it clear that an import is needed only for TypeScript types.

```ts
import type { User } from "./types.ts";
```

Because the type is erased, this import does not need to exist in the generated JavaScript.

With a setup that runs or resolves TypeScript files directly, `.ts` extensions can be required so the runtime knows which file to load.

The browser should load the built JavaScript from `dist/` because browsers do not execute TypeScript type syntax.

The source files are for development; the generated JavaScript is what the browser runs.

### 24. My Task 10.3 first error list, and what it taught me about my Day 05 code

When I renamed my Day 05 files from `.js` to `.ts` and ran `npm run check` for the first time, TypeScript found **26 errors in 3 files**:

- `src/lib/async-utils.ts`: 5 errors
- `src/lib/db.ts`: 6 errors
- `src/lib/grade-lib.ts`: 15 errors

During the migration, I also learned these important lessons:

**1. Type-only imports**

I changed `import type { Student }` to `import { Student }`, but Node threw:

`The requested module './types.ts' does not provide an export named 'Student'.`

I learned that a TypeScript interface exists only during compilation and is removed from the JavaScript output. That's why I should use `import type` for type-only imports.

**2. Renaming interface properties**

I renamed `name` to `fullName` in the `Student` interface. TypeScript then reported errors wherever the old `student.name` property was still used.

I learned that changing an interface property affects every part of the code that depends on it.

**3. Handling possibly undefined values**

I removed optional chaining from `result?.status` and got:

`'result' is possibly 'undefined'.`

I learned that with `noUncheckedIndexedAccess`, accessing an array element may produce a value that could be `undefined`, so I need to check it before accessing its properties.

**What this taught me about my Day 05 code:**

My JavaScript code could run without explicitly describing every type, but migrating it to TypeScript exposed assumptions about imports, object properties, and possibly undefined values. I learned that TypeScript helps me make these assumptions explicit and catch problems earlier.
For each error, I should record:

 

---

## Part 6 — HTTP and URLs

### 25. The request/response cycle, with my own drawing

A request/response cycle is the communication between a client and a server.

My drawing:

```text
User action
    |
    v
Frontend
    |
    | HTTP Request
    v
Backend Server
    |
    | Process request
    v
Database (if needed)
    |
    | Return data
    v
Backend Server
    |
    | HTTP Response
    v
Frontend
    |
    v
Display result
```

The request contains information such as the URL, method, headers, and sometimes a body.

The response contains a status code, headers, and sometimes a body.

### 26. Every part of a URL, and why `URLSearchParams` beats string gluing

Example:

```text
https://example.com:3000/api/tasks?status=done&page=2#results
```

Parts:

- `https`: protocol.
- `example.com`: hostname.
- `3000`: port.
- `/api/tasks`: pathname.
- `?status=done&page=2`: query string.
- `#results`: hash.

`URLSearchParams` helps me build and read query parameters safely.

```ts
const params = new URLSearchParams();

params.set("status", "done");
params.set("page", "2");

const query = params.toString();
```

This is better than manually joining strings because it handles encoding and formatting of query values.

### 27. The CRUD ↔ method ↔ status code table, from memory

| CRUD operation | HTTP method | Common successful status |
|---|---|---|
| Create | POST | 201 Created |
| Read | GET | 200 OK |
| Update | PUT or PATCH | 200 OK or 204 No Content |
| Delete | DELETE | 204 No Content |

Other important status codes:

- `400 Bad Request`: the request is invalid.
- `401 Unauthorized`: authentication is required or invalid.
- `403 Forbidden`: the user is not allowed to perform the action.
- `404 Not Found`: the resource does not exist.
- `500 Internal Server Error`: a server-side problem occurred.

The exact status depends on the API's design.

### 28. 4xx vs 5xx: whose fault, and whether to retry

**4xx** usually means there is a problem with the request or the client's permissions.

Examples:

- 400: invalid data.
- 401: not authenticated.
- 403: not allowed.
- 404: resource not found.

Retrying the same request usually does not fix these problems.

**5xx** means the server failed while processing the request.

Examples:

- 500: internal server error.
- 503: service unavailable.

Some 5xx errors may be temporary, so retrying can make sense when the operation is safe to repeat.

### 29. Why `fetch` resolves on a 404

`fetch` rejects for network-level failures, but an HTTP response such as 404 is still a valid response from the server.

Therefore:

```ts
const response = await fetch("/api/tasks/999");

console.log(response.status); // 404
console.log(response.ok);     // false
```

The Promise resolves because the server successfully sent an HTTP response.

I must check `response.ok` or `response.status` myself.

---

## Part 7 — Errors and Reliable Requests

### 30. The three layers of failure, with a real example of each

When I send a request, I can fail at three different layers.

**Layer 1: No usable HTTP response**

Examples:

- Network failure.
- Timeout.
- Request aborted.

**Layer 2: HTTP failure**

The server responds, but with an unsuccessful status.

Example:

```text
404 Not Found
```

**Layer 3: Invalid response data**

The server responds successfully, but the data is not usable.

Two examples:

- `parse`: the body is not valid JSON.
- `shape`: the JSON is valid but does not match the expected structure.

Example of a shape problem:

```json
{
  "id": "wrong-type",
  "title": 100
}
```

when the application expects a numeric ID and a string title.

### 31. Timeout vs abort, and what a stale response is

A **timeout** means the request took longer than the allowed time.

An **abort** means someone intentionally cancelled the request, such as when a component no longer needs the result.

A **stale response** is an old response that arrives after a newer request or newer user action.

Example:

1. I search for "React".
2. Before the response arrives, I search for "TypeScript".
3. The TypeScript result arrives first.
4. The older React result arrives later.

If I display the old response, the UI no longer represents the latest search.

I need to prevent outdated responses from overwriting newer results, sometimes by aborting old requests or checking which request is still current.

### 32. Why `request<T>()` returns a `Result` instead of throwing

A `Result<T>` makes success and failure explicit.

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: ApiError };
```

The caller must check the result:

```ts
const result = await listTasks();

if (result.ok) {
  console.log(result.value);
} else {
  console.log(result.error);
}
```

This avoids unexpected thrown errors for the expected request failures handled by the client.

The function communicates its possible outcomes through its return type.

### 33. What CORS is, who enforces it, and why today's app didn't hit it

CORS means Cross-Origin Resource Sharing.

It is a browser security mechanism that controls whether frontend JavaScript from one origin can read responses from another origin.

An origin is made from the protocol, hostname, and port.

The browser enforces CORS. The server provides headers that tell the browser which origins are allowed.

Our app may not have hit a CORS problem because the frontend and API were served from the same origin, or because the development setup used a proxy.

CORS is not authentication. It is a browser rule about cross-origin access.

### 34. Why secrets never go in frontend code

Frontend code is delivered to the user's browser.

That means users can inspect the JavaScript, network requests, and bundled files.

If I put an API secret or private key in frontend code, it is not really secret.

Secrets should stay on the server, where the browser cannot directly inspect them.

The frontend should communicate with my backend, and the backend should use private credentials when needed.

---

## Part 8 — Browser and DOM

### 35. Five semantic elements and what each gives me for free

Semantic HTML elements describe the meaning of page content.

Examples:

1. `<header>`: introductory content or a page/section header.
2. `<nav>`: navigation links.
3. `<main>`: the main content of the page.
4. `<section>`: a thematic section of content.
5. `<footer>`: footer information for a page or section.

Semantic HTML improves accessibility and makes the page structure easier for browsers, assistive technologies, and developers to understand.

### 36. Why forms use `submit`, `preventDefault` and `FormData`

Forms should use the `submit` event because users can submit them by clicking the button or pressing Enter.

`preventDefault()` stops the browser's default form submission behavior when I want to handle the submission with JavaScript.

`FormData` helps me collect form fields without manually reading each input.

```ts
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
});
```

This makes form handling more organized.

### 37. Flexbox vs Grid — when I reach for each

**Flexbox** is mainly for arranging items in one dimension: a row or a column.

I use it for:

- Navigation bars.
- Aligning buttons.
- Centering content.
- Distributing items in a row.

**Grid** is mainly for two-dimensional layouts: rows and columns together.

I use it for:

- Dashboard layouts.
- Product grids.
- Card collections.
- Page structures with multiple columns.

I choose based on the layout I need, not because one is always better.

### 38. `textContent` vs `innerHTML`, and what XSS is

`textContent` inserts or reads plain text.

```ts
element.textContent = userInput;
```

`innerHTML` reads or writes HTML markup.

```ts
element.innerHTML = "<strong>Hello</strong>";
```

Using untrusted input with `innerHTML` can allow injected HTML or scripts to become part of the page.

This can create an XSS vulnerability.

XSS means Cross-Site Scripting: an attacker injects malicious content that runs in another user's browser.

For untrusted text, I prefer `textContent` because it treats the value as text rather than HTML.

### 39. Event delegation, and why it works

Event delegation means attaching one event listener to a parent instead of attaching separate listeners to every child.

It works because many DOM events bubble from the target element toward its ancestors.

Example:

```ts
list.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) return;

  const button = target.closest("[data-action]");

  if (!button) return;

  console.log(button.getAttribute("data-action"));
});
```

This is useful for lists with many items and for elements created dynamically after the listener was attached.

### 40. The state → render → events loop

A UI follows a repeating cycle:

```text
State
  |
  v
Render UI
  |
  v
User interaction
  |
  v
Event handler
  |
  v
Update state
  |
  v
Render UI again
```

State is the data that describes the current UI.

Rendering turns that state into visible elements.

Events let the user interact with the UI.

The event handler updates the state, and the UI is rendered again based on the new state.

This is the core idea behind interactive interfaces.

---

## Part 9 — Architecture and Application Design

### 41. The architecture: what each layer knows, and what it doesn't

A project becomes easier to maintain when each layer has a clear responsibility.

Example architecture:

```text
UI / Components
      |
      v
API Layer
      |
      v
HTTP Client
      |
      v
Backend
      |
      v
Database
```

**UI / Components**

Knows how to display information and respond to user actions.

It should not need to know every detail of HTTP communication.

**API Layer**

Knows which endpoints represent the application's resources and operations.

It should not repeat the low-level fetch and error-handling logic.

**HTTP Client**

Knows how to send requests, parse responses, validate data, and handle request errors.

It should not need to know what a Task or Product means.

**Backend**

Knows the application rules, validates incoming requests, and coordinates data operations.

**Database**

Stores and retrieves persistent data.

The lesson is Separation of Concerns: each layer should know only what it needs to do its job.

### 42. Optimistic vs pessimistic — which I used where, and why
In my Quiz App, I used the **Pessimistic Update** approach.

I waited for the server response before updating the UI. This means the application only showed the updated data after the server confirmed that the request was successful.

I chose this approach because I wanted to make sure the data was successfully processed by the server before showing the result to the user.

**The difference:**
- **Optimistic Update:** Update the UI immediately, then send the request to the server. If it fails, roll back the change.
- **Pessimistic Update:** Wait for the server response, then update the UI if the request succeeds.

**What I learned:** Pessimistic updates provide more confidence that the UI reflects successfully processed server data, while optimistic updates can make an application feel faster.

### 43. What `shared/` gives me, with my Task 21 as the example

A `shared/` folder contains definitions or code that multiple parts of the application need to use.

For example, the frontend and backend may both need to agree on the structure of a Task.

```ts
export interface Task {
  id: number;
  title: string;
  done: boolean;
  priority: "low" | "medium" | "high";
}
```

Sharing this type avoids defining the same contract differently in multiple places.

It reduces duplication and helps keep the frontend and backend consistent.

 ### Shared types and validators in Task 21

In Task 21, I used shared types and validators to keep the frontend and backend consistent.

For example:
- Shared types were defined in `shared/types.ts`.
- Shared validators were defined in `shared/validators.ts`.
- The frontend imported them in its API/client code.
- The backend imported the same definitions in its route handlers to validate incoming data.

This helped both sides follow the same data structure and validation rules, reducing inconsistencies between the frontend and backend.
---

## My Bugs — What Broke and What I Learned

The bug section is important because debugging teaches me how to read errors and understand my assumptions.

I should document a real bug from each half of the course, including the exact message or wrong behavior.
  

### A debugging rule I want to keep

I should not fix an error by randomly changing types or using `any`.

Instead:

1. Read the complete error message.
2. Find the file and line.
3. Understand the expected type.
4. Compare it with the actual value.
5. Fix the real cause.
6. Run the type checker and tests again.

The goal is not just to make the error disappear. The goal is to understand why it happened so I can avoid the same mistake in the future.