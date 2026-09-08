import { ShieldCheck, BadgeCheck, Globe2, Calendar } from "lucide-react";

const TRUST = [
  { icon: Calendar, label: "Since 2013" },
  { icon: BadgeCheck, label: "Affordable Prices" },
  { icon: ShieldCheck, label: "Warranty Included" },
  { icon: Globe2, label: "Nationwide & International Supply" },
];

export function TrustStrip() {
  return (
    <section className="bg-brand-blue-dark border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        {TRUST.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-white/90 text-xs md:text-sm">
            <Icon className="w-4 h-4 text-brand-red shrink-0" />
            <span className="font-semibold tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
