import { useEffect, useMemo, useState } from "react";
import heroLaptop from "@/assets/hero-laptop.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";
import heroStore from "@/assets/hero-store.jpg";
import heroBag from "@/assets/p-bag.jpg";
import { WHATSAPP_LINK } from "@/lib/contact";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch } from "@/hooks/useBranch";

export function HeroSlider() {
  const gate = useAuthGate();
  const { name: branch } = useBranch();
  const short = branch.replace(" Branch", "");
  const SLIDES = useMemo(() => {
    const waMsg = `Hi Briteman Services (${short}, Eswatini), I'd like to place an order.`;
    return [
      {
        img: heroLaptop,
        eyebrow: "Eswatini's Trusted Tech Store",
        title: "Briteman Services — Mbabane & Manzini",
        desc: "Your trusted IT & electronics partner with stores in two cities: Mbabane and Manzini. Laptops, smartphones, accessories and expert support.",
        cta: "Shop Now",
        ctaHref: "#products",
        ctaAlt: "Contact Us",
        ctaAltHref: "/contact",
        accent: "blue",
      },
      {
        img: heroMobile,
        eyebrow: "Mega Tech Sale",
        title: "Latest Smartphones & Tablets in Stock",
        desc: "Genuine, warrantied devices at honest prices. Browse online or visit our Mbabane or Manzini store today.",
        cta: "Shop Offers",
        ctaHref: "#products",
        ctaAlt: "Order on WhatsApp",
        ctaAltHref: WHATSAPP_LINK(waMsg, short),
        accent: "red",
      },
      {
        img: heroBag,
        eyebrow: "Work & Travel Ready",
        title: "Bags, Cases & Everyday Accessories",
        desc: "Protect your gear in style with laptop bags, sleeves and tech accessories — available in Mbabane and Manzini.",
        cta: "Shop Accessories",
        ctaHref: "/category/accessories",
        ctaAlt: "Order on WhatsApp",
        ctaAltHref: WHATSAPP_LINK(waMsg, short),
        accent: "blue",
      },
      {
        img: heroStore,
        eyebrow: "Visit Our Store",
        title: `${short} Branch — Briteman Services`,
        desc: "Walk in, test, compare and walk away with the right device — backed by warranty and expert support.",
        cta: "Get Directions",
        ctaHref: "/contact",
        ctaAlt: "Order on WhatsApp",
        ctaAltHref: WHATSAPP_LINK(waMsg, short),
        accent: "blue",
      },
    ];
  }, [short]);
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full bg-brand-blue-dark overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto h-[220px] sm:h-[260px] md:h-[300px] lg:h-[340px]">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={idx === 0 ? "eager" : "lazy"}
              width={1600}
              height={900}
            />
            <div className="absolute inset-0 bg-brand-blue-dark/45" />
            <div className={`absolute inset-0 ${s.accent === "red" ? "bg-gradient-to-r from-brand-red-dark/30 via-transparent to-transparent" : "bg-gradient-to-r from-brand-blue-dark/35 via-brand-blue-dark/15 to-transparent"}`} />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-full flex items-center">
              <div className="max-w-2xl text-white">
                <div className={`inline-flex items-center px-2.5 py-1 mb-2 md:mb-3 text-[10px] font-bold uppercase tracking-[0.18em] leading-none rounded-full ${s.accent === "red" ? "bg-white text-brand-red" : "bg-brand-red text-white"}`}>
                  {s.eyebrow}
                </div>
                <h1 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.08] tracking-tight mb-2 md:mb-3">
                  {s.title}
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-white/90 mb-4 md:mb-5 max-w-md leading-relaxed line-clamp-2">{s.desc}</p>
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  <a href={s.ctaHref} onClick={gate()} className="inline-flex items-center gap-2 bg-white text-brand-blue px-4 md:px-5 py-2 md:py-2.5 font-bold uppercase text-[10px] md:text-[11px] tracking-[0.08em] hover:bg-brand-red hover:text-white transition-colors rounded-md">
                    {s.cta}
                  </a>
                  <a href={s.ctaAltHref} onClick={gate()} target={s.ctaAltHref.startsWith("http") ? "_blank" : undefined} rel="noopener" className="inline-flex items-center gap-2 bg-whatsapp text-white px-4 md:px-5 py-2 md:py-2.5 font-bold uppercase text-[10px] md:text-[11px] tracking-[0.08em] hover:opacity-90 transition-opacity rounded-md">
                    {s.ctaAlt}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
