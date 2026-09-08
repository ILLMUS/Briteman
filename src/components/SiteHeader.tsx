import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, ShoppingCart, User, UserPlus, Package, UserCircle, Phone, Mail, Menu, X, ChevronDown, LogOut, Shield, MapPin, Laptop, Zap, MousePointerClick, HardDrive, Gamepad2, Briefcase, ArrowRight, Store, Flame } from "lucide-react";
import { isAdminEmail } from "@/lib/admin-config";
import { useAuth } from "@/hooks/useAuth";
import { CONTACT } from "@/lib/contact";
import { useBranch, setBranch } from "@/hooks/useBranch";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import britemanLogo from "@/assets/briteman-logo.png";


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

const CAT_ICONS: Record<string, ReactNode> = {
  "Core Devices": <Laptop className="w-4 h-4" />,
  "Power & Infrastructure": <Zap className="w-4 h-4" />,
  Peripherals: <MousePointerClick className="w-4 h-4" />,
  Storage: <HardDrive className="w-4 h-4" />,
  "Consumer Electronics": <Gamepad2 className="w-4 h-4" />,
  Accessories: <Briefcase className="w-4 h-4" />,
};

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { user, signOut } = useAuth();
  const { name: activeBranch } = useBranch();

  // Shopping affordances belong to the storefront only — hide them on the
  // admin dashboard and order-management pages.
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const showShopping = !(pathname.startsWith("/admin") || pathname.startsWith("/orders"));

  const favs = useFavorites();
  const cart = useCart();
  const favCount = favs.length;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return (
    <header className="w-full border-b border-border">
      {/* Utility strip */}
      <div className="bg-brand-blue-dark text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 min-h-9 flex flex-wrap items-center justify-center gap-x-4 lg:justify-between">
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +268 7662 3733</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> ajapresd@gmail.com</span>
          </div>
          <div className="flex flex-1 lg:flex-none items-center justify-evenly lg:justify-end gap-2 lg:gap-4 lg:ml-auto">
            <span className="hidden md:inline">Free delivery within Mbabane on orders over E 7,500</span>
            <span className="text-brand-red font-semibold tracking-wide whitespace-nowrap">SAME-DAY DISPATCH</span>

            {/* Mobile quick actions */}
            <div className="flex lg:hidden flex-1 items-center justify-evenly gap-1 pl-2 border-l border-white/20">

              {showShopping && (
                <>
                  <Link to="/favorites" aria-label="Favourites" className="relative p-1.5 hover:text-brand-red transition-colors">
                    <Heart className={`w-4 h-4 ${favCount > 0 ? "fill-brand-red text-brand-red" : ""}`} />
                    {favCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-3.5 px-1 rounded-full bg-brand-red text-white text-[8px] font-bold flex items-center justify-center">
                        {favCount}
                      </span>
                    )}
                  </Link>
                  <Link to="/cart" aria-label="Cart" className="relative p-1.5 hover:text-brand-red transition-colors">
                    <ShoppingCart className="w-4 h-4" />
                    {cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-3.5 px-1 rounded-full bg-brand-red text-white text-[8px] font-bold flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                </>
              )}
              {user ? (
                <>
                  <Link to="/orders" aria-label="Orders" className="p-1.5 hover:text-brand-red transition-colors">
                    <Package className="w-4 h-4" />
                  </Link>
                  <button onClick={() => signOut()} aria-label="Sign out" className="p-1.5 hover:text-brand-red transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <Link to="/auth" search={{ mode: "login" }} aria-label="Login" className="p-1.5 hover:text-brand-red transition-colors">
                  <User className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Main header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6">
          {/* Logo — full reload on every click */}
          <a href="/" className="flex items-center gap-2 shrink-0" aria-label="Briteman Services home">
            <img
              src={britemanLogo}
              alt="Briteman Services logo"
              width={816}
              height={816}
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <SearchAutocomplete />
          </div>


          {/* Branch / location swap */}
          <div className="ml-auto lg:ml-0 flex items-center border-2 border-brand-blue rounded-full overflow-hidden shrink-0" role="group" aria-label="Choose branch">
            <span className="hidden sm:flex items-center gap-1 px-2 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wide h-full py-2.5">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            {CONTACT.locations.map((loc) => {
              const label = loc.name.replace(" Branch", "");
              const isActive = activeBranch === loc.name;
              return (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => setBranch(loc.name)}
                  aria-pressed={isActive}
                  title={`Switch to ${loc.name} — order buttons will use this branch`}
                  className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                    isActive
                      ? "bg-brand-red text-white"
                      : "bg-white text-brand-blue hover:bg-secondary"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Icons */}
          <nav className="hidden lg:flex items-center gap-1 text-[11px] uppercase tracking-wide font-semibold">
            {showShopping && (
              <>
                <Link to="/favorites" className="group relative flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <Heart className={`w-5 h-5 group-hover:text-brand-red ${favCount > 0 ? "fill-brand-red text-brand-red" : ""}`} />
                  <span>Favourite</span>
                  {favCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-brand-red text-white text-[9px] font-bold flex items-center justify-center">
                      {favCount}
                    </span>
                  )}
                </Link>
                <Link to="/cart" className="group relative flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <ShoppingCart className="w-5 h-5 group-hover:text-brand-red" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-brand-red text-white text-[9px] font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </>
            )}
            {user ? (
              <>
                {isAdminEmail(user.email) && (
                  <Link
                    to="/admin"
                    activeProps={{ className: "bg-brand-red-dark !text-white !border-brand-red-dark" }}
                    className="group flex flex-col items-center gap-0.5 px-3 py-2 bg-brand-red text-white border-b-2 border-brand-red hover:bg-brand-red-dark hover:border-brand-red-dark transition-colors shadow-sm"
                  >
                    <Shield className="w-5 h-5" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  to="/orders"
                  activeProps={{ className: "!text-brand-red !border-brand-red" }}
                  className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red"
                >
                  <Package className="w-5 h-5 group-hover:text-brand-red" />
                  <span>Orders</span>
                </Link>
                <a href="#" className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <UserCircle className="w-5 h-5 group-hover:text-brand-red" />
                  <span className="max-w-[80px] truncate normal-case tracking-normal">{user.email}</span>
                </a>
                <button onClick={() => signOut()} className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <LogOut className="w-5 h-5 group-hover:text-brand-red" />
                  <span>Sign out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" search={{ mode: "login" }} className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <User className="w-5 h-5 group-hover:text-brand-red" />
                  <span>Login</span>
                </Link>
                <Link to="/auth" search={{ mode: "signup" }} className="group flex flex-col items-center gap-0.5 px-3 py-2 text-foreground hover:text-brand-red transition-colors border-b-2 border-transparent hover:border-brand-red">
                  <UserPlus className="w-5 h-5 group-hover:text-brand-red" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </nav>

          <button onClick={() => setOpen(!open)} className="lg:hidden ml-auto p-2 text-brand-blue">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Desktop mega nav */}
      <div className="hidden lg:block bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex items-center gap-1">
            {NAV.map((cat) => (
              <li key={cat.label} className="group relative">
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="h-11 px-4 text-[13px] font-medium text-foreground/90 flex items-center gap-1 rounded-md hover:bg-secondary hover:text-primary transition-colors"
                >
                  {cat.label}
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
                <div className="absolute left-0 top-full z-30 hidden group-hover:block bg-card text-card-foreground min-w-56 rounded-xl shadow-xl border border-border overflow-hidden mt-1">
                  <ul className="py-1.5">
                    {cat.items.map((it) => (
                      <li key={it.label}>
                        <Link
                          to="/category/$slug"
                          params={{ slug: it.slug }}
                          className="block px-4 py-2 text-[13px] text-foreground/80 hover:text-primary hover:bg-secondary/50 transition-colors"
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
              <Link
                to="/deals"
                className="inline-flex items-center gap-1.5 h-8 px-3 text-xs font-semibold uppercase tracking-wide rounded-full bg-destructive text-destructive-foreground hover:bg-brand-red-dark transition-colors"
              >
                <Flame className="w-3.5 h-3.5" />
                Hot Deals
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border pb-5">
          {/* Search */}
          <div className="px-4 py-3 border-b border-border">
            <SearchAutocomplete variant="mobile" onNavigate={() => setOpen(false)} />
          </div>

          {/* Shop all + Hot Deals CTAs */}
          <div className="px-4 pt-4 grid grid-cols-2 gap-2.5">
            <Link
              to="/category/$slug"
              params={{ slug: "laptops" }}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                Shop All
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/deals"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between gap-2 w-full px-4 py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm shadow-sm hover:bg-brand-red-dark transition-colors"
            >
              <span className="flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Hot Deals
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category accordions */}
          <div className="px-4 pt-4 space-y-2">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Categories
            </h3>
            {NAV.map((cat) => {
              const isOpen = expanded === cat.label;
              return (
                <div key={cat.label} className="rounded-xl border border-border bg-card overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setExpanded(isOpen ? null : cat.label)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left"
                  >
                    <span className="flex items-center gap-2.5 text-sm font-semibold text-foreground">
                      <span className="text-primary">{CAT_ICONS[cat.label]}</span>
                      {cat.label}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-border bg-background/50">
                      <ul className="py-1">
                        {cat.items.map((it) => (
                          <li key={it.label}>
                            <Link
                              to="/category/$slug"
                              params={{ slug: it.slug }}
                              onClick={() => setOpen(false)}
                              className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary/60 transition-colors"
                            >
                              {it.label}
                              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Company pages */}
          <div className="px-4 pt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Company
            </h3>
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              {([
                { to: "/about", label: "About" },
                { to: "/services", label: "What We Do" },
                
                { to: "/why-briteman", label: "Why Briteman" },
                { to: "/culture", label: "Our Culture" },
                { to: "/in-store", label: "In-Store Experience" },
                { to: "/online-store", label: "Online Store" },
                { to: "/after-sales", label: "After-Sales" },
                { to: "/contact", label: "Contact Us" },
              ] as const).map((i, idx, arr) => (
                <Link
                  key={i.to}
                  to={i.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-secondary/60 transition-colors ${idx !== arr.length - 1 ? "border-b border-border" : ""}`}
                >
                  {i.label}
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Admin / Auth */}
          {(!user || isAdminEmail(user.email)) && (
            <div className="px-4 pt-4">
              {user ? (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-destructive text-destructive-foreground font-semibold text-sm hover:bg-destructive/90 transition-colors"
                >
                  <Shield className="w-4 h-4" />
                  Admin Dashboard
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/auth"
                    search={{ mode: "login" }}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-sm hover:bg-secondary transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    search={{ mode: "signup" }}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
