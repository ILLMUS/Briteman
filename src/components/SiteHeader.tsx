import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, User, UserPlus, Package, UserCircle, Phone, Mail, Menu, X, Search, ChevronDown } from "lucide-react";

type NavItem = { label: string; slug: string };
type NavCat = { label: string; slug: string; items: NavItem[] };

const NAV: NavCat[] = [
  {
    label: "Core Devices",
    slug: "laptops",
    items: [
      { label: "Laptops", slug: "laptops" },
      { label: "MacBooks", slug: "laptops" },
      { label: "Desktop Computers", slug: "laptops" },
      { label: "Tablets", slug: "tablets" },
    ],
  },
  {
    label: "Power & Infrastructure",
    slug: "power",
    items: [
      { label: "Laptop Chargers", slug: "power" },
      { label: "UPS Systems", slug: "power" },
    ],
  },
  {
    label: "Peripherals",
    slug: "peripherals",
    items: [
      { label: "Mouse", slug: "peripherals" },
      { label: "Keyboards", slug: "peripherals" },
      { label: "Printers", slug: "peripherals" },
    ],
  },
  {
    label: "Storage",
    slug: "storage",
    items: [
      { label: "Hard Drives", slug: "storage" },
      { label: "Flash Drives", slug: "storage" },
    ],
  },
  {
    label: "Consumer Electronics",
    slug: "gaming",
    items: [{ label: "Kids Gaming Consoles", slug: "gaming" }],
  },
  {
    label: "Accessories",
    slug: "accessories",
    items: [
      { label: "Laptop Bags", slug: "accessories" },
      { label: "Laptop Stickers", slug: "accessories" },
      { label: "General Accessories", slug: "accessories" },
    ],
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full border-b border-border no-radius">
      {/* Utility strip */}
      <div className="bg-brand-blue-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +268 7800 0000</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> sales@brightman.co.sz</span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden md:inline">Free delivery within Mbabane on orders over E 7,500</span>
            <span className="text-brand-red font-semibold tracking-wide">SAME-DAY DISPATCH</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-brand-blue flex items-center justify-center">
                <span className="font-display text-white text-2xl font-bold leading-none">B</span>
              </div>
              <div className="w-3 h-10 bg-brand-red" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl font-bold text-brand-blue tracking-tight">BRIGHTMAN</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Services Ltd</div>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full border-2 border-brand-blue no-radius">
              <input
                placeholder="Search laptops, printers, accessories…"
                className="flex-1 px-4 py-2.5 outline-none text-sm bg-white"
              />
              <button className="bg-brand-blue text-white px-5 hover:bg-brand-red transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Icons */}
          <nav className="ml-auto hidden lg:flex items-center gap-1 text-[11px] uppercase tracking-wide font-semibold">
            {[
              { icon: Heart, label: "Favourite" },
              { icon: ShoppingCart, label: "Cart" },
              { icon: User, label: "Login" },
              { icon: UserPlus, label: "Register" },
              { icon: Package, label: "Orders" },
              { icon: UserCircle, label: "My Account" },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red"
              >
                <Icon className="w-5 h-5 group-hover:text-brand-red" />
                <span>{label}</span>
              </a>
            ))}
          </nav>

          <button onClick={() => setOpen(!open)} className="lg:hidden ml-auto p-2 text-brand-blue">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega nav */}
      <div className="hidden lg:block bg-brand-blue text-white">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-stretch">
            {NAV.map((cat) => (
              <li key={cat.label} className="group relative">
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="h-12 px-5 text-sm font-semibold uppercase tracking-wide flex items-center gap-1.5 hover:bg-brand-red transition-colors"
                >
                  {cat.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </Link>
                <div className="absolute left-0 top-full z-30 hidden group-hover:block bg-white text-foreground min-w-56 shadow-2xl border-t-2 border-brand-red">
                  <ul>
                    {cat.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          to="/category/$slug"
                          params={{ slug: it.slug }}
                          className="block px-5 py-2.5 text-sm hover:bg-brand-blue hover:text-white transition-colors border-b border-border last:border-b-0"
                        >
                          {it.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="ml-auto">
              <a href="#" className="h-12 px-5 flex items-center text-sm font-bold uppercase bg-brand-red hover:bg-brand-red-dark transition-colors">
                Hot Deals
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brand-blue text-white">
          <div className="px-4 py-3 flex border-b border-white/20">
            <div className="flex w-full border border-white/30">
              <input placeholder="Search…" className="flex-1 bg-transparent px-3 py-2 outline-none text-sm placeholder:text-white/60" />
              <button className="bg-brand-red px-4"><Search className="w-4 h-4" /></button>
            </div>
          </div>
          <ul className="divide-y divide-white/10">
            {NAV.map((cat) => (
              <li key={cat.label} className="px-4 py-3">
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  onClick={() => setOpen(false)}
                  className="font-semibold text-sm uppercase tracking-wide mb-2 block"
                >
                  {cat.label}
                </Link>
                <div className="grid grid-cols-2 gap-1 text-xs text-white/85">
                  {cat.items.map((it) => (
                    <Link
                      key={it.label}
                      to="/category/$slug"
                      params={{ slug: it.slug }}
                      onClick={() => setOpen(false)}
                      className="py-1 hover:text-brand-red"
                    >
                      {it.label}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-3 gap-px bg-white/10">
            {["Login", "Register", "My Account", "Orders", "Cart", "Favourites"].map((l) => (
              <a key={l} href="#" className="bg-brand-blue py-3 text-center text-xs font-semibold uppercase hover:bg-brand-red">{l}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
