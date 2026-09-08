import { Calendar, Globe2, Users, Building2 } from "lucide-react";

const STATS = [
  { icon: Calendar, value: "2013", label: "Established" },
  { icon: Building2, value: "2022", label: "Expanded Operations" },
  { icon: Users, value: "10K+", label: "Customers Served" },
  { icon: Globe2, value: "2", label: "Branch Locations" },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">About Briteman</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
            A modern Eswatini tech retailer built on trust since 2013.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Briteman Services is a Mbabane-based IT and electronics retailer supplying laptops, PCs,
            smartphones, office equipment, accessories and IT support to students, businesses, schools
            and local suppliers across Eswatini.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Following our 2022 expansion, we now combine a premium walk-in store experience with two
            branch locations — delivering affordable, reliable technology backed by genuine
            warranties and dedicated after-sales support.
          </p>
          <a
            href="/services"
            className="inline-block bg-brand-blue text-white px-6 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brand-red transition-colors"
          >
            Explore Our Services
          </a>
        </div>
        <div className="grid grid-cols-2 gap-px bg-border border border-border">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white p-6 md:p-8 flex flex-col gap-3">
              <div className="w-12 h-12 bg-brand-blue text-white flex items-center justify-center">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-brand-blue">{value}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
