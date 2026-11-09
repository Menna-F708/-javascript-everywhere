 # BUG HUNT

## 12.1 Pick and rename

I initially selected two JavaScript files from previous days and copied them into the migration folder.

The original files were renamed to TypeScript files without changing their code.

I ran:

```bash
npx tsc migrate/app.ts migrate/main.ts --noEmit --ignoreConfig
```

### Initial TypeScript errors

* `app.ts`: **57 errors**
* `main.ts`: **40 errors**
* **Total: 97 errors**

These errors were recorded before making any fixes.

## 12.2 Fix and verify

For the Node.js migration tests, I used two files:

* `migrate/callback.ts` — callback examples, including synchronous and asynchronous callbacks, error-first callbacks, and returning values from asynchronous operations.
* `migrate/report.ts` — the student grade report, including validation, grade calculation, student statistics, and the bonus test.

### Verification commands

I compiled the report file:

```bash
npx tsc migrate/report.ts --target ES2020 --module commonjs --outDir migrate/dist --ignoreConfig
```

Then I ran it:

```bash
node migrate/dist/report.js
```

The report ran successfully and displayed the student report, one invalid record, the lowest and highest scores, grade tally, and bonus test.

I compiled the callback file:

```bash
npx tsc migrate/callback.ts --target ES2020 --module commonjs --outDir migrate/dist --ignoreConfig
```

Then I ran it:

```bash
node migrate/dist/callback.js
```

The callback examples ran successfully and displayed the expected synchronous and asynchronous callback output, the `undefined` return-value example, and both successful and unsuccessful student lookup results.

 ### Verification results

* Both TypeScript files compiled successfully.
* Both files ran successfully with Node.js.
* Their outputs matched the original JavaScript outputs.
* The migration preserves the original behavior, including synchronous and asynchronous callbacks, student validation, grade calculations, and bonus handling.

### Final code review

* Check that neither file uses `any`, type assertions using `as`, or non-null assertions.
* Confirm that all TypeScript errors have been resolved.




## 12.3 Bug Hunt

### Errors found

The initial TypeScript compilation reported 97 errors: 57 in `app.ts` and 40 in `main.ts`.

Most errors were related to missing type information and values that needed validation.

| Code / location                    | Type of error              | Explanation                                                                                                  |
| ---------------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `getScoreLaterWrong()`             | Real bug                   | Returning a value inside `setTimeout` does not return it from the outer function. The result is `undefined`. |
| `findStudent()`                    | Missing type information   | `.find()` can return `undefined` when no student matches, so the result must be checked.                     |
| `findStudent(99)`                  | Real edge case             | Searching for a nonexistent student must be handled without accessing properties of an undefined value.      |
| `students[0]`                      | Missing type information   | The first array element may be `undefined` if the array is empty.                                            |
| Laila's score (`"82"`)             | Real data-validation issue | The score is a string instead of a number, so the validation rejects the record.                             |
| `doSomething()`                    | Real bug                   | An empty function body never calls the callback, so the expected error-handling message is not printed.      |
| Repeated declarations across files | TypeScript module issue    | Global declarations such as `Student` and `students` can conflict if both files are treated as scripts.      |

### Of those, real bugs

**3 confirmed real bugs.**

These are the incorrect asynchronous return behavior, the invalid score data, and the empty `doSomething()` function. The other cases are missing type information or potential edge cases that the code must handle safely.

### Most common kind of error

The most common issue was missing type information and assumptions about values. I sometimes relied on functions returning valid data without checking every possible outcome. This migration taught me to validate input, check array results, and understand how asynchronous callbacks behave instead of assuming that JavaScript will always return the value I expect.
