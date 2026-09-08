import { Quote, Target, Compass } from "lucide-react";

export function VisionMissionSection() {
  return (
    <section id="culture" className="bg-secondary/40 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Our Culture</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Driven by purpose. Powered by people.
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-border border border-border">
          <div className="bg-white p-8">
            <Quote className="w-8 h-8 text-brand-red mb-4" />
            <div className="text-xs font-bold uppercase tracking-wider text-brand-red mb-2">Director's Message</div>
            <h3 className="font-display text-xl font-bold mb-3">Building trust, one device at a time.</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Since 2013, our mission has stayed the same — give every Eswatini customer access to genuine,
              affordable technology backed by service they can rely on. Thank you for choosing Briteman."
            </p>
            <div className="mt-4 text-xs uppercase tracking-wider text-foreground font-bold">— The Director, Briteman Services</div>
          </div>

          <div className="bg-brand-blue text-white p-8">
            <Compass className="w-8 h-8 text-brand-red mb-4" />
            <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Vision</div>
            <h3 className="font-display text-xl font-bold mb-3">Eswatini's most trusted tech retailer.</h3>
            <p className="text-sm text-white/85 leading-relaxed">
              To become Eswatini's most affordable, reliable and trusted computer and electronics retailer
              — delivering excellent IT services and warrantied quality products.
            </p>
          </div>

          <div className="bg-brand-blue-dark text-white p-8">
            <Target className="w-8 h-8 text-brand-red mb-4" />
            <div className="text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Mission</div>
            <h3 className="font-display text-xl font-bold mb-3">Reliable tech, exceptional support.</h3>
            <p className="text-sm text-white/85 leading-relaxed">
              To provide reliable, professional IT services and affordable electronics with outstanding
              customer support — creating real value for customers across Eswatini and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
