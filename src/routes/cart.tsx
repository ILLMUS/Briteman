import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  ArrowRight,
  ExternalLink,
  PackageCheck,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { fmtPrice } from "@/data/products";
import { useProductsBySlugs } from "@/hooks/useProductsBySlugs";
import {
  useCart,
  setCartQty,
  removeFromCart,
  clearCart,
} from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { useAuthGate } from "@/hooks/useAuthGate";
import { logOrder } from "@/lib/log-order";
import { WHATSAPP_LINK } from "@/lib/contact";

const STORE = {
  name: "Online Store",
  location: "Manzini",
};

export const Route = createFileRoute("/cart")({
  ssr: false,

  head: () => ({
    meta: [
      {
        title: "Shopping Cart | Online Store",
      },
      {
        name: "description",
        content:
          "Review your Online Store cart and send your order through WhatsApp.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
  }),

  component: CartPage,
});

function CartPage() {
  const navigate = useNavigate();

  const items = useCart();
  const { user, loading } = useAuth();
  const gate = useAuthGate();

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
          <div className="w-full max-w-md rounded-3xl border border-black/[0.07] bg-white p-8 text-center shadow-none">
            <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <ShoppingCart className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1f]">
              Sign in to view your cart
            </h1>

            <p className="mt-3 text-[13px] leading-6 text-[#6e6e73]">
              Please sign in or create an account to access your cart and
              continue with your order.
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
   * RESOLVE CART PRODUCTS
   * =============================================================
   */

  const resolved = useProductsBySlugs(
    items.map((item) => item.slug),
  );

  const rows = items
    .map((item) => {
      const product = resolved.find(
        (productItem) => productItem.slug === item.slug,
      );

      return product
        ? {
            p: product,
            qty: item.qty,
          }
        : null;
    })
    .filter(
      <T,>(item: T | null): item is T =>
        item !== null,
    );

  const total = rows.reduce(
    (sum, row) => sum + row.p.price * row.qty,
    0,
  );

  /*
   * =============================================================
   * WHATSAPP ORDER MESSAGE
   * =============================================================
   */

  const buildMessage = () => {
    const lines = rows.map(
      (row) =>
        `• ${row.p.name} × ${row.qty} — ${fmtPrice(
          row.p.price * row.qty,
        )}`,
    );

    return (
      `Hi ${STORE.name}, I'd like to order the following:\n\n` +
      lines.join("\n") +
      `\n\nTotal: ${fmtPrice(total)}` +
      `\n\nPreferred collection location: ${STORE.location}` +
      `\n\nCould you please confirm stock and the next steps for this order?`
    );
  };

  const waLink = WHATSAPP_LINK(buildMessage());

  /*
   * =============================================================
   * CHECKOUT
   * =============================================================
   */

  const handleCheckout = gate(() => {
    rows.forEach((row) => {
      void logOrder(
        row.p,
        STORE.location,
        row.qty,
      );
    });

    window.open(
      waLink,
      "_blank",
      "noopener,noreferrer",
    );

    toast.success("Opening WhatsApp…");
  });

  /*
   * =============================================================
   * PAGE
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
              <ShoppingCart
                className="h-6 w-6"
                strokeWidth={1.8}
              />
              Your Cart
            </h1>

            <p className="mt-2 text-[12px] text-[#86868b]">
              {rows.length} item
              {rows.length === 1 ? "" : "s"} · Collection in{" "}
              <span className="font-medium text-[#1d1d1f]">
                {STORE.location}
              </span>
            </p>
          </div>

          {rows.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.09] bg-white px-4 py-2.5 text-[11px] font-semibold text-[#6e6e73] transition-colors hover:border-black/[0.15] hover:bg-[#fafafa] hover:text-[#1d1d1f]"
            >
              <Trash2
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
              Clear Cart
            </button>
          )}
        </div>

        {/* Empty cart */}
        {rows.length === 0 ? (
          <div className="rounded-3xl border border-black/[0.07] bg-white px-6 py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7]">
              <ShoppingCart
                className="h-5 w-5 text-[#1d1d1f]"
                strokeWidth={1.8}
              />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-2 max-w-md text-[12px] leading-6 text-[#86868b]">
              Browse our electronics range and add products to your cart when
              you're ready to order.
            </p>

            <Link
              to="/shop"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-6 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
            >
              Browse Products
              <ArrowRight
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* Cart items */}
            <ul className="space-y-3 lg:col-span-2">
              {rows.map(({ p, qty }) => (
                <li
                  key={p.slug}
                  className="rounded-2xl border border-black/[0.07] bg-white p-3 transition-colors hover:border-black/[0.11] sm:p-4"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Product image */}
                    <Link
                      to="/product/$slug"
                      params={{
                        slug: p.slug,
                      }}
                      className="group shrink-0 overflow-hidden rounded-xl bg-[#f5f5f7]"
                    >
                      <img
                        src={p.img}
                        alt={p.name}
                        className="h-20 w-20 object-cover transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24"
                      />
                    </Link>

                    {/* Product information */}
                    <div className="min-w-0 flex-1">
                      <Link
                        to="/product/$slug"
                        params={{
                          slug: p.slug,
                        }}
                        className="line-clamp-2 text-[13px] font-semibold leading-[1.4] tracking-[-0.01em] text-[#1d1d1f] transition-colors hover:text-brand-blue sm:text-[14px]"
                      >
                        {p.name}
                      </Link>

                      <p className="mt-1 text-[11px] text-[#86868b]">
                        {fmtPrice(p.price)} each
                      </p>

                      {/* Quantity controls */}
                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-black/[0.09] bg-white">
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6e6e73] transition-colors hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                            onClick={() =>
                              setCartQty(
                                p.slug,
                                qty - 1,
                              )
                            }
                            aria-label="Decrease quantity"
                          >
                            <Minus
                              className="h-3.5 w-3.5"
                              strokeWidth={1.8}
                            />
                          </button>

                          <span className="w-7 text-center text-[11px] font-semibold text-[#1d1d1f]">
                            {qty}
                          </span>

                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[#6e6e73] transition-colors hover:bg-[#f5f5f7] hover:text-[#1d1d1f]"
                            onClick={() =>
                              setCartQty(
                                p.slug,
                                qty + 1,
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            <Plus
                              className="h-3.5 w-3.5"
                              strokeWidth={1.8}
                            />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(p.slug)
                          }
                          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#86868b] transition-colors hover:text-rose-600"
                        >
                          <Trash2
                            className="h-3.5 w-3.5"
                            strokeWidth={1.8}
                          />
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Line total */}
                    <div className="hidden shrink-0 text-right sm:block">
                      <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                        {fmtPrice(p.price * qty)}
                      </p>

                      <p className="mt-1 text-[9px] text-[#86868b]">
                        {qty} item{qty === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>

                  {/* Mobile line total */}
                  <div className="mt-3 flex items-center justify-between border-t border-black/[0.06] pt-3 sm:hidden">
                    <span className="text-[10px] text-[#86868b]">
                      Item total
                    </span>

                    <span className="text-[14px] font-semibold text-[#1d1d1f]">
                      {fmtPrice(p.price * qty)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Order summary */}
            <aside className="h-fit rounded-2xl border border-black/[0.07] bg-white p-5 lg:sticky lg:top-4">
              <div className="border-b border-black/[0.07] pb-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
                  Order Summary
                </div>

                <h2 className="mt-1 text-lg font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                  Your Order
                </h2>
              </div>

              <dl className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <dt className="text-[12px] text-[#86868b]">
                    Items
                  </dt>

                  <dd className="text-[12px] font-semibold text-[#1d1d1f]">
                    {rows.reduce(
                      (sum, row) =>
                        sum + row.qty,
                      0,
                    )}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-[12px] text-[#86868b]">
                    <MapPin
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                    Collection
                  </dt>

                  <dd className="text-right text-[12px] font-semibold text-[#1d1d1f]">
                    {STORE.location}
                  </dd>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <dt className="flex items-center gap-1.5 text-[12px] text-[#86868b]">
                    <PackageCheck
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />
                    Fulfilment
                  </dt>

                  <dd className="text-right text-[12px] font-semibold text-[#1d1d1f]">
                    Order & Collect
                  </dd>
                </div>

                <div className="mt-3 flex items-baseline justify-between border-t border-black/[0.07] pt-4">
                  <dt className="text-[13px] font-semibold text-[#1d1d1f]">
                    Total
                  </dt>

                  <dd className="text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                    {fmtPrice(total)}
                  </dd>
                </div>
              </dl>

              {/* WhatsApp checkout */}
              <button
                type="button"
                className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] px-4 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
                onClick={handleCheckout}
              >
                <MessageCircle
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Send Order on WhatsApp

                <ExternalLink
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />
              </button>

              <p className="mt-3 text-center text-[10px] leading-[1.6] text-[#86868b]">
                Your order will be opened in WhatsApp with the selected
                products and total pre-filled. Our team will confirm
                availability and the next steps.
              </p>

              <div className="mt-5 border-t border-black/[0.07] pt-4">
                <Link
                  to="/shipping"
                  className="flex items-center justify-center gap-1.5 text-[10px] font-medium text-brand-blue transition-colors hover:underline"
                >
                  View delivery & collection information
                  <ArrowRight
                    className="h-3 w-3"
                    strokeWidth={1.8}
                  />
                </Link>
              </div>
            </aside>
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}