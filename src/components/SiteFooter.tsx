import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, MessageCircle } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white text-brand-blue flex items-center justify-center font-display font-bold text-2xl">B</div>
            <div className="w-3 h-10 bg-brand-red" />
            <span className="font-display text-xl font-bold tracking-tight">BRIGHTMAN</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            Your trusted destination for genuine electronics, business IT and consumer gadgets.
          </p>
          <div className="flex gap-2">
            {[Facebook, Instagram, Twitter, Youtube].map((I, i) => (
              <a key={i} href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors">
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Shop</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {["Laptops", "Desktops", "Tablets", "Peripherals", "Storage", "Accessories"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Customer</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {["My Account", "Track Order", "Returns", "Warranty", "Repair Service", "Bulk Quotes"].map((l) => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Visit Us</h4>
          <ul className="space-y-3 text-sm text-white/75">
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" /> LM Building, Unit 10, Somhlolo Road, Mbabane, Eswatini</li>
            <li className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" /> +268 7800 0000</li>
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" /> sales@brightman.co.sz</li>
          </ul>
          <a
            href="https://wa.me/26878000000"
            target="_blank"
            rel="noopener"
            className="mt-4 inline-flex items-center gap-2 bg-whatsapp text-white px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:opacity-90"
          >
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 text-xs text-white/60 flex flex-col sm:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Brightman Services Ltd. All rights reserved.</span>
          <span className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Shipping</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
