import { MapPin, CreditCard, Wifi, Sofa } from "lucide-react";
import heroStore from "@/assets/hero-store.jpg";

const HIGHLIGHTS = [
  { icon: Sofa, title: "Comfortable Showroom", desc: "Test, compare and explore in a relaxed environment." },
  { icon: CreditCard, title: "Swipe & Wireless Pay", desc: "Card, mobile money and contactless accepted." },
  { icon: Wifi, title: "Latest Devices On Display", desc: "Laptops, smartphones, TVs, tablets, UPS and accessories." },
  { icon: MapPin, title: "Mbabane CBD Location", desc: "LM Building, Plot 305, Somhlolo Road." },
];

export function StoreExperienceSection() {
  return (
    <section id="store" className="bg-secondary/40 py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
        <div className="relative aspect-[4/3] overflow-hidden border border-border">
          <img src={heroStore} alt="Briteman Services storefront in Mbabane CBD" className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-red mb-1">Visit Us</div>
            <div className="font-display text-xl font-bold">LM Building, Mbabane CBD</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">In-Store Experience</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
            Walk in. Test. Walk out with the right device.
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Our flagship store on Somhlolo Road brings together the latest laptops, smartphones, tablets
            and accessories under one roof — with experts on hand and modern payment options for a
            seamless retail experience.
          </p>
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border mb-6">
            {HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-4 flex gap-3">
                <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">{title}</div>
                  <div className="text-xs text-muted-foreground">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <a
            href="/contact"
            className="inline-block bg-brand-blue text-white px-6 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brand-red transition-colors"
          >
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
