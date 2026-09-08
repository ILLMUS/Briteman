import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShoppingCart, Trash2, Plus, Minus, MessageCircle, MapPin, ArrowRight, ExternalLink,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { fmtPrice } from "@/data/products";
import { useProductsBySlugs } from "@/hooks/useProductsBySlugs";
import { useCart, setCartQty, removeFromCart, clearCart } from "@/hooks/useCart";
import { useBranch } from "@/hooks/useBranch";
import { useAuthGate } from "@/hooks/useAuthGate";
import { logOrder } from "@/lib/log-order";

export const Route = createFileRoute("/cart")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Cart — Briteman Services" },
      { name: "description", content: "Review your cart and send your order on WhatsApp." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart();
  const { name: branch } = useBranch();
  const gate = useAuthGate();

  const resolved = useProductsBySlugs(items.map((i) => i.slug));
  const rows = items
    .map((i) => {
      const p = resolved.find((pp) => pp.slug === i.slug);
      return p ? { p, qty: i.qty } : null;
    })
    .filter(<T,>(x: T | null): x is T => x !== null);

  const total = rows.reduce((s, r) => s + r.p.price * r.qty, 0);
  const branchShort = branch.replace(" Branch", "");

  const buildMessage = () => {
    const lines = rows.map(
      (r) => `• ${r.p.name} × ${r.qty} — ${fmtPrice(r.p.price * r.qty)}`,
    );
    return (
      `Hi Briteman Services (${branchShort}, Eswatini), I'd like to order the following:\n\n` +
      lines.join("\n") +
      `\n\nTotal: ${fmtPrice(total)}\n` +
      `Preferred pickup / delivery branch: ${branchShort}\n\n` +
      `Could you please confirm stock and delivery time for these items from the ${branchShort} branch?`
    );
  };

  const waLink = `https://wa.me/26876623733?text=${encodeURIComponent(buildMessage())}`;

  // An order is only created here — when the customer actually attempts to
  // order. Items sitting in the cart are never recorded as orders.
  const handleCheckout = gate(() => {
    rows.forEach((r) => {
      void logOrder(r.p, branch, r.qty);
    });
    window.open(waLink, "_blank", "noopener");
    toast.success("Opening WhatsApp…");
  });

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Toaster />
      <SiteHeader />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-blue flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" /> Your Cart
            </h1>
            <p className="text-sm text-muted-foreground">
              {rows.length} item{rows.length === 1 ? "" : "s"} · Branch: <span className="font-semibold">{branchShort}</span>
            </p>
          </div>
          {rows.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearCart();
                toast.success("Cart cleared");
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" /> Clear cart
            </Button>
          )}
        </div>

        {rows.length === 0 ? (
          <div className="bg-white border border-border rounded p-12 text-center">
            <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <h2 className="font-display text-xl font-bold mb-1">Your cart is empty</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Browse products and tap “Add to cart” to build your order.
            </p>
            <Button asChild>
              <Link to="/">Browse products <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            <ul className="lg:col-span-2 space-y-3">
              {rows.map(({ p, qty }) => (
                <li
                  key={p.slug}
                  className="bg-white border border-border p-3 flex gap-3 items-center"
                >
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="shrink-0"
                  >
                    <img src={p.img} alt={p.name} className="h-20 w-20 rounded object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="font-semibold text-sm leading-snug hover:text-brand-blue line-clamp-2"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{fmtPrice(p.price)} each</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="inline-flex items-center border border-border">
                        <button
                          className="p-1.5 hover:bg-muted"
                          onClick={() => setCartQty(p.slug, qty - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold w-8 text-center">{qty}</span>
                        <button
                          className="p-1.5 hover:bg-muted"
                          onClick={() => setCartQty(p.slug, qty + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(p.slug)}
                        className="text-xs text-muted-foreground hover:text-destructive inline-flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display font-bold text-brand-blue">
                      {fmtPrice(p.price * qty)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="bg-white border border-border p-5 h-fit sticky top-4 space-y-4">
              <h2 className="font-display text-lg font-bold">Order summary</h2>
              <dl className="text-sm space-y-1">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Items</dt>
                  <dd>{rows.reduce((s, r) => s + r.qty, 0)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" /> Branch
                  </dt>
                  <dd className="font-semibold">{branchShort}</dd>
                </div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between items-baseline">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-display text-xl font-bold text-brand-blue">
                    {fmtPrice(total)}
                  </dd>
                </div>
              </dl>
              <Button
                className="w-full bg-whatsapp hover:bg-whatsapp/90 text-white"
                onClick={handleCheckout}
              >
                <MessageCircle className="mr-1 h-4 w-4" />
                Send order on WhatsApp
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Button>
              <p className="text-[11px] text-muted-foreground text-center">
                We'll open a WhatsApp chat with all items pre-filled. Payment and delivery are arranged with the {branchShort} team.
              </p>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
