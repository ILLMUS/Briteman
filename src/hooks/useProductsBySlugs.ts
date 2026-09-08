import { useEffect, useMemo, useState } from "react";
import { PRODUCTS, type Product } from "@/data/products";
import { fetchProductsBySlugs } from "@/lib/db-products";

/**
 * Resolves a list of product slugs (from cart / favourites storage) into full
 * products, looking in the static catalogue first and then in the database so
 * CMS-uploaded products also show up on the cart and favourites pages.
 */
export function useProductsBySlugs(slugs: string[]) {
  const key = slugs.join(",");
  const [dbProducts, setDbProducts] = useState<Product[]>([]);

  useEffect(() => {
    const list = key ? key.split(",") : [];
    const missing = list.filter((s) => !PRODUCTS.some((p) => p.slug === s));
    if (missing.length === 0) {
      setDbProducts([]);
      return;
    }
    let cancelled = false;
    fetchProductsBySlugs(missing).then((rows) => {
      if (!cancelled) setDbProducts(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [key]);

  return useMemo(() => {
    const list = key ? key.split(",") : [];
    return list
      .map(
        (slug) =>
          PRODUCTS.find((p) => p.slug === slug) ?? dbProducts.find((p) => p.slug === slug) ?? null,
      )
      .filter((p): p is Product => p !== null);
  }, [key, dbProducts]);
}
