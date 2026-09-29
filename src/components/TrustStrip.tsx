import { ShieldCheck, BadgeCheck, Calendar, Wrench, Sparkles } from "lucide-react";

const TRUST = [
  { 
    icon: Calendar, 
    label: "Trusted Since 2013", 
    desc: "Over a decade of tech excellence" 
  },
  { 
    icon: BadgeCheck, 
    label: "Guaranteed Best Value", 
    desc: "Competitive market pricing" 
  },
  { 
    icon: ShieldCheck, 
    label: "Official Warranty", 
    desc: "Protected hardware & repairs" 
  },
  { 
    icon: Wrench, 
    label: "Expert Tech Support", 
    desc: "In-store walk-in assistance" 
  },
];

export function TrustStrip() {
  return (
    <section className="bg-neutral-900 border-y border-neutral-800 text-white shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TRUST.map(({ icon: Icon, label, desc }) => (
            <div 
              key={label} 
              className="group flex items-center gap-3.5 p-3 rounded-xl bg-neutral-800/50 border border-neutral-800 hover:border-brand-blue/50 hover:bg-neutral-800 transition-all duration-300"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand-blue/10 text-brand-blue-light group-hover:bg-brand-blue group-hover:text-white transition-colors">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-wider text-white group-hover:text-brand-blue-light transition-colors truncate">
                  {label}
                </p>
                <p className="text-[11px] text-neutral-400 font-normal truncate">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}