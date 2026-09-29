import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, type Product } from "@/data/products";
import { fetchHotDeals, mergeProducts } from "@/lib/db-products";
import { ChevronRight, Flame } from "lucide-react";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Hot Deals — Briteman Services | Discounted Tech in Eswatini" },
      {
        name: "description",
        content:
          "Limited-time hot deals and discounts on laptops, smartphones and accessories at Briteman Services, Mbabane and Manzini, Eswatini.",
      },
      { property: "og:title", content: "Hot Deals — Briteman Services" },
      {
        property: "og:description",
        content: "Discounted, warrantied tech at honest prices. Order on WhatsApp today.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: DealsPage,
});

function DealsPage() {
  const staticDeals = PRODUCTS.filter((p) => p.badge === "HOT" || p.badge === "-15%");
  const [products, setProducts] = useState<Product[]>(staticDeals);

  useEffect(() => {
    let cancelled = false;
    fetchHotDeals().then((dbProducts) => {
      if (cancelled) return;
      setProducts(mergeProducts(staticDeals, dbProducts));
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">


        <div className="max-w-7xl mx-auto px-4 py-10">
          {products.length === 0 ? (
            <div className="border border-border bg-white p-10 text-center rounded-xl">
              <Flame className="w-10 h-10 text-brand-red mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold mb-2">No active deals right now</h2>
              <p className="text-muted-foreground text-sm mb-5">
                New deals drop regularly — check back soon or browse the full catalogue.
              </p>
              <Link
                to="/category/$slug"
                params={{ slug: "laptops" }}
                className="inline-block bg-brand-blue text-white px-5 py-2.5 text-xs font-bold uppercase rounded-lg hover:bg-brand-blue-dark transition-colors"
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((p) => (
                <ProductCard key={p.slug} p={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
