import { Store, ShieldCheck, Headphones, BadgePercent } from "lucide-react";

const FEATURES = [
  { icon: Store, title: "In-Store Pickup", desc: "Ready for walk-ins & collection" },
  { icon: ShieldCheck, title: "Warranty Included", desc: "3–12 months on every device" },
  { icon: Headphones, title: "Expert Support", desc: "WhatsApp, Instagram & in-store" },
  { icon: BadgePercent, title: "Affordable Prices", desc: "Honest pricing, student-friendly" },
];

export function FeatureBar() {
  return (
    <section className="bg-white border-b border-neutral-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 divide-x divide-neutral-200">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-center gap-3.5 px-4 py-5 transition-colors hover:bg-neutral-50">
            <div className="w-11 h-11 rounded-xl bg-brand-blue text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon className="w-5 h-5" />
            </div>
            <div className="leading-tight min-w-0">
              <div className="text-sm font-bold uppercase tracking-wide text-neutral-900 truncate">{title}</div>
              <div className="text-xs text-neutral-500 mt-0.5 truncate">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}