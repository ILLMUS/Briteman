import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import {
  Heart,
  Trash2,
  ShoppingCart,
  PackageCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { fmtPrice } from "@/data/products";
import { useProductsBySlugs } from "@/hooks/useProductsBySlugs";
import {
  useFavorites,
  toggleFavorite,
  clearFavorites,
} from "@/hooks/useFavorites";
import { addToCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/favorites")({
  ssr: false,

  head: () => ({
    meta: [
      {
        title: "My Favourites | Online Store",
      },
      {
        name: "description",
        content:
          "View the products you have saved for later in your Online Store favourites.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
  }),

  component: FavoritesPage,
});

function FavoritesPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const favSlugs = useFavorites();
  const items = useProductsBySlugs(favSlugs);

  const isSignedIn = !!user;

  /*
   * =============================================================
   * AUTHENTICATION
   * =============================================================
   */

  if (!loading && !isSignedIn) {
    navigate({
      to: "/auth",
      search: {
        mode: "login",
      },
    });

    return (
      <div className="min-h-screen bg-[#f5f5f7]">
        <SiteHeader />

        <main className="mx-auto flex min-h-[60vh] max-w-6xl items-center justify-center px-4 py-12">
          <div className="w-full max-w-md rounded-3xl border border-black/[0.07] bg-white p-8 text-center">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <Heart
                className="h-5 w-5"
                strokeWidth={1.8}
              />
            </div>

            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
              Sign in to view your favourites
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-[#6e6e73]">
              Please sign in or create an account to save and manage your
              favourite products.
            </p>

            <Link
              to="/auth"
              search={{ mode: "login" }}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#1d1d1f] px-4 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
            >
              Sign In / Sign Up
            </Link>
          </div>
        </main>

        <SiteFooter />
      </div>
    );
  }

  /*
   * =============================================================
   * AUTHENTICATED FAVOURITES PAGE
   * =============================================================
   */

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <Toaster />

      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-black/[0.07] pb-5">
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="flex items-center gap-2 text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f]">
              <Heart
                className="h-6 w-6"
                strokeWidth={1.8}
              />
              Favourites
            </h1>

            <p className="mt-2 text-[12px] text-[#86868b]">
              {items.length} saved product
              {items.length === 1 ? "" : "s"}.
            </p>
          </div>

          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearFavorites();
                toast.success("Favourites cleared");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.09] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#6e6e73] transition-colors hover:border-black/[0.15] hover:bg-[#fafafa] hover:text-[#1d1d1f]"
            >
              <Trash2
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
              Clear All
            </button>
          )}
        </div>

        {/* Empty favourites */}
        {items.length === 0 ? (
          <div className="rounded-3xl border border-black/[0.07] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7]">
              <Heart
                className="h-5 w-5 text-[#1d1d1f]"
                strokeWidth={1.8}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
              No favourites yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-[#86868b]">
              Tap the heart on any product to save it here and come back to it
              later.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          /* Favourite products */
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => {
              const isOut = p.stock === "out";

              return (
                <li
                  key={p.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.11] hover:shadow-[0_18px_45px_-28px_rgba(0,0,0,0.3)]"
                >
                  {/* Product image */}
                  <Link
                    to="/product/$slug"
                    params={{
                      slug: p.slug,
                    }}
                    className="relative block aspect-square overflow-hidden bg-[#f5f5f7]"
                  >
                    <img
                      src={p.img}
                      alt={p.name}
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035] ${
                        isOut
                          ? "grayscale opacity-55"
                          : ""
                      }`}
                    />

                    <div className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.07] bg-white/90 text-[#1d1d1f] shadow-sm backdrop-blur-md">
                      <Heart
                        className="h-[17px] w-[17px] fill-current"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[9px] font-medium text-[#1d1d1f] shadow-sm backdrop-blur-md">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            p.stock === "in"
                              ? "bg-emerald-500"
                              : p.stock === "limited"
                                ? "animate-pulse bg-amber-500"
                                : "bg-neutral-400"
                          }`}
                        />

                        {p.stock === "in"
                          ? "In Stock"
                          : p.stock === "limited"
                            ? "Limited"
                            : "Out of Stock"}
                      </span>
                    </div>
                  </Link>

                  {/* Product information */}
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-[#86868b]">
                      {p.category}
                    </span>

                    <Link
                      to="/product/$slug"
                      params={{
                        slug: p.slug,
                      }}
                      className="block"
                    >
                      <h2 className="line-clamp-2 min-h-[40px] text-[14px] font-semibold leading-[1.35] tracking-[-0.01em] text-[#1d1d1f] transition-colors group-hover:text-brand-blue">
                        {p.name}
                      </h2>
                    </Link>

                    <p className="mt-2 line-clamp-2 min-h-[32px] text-[11px] leading-[1.5] text-[#86868b]">
                      {p.specs}
                    </p>

                    <div className="mt-4">
                      <p className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                        {fmtPrice(p.price)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="mt-auto flex gap-2 pt-5">
                      <button
                        type="button"
                        disabled={isOut}
                        onClick={() => {
                          if (isOut) return;

                          addToCart(p.slug, 1);

                          toast.success(
                            `${p.name} added to cart`,
                          );
                        }}
                        className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[11px] font-semibold transition-all duration-200 ${
                          isOut
                            ? "cursor-not-allowed bg-[#f5f5f7] text-[#86868b]"
                            : "bg-[#1d1d1f] text-white hover:bg-brand-blue active:scale-[0.98]"
                        }`}
                      >
                        {isOut ? (
                          <PackageCheck
                            className="h-3.5 w-3.5"
                            strokeWidth={1.8}
                          />
                        ) : (
                          <ShoppingCart
                            className="h-3.5 w-3.5"
                            strokeWidth={1.8}
                          />
                        )}

                        {isOut
                          ? "Out of Stock"
                          : "Add to Cart"}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          toggleFavorite(p.slug);

                          toast.success(
                            "Removed from favourites",
                          );
                        }}
                        title="Remove from favourites"
                        aria-label={`Remove ${p.name} from favourites`}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[0.09] bg-white text-[#1d1d1f] transition-all duration-200 hover:border-black/[0.15] hover:bg-[#f5f5f7] active:scale-95"
                      >
                        <Heart
                          className="h-[17px] w-[17px] fill-current"
                          strokeWidth={1.8}
                        />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}