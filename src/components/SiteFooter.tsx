import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  ShoppingBag,
  Store,
} from "lucide-react";
import { WHATSAPP_LINK } from "@/lib/contact";
import { useAuthGate } from "@/hooks/useAuthGate";
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

const PHONE_NUMBERS = ["76265725", "76427025"];

export function SiteFooter() {
  const gate = useAuthGate();

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
            aria-label="Online Store home"
          >
            <img
              src={britemanLogo}
              alt="Online Store"
              width={816}
              height={816}
              className="h-14 w-auto object-contain"
            />
          </a>

          {/* Brand accent */}
          <div className="flex items-center gap-1.5 mt-4">
            <span className="w-7 h-[2px] bg-brand-blue" />
            <span className="w-3 h-[2px] bg-brand-red" />
          </div>

          <p className="mt-4 max-w-md text-[14px] leading-6 text-[#6e6e73]">
            Your online destination for electronics, technology, appliances
            and everyday essentials.
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
                "Televisions",
                "Refrigerators",
                "Stoves & Cookers",
                "Printers",
                "Audio",
                "Accessories",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#products"
                    className="hover:text-brand-blue transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ONLINE STORE */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Online Store
            </h4>

            <ul className="space-y-3 text-[13px] text-[#6e6e73]">
              {[
                { label: "Shop Online", href: "/online-store" },
                { label: "Order Online", href: "/online-store" },
                { label: "Fetch In-Store", href: "/in-store" },
                { label: "After-Sales Support", href: "/after-sales" },
                { label: "Contact Us", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ORDER / FETCH */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Shopping Options
            </h4>

            <div className="space-y-3">
              {/* ORDER ONLINE */}
              <a
                href="/online-store"
                className="flex items-center gap-3 border border-[#d2d2d7] bg-white px-4 py-3 text-[12px] font-semibold text-[#1d1d1f] transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <ShoppingBag className="w-4 h-4 text-brand-blue shrink-0" />

                <span>
                  <span className="block">Order Online</span>
                  <span className="block text-[10px] font-normal text-[#86868b] mt-0.5">
                    Shop from anywhere
                  </span>
                </span>
              </a>

              {/* FETCH IN-STORE */}
              <a
                href="/in-store"
                className="flex items-center gap-3 border border-[#d2d2d7] bg-white px-4 py-3 text-[12px] font-semibold text-[#1d1d1f] transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <Store className="w-4 h-4 text-brand-red shrink-0" />

                <span>
                  <span className="block">Fetch In-Store</span>
                  <span className="block text-[10px] font-normal text-[#86868b] mt-0.5">
                    Collect your order in Manzini
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-[12px] font-semibold text-brand-blue mb-5">
              Contact
            </h4>

            <ul className="space-y-4 text-[13px] text-[#6e6e73]">
              {/* LOCATION */}
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-brand-red" />

                <span>
                  <span className="block font-medium text-[#1d1d1f] mb-0.5">
                    Manzini
                  </span>
                  Eswatini
                </span>
              </li>

              {/* PHONE NUMBERS */}
              {PHONE_NUMBERS.map((phone) => (
                <li key={phone} className="flex gap-3">
                  <Phone className="w-4 h-4 mt-0.5 shrink-0 text-brand-blue" />

                  <a
                    href={`tel:${phone}`}
                    className="hover:text-brand-blue transition-colors"
                  >
                    {phone}
                  </a>
                </li>
              ))}

              {/* EMAIL */}
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 shrink-0 text-brand-blue" />

                <a
                  href="mailto:info@onlinestore.com"
                  className="hover:text-brand-blue transition-colors"
                >
                  info@onlinestore.com
                </a>
              </li>
            </ul>

            {/* WHATSAPP */}
            <a
              href={WHATSAPP_LINK(
                "Hi, I'd like to enquire about a product from the Online Store.",
                "Manzini",
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
              © {new Date().getFullYear()} Online Store. All rights reserved.
            </span>

            {/* LEGAL LINKS */}
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

            {/* BRAND MARK */}
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