import { MessageCircle } from "lucide-react";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch } from "@/hooks/useBranch";

export function WhatsAppFab() {
  const gate = useAuthGate();
  const { name: branch } = useBranch();
  const short = branch.replace(" Branch", "");
  const href =
    "https://wa.me/26876623733?text=" +
    encodeURIComponent(
      `Hi Briteman Services (${short}, Eswatini), I'd like to place an order.`,
    );
  return (
    <a
      href={href}
      onClick={gate()}
      target="_blank"
      rel="noopener"
      aria-label={`Order on WhatsApp — ${short}`}
      className="fixed bottom-5 right-5 z-50 bg-whatsapp text-white px-4 py-3 shadow-2xl flex items-center gap-2 font-bold uppercase text-xs tracking-wide hover:bg-brand-blue transition-colors"
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:inline">Order on WhatsApp · {short}</span>
    </a>
  );
}
