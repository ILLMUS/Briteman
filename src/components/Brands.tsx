import {
  Smartphone,
  Laptop,
  Tv,
  Refrigerator,
  CookingPot,
  Printer,
  Headphones,
  Watch,
  Gamepad2,
  WashingMachine,
  Microwave,
  Camera,
} from "lucide-react";

const CATEGORIES = [
  { Icon: Smartphone, name: "Smartphones" },
  { Icon: Laptop, name: "Laptops & Computers" },
  { Icon: Tv, name: "Televisions" },
  { Icon: Refrigerator, name: "Fridges & Freezers" },
  { Icon: CookingPot, name: "Stoves & Cookers" },
  { Icon: Printer, name: "Printers" },
  { Icon: Headphones, name: "Audio & Headphones" },
  { Icon: Watch, name: "Smartwatches" },
  { Icon: Gamepad2, name: "Gaming" },
  { Icon: WashingMachine, name: "Washing Machines" },
  { Icon: Microwave, name: "Microwaves" },
  { Icon: Camera, name: "Cameras" },
];

export function Brands() {
  const loop = [...CATEGORIES, ...CATEGORIES];

  return (
    <section className="bg-white py-12 border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-500 mb-2">
          Explore Our Products
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Everything You Need, All in One Place
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Discover electronics, appliances and accessories.
        </p>
      </div>

      <div
        className="relative w-full"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
        }}
      >
        <div className="flex gap-5 w-max animate-category-marquee hover:[animation-play-state:paused]">
          {loop.map(({ Icon, name }, i) => (
            <div
              key={`${name}-${i}`}
              className="group flex flex-col items-center justify-center
                gap-3 w-36 h-36 md:w-40 md:h-40 shrink-0
                rounded-2xl border border-gray-100 bg-white
                shadow-sm transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                hover:border-orange-300"
            >
              <div
                className="flex items-center justify-center
                  w-14 h-14 rounded-xl bg-gray-50
                  text-gray-700 transition-all duration-300
                  group-hover:bg-orange-500
                  group-hover:text-white"
              >
                <Icon size={30} strokeWidth={1.7} />
              </div>

              <span className="text-xs md:text-sm font-semibold text-gray-700 text-center px-2">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes category-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .animate-category-marquee {
          animation: category-marquee 40s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-category-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}