import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronRight, MessageCircle, Check, AlertCircle, XCircle, MapPin, ShieldCheck, Truck, Package, Info } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, fmtPrice, whatsappOrderLink, type Product, type ProductVariant, type ProductVariantOption } from "@/data/products";
import { useBranch } from "@/hooks/useBranch";
import { useAuthGate } from "@/hooks/useAuthGate";
import { logOrder } from "@/lib/log-order";
import { supabase } from "@/integrations/supabase/client";
import {
  STOREFRONT_CATEGORY_MAP,
  fetchProductsForStorefrontCategory,
} from "@/lib/db-products";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import pLaptop from "@/assets/p-laptop.jpg";

type DbMeta = {
  images?: string[];
  attributes?: { label: string; value: string }[];
  description?: string;
  warranty?: string;
  delivery_info?: string;
  variants?: { name: string; options: { label: string; price_delta?: number }[] }[];
  sku?: string;
};

export const Route = createFileRoute("/product/$slug")({
  ssr: false,
  loader: async ({ params }) => {
    const staticProduct = PRODUCTS.find((p) => p.slug === params.slug);
    if (staticProduct) {
      const related = PRODUCTS.filter(
        (p) => p.categorySlug === staticProduct.categorySlug && p.slug !== staticProduct.slug,
      ).slice(0, 4);
      return { product: staticProduct, related };
    }

    // Fall back to a DB-uploaded product
    const { data } = await supabase
      .from("products")
      .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,meta")
      .eq("slug", params.slug)
      .maybeSingle();
    if (!data) throw notFound();

    // Reverse-lookup the storefront slug for this DB row
    const storefrontSlug =
      Object.entries(STOREFRONT_CATEGORY_MAP).find(
        ([, m]) =>
          m.dbCategory === data.category &&
          (!m.subcategories || (data.subcategory && m.subcategories.includes(data.subcategory))),
      )?.[0] ?? "laptops";

    const meta = (data.meta ?? {}) as DbMeta;
    const images = meta.images?.length ? meta.images : data.image_url ? [data.image_url] : [pLaptop];
    const stock: Product["stock"] =
      data.stock <= 0 ? "out" : data.stock <= 3 ? "limited" : "in";
    const badge =
      data.badge === "HOT" || data.badge === "NEW" || data.badge === "-15%" ? data.badge : undefined;
    const attributes = meta.attributes?.length
      ? meta.attributes
      : data.description
      ? data.description.split("·").map((s) => s.trim()).filter(Boolean).map((s) => {
          if (s.includes(":")) {
            const [label, ...rest] = s.split(":");
            return { label: label.trim(), value: rest.join(":").trim() };
          }
          return { label: "Spec", value: s };
        })
      : [];
    const product: Product = {
      slug: data.slug,
      img: images[0] || pLaptop,
      images,
      name: data.name,
      specs: data.description ?? data.subcategory ?? "",
      description: meta.description ?? data.description ?? data.subcategory ?? "",
      price: Number(data.price),
      badge,
      category: data.subcategory ?? STOREFRONT_CATEGORY_MAP[storefrontSlug]?.label ?? data.category,
      categorySlug: storefrontSlug,
      stock,
      attributes,
      warranty: meta.warranty ?? undefined,
      deliveryInfo: meta.delivery_info ?? undefined,
      variants: meta.variants ?? undefined,
      sku: meta.sku ?? undefined,
    };

    const dbRelated = await fetchProductsForStorefrontCategory(storefrontSlug);
    const related = dbRelated.filter((p) => p.slug !== product.slug).slice(0, 4);
    return { product, related };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Briteman Services` },
          { name: "description", content: `${loaderData.product.name} — ${loaderData.product.description || loaderData.product.specs}. Order on WhatsApp from Mbabane or Manzini, Eswatini.` },
          { property: "og:title", content: `${loaderData.product.name} — Briteman Services` },
          { property: "og:description", content: `${loaderData.product.description || loaderData.product.specs}.` },
          { property: "og:image", content: loaderData.product.img },
          { property: "twitter:image", content: loaderData.product.img },
        ]
      : [{ title: "Product — Briteman Services" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold mb-3">Product not found</h1>
        <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
        <Link to="/" className="inline-block bg-brand-blue text-white px-5 py-2.5 text-sm font-bold uppercase rounded-xl">Back to home</Link>
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
  const { product, related } = Route.useLoaderData() as { product: Product; related: Product[] };
  const { name: branch } = useBranch();
  const gate = useAuthGate();
  const isOut = product.stock === "out";
  const meta = stockMeta[product.stock];
  const StockIcon = meta.icon;

  const images = product.images?.length ? product.images : [product.img];
  const [activeImage, setActiveImage] = useState(images[0]);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariantOption>>(() => {
    const initial: Record<string, ProductVariantOption> = {};
    (product.variants ?? []).forEach((v) => {
      if (v.options[0]) initial[v.name] = v.options[0];
    });
    return initial;
  });

  const variantPriceDelta = useMemo(() => {
    return Object.values(selectedVariants).reduce((sum, opt) => sum + (opt.price_delta ?? 0), 0);
  }, [selectedVariants]);

  const finalPrice = product.price + variantPriceDelta;

  const variantLabel = useMemo(() => {
    if (!product.variants?.length) return undefined;
    return Object.entries(selectedVariants)
      .map(([name, opt]) => `${name}: ${opt.label}`)
      .join(" / ");
  }, [selectedVariants, product.variants]);

  const handleSelect = (variant: ProductVariant, option: ProductVariantOption) => {
    setSelectedVariants((prev) => ({ ...prev, [variant.name]: option }));
  };

  const attributes = product.attributes?.length
    ? product.attributes
    : product.specs.split("·").map((s) => s.trim()).filter(Boolean).map((s) => {
        if (s.includes(":")) {
          const [label, ...rest] = s.split(":");
          return { label: label.trim(), value: rest.join(":").trim() };
        }
        return { label: "Spec", value: s };
      });

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
            {/* Image gallery */}
            <div className="space-y-3">
              <div className="relative aspect-square bg-secondary overflow-hidden border border-border rounded-xl">
                {product.badge && (
                  <span className={`absolute top-3 left-3 z-10 rounded-full px-3 py-1.5 text-xs font-bold tracking-wider ${
                    product.badge === "HOT" ? "bg-brand-red text-white" :
                    product.badge === "NEW" ? "bg-brand-blue text-white" :
                    "bg-foreground text-white"
                  }`}>
                    {product.badge}
                  </span>
                )}
                <img
                  src={activeImage}
                  alt={product.name}
                  className={`w-full h-full object-cover ${isOut ? "grayscale opacity-70" : ""}`}
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setActiveImage(src)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-lg border overflow-hidden bg-secondary ${
                        activeImage === src ? "ring-2 ring-brand-blue" : "border-border hover:border-brand-blue"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                  {product.category}
                </span>
                {product.sku && (
                  <span className="text-xs text-muted-foreground">SKU: {product.sku}</span>
                )}
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-3xl font-bold text-brand-blue">
                  {fmtPrice(finalPrice)}
                </span>
                {product.oldPrice && (
                  <span className="text-base text-muted-foreground line-through">
                    {fmtPrice(product.oldPrice)}
                  </span>
                )}
                {variantPriceDelta !== 0 && (
                  <span className="text-xs text-muted-foreground">
                    Base {fmtPrice(product.price)} + {variantPriceDelta > 0 ? "" : "-"}{fmtPrice(Math.abs(variantPriceDelta))} variant
                  </span>
                )}
              </div>

              <div className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider w-fit mb-6 rounded-full ${meta.cls}`}>
                <StockIcon className="w-4 h-4" />
                {meta.label}
              </div>

              {/* Variant selectors */}
              {product.variants && product.variants.length > 0 && (
                <div className="space-y-4 mb-6">
                  {product.variants.map((variant) => (
                    <div key={variant.name}>
                      <h3 className="text-sm font-semibold mb-2">
                        {variant.name} <span className="text-muted-foreground font-normal">({selectedVariants[variant.name]?.label})</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {variant.options.map((opt) => {
                          const selected = selectedVariants[variant.name]?.label === opt.label;
                          return (
                            <button
                              key={opt.label}
                              type="button"
                              onClick={() => handleSelect(variant, opt)}
                              className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                                selected
                                  ? "bg-brand-blue text-white border-brand-blue"
                                  : "bg-white text-foreground border-border hover:border-brand-blue"
                              }`}
                            >
                              {opt.label}
                              {opt.price_delta ? (
                                <span className={`ml-1 text-xs ${selected ? "text-white/80" : "text-muted-foreground"}`}>
                                  {opt.price_delta > 0 ? "+" : ""}{fmtPrice(opt.price_delta)}
                                </span>
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-2 mb-6">
                {isOut ? (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-5 py-3.5 text-sm font-bold uppercase tracking-wide cursor-not-allowed rounded-xl"
                    >
                      <MessageCircle className="w-5 h-5" /> Currently Unavailable
                    </button>
                    <p className="text-xs text-muted-foreground text-center">
                      Out of stock — please check back soon or contact us for alternatives.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      Ordering from {branch.replace(" Branch", "")} Branch
                    </span>
                    <a
                      href={whatsappOrderLink(product, branch.replace(" Branch", ""), { variantLabel, finalPrice })}
                      onClick={gate(() => { void logOrder({ ...product, price: finalPrice }, branch); })}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-5 py-3.5 text-sm font-bold uppercase tracking-wide hover:bg-brand-blue transition-colors rounded-xl shadow-sm"
                    >
                      <MessageCircle className="w-5 h-5" /> Order on WhatsApp
                    </a>
                  </div>
                )}
                <p className="text-xs text-muted-foreground text-center">
                  Delivery across Mbabane, Manzini and Eswatini. Confirm stock & ETA on WhatsApp.
                </p>
              </div>

              {/* Trust icons */}
              <div className="grid grid-cols-3 gap-2 py-4 border-y border-border">
                <div className="flex flex-col items-center text-center gap-1">
                  <ShieldCheck className="w-5 h-5 text-brand-blue" />
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Truck className="w-5 h-5 text-brand-blue" />
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center gap-1">
                  <Package className="w-5 h-5 text-brand-blue" />
                  <span className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Genuine</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full sm:w-auto justify-start rounded-xl bg-muted/50">
                <TabsTrigger value="description" className="rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  Description
                </TabsTrigger>
                <TabsTrigger value="specs" className="rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  Specifications
                </TabsTrigger>
                <TabsTrigger value="warranty" className="rounded-lg text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  Warranty & Delivery
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-4">
                <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
                  <p className="text-sm sm:text-base leading-relaxed text-foreground">
                    {product.description || product.specs || "No detailed description available for this product."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="specs" className="mt-4">
                <div className="bg-white border border-border rounded-xl p-5 sm:p-6">
                  {attributes.length > 0 ? (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {attributes.map((attr, i) => (
                        <div key={`${attr.label}-${i}`} className="flex flex-col sm:flex-row sm:gap-3 border-b border-border pb-3 last:border-b-0">
                          <dt className="text-xs uppercase tracking-wide text-muted-foreground sm:w-32 shrink-0">{attr.label}</dt>
                          <dd className="text-sm font-medium text-foreground">{attr.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : (
                    <p className="text-sm text-muted-foreground">No specifications available.</p>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="warranty" className="mt-4">
                <div className="bg-white border border-border rounded-xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">Warranty</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.warranty || "Standard local warranty applies. Contact us for full terms and conditions."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">Delivery & Pickup</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {product.deliveryInfo || "Collection available from our Mbabane or Manzini branches. Nationwide delivery across Eswatini can be arranged on WhatsApp."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-brand-blue mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-sm">Need help?</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Message us on WhatsApp to confirm stock, ask questions or arrange a custom quote.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="font-display text-2xl font-bold uppercase tracking-tight mb-5">
                Related products
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border rounded-2xl overflow-hidden">
                {related.map((p: Product) => (
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
