 # Approach — Star Rating

## 1. Understand the Problem

I need to build a reusable React component called `Rating` using TypeScript.

The component receives a rating value and displays filled stars (`★`) and empty stars (`☆`). It should also support an optional label and a configurable maximum rating.

## 2. Define the Props

I will create a TypeScript interface called `RatingProps` with three properties:

- `value`: a required number representing the rating.
- `max`: an optional number representing the maximum rating, defaulting to `5`.
- `label`: an optional string displayed before the stars.

## 3. Validate the Maximum Rating

Before rendering the component, I will check whether `max` is a positive integer.

If `max` is not a positive integer, the component will return `null`.

## 4. Calculate the Number of Filled Stars

I will create a helper function called `calcValue` to calculate the number of filled stars.

The function will:

1. Handle `NaN` by treating it as `0`.
2. Round the rating to the nearest integer using `Math.round()`.
3. Prevent negative ratings using `Math.max()`.
4. Prevent ratings from exceeding `max` using `Math.min()`.

This will ensure that the final number of filled stars is between `0` and `max`, including when the input is `Infinity` or `-Infinity`.

## 5. Generate the Stars

I will use the string method `.repeat()` instead of manual loops.

- Filled stars: `"★".repeat(filled)`
- Empty stars: `"☆".repeat(max - filled)`

This produces the correct number of each type of star.

## 6. Render the Rating

The component will display the following format:

`[label: ]<filled stars><empty stars> (filled/max)`

The label will only appear when provided.

## 7. Make the Component Accessible

I will use `role="img"` and an `aria-label` such as `"3 out of 5"` to describe the rating to screen readers.

I will add `aria-hidden="true"` to the star symbols so screen readers do not read every star individually.

## 8. Test Edge Cases

I will test the component with:

- A normal rating, such as `3` out of `5`.
- A decimal rating, such as `3.7`.
- A rating of `0`.
- A negative rating.
- A rating greater than `max`.
- `NaN`, `Infinity`, and `-Infinity`.
- An invalid `max`, such as `0`, `-1`, or `2.5`.
- A custom label and a custom maximum rating.

## 9. Keep the Code Organized

I will keep the `Rating` component separate from the `calcValue` utility function to make the code easier to maintain and avoid mixing component exports with non-component exports.

## 10. Render Multiple Examples

I will create an array of rating examples and render them using `.map()`. Each rendered component will receive a unique `key`.
