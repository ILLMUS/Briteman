import { useEffect, useMemo, useState, type ComponentType } from "react";
import {
  ChevronRight,
  Laptop,
  Smartphone,
  Tv,
  Refrigerator,
  Headphones,
  Camera,
  Printer,
  Cable,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import heroLaptop from "@/assets/hero-laptop.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";
import heroStore from "@/assets/hero-store.jpg";
import heroBag from "@/assets/p-bag.jpg";

import { PRODUCTS } from "@/data/products";

type Category = {
  name: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
  keywords: string[];
};

type BannerSlide = {
  image: string;
  title: string;
  subtitle: string;
  badge: string;
};

/*
|--------------------------------------------------------------------------
| SHOP DEPARTMENTS
|
| The keywords are used to find matching products from PRODUCTS.
|--------------------------------------------------------------------------
*/

const SIDEBAR_CATEGORIES: Category[] = [
  {
    name: "Phones & Tablets",
    href: "/category/phones",
    icon: Smartphone,
    keywords: [
      "phone",
      "smartphone",
      "iphone",
      "samsung",
      "galaxy",
      "tablet",
      "ipad",
      "mobile",
    ],
  },
  {
    name: "Computers",
    href: "/category/laptops",
    icon: Laptop,
    keywords: [
      "laptop",
      "computer",
      "desktop",
      "macbook",
      "notebook",
      "monitor",
      "pc",
    ],
  },
  {
    name: "TV & Entertainment",
    href: "/category/tv-video",
    icon: Tv,
    keywords: [
      "tv",
      "television",
      "smart tv",
      "projector",
      "decoder",
      "streaming",
      "gaming",
      "playstation",
      "xbox",
    ],
  },
  {
    name: "Home Appliances",
    href: "/category/appliances",
    icon: Refrigerator,
    keywords: [
      "fridge",
      "refrigerator",
      "freezer",
      "microwave",
      "stove",
      "cooker",
      "washing machine",
      "appliance",
      "oven",
    ],
  },
  {
    name: "Audio",
    href: "/category/audio",
    icon: Headphones,
    keywords: [
      "headphone",
      "earphone",
      "earbud",
      "speaker",
      "soundbar",
      "audio",
      "woofer",
      "microphone",
      "bluetooth speaker",
    ],
  },
  {
    name: "Cameras",
    href: "/category/cameras",
    icon: Camera,
    keywords: [
      "camera",
      "canon",
      "nikon",
      "sony camera",
      "lens",
      "drone",
      "gopro",
      "dslr",
      "mirrorless",
    ],
  },
  {
    name: "Office & Printing",
    href: "/category/peripherals",
    icon: Printer,
    keywords: [
      "printer",
      "scanner",
      "office",
      "ink",
      "toner",
      "printing",
      "projector",
      "copier",
    ],
  },
  {
    name: "Accessories",
    href: "/category/accessories",
    icon: Cable,
    keywords: [
      "charger",
      "cable",
      "keyboard",
      "mouse",
      "bag",
      "backpack",
      "adapter",
      "hub",
      "usb",
      "hdmi",
      "case",
      "accessory",
      "power bank",
      "memory card",
      "flash drive",
    ],
  },
];

/*
|--------------------------------------------------------------------------
| HERO SLIDES
|--------------------------------------------------------------------------
*/

const BANNER_SLIDES: BannerSlide[] = [
  {
    image: heroLaptop,
    title: "Computers & Laptops",
    subtitle:
      "Power your work, study, creativity and everyday computing with the right device.",
    badge: "Computing",
  },
  {
    image: heroMobile,
    title: "Phones & Tablets",
    subtitle:
      "Stay connected with smartphones, tablets and essential mobile accessories.",
    badge: "Mobile",
  },
  {
    image: heroStore,
    title: "Entertainment for Every Home",
    subtitle:
      "Explore televisions, audio, gaming and home entertainment technology.",
    badge: "Entertainment",
  },
  {
    image: heroBag,
    title: "Accessories & Everyday Essentials",
    subtitle:
      "Find chargers, cables, bags, peripherals and the accessories you need.",
    badge: "Essentials",
  },
];

/*
|--------------------------------------------------------------------------
| PRODUCT HELPERS
|--------------------------------------------------------------------------
|
| These helpers intentionally tolerate slightly different product
| structures so the menu can work with your existing catalogue.
|--------------------------------------------------------------------------
*/

type StoreProduct = {
  id?: string | number;
  name?: string;
  title?: string;
  image?: string;
  image_url?: string;
  price?: number | string;
  category?: string;
  description?: string;
};

function getProductName(product: StoreProduct) {
  return product.name || product.title || "Product";
}

function getProductImage(product: StoreProduct) {
  return (
    product.image ||
    product.image_url ||
    "/placeholder.svg"
  );
}

function getProductPrice(product: StoreProduct) {
  if (
    product.price === undefined ||
    product.price === null ||
    product.price === ""
  ) {
    return null;
  }

  const numericPrice = Number(product.price);

  if (Number.isNaN(numericPrice)) {
    return String(product.price);
  }

  return `E${numericPrice.toLocaleString("en-SZ")}`;
}

/*
|--------------------------------------------------------------------------
| FIND PRODUCTS FOR A DEPARTMENT
|--------------------------------------------------------------------------
*/

function getProductsForCategory(category: Category) {
  const products = PRODUCTS as StoreProduct[];

  const matchingProducts = products.filter((product) => {
    const searchableText = [
      product.name,
      product.title,
      product.category,
      product.description,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return category.keywords.some((keyword) =>
      searchableText.includes(keyword.toLowerCase()),
    );
  });

  return matchingProducts.slice(0, 6);
}

/*
|--------------------------------------------------------------------------
| HERO SLIDER
|--------------------------------------------------------------------------
*/

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  /*
  |--------------------------------------------------------------------------
  | ACTIVE HOVER CATEGORY
  |--------------------------------------------------------------------------
  */

  const [activeCategory, setActiveCategory] =
    useState<string | null>(null);

  /*
  |--------------------------------------------------------------------------
  | PREVENT MENU FROM CLOSING WHILE MOVING
  | BETWEEN CATEGORY AND PRODUCT PANEL
  |--------------------------------------------------------------------------
  */

  const [menuLocked, setMenuLocked] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | AUTO ROTATION
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide(
        (previous) =>
          (previous + 1) % BANNER_SLIDES.length,
      );
    }, 4500);

    return () => window.clearInterval(timer);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | ACTIVE CATEGORY
  |--------------------------------------------------------------------------
  */

  const activeCategoryData = useMemo(() => {
    if (!activeCategory) {
      return null;
    }

    return (
      SIDEBAR_CATEGORIES.find(
        (category) => category.name === activeCategory,
      ) || null
    );
  }, [activeCategory]);

  /*
  |--------------------------------------------------------------------------
  | PRODUCTS FOR ACTIVE CATEGORY
  |--------------------------------------------------------------------------
  */

  const activeProducts = useMemo(() => {
    if (!activeCategoryData) {
      return [];
    }

    return getProductsForCategory(activeCategoryData);
  }, [activeCategoryData]);

  const slide = BANNER_SLIDES[currentSlide];

  return (
    <section className="relative w-full border-b border-neutral-200 bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-[1280px] px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-4 lg:gap-5">

          {/* =====================================================
              LEFT: SHOP DEPARTMENTS
          ===================================================== */}

          <aside
            className="relative hidden overflow-visible rounded-xl border border-white/10 bg-neutral-900 lg:col-span-1 lg:block"
            onMouseEnter={() => setMenuLocked(true)}
            onMouseLeave={() => {
              setMenuLocked(false);
              setActiveCategory(null);
            }}
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3.5">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-blue-light">
                  Explore
                </p>

                <h2 className="mt-0.5 text-sm font-semibold text-white">
                  Shop Departments
                </h2>
              </div>

              <ShoppingBag className="h-4 w-4 text-white/30" />
            </div>

            {/* CATEGORY LIST */}

            <nav className="p-2">
              {SIDEBAR_CATEGORIES.map((category) => {
                const Icon = category.icon;

                const isActive =
                  activeCategory === category.name;

                return (
                  <a
                    key={category.name}
                    href={category.href}
                    onMouseEnter={() =>
                      setActiveCategory(category.name)
                    }
                    className={`group flex items-center justify-between rounded-lg px-3 py-3 text-xs font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-white/[0.08] text-white"
                        : "text-white/65 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-md transition-colors ${
                          isActive
                            ? "bg-brand-blue/20 text-brand-blue-light"
                            : "bg-white/[0.05] text-white/45 group-hover:bg-brand-blue/15 group-hover:text-brand-blue-light"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </span>

                      <span className="truncate">
                        {category.name}
                      </span>
                    </span>

                    <ChevronRight
                      className={`h-3.5 w-3.5 shrink-0 transition-all ${
                        isActive
                          ? "translate-x-0.5 text-brand-blue-light"
                          : "text-white/20 group-hover:translate-x-0.5 group-hover:text-brand-blue-light"
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* ===================================================
                PRODUCT HOVER PANEL
            =================================================== */}

            {activeCategoryData && (
              <div
                className="absolute left-[calc(100%+10px)] top-0 z-50 w-[620px] overflow-hidden rounded-xl border border-neutral-200 bg-white text-neutral-900 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
                onMouseEnter={() => {
                  setMenuLocked(true);
                }}
                onMouseLeave={() => {
                  setMenuLocked(false);
                  setActiveCategory(null);
                }}
              >
                {/* PANEL HEADER */}

                <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-brand-blue">
                      Department
                    </p>

                    <h3 className="mt-1 text-sm font-semibold text-neutral-900">
                      {activeCategoryData.name}
                    </h3>
                  </div>

                  <a
                    href={activeCategoryData.href}
                    className="group flex items-center gap-1.5 text-[11px] font-semibold text-neutral-500 transition-colors hover:text-brand-blue"
                  >
                    View all
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>

                {/* PRODUCTS */}

                <div className="p-4">
                  {activeProducts.length > 0 ? (
                    <div className="grid grid-cols-3 gap-3">
                      {activeProducts.map((product, index) => {
                        const productName =
                          getProductName(product);

                        const productImage =
                          getProductImage(product);

                        const productPrice =
                          getProductPrice(product);

                        return (
                          <a
                            key={
                              product.id ??
                              `${productName}-${index}`
                            }
                            href={
                              product.id
                                ? `/product/${product.id}`
                                : activeCategoryData.href
                            }
                            className="group overflow-hidden rounded-lg border border-neutral-100 bg-neutral-50 transition-all duration-200 hover:border-neutral-200 hover:bg-white hover:shadow-md"
                          >
                            {/* IMAGE */}

                            <div className="flex h-28 items-center justify-center overflow-hidden bg-white p-3">
                              <img
                                src={productImage}
                                alt={productName}
                                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            {/* DETAILS */}

                            <div className="border-t border-neutral-100 px-3 py-2.5">
                              <h4 className="line-clamp-2 text-[10px] font-medium leading-relaxed text-neutral-800">
                                {productName}
                              </h4>

                              {productPrice && (
                                <p className="mt-1.5 text-[11px] font-bold text-neutral-950">
                                  {productPrice}
                                </p>
                              )}
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : (
                    /* =================================================
                       EMPTY CATEGORY
                    ================================================= */

                    <div className="flex min-h-[190px] flex-col items-center justify-center text-center">
                      <div className="grid h-12 w-12 place-items-center rounded-full bg-neutral-100">
                        {activeCategoryData.icon && (
                          <activeCategoryData.icon className="h-5 w-5 text-neutral-400" />
                        )}
                      </div>

                      <p className="mt-3 text-xs font-semibold text-neutral-800">
                        Explore {activeCategoryData.name}
                      </p>

                      <p className="mt-1 max-w-xs text-[10px] leading-relaxed text-neutral-500">
                        Browse the full selection in this
                        department.
                      </p>

                      <a
                        href={activeCategoryData.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold text-brand-blue hover:underline"
                      >
                        View department
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>

                {/* FOOTER */}

                {activeProducts.length > 0 && (
                  <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-3">
                    <a
                      href={activeCategoryData.href}
                      className="group flex items-center justify-between text-[10px] font-semibold text-neutral-600 hover:text-brand-blue"
                    >
                      <span>
                        Browse all{" "}
                        {activeCategoryData.name}
                      </span>

                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </aside>

          {/* =====================================================
              RIGHT: HERO SLIDER
          ===================================================== */}

          <div className="lg:col-span-3">
            <div className="relative h-[330px] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-[0_12px_40px_rgba(0,0,0,0.25)] sm:h-[380px] lg:h-full lg:min-h-[420px]">

              {/* BACKGROUND IMAGE */}

              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
              />

              {/* IMAGE OVERLAY */}

              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* CONTENT */}

              <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-8 lg:p-10">
                <div className="max-w-xl">

                  <span className="inline-flex items-center rounded-full border border-brand-blue-light/30 bg-brand-blue/90 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-white shadow-lg backdrop-blur-sm">
                    {slide.badge}
                  </span>

                  <h1 className="mt-3 max-w-lg text-2xl font-bold leading-tight tracking-[-0.02em] text-white sm:text-3xl lg:text-4xl">
                    {slide.title}
                  </h1>

                  <p className="mt-2 max-w-md text-xs leading-relaxed text-white/70 sm:text-sm">
                    {slide.subtitle}
                  </p>

                  {/* SLIDE INDICATORS */}

                  <div className="mt-5 flex items-center gap-1.5">
                    {BANNER_SLIDES.map(
                      (banner, index) => (
                        <button
                          key={banner.title}
                          type="button"
                          onClick={() =>
                            setCurrentSlide(index)
                          }
                          aria-label={`Show ${banner.title}`}
                          aria-current={
                            index === currentSlide
                              ? "true"
                              : undefined
                          }
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            index === currentSlide
                              ? "w-8 bg-brand-blue-light"
                              : "w-1.5 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>
              </div>

              {/* SLIDE NUMBER */}

              <div className="absolute right-5 top-5 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-[9px] font-medium text-white/60 backdrop-blur-md sm:flex">
                <span className="text-white">
                  {String(currentSlide + 1).padStart(
                    2,
                    "0",
                  )}
                </span>

                <span className="text-white/25">
                  /
                </span>

                <span>
                  {String(
                    BANNER_SLIDES.length,
                  ).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}