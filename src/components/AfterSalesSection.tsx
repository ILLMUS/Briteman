import { ShieldCheck, Settings, RefreshCw, MessageCircle, Wrench, Award } from "lucide-react";

const ITEMS = [
  { icon: Settings, title: "Device Setup", desc: "We configure your new device so it's ready to go." },
  { icon: ShieldCheck, title: "3–12 Month Warranty", desc: "Every product backed by a clear written warranty." },
  { icon: Award, title: "Product Guarantees", desc: "Genuine items, sourced from trusted suppliers." },
  { icon: RefreshCw, title: "Fast Replacements", desc: "Defective unit? We replace it without delays." },
  { icon: Wrench, title: "Technical Support", desc: "Friendly experts ready to help when you need them." },
  { icon: MessageCircle, title: "WhatsApp & Socials", desc: "Reach us on WhatsApp, Instagram and Facebook." },
];

export function AfterSalesSection() {
  return (
    <section id="support" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">After-Sales Support</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Your purchase is just the beginning.
          </h2>
          <p className="text-muted-foreground mt-3">
            We stand behind every product we sell. Customer-first support, written warranties and
            real people ready to help — long after checkout.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {ITEMS.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white p-6 flex gap-4">
              <div className="w-12 h-12 bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-display text-lg font-bold mb-1">{title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
