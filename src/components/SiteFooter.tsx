import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/contact";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch, setBranch } from "@/hooks/useBranch";

const SOCIAL_LINKS = [
  { icon: Facebook, href: "https://www.facebook.com/p/Briteman-Services-61560037251036/", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/britemanelectronics/", label: "Instagram" },
];

export function SiteFooter() {
  const gate = useAuthGate();
  const { name: activeLoc } = useBranch();
  const visibleLocations = CONTACT.locations.filter((l) => l.name === activeLoc);
  const activeLocation = visibleLocations[0];
  const branchPhones = activeLocation?.phones ?? CONTACT.phones;
  const short = activeLoc.replace(" Branch", "");
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-white text-brand-blue flex items-center justify-center font-display font-bold text-2xl">B</div>
            <div className="w-3 h-10 bg-brand-red" />
            <span className="font-display text-xl font-bold tracking-tight">BRITEMAN</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed mb-4">
            Eswatini's trusted IT & electronics retailer — affordable, warrantied technology backed by genuine support.
          </p>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ icon: I, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 border border-white/20 flex items-center justify-center hover:bg-brand-red hover:border-brand-red transition-colors"
              >
                <I className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Shop</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {["Laptops", "Smartphones", "Tablets", "Printers", "Accessories"].map((l) => (
              <li key={l}><a href="#products" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Company</h4>
          <ul className="space-y-2 text-sm text-white/75">
            {[
              { l: "About Us", h: "/about" },
              { l: "Services", h: "/services" },
              
              { l: "In-Store Experience", h: "/in-store" },
              { l: "Online Store", h: "/online-store" },
              { l: "After-Sales Support", h: "/after-sales" },
              { l: "Why Briteman", h: "/why-briteman" },
              { l: "Our Culture", h: "/culture" },
              { l: "Contact", h: "/contact" },
            ].map((i) => (
              <li key={i.l}><a href={i.h} className="hover:text-white">{i.l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider mb-4 text-brand-red">Visit Us</h4>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {CONTACT.locations.map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => setBranch(loc.name)}
                className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide border transition-colors ${
                  activeLoc === loc.name
                    ? "bg-brand-red text-white border-brand-red"
                    : "bg-transparent text-white/75 border-white/20 hover:border-white"
                }`}
              >
                {loc.name.replace(" Branch", "")}
              </button>
            ))}
          </div>
          <ul className="space-y-3 text-sm text-white/75">
            {visibleLocations.map((loc) => (
              <li key={loc.name} className="flex gap-2">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" />
                <span>
                  <span className="block font-semibold text-white">{loc.name}</span>
                  {loc.line1}, {loc.line2}, {loc.city}
                </span>
              </li>
            ))}
            {branchPhones.map((p) => (
              <li key={p} className="flex gap-2"><Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" /> {p}</li>
            ))}
            <li className="flex gap-2"><Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" /> {CONTACT.email}</li>
          </ul>
          <a
            href={WHATSAPP_LINK(`Hi Briteman Services, I'd like to enquire about a product.`, short)}
            onClick={gate()}
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
          <span>© {new Date().getFullYear()} Briteman Services. All rights reserved.</span>
          <span className="flex gap-4">
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
            <Link to="/shipping" className="hover:text-white">Shipping</Link>
            <Link to="/returns" className="hover:text-white">Returns</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
