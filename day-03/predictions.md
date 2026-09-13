 # JavaScript Predictions — Scope and Hoisting

## 1

```js
console.log(a);
var a = 1;
```

**Prediction:** `undefined`

**Actual:** `undefined`

**Why:** `var` is hoisted With undefined.

---

## 2

```js
console.log(b);
let b = 2;
```

**Prediction:** `ReferenceError`

**Actual:** `ReferenceError`

**Why:** `b` is in the Temporal Dead Zone (TDZ) until its `let` declaration is executed.

---

## 3

```js
hello();
function hello() { console.log("hi"); }
```

**Prediction:** `hi`

**Actual:** `hi`

**Why:** Function declarations are fully hoisted, so the function can be called before its declaration.

---

## 4

```js
bye();
const bye = () => console.log("bye");
```

**Prediction:** `ReferenceError`

**Actual:** `ReferenceError`

**Why:** `bye` is in the Temporal Dead Zone (TDZ) until its `const` declaration is executed.

---

## 5

```js
function f() { return; 42; }
console.log(f());
```

**Prediction:** `undefined` 

**Actual:** `undefined`

**Why:** `return` immediately stops the function, so `42` is never returned.

---

## 6

```js
const g = (x) => { x * 2 };
console.log(g(5));
```

**Prediction:** `undefined`

**Actual:** `undefined`

**Why:** An arrow function with `{}` needs an explicit `return`; without it, the function returns `undefined`.

--- 

## 7

```js
const h = (x) => { value: x };
console.log(h(5));
```

**Prediction:** `undefined`

**Actual:** `undefined`

**Why:** `{ value: x }` is treated as the function body, not as an object being returned, and there is no `return` ,if we need return object we should use ({}).

---

## 8

```js
function k(a, b) { return a + b; }
console.log(k(1));
``` 

**Prediction:** `NaN` 

**Actual:** `NaN`

**Why:** `b` is `undefined`, so `1 + undefined` results in `NaN`.

---

## 9

```js
function m(x = 10) { return x; }
console.log(m(null), m(undefined), m(0));
``` 

**Prediction:** `null, 10, 0`

**Actual:** `null 10 0`

**Why:** The default value `10` is used only when the argument is `undefined`.

---

## 10

```js
let n = "outer";
function p() { let n = "inner"; return n; }
console.log(p(), n);
```

**Prediction:** `inner,  outer`

**Actual:** `inner outer`

**Why:** The `n` inside the function is local, while the `n` outside the function remains `outer`.

---

## 11

```js
for (var i = 0; i < 3; i++) {}
console.log(i);
``` 

**Prediction:** `3`

**Actual:** `3`

**Why:** `var` is not block-scoped, so `i` is still accessible after the loop.

---

## 12 

```js
for (let j = 0; j < 3; j++) {}
console.log(j);
```

**Prediction:** `ReferenceError`

**Actual:** `ReferenceError`

**Why:** `let` is block-scoped, so `j` only exists inside the `for` loop.

---

## 13

```js
function counter() { let c = 0; return () => ++c; }
const q = counter();
console.log(q(), q(), counter()());
```

**Prediction:** `1 2 1`

**Actual:** `1 2 1`

**Why:** `q()` keeps the same `c` through a closure, while `counter()` creates a new `c` starting from `0`.

---

## 14

```js
const nums = [1, 2, 3];
console.log(nums.map((x) => x * 2));
```
 
**Prediction:** `2 4 6`

**Actual:** `[2, 4, 6]`

**Why:** `map()` creates a new array containing the result of multiplying each element by `2`.

---

## 15

```js
function r() { console.log("ran"); }
console.log(r);
```

**Prediction:** `r`

**Actual:** `[Function: r]`

**Why:** `console.log(r)` prints the function itself; the function only runs when called with `r()`.
