import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { PRODUCTS, type Product } from "@/data/products";
import { searchDbProducts } from "@/lib/db-products";

const currency = (n: number) => `E ${n.toLocaleString()}`;

function staticMatches(q: string): Product[] {
  const t = q.toLowerCase();
  return PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(t) ||
      p.specs.toLowerCase().includes(t) ||
      p.category.toLowerCase().includes(t),
  ).slice(0, 8);
}

export function SearchAutocomplete({
  variant = "desktop",
  onNavigate,
}: {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [dbResults, setDbResults] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) {
      setDbResults([]);
      return;
    }
    let cancelled = false;
    const id = setTimeout(() => {
      searchDbProducts(term).then((rows) => {
        if (!cancelled) setDbResults(rows);
      });
    }, 220);
    return () => {
      cancelled = true;
      clearTimeout(id);
    };
  }, [q]);

  const results = useMemo(() => {
    const term = q.trim();
    if (term.length < 2) return [];
    const seen = new Set<string>();
    return [...dbResults, ...staticMatches(term)]
      .filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)))
      .slice(0, 8);
  }, [q, dbResults]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const go = (p: Product) => {
    setOpen(false);
    setQ("");
    onNavigate?.();
    navigate({ to: "/product/$slug", params: { slug: p.slug } });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = results[active];
      if (pick) go(pick);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const isMobile = variant === "mobile";

  return (
    <div ref={boxRef} className="relative w-full">
      <div
        className={
          isMobile
            ? "flex w-full bg-white shadow-sm overflow-hidden rounded-full"
            : "flex w-full border-2 border-brand-blue rounded-full overflow-hidden bg-white"
        }
      >
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-controls="search-suggestions"
          aria-autocomplete="list"
          placeholder={isMobile ? "Search…" : "Search laptops, printers, accessories…"}
          className={
            isMobile
              ? "flex-1 px-4 py-2.5 outline-none text-sm text-foreground bg-white placeholder:text-muted-foreground"
              : "flex-1 px-4 py-2.5 outline-none text-sm bg-white"
          }
        />
        {q && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQ("");
              setOpen(false);
            }}
            className="px-2 text-muted-foreground hover:text-brand-red transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          aria-label="Search"
          onClick={() => results[0] && go(results[0])}
          className={
            isMobile
              ? "bg-brand-red px-4 hover:bg-brand-red-dark transition-colors text-white"
              : "bg-brand-blue text-white px-5 hover:bg-brand-red transition-colors"
          }
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {open && q.trim().length >= 2 && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full mt-2 z-50 bg-white text-foreground rounded-xl border border-border shadow-2xl overflow-hidden"
        >
          {results.length === 0 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground">No products found</div>
          ) : (
            results.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(p)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-b border-border last:border-b-0 transition-colors ${
                  i === active ? "bg-secondary" : "bg-white"
                }`}
              >
                <img
                  src={p.img}
                  alt=""
                  loading="lazy"
                  className="w-10 h-10 object-contain shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium truncate">{p.name}</span>
                  <span className="block text-[11px] text-muted-foreground truncate">
                    {p.category}
                  </span>
                </span>
                <span className="text-sm font-bold text-brand-blue shrink-0">
                  {currency(p.price)}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
