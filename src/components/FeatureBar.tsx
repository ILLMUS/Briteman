import { Truck, ShieldCheck, Headphones, BadgePercent } from "lucide-react";

const FEATURES = [
  { icon: Truck, title: "Fast Delivery", desc: "Same-day dispatch in Mbabane" },
  { icon: ShieldCheck, title: "Genuine Products", desc: "100% authentic, warranty backed" },
  { icon: Headphones, title: "Expert Support", desc: "Talk to a specialist 7 days a week" },
  { icon: BadgePercent, title: "Best Prices", desc: "Price-match on major brands" },
];

export function FeatureBar() {
  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 divide-x divide-border">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3 px-4 py-5">
            <div className="w-11 h-11 bg-brand-blue text-white flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-bold uppercase tracking-wide">{title}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
