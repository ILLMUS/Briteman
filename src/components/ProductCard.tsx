import { MessageCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { fmtPrice, whatsappOrderLink, type Product } from "@/data/products";

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
  const isOut = p.stock === "out";
  return (
    <article className="group bg-white flex flex-col">
      <Link
        to="/product/$slug"
        params={{ slug: p.slug }}
        className="relative aspect-square overflow-hidden bg-secondary block"
        aria-label={`View details for ${p.name}`}
      >
        {p.badge && (
          <span className={`absolute top-0 left-0 z-10 px-3 py-1 text-[10px] font-bold tracking-wider ${badgeClass(p.badge)}`}>
            {p.badge}
          </span>
        )}
        <span className="absolute top-0 right-0 z-10 px-2.5 py-1 text-[10px] font-semibold uppercase bg-white/90 text-brand-blue">
          {p.category}
        </span>
        <span
          className={`absolute bottom-0 left-0 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${stockStyles[p.stock]}`}
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
      <div className="p-4 flex flex-col gap-2 flex-1 border-t border-border">
        <Link to="/product/$slug" params={{ slug: p.slug }} className="block">
          <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
            {p.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground line-clamp-2">{p.specs}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-lg font-bold text-brand-blue">{fmtPrice(p.price)}</span>
          {p.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{fmtPrice(p.oldPrice)}</span>
          )}
        </div>
        {isOut ? (
          <div className="mt-auto flex flex-col gap-1">
            <button
              type="button"
              disabled
              aria-disabled="true"
              className="inline-flex items-center justify-center gap-2 bg-muted text-muted-foreground px-3 py-2.5 text-xs font-bold uppercase tracking-wide cursor-not-allowed"
            >
              <MessageCircle className="w-4 h-4" /> Currently Unavailable
            </button>
            <p className="text-[11px] text-muted-foreground text-center">
              Out of stock — please check back soon or contact us for alternatives.
            </p>
          </div>
        ) : (
          <a
            href={whatsappOrderLink(p)}
            target="_blank"
            rel="noopener"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-3 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-brand-blue transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Order on WhatsApp
          </a>
        )}
      </div>
    </article>
  );
}
