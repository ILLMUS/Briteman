import { Link } from "@tanstack/react-router";
import { PRODUCTS } from "@/data/products";

import pLaptop from "@/assets/p-laptop.jpg";
import pTablet from "@/assets/p-tablet.jpg";
import pMouse from "@/assets/p-mouse.jpg";
import pPrinter from "@/assets/p-printer.jpg";
import pBag from "@/assets/p-bag.jpg";

interface CategoryConfig {
  label: string;
  slug: string;
  img: string;
  match: (p: { category?: string; name?: string }) => boolean;
}

const CAT_CONFIGS: CategoryConfig[] = [
  {
    label: "Televisions",
    slug: "tv-video",
    img: pLaptop,
    match: (p) =>
      p.category?.toLowerCase().includes("tv") ||
      p.name?.toLowerCase().includes("tv") ||
      p.name?.toLowerCase().includes("television"),
  },
  {
    label: "Projectors",
    slug: "projectors",
    img: pPrinter,
    match: (p) =>
      p.category?.toLowerCase().includes("projector") ||
      p.name?.toLowerCase().includes("projector"),
  },
  {
    label: "Laptops & Computers",
    slug: "computers",
    img: pLaptop,
    match: (p) =>
      p.category?.toLowerCase().includes("computer") ||
      p.category?.toLowerCase().includes("laptop") ||
      p.name?.toLowerCase().includes("laptop"),
  },
  {
    label: "Tablets",
    slug: "tablets",
    img: pTablet,
    match: (p) =>
      p.category?.toLowerCase().includes("tablet") ||
      p.name?.toLowerCase().includes("tablet"),
  },
  {
    label: "Smartphones",
    slug: "phones",
    img: pTablet,
    match: (p) =>
      p.category?.toLowerCase().includes("phone") ||
      p.category?.toLowerCase().includes("smartphone") ||
      p.name?.toLowerCase().includes("phone"),
  },
  {
    label: "Printers",
    slug: "printers",
    img: pPrinter,
    match: (p) =>
      p.category?.toLowerCase().includes("printer") ||
      p.name?.toLowerCase().includes("printer"),
  },
  {
    label: "Headphones",
    slug: "headphones",
    img: pMouse,
    match: (p) =>
      p.category?.toLowerCase().includes("headphone") ||
      p.name?.toLowerCase().includes("headphone"),
  },
  {
    label: "Portable Speakers",
    slug: "speakers",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("speaker") ||
      p.name?.toLowerCase().includes("speaker"),
  },
  {
    label: "MP3 / MP4 Players",
    slug: "audio",
    img: pTablet,
    match: (p) =>
      p.category?.toLowerCase().includes("audio") ||
      p.name?.toLowerCase().includes("mp3") ||
      p.name?.toLowerCase().includes("mp4") ||
      p.name?.toLowerCase().includes("player"),
  },
  {
    label: "Digital Cameras",
    slug: "cameras",
    img: pLaptop,
    match: (p) =>
      p.category?.toLowerCase().includes("camera") ||
      p.name?.toLowerCase().includes("camera"),
  },
  {
    label: "Pro Audio & Musical Instruments",
    slug: "pro-audio",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("pro-audio") ||
      p.name?.toLowerCase().includes("musical") ||
      p.name?.toLowerCase().includes("instrument"),
  },
  {
    label: "Refrigerators & Freezers",
    slug: "refrigerators",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("refrigerator") ||
      p.category?.toLowerCase().includes("freezer") ||
      p.name?.toLowerCase().includes("fridge") ||
      p.name?.toLowerCase().includes("freezer"),
  },
  {
    label: "Stoves & Cookers",
    slug: "stoves",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("stove") ||
      p.category?.toLowerCase().includes("cooker") ||
      p.name?.toLowerCase().includes("stove") ||
      p.name?.toLowerCase().includes("cooker"),
  },
  {
    label: "Washing Machines",
    slug: "washing-machines",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("washing") ||
      p.name?.toLowerCase().includes("washing machine"),
  },
  {
    label: "Microwaves",
    slug: "microwaves",
    img: pBag,
    match: (p) =>
      p.category?.toLowerCase().includes("microwave") ||
      p.name?.toLowerCase().includes("microwave"),
  },
  {
    label: "Computer Accessories",
    slug: "accessories",
    img: pMouse,
    match: (p) =>
      p.category?.toLowerCase().includes("accessor") ||
      p.name?.toLowerCase().includes("mouse") ||
      p.name?.toLowerCase().includes("keyboard"),
  },
];

export function CategoryStrip() {
  const categoriesWithCounts = CAT_CONFIGS.map((cat) => {
    const count = PRODUCTS.filter(cat.match).length;

    return {
      ...cat,
      count: `${count} ${count === 1 ? "Item" : "Items"}`,
    };
  });

  return (
    <section className="border-y border-black/[0.07] bg-white py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-[17px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
            Browse Our Categories
          </h2>

          <p className="mt-1.5 text-[12px] leading-relaxed text-[#86868b]">
            Explore electronics, appliances and accessories.
          </p>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] sm:grid-cols-2 lg:grid-cols-4">
          {categoriesWithCounts.map(({ img, label, slug, count }) => (
            <Link
              key={label}
              to="/category/$slug"
              params={{ slug }}
              className="group flex items-center gap-4 bg-white p-4 transition-colors duration-200 hover:bg-[#fafafa] sm:p-5"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-black/[0.05] bg-[#f5f5f7] p-1.5">
                <img
                  src={img}
                  alt={label}
                  loading="lazy"
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[13px] font-medium leading-[1.35] tracking-[-0.005em] text-[#1d1d1f] transition-colors duration-200 group-hover:text-brand-blue">
                  {label}
                </h3>

                <p className="mt-1.5 text-[10px] font-normal tracking-wide text-[#86868b]">
                  {count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}