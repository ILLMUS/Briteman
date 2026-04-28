export function PromoSplit() {
  return (
    <section className="bg-secondary py-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-px bg-border border border-border">
        <div className="bg-brand-blue text-white p-8 md:p-12 flex flex-col justify-center min-h-[220px] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-brand-blue-light/30" />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-3">Business Solutions</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Equipping your office? <br /> Get bulk pricing.
            </h3>
            <a href="#" className="inline-block mt-2 bg-white text-brand-blue px-6 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brand-red hover:text-white transition-colors">
              Request a Quote
            </a>
          </div>
        </div>
        <div className="bg-brand-red text-white p-8 md:p-12 flex flex-col justify-center min-h-[220px] relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-brand-red-dark/40" />
          <div className="relative">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/80 mb-3">Repair & Service</div>
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 leading-tight">
              Laptop down? <br /> We fix it — fast.
            </h3>
            <a href="#" className="inline-block mt-2 bg-white text-brand-red px-6 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brand-blue hover:text-white transition-colors">
              Book a Repair
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
