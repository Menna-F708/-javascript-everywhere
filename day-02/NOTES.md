# Day 02 Notes

## 1. `const` vs `let`

I use `const` when I don't plan to assign a completely new value to the variable. I use `let` when the value itself needs to change later.

For example:

```js
const name = "Menna";
let score = 80;

score = 90;
```

`name` cannot be reassigned, but `score` can.

However, `const` does not make an array or object completely unchangeable. It only prevents me from assigning a new array to the same variable.

So this works:
 
```js
const students = ["Menna", "Youssef"];
 
students.push("Sara");
```

The array itself was changed, but `students` is still pointing to the same array.

This would not work:

```js
students = ["Omar"];
```

because now I am trying to make `students` point to a completely different array.

---

## 2. The 7 Primitive Types

1. `string` → text, like `"Hello"`
2. `number` → numbers, like `25` or `3.14`
3. `bigint` → very large integers, like `123n`
4. `boolean` → `true` or `false`
5. `undefined` → a variable exists but has no assigned value
6. `null` → intentionally represents no value
7. `symbol` → creates a unique value

---

## 3. Why is `typeof null` `"object"`?

This is one of JavaScript's old historical bugs.

```js
typeof null
```

returns:

```js
"object"
```

even though `null` is not actually an object.

It is better to check for `null` explicitly:

```js
value === null
```

For example:

```js
if (value === null) {
  console.log("Value is null");
}
```

So I should not depend on `typeof` alone to detect `null`.

---

## 4. The 8 Falsy Values

The 8 falsy values in JavaScript are:

```text
false
0
-0
0n
""
null
undefined
NaN
```

Everything else is truthy.

---

## 5. `===` vs `==`

I prefer `===` because it checks both the value and the type.

`==` can convert one type into another before comparing, which can create unexpected results.

For example:

```js
0 == false
```

returns:

```js
true
```

This can cause a real bug if I expect a number and accidentally receive a boolean.

With strict equality:

```js
0 === false
```

the result is:

```js
false
```

So in normal JavaScript code, I should use `===` and `!==`.

---

## 6. When should I use `??` instead of `||`?

I use `??` when I only want to provide a fallback when the value is `null` or `undefined`.

Example:

```js
const username = userInput ?? "Guest";
```

If `userInput` is an empty string, `0`, or `false`, those values are kept.

With `||`, those values are treated as falsy:

```js
const username = userInput || "Guest";
```

So the difference is:

* `||` → fallback for any falsy value.
* `??` → fallback only for `null` or `undefined`.

I should use `??` when values like `0`, `false`, or `""` are valid values and should not be replaced.

---

## 7. The Five Loops

### `for`

I use `for` when I know the number of iterations or need more control over the counter.

### `while`

I use `while` when I want to keep repeating something while a condition is true.

### `do...while`

I use `do...while` when I need the code to run at least once before checking the condition.

### `for...of`

I use `for...of` when I want to loop through the values of an iterable, such as an array.

### `for...in`

I use `for...in` when I want to loop through the keys/properties of an object.

---

## 8. `break` vs `continue`

`break` completely stops the loop.

```js
for (const student of students) {
  if (student.score === 100) {
    break;
  }
}
```

Once the condition is true, the loop ends.

`continue` does not stop the whole loop. It skips the current iteration and moves to the next one.

```js
for (const student of students) {
  if (student.score === null) {
    continue;
  }

  console.log(student.name);
}
```

So:

* `break` → stop the loop completely.
* `continue` → skip this iteration and keep going.

---

## 9. A Bug I Hit Today

While working with the student report card, I had a broken student record where the `attendance` value was missing.

The problem was that I was trying to process the record like a normal student instead of checking that the required data existed first.

The fix was to validate the student before processing it and use `continue` when the record was invalid.

For example:

```js
if (
  student.name === undefined ||
  student.score === undefined ||
  student.attendance === undefined
) {
  invalidSkipped++;
  continue;
}
``` 

This way, the broken record is skipped instead of causing incorrect calculations or output.

The important lesson for me was that I should validate input data before using it, especially when working with arrays of objects.
