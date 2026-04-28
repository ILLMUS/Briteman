import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroLaptop from "@/assets/hero-laptop.jpg";
import heroMobile from "@/assets/hero-mobile.jpg";
import heroStore from "@/assets/hero-store.jpg";

const WHATSAPP = "https://wa.me/26878000000?text=" + encodeURIComponent("Hi Brightman (Mbabane, Eswatini), I'd like to place an order.");

const SLIDES = [
  {
    img: heroLaptop,
    eyebrow: "New Arrivals",
    title: "Latest Laptops. Built For Power.",
    desc: "MacBook, Dell XPS, Lenovo ThinkPad, ASUS ROG — in stock, ready to dispatch today.",
    cta: "Shop Laptops",
    ctaAlt: "Order on WhatsApp",
    accent: "blue",
  },
  {
    img: heroMobile,
    eyebrow: "Limited Time",
    title: "Mega Tech Sale — Up To 35% Off",
    desc: "Tablets, audio gear and smart accessories at our lowest prices of the season.",
    cta: "Shop Offers",
    ctaAlt: "Order on WhatsApp",
    accent: "red",
  },
  {
    img: heroStore,
    eyebrow: "Visit Us",
    title: "Now Open on Somhlolo Road, Mbabane",
    desc: "LM Building, Unit 10. Test, compare and walk away with the right device — right here in Eswatini.",
    cta: "Get Directions",
    ctaAlt: "Order on WhatsApp",
    accent: "blue",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full bg-brand-blue-dark overflow-hidden">
      <div className="relative max-w-[1600px] mx-auto h-[460px] md:h-[560px]">
        {SLIDES.map((s, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === i ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          >
            <img
              src={s.img}
              alt={s.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading={idx === 0 ? "eager" : "lazy"}
              width={1600}
              height={900}
            />
            <div className={`absolute inset-0 ${s.accent === "red" ? "bg-gradient-to-r from-brand-red-dark/95 via-brand-red-dark/70 to-transparent" : "bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/70 to-transparent"}`} />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center">
              <div className="max-w-xl text-white">
                <div className={`inline-block px-3 py-1 mb-4 text-xs font-bold uppercase tracking-[0.2em] ${s.accent === "red" ? "bg-white text-brand-red" : "bg-brand-red text-white"}`}>
                  {s.eyebrow}
                </div>
                <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-4">
                  {s.title}
                </h1>
                <p className="text-base md:text-lg text-white/85 mb-7 max-w-md">{s.desc}</p>
                <div className="flex flex-wrap gap-3">
                  <a href="#products" className="inline-flex items-center gap-2 bg-white text-brand-blue px-7 py-3.5 font-bold uppercase text-sm tracking-wide hover:bg-brand-red hover:text-white transition-colors">
                    {s.cta}
                  </a>
                  <a href={WHATSAPP} target="_blank" rel="noopener" className="inline-flex items-center gap-2 bg-whatsapp text-white px-7 py-3.5 font-bold uppercase text-sm tracking-wide hover:opacity-90 transition-opacity">
                    {s.ctaAlt}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Controls */}
        <button
          onClick={() => setI((x) => (x - 1 + SLIDES.length) % SLIDES.length)}
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand-red text-white p-2.5 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => setI((x) => (x + 1) % SLIDES.length)}
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-brand-red text-white p-2.5 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 transition-all ${idx === i ? "w-10 bg-brand-red" : "w-5 bg-white/60 hover:bg-white"}`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
