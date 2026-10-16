 
import type { Product } from "./Catalog";

export default function ProductCatalog({
  products,
  showSoldOut,
}: {
  products: Product[];
  showSoldOut: boolean;
}) {
  // 1. Check whether the original list is empty
  if (products.length === 0) {
    return <p>No products yet.</p>;
  }

  // 2. Filter products according to showSoldOut
  const visibleProducts = showSoldOut
    ? products
    : products.filter((product) => product.inStock);

  // 3. Check whether any products remain visible
  if (visibleProducts.length === 0) {
    return <p>Everything is sold out.</p>;
  }

  // 4. Group products by category
  const groupedProducts = visibleProducts.reduce<Record<string, Product[]>>(
    (groups, product) => {
      if (!groups[product.category]) {
        groups[product.category] = [];
      }

      groups[product.category].push(product);

      return groups;
    },
    {},
  );

  // 5. Sort categories alphabetically
  const sortedCategories = Object.keys(groupedProducts).sort();

  // 6. Render categories and their products
  return (
    <div>
      {sortedCategories.map((category) => {
        const categoryProducts = groupedProducts[category] ?? [];

        // Sort by price, then by name when prices are equal
        const sortedProducts = [...categoryProducts].sort(
          (a, b) => a.price - b.price || a.name.localeCompare(b.name),
        );

        return (
          <section key={category}>
            <h2>
              {category} ({sortedProducts.length})
            </h2>

            {sortedProducts.map((product) => (
              <p key={product.id}>
                {product.name} — {product.price.toFixed(2)} EGP
                {!product.inStock && " · Sold out"}
              </p>
            ))}
          </section>
        );
      })}

      {/* 7. Show visible count and original count */}
      <footer>
        Showing {visibleProducts.length} of {products.length} products
      </footer>
    </div>
  );
}
 