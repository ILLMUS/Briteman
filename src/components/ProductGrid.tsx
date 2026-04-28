import { Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

const TABS: { label: string; slug?: string }[] = [
  { label: "All" },
  { label: "Laptops", slug: "laptops" },
  { label: "Peripherals", slug: "peripherals" },
  { label: "Storage", slug: "storage" },
  { label: "Accessories", slug: "accessories" },
];

export function ProductGrid() {
  const featured = PRODUCTS.slice(0, 8);
  return (
    <section id="products" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Best Sellers</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Products</h2>
          </div>
          <div className="flex gap-px bg-border flex-wrap">
            {TABS.map((t, idx) =>
              t.slug ? (
                <Link
                  key={t.label}
                  to="/category/$slug"
                  params={{ slug: t.slug }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wide bg-secondary text-foreground hover:bg-brand-blue hover:text-white transition-colors"
                >
                  {t.label}
                </Link>
              ) : (
                <span
                  key={t.label}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wide ${idx === 0 ? "bg-brand-blue text-white" : "bg-secondary text-foreground"}`}
                >
                  {t.label}
                </span>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
          {featured.map((p) => (
            <ProductCard key={p.name} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
