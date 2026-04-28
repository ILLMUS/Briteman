const BRANDS = [
  "Huawei", "Samsung", "Dell", "Apple", "ASUS",
  "Beats by Dre", "JBL", "Android TV", "Acer", "Lenovo",
];

export function Brands() {
  return (
    <section className="bg-white py-14 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Trusted Partners</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Brands We Stock</h2>
          </div>
          <a href="#" className="text-sm font-semibold uppercase text-brand-blue hover:text-brand-red border-b-2 border-brand-blue hover:border-brand-red pb-0.5">
            View All Brands →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 border-t border-l border-border">
          {BRANDS.map((b) => (
            <div
              key={b}
              className="grayscale-hover group border-r border-b border-border h-24 flex items-center justify-center bg-white hover:bg-brand-blue/5"
            >
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-brand-blue transition-colors">
                {b}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
