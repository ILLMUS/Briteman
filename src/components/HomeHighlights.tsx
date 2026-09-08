import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { fetchHomePageProducts } from "@/lib/db-products";
import type { Product } from "@/data/products";

export function HomeHighlights() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchHomePageProducts().then((db) => {
      if (mounted) setItems(db.slice(0, 6));
    });
    return () => {
      mounted = false;
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6 gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">
              New In Stock
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Fresh Arrivals</h2>
          </div>
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
