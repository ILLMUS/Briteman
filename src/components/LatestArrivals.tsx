import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { fetchLatestProducts, mergeProducts } from "@/lib/db-products";
import type { Product } from "@/data/products";

export function LatestArrivals() {
  const [items, setItems] = useState<Product[]>(PRODUCTS.slice(0, 6));

  useEffect(() => {
    let mounted = true;
    fetchLatestProducts().then((db) => {
      if (!mounted) return;
      setItems(mergeProducts(PRODUCTS, db).slice(0, 6));
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="bg-secondary/40 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Just In</div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Latest Brands</h2>
          </div>
          <Link
            to="/"
            hash="products"
            className="text-sm font-semibold uppercase text-brand-blue hover:text-brand-red border-b-2 border-brand-blue hover:border-brand-red pb-0.5"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {items.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
