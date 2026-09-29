import { MessageCircle } from "lucide-react";
import { useAuthGate } from "@/hooks/useAuthGate";

export function WhatsAppFab() {
  const gate = useAuthGate();

  const href =
    "https://wa.me/26876265725?text=" +
    encodeURIComponent(
      "Hi Online Store, I'd like to place an order.",
    );

  return (
    <a
      href={href}
      onClick={gate()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      title="Order on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl"
    >
      <MessageCircle className="h-7 w-7" strokeWidth={2.2} />
    </a>
  );
}