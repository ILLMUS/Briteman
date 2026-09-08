import { Globe2, Ship, ShieldCheck, Truck, PackageCheck } from "lucide-react";

const FEATURES = [
  { icon: Globe2, title: "International Sourcing", desc: "Direct relationships with global suppliers for the latest tech." },
  { icon: Ship, title: "Global Shipping", desc: "Air & sea freight options for any order size." },
  { icon: ShieldCheck, title: "Reliable Logistics", desc: "End-to-end tracking and insured handling on every shipment." },
  { icon: PackageCheck, title: "Customs Network", desc: "Experienced clearing partners for fast, compliant imports." },
  { icon: Truck, title: "Affordable Couriers", desc: "Cost-effective last-mile delivery across Eswatini and beyond." },
];

export function ImportExportSection() {
  return (
    <section id="import-export" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Import & Export</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Global sourcing, locally delivered.
          </h2>
          <p className="text-muted-foreground mt-3">
            From single-unit imports to bulk export consignments, our logistics network keeps your goods
            moving — securely, compliantly, and affordably.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-5 flex flex-col gap-3">
              <div className="w-10 h-10 bg-brand-red text-white flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <div className="font-display text-base font-bold leading-tight">{title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
