import { MessageCircle } from "lucide-react";

const FAB_HREF =
  "https://wa.me/26878000000?text=" +
  encodeURIComponent("Hi Brightman (Mbabane, Eswatini), I'd like to place an order.");

export function WhatsAppFab() {
  return (
    <a
      href={FAB_HREF}
      target="_blank"
      rel="noopener"
      aria-label="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 bg-whatsapp text-white px-4 py-3 shadow-2xl flex items-center gap-2 font-bold uppercase text-xs tracking-wide hover:bg-brand-blue transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Order on WhatsApp</span>
    </a>
  );
}
