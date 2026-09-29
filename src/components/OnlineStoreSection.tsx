import {
  ShoppingBag,
  PackageCheck,
  Headphones,
  Smartphone,
} from "lucide-react";
import { useAuthGate } from "@/hooks/useAuthGate";

const FEATURES = [
  {
    icon: ShoppingBag,
    label: "Shop Online",
  },
  {
    icon: PackageCheck,
    label: "Order & Collect",
  },
  {
    icon: Smartphone,
    label: "Wide Selection",
  },
  {
    icon: Headphones,
    label: "Product Support",
  },
];

export function OnlineStoreSection() {
  const gate = useAuthGate();

  return (
    <section
      id="online"
      className="relative overflow-hidden bg-white py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-[#f5f5f7] px-6 py-14 text-center sm:px-10 md:py-20">
          {/* Subtle background detail */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-blue/[0.06] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-black/[0.04] blur-3xl" />

          <div className="relative">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
              Everything you need.
              <br />
              All in one place.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] md:text-[15px]">
              Shop phones, tablets, computers, TVs, appliances, audio,
              cameras, office equipment, accessories and more. Browse online,
              place your order and arrange collection in Manzini.
            </p>

            <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/[0.07] bg-black/[0.07] md:grid-cols-4">
              {FEATURES.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex min-h-[110px] flex-col items-center justify-center gap-3 bg-white px-4 py-5 transition-colors duration-300 hover:bg-[#fafafa]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    <Icon
                      className="h-[17px] w-[17px]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#1d1d1f]">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/shop"
                onClick={gate()}
                className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-7 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
              >
                Shop Online
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-black/[0.09] bg-white px-7 py-3 text-[11px] font-semibold text-[#1d1d1f] transition-all duration-200 hover:bg-[#f5f5f7] active:scale-[0.98]"
              >
                Contact Us
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] text-[#86868b]">
              <span>Order Online</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#d2d2d7] sm:block" />
              <span>Collect in Manzini</span>
              <span className="hidden h-1 w-1 rounded-full bg-[#d2d2d7] sm:block" />
              <span>Phones · Computers · TVs · Appliances & More</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}