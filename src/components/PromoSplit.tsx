export function PromoSplit() {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px border border-border bg-border px-4 md:grid-cols-2">
        {/* Shop Online */}
        <div className="relative flex min-h-[240px] flex-col justify-center overflow-hidden bg-neutral-950 p-8 text-white md:p-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-blue/15" />

          <div className="relative">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
              Shop Online
            </div>

            <h3 className="font-display mb-3 text-2xl font-bold leading-tight md:text-3xl">
              Find the technology
              <br />
              you need, all in one place.
            </h3>

            <p className="mb-5 max-w-md text-sm leading-relaxed text-white/60">
              Shop phones, computers, TVs, appliances, audio, cameras,
              accessories and more from the comfort of your home.
            </p>

            <a
              href="/shop"
              className="inline-flex items-center bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-neutral-950 transition-colors hover:bg-brand-blue hover:text-white"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Order & Collect */}
        <div className="relative flex min-h-[240px] flex-col justify-center overflow-hidden bg-brand-blue p-8 text-white md:p-12">
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10" />

          <div className="relative">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/70">
              Order & Collect
            </div>

            <h3 className="font-display mb-3 text-2xl font-bold leading-tight md:text-3xl">
              Order online.
              <br />
              Collect in Manzini.
            </h3>

            <p className="mb-5 max-w-md text-sm leading-relaxed text-white/75">
              Place your order online and arrange convenient collection from
              our Manzini location. Need help choosing? Contact our team.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/contact"
                className="inline-flex items-center bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-brand-blue transition-colors hover:bg-neutral-100"
              >
                Contact Us
              </a>

              <a
                href="tel:76265725"
                className="inline-flex items-center border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10"
              >
                Call 76265725
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Business / Bulk Orders */}
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 border border-border bg-neutral-50 px-6 py-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Business & Bulk Orders
            </p>
            <p className="mt-1 text-sm text-neutral-600">
              Outfitting an office, school, business or project? Contact us
              for larger orders and product enquiries.
            </p>
          </div>

          <a
            href="/contact"
            className="shrink-0 text-xs font-bold uppercase tracking-wide text-brand-blue transition-colors hover:text-brand-blue-light"
          >
            Request a Quote →
          </a>
        </div>
      </div>
    </section>
  );
}