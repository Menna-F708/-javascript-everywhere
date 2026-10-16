# Approach — Product Catalog

## 1. Understand the Problem

I need to build a reusable React component called `Catalog` using TypeScript.

The component receives a flat array of products and a `showSoldOut` boolean prop. It must display products grouped by category, sorted correctly, and optionally hide sold-out products.

## 2. Define the Product Type

I will define a `Product` interface with the following properties:

- `id`: number
- `name`: string
- `category`: string
- `price`: number
- `inStock`: boolean

The `Catalog` component will receive `products` and `showSoldOut` as props.

## 3. Handle the Empty States First

I will handle two special cases:

- If the original `products` array is empty, display `No products yet.`
- If products exist but no products remain visible after filtering, display `Everything is sold out.`

Both empty states must replace the entire catalog output, including category headings and the footer.

## 4. Filter the Products

I will filter the products based on `showSoldOut`.

- If `showSoldOut` is `true`, keep all products.
- If `showSoldOut` is `false`, keep only products whose `inStock` value is `true`.

I will derive the visible products from the props without using React state.

## 5. Group Products by Category

I will use `reduce()` to group the visible products into an object where each category maps to an array of products.

I will use `Record<string, Product[]>` to describe the grouped data in TypeScript.

## 6. Sort the Categories and Products

I will sort category names alphabetically from A to Z.

Inside each category, I will sort products by:

1. Price, cheapest first.
2. Name alphabetically when prices are equal.

I will avoid mutating the original products array by sorting copies.

## 7. Render the Catalog

For each category, I will display a heading in the format `Category (n)`, where `n` is the number of visible products in that category.

Each product will display its name and price with exactly two decimal places.

If a sold-out product is shown, I will append ` · Sold out` to its line.

I will use stable keys derived from the data for both category groups and individual products.

## 8. Display the Summary

After all categories, I will display:

`Showing X of Y products`

- `X` is the number of visible products.
- `Y` is the total number of products received.

The footer will not appear in either empty state.

## 9. Prevent Mutation

I will avoid modifying the original `products` prop.

I will use non-mutating filtering and grouping operations, and I will sort copies of arrays rather than sorting the original array in place.

After rendering, I will verify that the original product IDs remain `1,2,3,4,5,6`.

## 10. Build and Verify the Demo

I will render Examples 1–5 vertically on the demo page.

I will verify category order, product sorting, equal-price tie-breaking, sold-out filtering, both empty states, summary counts, React keys, and preservation of the original array.

Finally, I will capture a screenshot showing all five examples.
  