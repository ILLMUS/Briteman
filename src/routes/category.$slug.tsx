import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";
import { ChevronRight } from "lucide-react";
import { fetchProductsForStorefrontCategory, mergeProducts } from "@/lib/db-products";
import { CatalogueDownloadButton } from "@/components/CatalogueDownloadButton";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);
    if (!cat) throw notFound();
    const products = PRODUCTS.filter((p) => p.categorySlug === params.slug);
    return { cat, products };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.label} — Brightman Services` },
          { name: "description", content: loaderData.cat.description },
          { property: "og:title", content: `${loaderData.cat.label} — Brightman Services` },
          { property: "og:description", content: loaderData.cat.description },
        ]
      : [{ title: "Category — Brightman Services" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">Category not found</h1>
        <p className="text-muted-foreground mb-6">The category you are looking for does not exist.</p>
        <Link to="/" className="inline-block bg-brand-blue text-white px-5 py-2.5 text-sm font-bold uppercase">Back to home</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { cat, products: staticProducts } = Route.useLoaderData();
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    let cancelled = false;
    fetchProductsForStorefrontCategory(cat.slug).then((dbProducts) => {
      if (cancelled) return;
      setProducts(mergeProducts(staticProducts, dbProducts));
    });
    return () => {
      cancelled = true;
    };
  }, [cat.slug, staticProducts]);

  // Group by subcategory (DB rows carry the subcategory in the `category` field after adaptation).
  const groups = products.reduce<Record<string, Product[]>>((acc, p) => {
    const key = p.category || "Other";
    (acc[key] ||= []).push(p);
    return acc;
  }, {});
  const groupKeys = Object.keys(groups);


  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb / hero */}
        <section className="bg-brand-blue text-white">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <nav className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-white/70 mb-3">
              <Link to="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span>Categories</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-white">{cat.label}</span>
            </nav>
            <h1 className="font-display text-4xl md:text-5xl font-bold uppercase tracking-tight">{cat.label}</h1>
            <p className="text-white/80 mt-2 max-w-2xl text-sm md:text-base">{cat.description}</p>
            <div className="mt-4 flex items-center gap-3 flex-wrap">
              <div className="text-xs font-bold tracking-wider text-brand-red bg-white inline-block px-3 py-1 rounded-full">
                {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
              </div>
              <CatalogueDownloadButton
                categoryLabel={cat.label}
                products={products}
                description={cat.description}
              />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <aside>
            <div className="border border-border">
              <div className="bg-secondary px-4 py-3 font-display text-sm font-bold uppercase tracking-wide border-b border-border">
                All Categories
              </div>
              <ul>
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/category/$slug"
                      params={{ slug: c.slug }}
                      className="flex items-center justify-between px-4 py-2.5 text-sm border-b border-border last:border-b-0 hover:bg-brand-blue hover:text-white transition-colors"
                      activeProps={{ className: "bg-brand-blue text-white" }}
                    >
                      <span>{c.label}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {products.length === 0 ? (
              <div className="border border-border bg-white p-10 text-center">
                <p className="text-muted-foreground">No products available in this category yet.</p>
                <Link to="/" className="inline-block mt-4 bg-brand-blue text-white px-5 py-2 text-xs font-bold uppercase">
                  Browse all products
                </Link>
              </div>
            ) : groupKeys.length > 1 ? (
              <div className="space-y-10">
                {groupKeys.map((key) => (
                  <section key={key}>
                    <h2 className="font-display text-lg font-bold uppercase tracking-tight mb-3 pb-2 border-b-2 border-brand-blue inline-block">
                      {key}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                      {groups[key].map((p: Product) => (
                        <ProductCard key={`${key}-${p.slug}`} p={p} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((p: Product) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
