import { Clock, CreditCard, Share2, Zap } from "lucide-react";
import { useAuthGate } from "@/hooks/useAuthGate";

const FEATURES = [
  { icon: Clock, label: "24/7 Shopping" },
  { icon: CreditCard, label: "Secure Payments" },
  { icon: Share2, label: "Social Integration" },
  { icon: Zap, label: "Fast Engagement" },
];

export function OnlineStoreSection() {
  const gate = useAuthGate();
  return (
    <section id="online" className="bg-brand-blue text-white py-16 relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-72 h-72 bg-brand-blue-light/30 rounded-full blur-3xl" />
      <div className="absolute -left-20 -bottom-20 w-72 h-72 bg-brand-red/20 rounded-full blur-3xl" />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Online Store</div>
        <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-4 max-w-3xl mx-auto">
          Shop the latest tech — anytime, anywhere.
        </h2>
        <p className="text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
          Browse, compare and buy from our full catalogue around the clock. Pay securely online or finalize
          your order on WhatsApp in seconds.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border border-white/10 max-w-3xl mx-auto mb-8">
          {FEATURES.map(({ icon: Icon, label }) => (
            <div key={label} className="bg-brand-blue-dark/40 backdrop-blur p-5 flex flex-col items-center gap-2">
              <Icon className="w-6 h-6 text-brand-red" />
              <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
            </div>
          ))}
        </div>
        <a
          href="#products"
          onClick={gate()}
          className="inline-block bg-white text-brand-blue px-8 py-3.5 text-xs font-bold uppercase tracking-wide hover:bg-brand-red hover:text-white transition-colors"
        >
          Visit Online Store
        </a>
      </div>
    </section>
  );
}
