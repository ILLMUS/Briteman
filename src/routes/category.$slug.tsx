import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS } from "@/data/products";
import { ChevronRight } from "lucide-react";

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
  const { cat, products } = Route.useLoaderData();

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
            <div className="mt-4 text-xs font-bold tracking-wider text-brand-red bg-white inline-block px-3 py-1">
              {products.length} {products.length === 1 ? "PRODUCT" : "PRODUCTS"}
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
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
                {products.map((p) => (
                  <ProductCard key={p.name} p={p} />
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
