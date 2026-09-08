import { SiHuawei, SiSamsung, SiDell, SiApple, SiAsus, SiBeatsbydre, SiJbl, SiAndroid, SiAcer, SiLenovo, SiHp, SiLg, SiSony, SiXiaomi } from "react-icons/si";

// Official simple-icons brand colors — intentionally literal hex values
// because these are third-party brand marks, not themeable UI colors.
const BRANDS = [
  { Icon: SiHuawei, name: "Huawei", color: "#FF0000" },
  { Icon: SiSamsung, name: "Samsung", color: "#1428A0" },
  { Icon: SiDell, name: "Dell", color: "#007DB8" },
  { Icon: SiApple, name: "Apple", color: "#000000" },
  { Icon: SiAsus, name: "ASUS", color: "#000000" },
  { Icon: SiBeatsbydre, name: "Beats", color: "#E01F3D" },
  { Icon: SiJbl, name: "JBL", color: "#FF3300" },
  { Icon: SiAndroid, name: "Android", color: "#34A853" },
  { Icon: SiAcer, name: "Acer", color: "#83B81A" },
  { Icon: SiLenovo, name: "Lenovo", color: "#E2231A" },
  { Icon: SiHp, name: "HP", color: "#0096D6" },
  { Icon: SiLg, name: "LG", color: "#A50034" },
  { Icon: SiSony, name: "Sony", color: "#000000" },
  { Icon: SiXiaomi, name: "Xiaomi", color: "#FF6900" },
];

export function Brands() {
  // duplicate the list so the marquee loops seamlessly
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="bg-white py-10 border-b border-border overflow-hidden">

      <div
        className="relative w-full"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-14 md:gap-20 animate-brand-marquee w-max">
          {loop.map(({ Icon, name, color }, i) => (
            <div
              key={`${name}-${i}`}
              className="shrink-0 flex items-center justify-center transition-transform hover:scale-110"
              title={name}
              aria-label={name}
            >
              <Icon className="w-12 h-12 md:w-14 md:h-14" style={{ color }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes brand-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-brand-marquee {
          animation: brand-marquee 35s linear infinite;
        }
        .animate-brand-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .animate-brand-marquee { animation: none; }
        }
      `}</style>
    </section>
  );
}
