import { Wrench, ShoppingBag, Laptop, Smartphone, Globe, LifeBuoy, ArrowRight } from "lucide-react";
import { useAuthGate } from "@/hooks/useAuthGate";

const SERVICES = [
  { icon: Wrench, title: "IT Support Services", desc: "On-site and remote troubleshooting, setup and maintenance for homes and businesses." },
  { icon: ShoppingBag, title: "Electronics Retail", desc: "Genuine, warrantied electronics at our Mbabane CBD store and online." },
  { icon: Laptop, title: "Laptop & PC Supply", desc: "Latest laptops and desktops from Dell, HP, Apple, Lenovo, ASUS and more." },
  { icon: Smartphone, title: "Smartphones & Accessories", desc: "Flagship and budget devices, plus chargers, cases and accessories." },
  { icon: Globe, title: "Online Store", desc: "Shop 24/7 with secure online payments and fast WhatsApp ordering." },
  { icon: LifeBuoy, title: "After-Sales Support", desc: "3–12 month warranties, fast replacements and dedicated technical assistance." },
];

export function ServicesSection() {
  const gate = useAuthGate();
  return (
    <section id="services" className="bg-secondary/40 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">What We Do</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Complete IT & electronics solutions for every need.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="group bg-white p-6 flex flex-col gap-3 hover:bg-brand-blue hover:text-white transition-colors">
              <div className="w-11 h-11 bg-brand-blue text-white group-hover:bg-white group-hover:text-brand-blue flex items-center justify-center transition-colors">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold leading-tight">{title}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-white/85 leading-relaxed">{desc}</p>
              <a href="/contact" onClick={gate()} className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-brand-red group-hover:text-white pt-2">
                Learn More <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
