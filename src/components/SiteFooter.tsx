import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/contact";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch, setBranch } from "@/hooks/useBranch";
import britemanLogo from "@/assets/briteman-logo.png";

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    href: "https://www.facebook.com/p/Briteman-Services-61560037251036/",
    label: "Facebook",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/britemanelectronics/",
    label: "Instagram",
  },
];

export function SiteFooter() {
  const gate = useAuthGate();
  const { name: activeLoc } = useBranch();

  const visibleLocations = CONTACT.locations.filter(
    (l) => l.name === activeLoc
  );

  const activeLocation = visibleLocations[0];
  const branchPhones = activeLocation?.phones ?? CONTACT.phones;
  const short = activeLoc.replace(" Branch", "");

  return (
    <footer className="bg-[#f5f5f7] text-[#1d1d1f]">

      {/* =========================================================
          MAIN FOOTER
      ========================================================= */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-16">

        {/* BRAND / LOGO */}
        <div className="mb-14">

          <a
            href="/"
            className="inline-flex items-center shrink-0"
            aria-label="Briteman Services home"
          >
            <img
              src={britemanLogo}
              alt="Briteman Services logo"
              width={816}
              height={816}
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Small brand accent */}
          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-7 h-[2px] bg-brand-blue" />
            <span className="w-3 h-[2px] bg-brand-red" />
          </div>

          <p className="mt-4 max-w-md text-[14px] leading-6 text-[#6e6e73]">
            Technology, electronics and support built around the way you live,
            work and connect.
          </p>
        </div>


        {/* =========================================================
            FOOTER COLUMNS
        ========================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">


          {/* SHOP */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Shop
            </h4>

            <ul className="space-y-3 text-[13px] text-[#6e6e73]">
              {[
                "Laptops",
                "Smartphones",
                "Tablets",
                "Printers",
                "Accessories",
              ].map((l) => (
                <li key={l}>
                  <a
                    href="#products"
                    className="hover:text-brand-blue transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* COMPANY */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Briteman
            </h4>

            <ul className="space-y-3 text-[13px] text-[#6e6e73]">
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
                <li key={i.l}>
                  <a
                    href={i.h}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {i.l}
                  </a>
                </li>
              ))}
            </ul>
          </div>


          {/* VISIT US */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Visit Us
            </h4>

            <div className="flex flex-wrap gap-2 mb-5">
              {CONTACT.locations.map((loc) => (
                <button
                  key={loc.name}
                  type="button"
                  onClick={() => setBranch(loc.name)}
                  className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wide border transition-colors ${
                    activeLoc === loc.name
                      ? "bg-brand-blue text-white border-brand-blue"
                      : "bg-transparent text-[#6e6e73] border-[#d2d2d7] hover:border-brand-blue hover:text-brand-blue"
                  }`}
                >
                  {loc.name.replace(" Branch", "")}
                </button>
              ))}
            </div>

            <ul className="space-y-4 text-[13px] text-[#6e6e73]">

              {visibleLocations.map((loc) => (
                <li key={loc.name} className="flex gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" />

                  <span>
                    <span className="block font-medium text-[#1d1d1f] mb-0.5">
                      {loc.name}
                    </span>

                    {loc.line1}, {loc.line2}, {loc.city}
                  </span>
                </li>
              ))}

              {branchPhones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-blue" />
                  <span>{p}</span>
                </li>
              ))}

              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-blue" />
                <span>{CONTACT.email}</span>
              </li>

            </ul>

            <a
              href={WHATSAPP_LINK(
                `Hi Briteman Services, I'd like to enquire about a product.`,
                short
              )}
              onClick={gate()}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-2 bg-brand-blue text-white px-5 py-2.5 text-[11px] font-semibold tracking-wide hover:bg-brand-blue-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>


          {/* CONNECT */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Connect
            </h4>

            <p className="text-[13px] leading-6 text-[#6e6e73] mb-5">
              Follow Briteman for new products, technology and updates.
            </p>

            <div className="flex gap-2">
              {SOCIAL_LINKS.map(({ icon: I, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#d2d2d7] flex items-center justify-center text-brand-blue hover:text-brand-red hover:border-brand-red transition-colors"
                >
                  <I className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Brand accent */}
            <div className="flex items-center gap-1.5 mt-8">
              <span className="w-10 h-[2px] bg-brand-blue" />
              <span className="w-4 h-[2px] bg-brand-red" />
            </div>
          </div>

        </div>
      </div>


      {/* =========================================================
          LEGAL / BOTTOM BAR
      ========================================================= */}
      <div className="border-t border-[#d2d2d7]">

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-5">

          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 text-[11px] text-[#6e6e73]">

            {/* COPYRIGHT */}
            <span className="text-center md:text-left">
              © {new Date().getFullYear()} Briteman Services. All rights
              reserved.
            </span>


            {/* LEGAL LINKS — CENTER */}
            <div className="flex justify-center gap-5">
              <Link
                to="/privacy"
                className="hover:text-brand-blue transition-colors"
              >
                Privacy
              </Link>

              <Link
                to="/terms"
                className="hover:text-brand-blue transition-colors"
              >
                Terms
              </Link>

              <Link
                to="/shipping"
                className="hover:text-brand-blue transition-colors"
              >
                Shipping
              </Link>

              <Link
                to="/returns"
                className="hover:text-brand-red transition-colors"
              >
                Returns
              </Link>
            </div>


            {/* RIGHT BRAND MARK */}
            <div className="hidden md:flex justify-end items-center gap-1.5">
              <span className="w-5 h-[2px] bg-brand-blue" />
              <span className="w-2.5 h-[2px] bg-brand-red" />
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}

