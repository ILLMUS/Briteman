import { Tag, GraduationCap, BadgeCheck, ShieldCheck, Headphones, Zap } from "lucide-react";

const VALUES = [
  { icon: Tag, title: "Affordable Pricing", desc: "Honest pricing with regular promotions." },
  { icon: GraduationCap, title: "Student-Friendly", desc: "Devices and bundles tailored for learners." },
  { icon: BadgeCheck, title: "Genuine Products", desc: "100% authentic, sourced from trusted suppliers." },
  { icon: ShieldCheck, title: "Warranty-Backed", desc: "3–12 month warranty on every purchase." },
  { icon: Headphones, title: "Reliable Support", desc: "Real people, real help — when you need it." },
  { icon: Zap, title: "Fast Service", desc: "Same-day dispatch and quick turnarounds." },
];

export function TrustValueSection() {
  return (
    <section className="bg-white py-14 border-y border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Why Briteman</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Six reasons customers keep coming back.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-border border border-border">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-5 text-center flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-1">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm">{title}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
