import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Heart,
  ShoppingCart,
  User,
  UserPlus,
  Package,
  Phone,
  Mail,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Shield,
  Laptop,
  Smartphone,
  Tv,
  Refrigerator,
  CookingPot,
  Printer,
  Headphones,
  Gamepad2,
  Camera,
  Cable,
  ArrowRight,
  Store,
  ShoppingBag,
} from "lucide-react";

import { isAdminEmail } from "@/lib/admin-config";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";

type NavItem = {
  label: string;
  slug: string;
};

type NavCat = {
  label: string;
  slug: string;
  items: NavItem[];
  icon: ReactNode;
};

/*
|--------------------------------------------------------------------------
| SHOP CATEGORIES
|--------------------------------------------------------------------------
*/

const NAV: NavCat[] = [
  {
    label: "Phones & Tablets",
    slug: "phones",
    icon: <Smartphone className="h-4 w-4" />,
    items: [
      { label: "Smartphones", slug: "phones" },
      { label: "Tablets", slug: "tablets" },
      { label: "Mobile Accessories", slug: "accessories" },
    ],
  },

  {
    label: "Computers",
    slug: "laptops",
    icon: <Laptop className="h-4 w-4" />,
    items: [
      { label: "Laptops", slug: "laptops" },
      { label: "MacBooks", slug: "laptops" },
      { label: "Desktop Computers", slug: "laptops" },
      { label: "Computer Accessories", slug: "peripherals" },
    ],
  },

  {
    label: "TV & Entertainment",
    slug: "tv-video",
    icon: <Tv className="h-4 w-4" />,
    items: [
      { label: "Televisions", slug: "tv-video" },
      { label: "Projectors", slug: "projectors" },
      { label: "Home Audio", slug: "speakers" },
      { label: "Gaming", slug: "gaming" },
    ],
  },

  {
    label: "Home Appliances",
    slug: "appliances",
    icon: <Refrigerator className="h-4 w-4" />,
    items: [
      { label: "Refrigerators & Freezers", slug: "appliances" },
      { label: "Stoves & Cookers", slug: "appliances" },
      { label: "Washing Machines", slug: "appliances" },
      { label: "Microwaves", slug: "appliances" },
    ],
  },

  {
    label: "Audio",
    slug: "audio",
    icon: <Headphones className="h-4 w-4" />,
    items: [
      { label: "Headphones", slug: "headphones" },
      { label: "Portable Speakers", slug: "speakers" },
      { label: "Audio Equipment", slug: "pro-audio" },
      { label: "Musical Instruments", slug: "pro-audio" },
    ],
  },

  {
    label: "Cameras",
    slug: "cameras",
    icon: <Camera className="h-4 w-4" />,
    items: [
      { label: "Digital Cameras", slug: "cameras" },
      { label: "Camera Accessories", slug: "accessories" },
      { label: "Memory Cards", slug: "storage" },
    ],
  },

  {
    label: "Office & Printing",
    slug: "peripherals",
    icon: <Printer className="h-4 w-4" />,
    items: [
      { label: "Printers", slug: "peripherals" },
      { label: "Printer Accessories", slug: "peripherals" },
      { label: "Storage", slug: "storage" },
      { label: "Office Accessories", slug: "accessories" },
    ],
  },

  {
    label: "Accessories",
    slug: "accessories",
    icon: <Cable className="h-4 w-4" />,
    items: [
      { label: "Chargers & Cables", slug: "accessories" },
      { label: "Laptop Bags", slug: "accessories" },
      { label: "Keyboards & Mouse", slug: "peripherals" },
      { label: "General Accessories", slug: "accessories" },
    ],
  },
];

/*
|--------------------------------------------------------------------------
| HEADER ACTION STYLES
|--------------------------------------------------------------------------
*/

const iconBtn =
  "relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white";

const badge =
  "absolute right-0 top-0 grid h-4 min-w-4 place-items-center rounded-full bg-brand-red px-1 text-[9px] font-bold text-white";

/*
|--------------------------------------------------------------------------
| LOGO
|--------------------------------------------------------------------------
*/

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Online Store home"
      className="group flex shrink-0 items-center gap-2.5"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-blue-light to-brand-blue-dark text-white transition-transform duration-200 group-hover:scale-105">
        <Store className="h-[17px] w-[17px]" />
      </span>

      <span className="font-display text-[17px] font-bold uppercase tracking-[0.02em] text-white sm:text-[19px]">
        Online
        <span className="text-brand-blue-light"> Store</span>
      </span>
    </Link>
  );
}

/*
|--------------------------------------------------------------------------
| HEADER
|--------------------------------------------------------------------------
*/

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const { user, signOut } = useAuth();

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const showShopping =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/orders");

  const favs = useFavorites();
  const cart = useCart();

  const favCount = favs.length;

  const cartCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0,
  );

  /*
  |--------------------------------------------------------------------------
  | PREVENT BACKGROUND SCROLL ON MOBILE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* =========================================================
          SERVICE BAR
      ========================================================= */}

      <div className="border-b border-white/[0.06] bg-black">
        <div className="mx-auto flex h-7 max-w-[1280px] items-center justify-between px-4 text-[10px] tracking-wide text-white/55 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-5 sm:flex">
            <a
              href="tel:+26876265725"
              className="flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <Phone className="h-3 w-3 text-brand-blue-light" />
              76265725 / 76427025
            </a>

            <a
              href="mailto:info@onlinestore.com"
              className="hidden items-center gap-1.5 transition-colors hover:text-white lg:flex"
            >
              <Mail className="h-3 w-3 text-brand-blue-light" />
              info@onlinestore.com
            </a>
          </div>

          <div className="mx-auto sm:mx-0">
            Shop online
            <span className="mx-2 text-white/20">•</span>
            Collect in-store
            <span className="mx-2 text-white/20">•</span>
            <span className="font-semibold text-brand-blue-light">
              Manzini
            </span>
          </div>
        </div>
      </div>

      {/* =========================================================
          MAIN HEADER
      ========================================================= */}

      <div className="border-b border-white/[0.08] bg-black">
        <div className="mx-auto flex h-[66px] max-w-[1280px] items-center gap-5 px-4 sm:px-6 lg:h-[70px] lg:px-8">
          {/* LOGO */}

          <Logo />

          {/* SEARCH */}

          <div className="hidden min-w-0 flex-1 md:block">
            <div className="mx-auto max-w-[650px]">
              <SearchAutocomplete />
            </div>
          </div>

          {/* ACTIONS */}

          <div className="ml-auto flex shrink-0 items-center gap-1">
            {/* ORDER ONLINE */}

            <Link
              to="/online-store"
              className="mr-1 hidden h-9 items-center gap-2 rounded-full bg-brand-blue px-4 text-[12px] font-semibold text-white transition-all hover:bg-brand-blue-light lg:inline-flex"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Order Online
            </Link>

            {/* FAVOURITES */}

            {showShopping && (
              <Link
                to="/favorites"
                aria-label="Favourites"
                title="Favourites"
                className={iconBtn}
              >
                <Heart
                  className={`h-[18px] w-[18px] ${
                    favCount > 0
                      ? "fill-brand-red text-brand-red"
                      : ""
                  }`}
                />

                {favCount > 0 && (
                  <span className={badge}>
                    {favCount}
                  </span>
                )}
              </Link>
            )}

            {/* CART */}

            {showShopping && (
              <Link
                to="/cart"
                aria-label="Shopping cart"
                title="Shopping cart"
                className={iconBtn}
              >
                <ShoppingCart className="h-[18px] w-[18px]" />

                {cartCount > 0 && (
                  <span className={badge}>
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* ACCOUNT */}

            <div className="hidden items-center gap-1 lg:flex">
              {user ? (
                <>
                  {isAdminEmail(user.email) && (
                    <Link
                      to="/admin"
                      aria-label="Admin"
                      title="Admin"
                      className={iconBtn}
                    >
                      <Shield className="h-[18px] w-[18px]" />
                    </Link>
                  )}

                  <Link
                    to="/orders"
                    aria-label="Orders"
                    title="Orders"
                    className={iconBtn}
                  >
                    <Package className="h-[18px] w-[18px]" />
                  </Link>

                  <span
                    title={user.email ?? ""}
                    className="ml-1 grid h-8 w-8 place-items-center rounded-full bg-brand-blue text-xs font-bold uppercase text-white"
                  >
                    {user.email?.[0] ?? "U"}
                  </span>

                  <button
                    type="button"
                    onClick={() => signOut()}
                    aria-label="Sign out"
                    title="Sign out"
                    className={iconBtn}
                  >
                    <LogOut className="h-[18px] w-[18px]" />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth"
                    search={{ mode: "login" }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium text-white/70 transition-colors hover:text-white"
                  >
                    <User className="h-3.5 w-3.5" />
                    Login
                  </Link>

                  <Link
                    to="/auth"
                    search={{ mode: "signup" }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-brand-blue px-4 text-[12px] font-semibold text-white transition-colors hover:bg-brand-blue-light"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    Register
                  </Link>
                </>
              )}
            </div>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={`${iconBtn} lg:hidden`}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
          DESKTOP CATEGORY NAVIGATION
      ========================================================= */}

      <nav className="hidden border-b border-neutral-200 bg-white lg:block">
        <div className="mx-auto flex h-[50px] max-w-[1280px] items-center px-4 sm:px-6 lg:px-8">
          {/* SHOP ALL */}

          <Link
            to="/"
            hash="products"
            className="mr-4 flex h-full items-center border-b-2 border-transparent px-2 text-[12px] font-semibold text-neutral-900 transition-colors hover:border-brand-blue hover:text-brand-blue"
          >
            Shop All
          </Link>

          {/* CATEGORY LIST */}

          <div className="flex h-full min-w-0 flex-1 items-center justify-between">
            {NAV.map((cat) => (
              <div
                key={cat.label}
                className="group relative h-full"
              >
                <Link
                  to="/category/$slug"
                  params={{ slug: cat.slug }}
                  className="flex h-full items-center gap-1.5 whitespace-nowrap border-b-2 border-transparent px-2 text-[11px] font-medium text-neutral-600 transition-colors hover:border-brand-blue hover:text-brand-blue"
                >
                  <span className="text-neutral-500 transition-colors group-hover:text-brand-blue">
                    {cat.icon}
                  </span>

                  <span>{cat.label}</span>

                  <ChevronDown className="h-3 w-3 opacity-35 transition-transform duration-200 group-hover:rotate-180" />
                </Link>

                {/* DROPDOWN */}

                <div className="pointer-events-none absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 opacity-0 transition-all duration-150 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className="w-[280px] overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.12)]">
                    {/* DROPDOWN HEADER */}

                    <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue">
                          {cat.icon}
                        </span>

                        <span className="text-sm font-semibold text-neutral-900">
                          {cat.label}
                        </span>
                      </div>

                      <ArrowRight className="h-4 w-4 text-neutral-300" />
                    </div>

                    {/* ITEMS */}

                    <ul className="p-2">
                      {cat.items.map((item) => (
                        <li key={item.label}>
                          <Link
                            to="/category/$slug"
                            params={{ slug: item.slug }}
                            className="group/item flex items-center justify-between rounded-lg px-3.5 py-3 text-[13px] text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-brand-blue"
                          >
                            <span>{item.label}</span>

                            <ArrowRight className="h-3.5 w-3.5 translate-x-[-3px] text-neutral-300 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:text-brand-blue group-hover/item:opacity-100" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================= */}

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* DRAWER */}

          <aside className="absolute right-0 top-0 flex h-full w-[92%] max-w-[390px] flex-col overflow-y-auto bg-black text-white shadow-2xl">
            {/* DRAWER HEADER */}

            <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-5">
              <Logo onClick={() => setOpen(false)} />

              <button
                type="button"
                onClick={() => setOpen(false)}
                className={iconBtn}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-7 px-5 py-6">
              {/* SEARCH */}

              <SearchAutocomplete
                variant="mobile"
                onNavigate={() => setOpen(false)}
              />

              {/* PRIMARY ACTION */}

              <Link
                to="/online-store"
                onClick={() => setOpen(false)}
                className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand-blue text-sm font-semibold text-white transition-colors hover:bg-brand-blue-light"
              >
                <ShoppingBag className="h-4 w-4" />
                Order Online
              </Link>

              {/* CATEGORIES */}

              <section>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
                  Shop by Category
                </div>

                <div className="divide-y divide-white/10 border-y border-white/10">
                  {NAV.map((cat) => {
                    const isOpen =
                      expanded === cat.label;

                    return (
                      <div key={cat.label}>
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded(
                              isOpen
                                ? null
                                : cat.label,
                            )
                          }
                          className="flex w-full items-center justify-between py-4 text-left"
                        >
                          <span className="flex items-center gap-3 text-sm font-medium">
                            <span className="text-brand-blue-light">
                              {cat.icon}
                            </span>

                            {cat.label}
                          </span>

                          <ChevronDown
                            className={`h-4 w-4 text-white/40 transition-transform ${
                              isOpen
                                ? "rotate-180"
                                : ""
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="pb-3 pl-8">
                            {cat.items.map((item) => (
                              <Link
                                key={item.label}
                                to="/category/$slug"
                                params={{
                                  slug: item.slug,
                                }}
                                onClick={() =>
                                  setOpen(false)
                                }
                                className="flex items-center justify-between py-2.5 text-[13px] text-white/60 transition-colors hover:text-white"
                              >
                                {item.label}

                                <ArrowRight className="h-3.5 w-3.5 text-white/30" />
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* SHOPPING */}

              {showShopping && (
                <section>
                  <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
                    Your Shopping
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/favorites"
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <Heart className="h-4 w-4" />

                      Favourites

                      {favCount > 0 && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-[9px] font-bold">
                          {favCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/cart"
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      <ShoppingCart className="h-4 w-4" />

                      Cart

                      {cartCount > 0 && (
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-[9px] font-bold">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </section>
              )}

              {/* ACCOUNT */}

              <section>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
                  Account
                </div>

                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/orders"
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <Package className="h-4 w-4" />
                      Orders
                    </Link>

                    {isAdminEmail(user.email) && (
                      <Link
                        to="/admin"
                        onClick={() => setOpen(false)}
                        className="flex h-11 items-center justify-center gap-2 rounded-full bg-brand-blue text-sm font-semibold text-white hover:bg-brand-blue-light"
                      >
                        <Shield className="h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/auth"
                      search={{ mode: "login" }}
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Login
                    </Link>

                    <Link
                      to="/auth"
                      search={{ mode: "signup" }}
                      onClick={() => setOpen(false)}
                      className="flex h-11 items-center justify-center gap-2 rounded-full bg-brand-blue text-sm font-semibold text-white hover:bg-brand-blue-light"
                    >
                      <UserPlus className="h-4 w-4" />
                      Register
                    </Link>
                  </div>
                )}
              </section>

              {/* CONTACT */}

              <div className="border-t border-white/10 pt-5">
                <div className="space-y-3 text-xs text-white/50">
                  <a
                    href="tel:+26876265725"
                    className="flex items-center gap-2.5 hover:text-white"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-blue-light" />
                    76265725 / 76427025
                  </a>

                  <a
                    href="mailto:info@onlinestore.com"
                    className="flex items-center gap-2.5 hover:text-white"
                  >
                    <Mail className="h-3.5 w-3.5 text-brand-blue-light" />
                    info@onlinestore.com
                  </a>

                  <div className="flex items-center gap-2.5">
                    <Store className="h-3.5 w-3.5 text-brand-blue-light" />
                    Manzini
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}