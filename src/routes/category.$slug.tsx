import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, type Product } from "@/data/products";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  fetchProductsForStorefrontCategory,
  mergeProducts,
} from "@/lib/db-products";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.slug);

    if (!cat) throw notFound();

    const products = PRODUCTS.filter(
      (p) => p.categorySlug === params.slug
    );

    return { cat, products };
  },

  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.cat.label} — Brightman Services`,
          },
          {
            name: "description",
            content: loaderData.cat.description,
          },
          {
            property: "og:title",
            content: `${loaderData.cat.label} — Brightman Services`,
          },
          {
            property: "og:description",
            content: loaderData.cat.description,
          },
        ]
      : [{ title: "Category — Brightman Services" }],
  }),

  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-xl text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1d1d1f] mb-3">
            Category not found
          </h1>

          <p className="text-sm text-[#6e6e73] mb-6">
            The category you are looking for does not exist.
          </p>

          <Link
            to="/"
            className="
              inline-flex
              items-center
              justify-center
              bg-brand-blue
              text-white
              px-5
              py-2.5
              text-xs
              font-bold
              uppercase
              tracking-wide
              hover:bg-brand-blue-dark
              transition-colors
            "
          >
            Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  ),

  component: CategoryPage,
});

function CategoryPage() {
  const { cat, products: staticProducts } =
    Route.useLoaderData();

  const [products, setProducts] =
    useState<Product[]>(staticProducts);

  const [showCategories, setShowCategories] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    fetchProductsForStorefrontCategory(cat.slug).then(
      (dbProducts) => {
        if (cancelled) return;

        setProducts(
          mergeProducts(staticProducts, dbProducts)
        );
      }
    );

    return () => {
      cancelled = true;
    };
  }, [cat.slug, staticProducts]);

  // Group by subcategory.
  // DB rows carry the subcategory in the `category`
  // field after adaptation.
  const groups = products.reduce<
    Record<string, Product[]>
  >((acc, p) => {
    const key = p.category || "Other";

    (acc[key] ||= []).push(p);

    return acc;
  }, {});

  const groupKeys = Object.keys(groups);

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f7]">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* =====================================================
              COMPACT CATEGORY HEADER
          ====================================================== */}
          <div className="border-b border-[#d2d2d7] py-5 sm:py-6">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Briteman Services
                </p>

                <h1 className="mt-1 truncate font-display text-xl sm:text-2xl font-bold tracking-tight text-[#1d1d1f]">
                  {cat.label}
                </h1>

                <p className="mt-1 hidden max-w-2xl text-xs leading-relaxed text-[#6e6e73] sm:block">
                  {cat.description}
                </p>
              </div>

              {/* =================================================
                  ALL CATEGORIES BUTTON
              ================================================== */}
              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    setShowCategories((value) => !value)
                  }
                  aria-expanded={showCategories}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    border
                    border-[#d2d2d7]
                    bg-white
                    px-3
                    py-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.08em]
                    text-[#1d1d1f]
                    transition-colors
                    hover:border-brand-blue
                    hover:text-brand-blue
                  "
                >
                  All Categories

                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      showCategories
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* =================================================
                    CATEGORY MENU
                ================================================== */}
                {showCategories && (
                  <div
                    className="
                      absolute
                      right-0
                      top-full
                      z-40
                      mt-2
                      w-60
                      border
                      border-[#d2d2d7]
                      bg-white
                      shadow-[0_12px_30px_-15px_rgba(0,0,0,0.3)]
                    "
                  >
                    <div className="border-b border-[#e5e5e7] px-4 py-3">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-brand-blue">
                        Browse
                      </p>

                      <p className="mt-0.5 text-xs font-semibold text-[#1d1d1f]">
                        Shop by category
                      </p>
                    </div>

                    <ul>
                      {CATEGORIES.map((c) => (
                        <li key={c.slug}>
                          <Link
                            to="/category/$slug"
                            params={{ slug: c.slug }}
                            onClick={() =>
                              setShowCategories(false)
                            }
                            className="
                              flex
                              items-center
                              justify-between
                              border-b
                              border-[#e5e5e7]
                              px-4
                              py-2.5
                              text-xs
                              text-[#1d1d1f]
                              transition-colors
                              hover:bg-[#f5f5f7]
                              hover:text-brand-blue
                            "
                            activeProps={{
                              className:
                                "flex items-center justify-between border-b border-[#e5e5e7] px-4 py-2.5 text-xs bg-[#f5f5f7] text-brand-blue font-semibold",
                            }}
                          >
                            <span>{c.label}</span>

                            <ChevronRight className="h-3.5 w-3.5" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =====================================================
              PRODUCTS
          ====================================================== */}
          <div className="py-5 sm:py-6">
            {products.length === 0 ? (
              <div
                className="
                  border
                  border-[#d2d2d7]
                  bg-white
                  p-10
                  text-center
                "
              >
                <p className="text-sm text-[#6e6e73]">
                  No products available in this category yet.
                </p>

                <Link
                  to="/"
                  className="
                    inline-block
                    mt-4
                    bg-brand-blue
                    text-white
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    uppercase
                    tracking-wide
                    hover:bg-brand-blue-dark
                    transition-colors
                  "
                >
                  Browse all products
                </Link>
              </div>
            ) : groupKeys.length > 1 ? (
              <div className="space-y-7 sm:space-y-9">
                {groupKeys.map((key) => (
                  <section key={key}>
                    {/* Subcategory heading */}
                    <div className="mb-3 flex items-center justify-between border-b border-[#d2d2d7] pb-2">
                      <h2 className="font-display text-sm sm:text-base font-bold tracking-tight text-[#1d1d1f]">
                        {key}
                      </h2>

                      <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#86868b]">
                        {groups[key].length}{" "}
                        {groups[key].length === 1
                          ? "Product"
                          : "Products"}
                      </span>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                      {groups[key].map((p: Product) => (
                        <ProductCard
                          key={`${key}-${p.slug}`}
                          p={p}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {products.map((p: Product) => (
                  <ProductCard
                    key={p.slug}
                    p={p}
                  />
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