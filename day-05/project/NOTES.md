```md
# Day 04 vs Day 05

## Line Count

Day 04 `report.js`: 269 lines

Day 05 `report.js` + `lib/`:

- `report.js`: 122 lines
- `lib/grade-lib.js`: 92 lines
- `lib/db.js`: 56 lines
- `lib/async-utils.js`: 38 lines
- `lib/index.js`: 21 lines

The Day 05 version moved reusable grading and async logic into separate modules, so `report.js` itself became shorter and focused mainly on loading data, calling functions, and printing the report.

The code became clearer because each module now has one responsibility: grading lives in `grade-lib.js`, database/attendance logic lives in `db.js`, async helpers live in `async-utils.js`, and `index.js` provides one entry point for the report.

## `letterGrade` Copies

Day 03–04 had multiple uses/copies of the grading logic while building and refactoring the exercises.

Day 05 has exactly one definition of `letterGrade`, inside:

`lib/grade-lib.js`

Other files import it instead of defining it again.

## Why This Is Better Organized

The report does not contain grading logic or database implementation details.

It only imports the required functions, loads the data, coordinates the async operations, and prints the final report.
```



Git history note:
Reworded commit fba480c from "Update Day 04 report"
to "Refine Day 04 report output" using interactive rebase.
