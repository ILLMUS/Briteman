import { MessageCircle } from "lucide-react";
import { fmtPrice, whatsappOrderLink, type Product } from "@/data/products";

function badgeClass(b?: string) {
  if (b === "HOT") return "bg-brand-red text-white";
  if (b === "NEW") return "bg-brand-blue text-white";
  return "bg-foreground text-white";
}

export function ProductCard({ p }: { p: Product }) {
  return (
    <article className="group bg-white flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        {p.badge && (
          <span className={`absolute top-0 left-0 z-10 px-3 py-1 text-[10px] font-bold tracking-wider ${badgeClass(p.badge)}`}>
            {p.badge}
          </span>
        )}
        <span className="absolute top-0 right-0 z-10 px-2.5 py-1 text-[10px] font-semibold uppercase bg-white/90 text-brand-blue">
          {p.category}
        </span>
        <img
          src={p.img}
          alt={p.name}
          width={800}
          height={800}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1 border-t border-border">
        <h3 className="font-semibold text-sm leading-snug line-clamp-2 group-hover:text-brand-blue transition-colors">
          {p.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2">{p.specs}</p>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="font-display text-lg font-bold text-brand-blue">{fmtPrice(p.price)}</span>
          {p.oldPrice && (
            <span className="text-xs text-muted-foreground line-through">{fmtPrice(p.oldPrice)}</span>
          )}
        </div>
        <a
          href={whatsappOrderLink(p)}
          target="_blank"
          rel="noopener"
          className="mt-auto inline-flex items-center justify-center gap-2 bg-whatsapp text-white px-3 py-2.5 text-xs font-bold uppercase tracking-wide hover:bg-brand-blue transition-colors"
        >
          <MessageCircle className="w-4 h-4" /> Order on WhatsApp
        </a>
      </div>
    </article>
  );
}
