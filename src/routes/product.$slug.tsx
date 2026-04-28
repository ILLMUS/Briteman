import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight, MessageCircle, Check, AlertCircle, XCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, fmtPrice, whatsappOrderLink, type Product } from "@/data/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    const related = PRODUCTS.filter(
      (p) => p.categorySlug === product.categorySlug && p.slug !== product.slug
    ).slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Brightman Services` },
          { name: "description", content: `${loaderData.product.name} — ${loaderData.product.specs}. Order on WhatsApp from Mbabane, Eswatini.` },
          { property: "og:title", content: `${loaderData.product.name} — Brightman Services` },
          { property: "og:description", content: `${loaderData.product.name} — ${loaderData.product.specs}.` },
          { property: "og:image", content: loaderData.product.img },
          { property: "twitter:image", content: loaderData.product.img },
        ]
      : [{ title: "Product — Brightman Services" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">Product not found</h1>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
        <Link to="/" className="inline-block bg-brand-blue text-white px-5 py-2.5 text-sm font-bold uppercase">Back to home</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ProductPage,
});

const stockMeta: Record<Product["stock"], { label: string; cls: string; icon: typeof Check }> = {
  in: { label: "In Stock — Ready to ship", cls: "bg-whatsapp text-white", icon: Check },
  limited: { label: "Limited Stock — Order soon", cls: "bg-brand-red text-white", icon: AlertCircle },
  out: { label: "Out of Stock — Currently unavailable", cls: "bg-foreground text-white", icon: XCircle },
};

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const isOut = product.stock === "out";
  const meta = stockMeta[product.stock];
  const StockIcon = meta.icon;

  const specsList = product.specs.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol
              className="flex flex-wrap items-center gap-1.5 text-xs uppercase tracking-wider text-muted-foreground"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:text-brand-blue" itemProp="item">
                  <span itemProp="name">Home</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link
                  to="/category/$slug"
                  params={{ slug: product.categorySlug }}
                  className="hover:text-brand-blue"
                  itemProp="item"
                >
                  <span itemProp="name">{product.category}</span>
                </Link>
                <meta itemProp="position" content="2" />
              </li>
              <li aria-hidden="true"><ChevronRight className="w-3.5 h-3.5" /></li>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                aria-current="page"
                className="text-foreground line-clamp-1"
              >
                <span itemProp="name">{product.name}</span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative aspect-square bg-secondary overflow-hidden border border-border">
              {product.badge && (
                <span className={`absolute top-0 left-0 z-10 px-3 py-1.5 text-xs font-bold tracking-wider ${
                  product.badge === "HOT" ? "bg-brand-red text-white" :
                  product.badge === "NEW" ? "bg-brand-blue text-white" :
                  "bg-foreground text-white"
                }`}>
                  {product.badge}
                </span>
              )}
              <img
                src={product.img}
                alt={product.name}
                className={`w-full h-full object-cover ${isOut ? "grayscale opacity-70" : ""}`}
              />
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue mb-2">
                {product.category}
              </span>
              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-3xl font-bold text-brand-blue">
                  {fmtPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {fmtPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider w-fit mb-6 ${meta.cls}`}>
                <StockIcon className="w-4 h-4" />
                {meta.label}
              </div>

              <div className="border-t border-border pt-5 mb-6">
                <h2 className="font-display text-sm font-bold uppercase tracking-wider mb-3">
                  Specifications
                </h2>
                <ul className="space-y-2">
                  {specsList.map((spec) => (
                    <li key={spec} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-whatsapp flex-shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {isOut ? (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-5 py-3.5 text-sm font-bold uppercase tracking-wide cursor-not-allowed"
                  >
                    <MessageCircle className="w-5 h-5" /> Currently Unavailable
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Out of stock — please check back soon or contact us for alternatives.
                  </p>
                </div>
              ) : (
                <a
                  href={whatsappOrderLink(product)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-brand-blue transition-colors"
                >
                  <MessageCircle className="w-5 h-5" /> Order on WhatsApp
                </a>
              )}

              <p className="text-xs text-muted-foreground mt-3 text-center">
                Delivery across Mbabane, Eswatini. Confirm stock & ETA on WhatsApp.
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-5">
                Related products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
                {related.map((p) => (
                  <ProductCard key={p.slug} p={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
