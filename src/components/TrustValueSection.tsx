import { Tag, GraduationCap, BadgeCheck, ShieldCheck, Headphones, Zap } from "lucide-react";

const VALUES = [
  { icon: Tag, title: "Affordable Pricing", desc: "Honest pricing with regular promotions." },
  { icon: GraduationCap, title: "Student-Friendly", desc: "Devices and bundles tailored for learners." },
  { icon: BadgeCheck, title: "Genuine Products", desc: "100% authentic, sourced from trusted suppliers." },
  { icon: ShieldCheck, title: "Warranty-Backed", desc: "3–12 month warranty on every purchase." },
  { icon: Headphones, title: "Reliable Support", desc: "Real people, real help — when you need it." },
  { icon: Zap, title: "Fast Service", desc: "Instant processing and quick turnarounds." },
];

export function TrustValueSection() {
  return (
    <section className="bg-white py-14 border-y border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Why Briteman</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-neutral-900">
            Six reasons customers keep coming back.
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-px bg-neutral-200 border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 text-center flex flex-col items-center gap-2.5 transition-colors hover:bg-neutral-50">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-1">
                <Icon className="w-6 h-6" />
              </div>
              <div className="font-bold text-sm text-neutral-900">{title}</div>
              <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}