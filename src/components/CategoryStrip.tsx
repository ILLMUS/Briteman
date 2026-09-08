import { Link } from "@tanstack/react-router";
import { CatalogueDownloadButton } from "@/components/CatalogueDownloadButton";
import { PRODUCTS } from "@/data/products";
import pLaptop from "@/assets/p-laptop.jpg";
import pTablet from "@/assets/p-tablet.jpg";
import pMouse from "@/assets/p-mouse.jpg";
import pKeyboard from "@/assets/p-keyboard.jpg";
import pPrinter from "@/assets/p-printer.jpg";
import pSsd from "@/assets/p-ssd.jpg";
import pUps from "@/assets/p-ups.jpg";
import pConsole from "@/assets/p-console.jpg";
import pBag from "@/assets/p-bag.jpg";
import heroStore from "@/assets/hero-store.jpg";

const CATS: { img: string; label: string; slug: string }[] = [
  { img: pLaptop, label: "Laptops", slug: "laptops" },
  { img: heroStore, label: "Desktops", slug: "laptops" },
  { img: pTablet, label: "Tablets", slug: "tablets" },
  { img: pMouse, label: "Mice", slug: "peripherals" },
  { img: pKeyboard, label: "Keyboards", slug: "peripherals" },
  { img: pPrinter, label: "Printers", slug: "peripherals" },
  { img: pSsd, label: "Storage", slug: "storage" },
  { img: pUps, label: "UPS", slug: "power" },
  { img: pConsole, label: "Gaming", slug: "gaming" },
  { img: pBag, label: "Bags", slug: "accessories" },
];

export function CategoryStrip() {
  return (
    <section className="bg-secondary py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-end gap-4 flex-wrap mb-5">
          <CatalogueDownloadButton
            categoryLabel="Full Product"
            products={PRODUCTS}
            description="Complete product catalogue across all Briteman Services categories."
            className="border border-border"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
          {CATS.map(({ img, label, slug }) => (
            <Link
              key={label}
              to="/category/$slug"
              params={{ slug }}
              className="group overflow-hidden rounded-xl border border-border bg-background shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={img}
                  alt={`${label} category`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <span className="block border-t border-border px-2 py-2 text-center text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
