import { Link } from "@tanstack/react-router";
import { Laptop, Monitor, Tablet, Mouse, Keyboard, Printer, HardDrive, Gamepad2, Backpack, Battery } from "lucide-react";

const CATS: { icon: typeof Laptop; label: string; slug: string }[] = [
  { icon: Laptop, label: "Laptops", slug: "laptops" },
  { icon: Monitor, label: "Desktops", slug: "laptops" },
  { icon: Tablet, label: "Tablets", slug: "tablets" },
  { icon: Mouse, label: "Mice", slug: "peripherals" },
  { icon: Keyboard, label: "Keyboards", slug: "peripherals" },
  { icon: Printer, label: "Printers", slug: "peripherals" },
  { icon: HardDrive, label: "Storage", slug: "storage" },
  { icon: Battery, label: "UPS", slug: "power" },
  { icon: Gamepad2, label: "Gaming", slug: "gaming" },
  { icon: Backpack, label: "Bags", slug: "accessories" },
];

export function CategoryStrip() {
  return (
    <section className="bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-display text-2xl font-bold mb-6 uppercase tracking-tight">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-border border border-border">
          {CATS.map(({ icon: Icon, label, slug }) => (
            <Link
              key={label}
              to="/category/$slug"
              params={{ slug }}
              className="group bg-white p-5 flex flex-col items-center justify-center gap-2 hover:bg-brand-blue transition-colors"
            >
              <Icon className="w-7 h-7 text-brand-blue group-hover:text-white transition-colors" />
              <span className="text-xs font-bold uppercase tracking-wide text-foreground group-hover:text-white">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
