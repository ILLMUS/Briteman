import { MessageCircle, MapPin, Heart, ShoppingCart } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { fmtPrice, whatsappOrderLink, type Product } from "@/data/products";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch } from "@/hooks/useBranch";
import { logOrder } from "@/lib/log-order";
import { useFavorites, toggleFavorite } from "@/hooks/useFavorites";
import { addToCart } from "@/hooks/useCart";

function badgeClass(b?: string) {
  if (b === "HOT") return "bg-brand-red text-white";
  if (b === "NEW") return "bg-brand-blue text-white";
  return "bg-foreground text-white";
}

const stockStyles: Record<Product["stock"], string> = {
  in: "bg-whatsapp text-white",
  limited: "bg-brand-red text-white",
  out: "bg-foreground text-white",
};

const stockLabels: Record<Product["stock"], string> = {
  in: "In Stock",
  limited: "Limited Stock",
  out: "Out of Stock",
};

export function ProductCard({ p }: { p: Product }) {
  const gate = useAuthGate();
  const { name: branch } = useBranch();
  const favSlugs = useFavorites();
  const isFav = favSlugs.includes(p.slug);
  const isOut = p.stock === "out";
  return (
    <article className="group bg-white flex flex-col relative rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(16,24,64,0.35)]">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(p.slug);
          toast.success(isFav ? "Removed from favourites" : "Added to favourites");
        }}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
        className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-white/95 hover:bg-white shadow flex items-center justify-center transition-colors"
      >
        <Heart
          className={`w-4 h-4 ${isFav ? "fill-brand-red text-brand-red" : "text-foreground"}`}
        />
      </button>
      <Link
        to="/product/$slug"
        params={{ slug: p.slug }}
        className="relative aspect-square overflow-hidden bg-secondary block"
        aria-label={`View details for ${p.name}`}
      >
        {p.badge && (
          <span className={`absolute top-2 left-2 z-10 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider ${badgeClass(p.badge)}`}>
            {p.badge}
          </span>
        )}
        <span className="absolute top-2 right-12 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase bg-white/90 text-brand-blue">
          {p.category}
        </span>
        <span
          className={`absolute bottom-2 left-2 z-10 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${stockStyles[p.stock]}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full bg-white ${p.stock === "limited" ? "animate-pulse" : ""}`} />
          {stockLabels[p.stock]}
        </span>
        <img
          src={p.img}
          alt={p.name}
          width={800}
          height={800}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isOut ? "grayscale opacity-70" : ""}`}
        />
      </Link>
      <div className="p-3 sm:p-4 flex flex-col gap-1.5 flex-1 border-t border-border">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
          <h3 className="font-semibold text-[13px] sm:text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
            {p.name}
          </h3>
        </Link>
        <p className="text-[11px] text-muted-foreground line-clamp-2">{p.specs}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="font-display text-base sm:text-lg font-bold text-brand-blue">{fmtPrice(p.price)}</span>
          {p.oldPrice && (
            <span className="text-[11px] text-muted-foreground line-through">{fmtPrice(p.oldPrice)}</span>
          )}
        </div>
        {isOut ? (
          <div className="mt-auto pt-2.5 flex flex-col gap-1">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-muted text-muted-foreground px-3 py-2 text-[11px] font-bold uppercase tracking-wide cursor-not-allowed"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" /> Unavailable
            </button>
            <p className="text-[10px] text-muted-foreground text-center leading-tight">
              Back in stock soon — contact us for alternatives.
            </p>
          </div>
        ) : (
          <div className="mt-auto pt-2.5 flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
              <MapPin className="w-3 h-3 shrink-0" />
              {branch.replace(" Branch", "")}
            </span>
            <a
              href={whatsappOrderLink(p, branch.replace(" Branch", ""))}
              onClick={gate(() => { void logOrder(p, branch); })}
              target="_blank"
              rel="noopener"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-whatsapp text-white px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-all hover:bg-brand-blue active:scale-95 shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 shrink-0" /> Order
            </a>
            <button
              type="button"
              onClick={() => {
                addToCart(p.slug, 1);
                toast.success(`${p.name} added to cart`);
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-brand-blue/40 bg-white text-brand-blue px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-all hover:bg-brand-blue hover:text-white active:scale-95"
            >
              <ShoppingCart className="w-3.5 h-3.5 shrink-0" /> Add to cart
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
