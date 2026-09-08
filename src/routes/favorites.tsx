import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Trash2, ShoppingCart, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { fmtPrice } from "@/data/products";
import { useProductsBySlugs } from "@/hooks/useProductsBySlugs";
import { useFavorites, toggleFavorite, clearFavorites } from "@/hooks/useFavorites";
import { addToCart } from "@/hooks/useCart";

export const Route = createFileRoute("/favorites")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Favourites — Briteman Services" },
      { name: "description", content: "Products you have saved for later." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favSlugs = useFavorites();
  const items = useProductsBySlugs(favSlugs);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Toaster />
      <SiteHeader />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        <div className="mb-6 flex items-end justify-between gap-3 flex-wrap">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-blue flex items-center gap-2">
              <Heart className="h-6 w-6 fill-brand-red text-brand-red" /> Favourites
            </h1>
            <p className="text-sm text-muted-foreground">
              {items.length} saved product{items.length === 1 ? "" : "s"}.
            </p>
          </div>
          {items.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                clearFavorites();
                toast.success("Favourites cleared");
              }}
            >
              <Trash2 className="mr-1 h-4 w-4" /> Clear all
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-border rounded p-12 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
            <h2 className="font-display text-xl font-bold mb-1">No favourites yet</h2>
            <p className="text-sm text-muted-foreground mb-5">
              Tap the heart on any product to save it here.
            </p>
            <Button asChild>
              <Link to="/">Browse products</Link>
            </Button>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <li key={p.slug} className="bg-white border border-border flex flex-col">
                <Link
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="aspect-square block overflow-hidden bg-secondary"
                >
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </Link>
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <Link
                    to="/product/$slug"
                    params={{ slug: p.slug }}
                    className="font-semibold text-sm leading-snug line-clamp-2 hover:text-brand-blue"
                  >
                    {p.name}
                  </Link>
                  <p className="text-xs text-muted-foreground line-clamp-2">{p.specs}</p>
                  <p className="font-display text-lg font-bold text-brand-blue mt-1">
                    {fmtPrice(p.price)}
                  </p>
                  <div className="mt-auto flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1"
                      disabled={p.stock === "out"}
                      onClick={() => {
                        addToCart(p.slug, 1);
                        toast.success(`${p.name} added to cart`);
                      }}
                    >
                      <ShoppingCart className="mr-1 h-4 w-4" /> Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        toggleFavorite(p.slug);
                        toast.success("Removed from favourites");
                      }}
                      title="Remove from favourites"
                    >
                      <Heart className="h-4 w-4 fill-brand-red text-brand-red" />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
