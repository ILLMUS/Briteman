import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { OnlineStoreSection } from "@/components/OnlineStoreSection";

export const Route = createFileRoute("/online-store")({
  head: () => ({
    meta: [
      { title: "Shop Online 24/7 | Briteman Services Eswatini" },
      { name: "description", content: "Browse, compare and buy laptops, smartphones and electronics online any time. Secure payments or finalize your order on WhatsApp." },
      { property: "og:title", content: "Online Store — Briteman Services" },
      { property: "og:description", content: "Shop the latest tech anytime, anywhere with secure payments and fast WhatsApp ordering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OnlineStorePage,
});

function OnlineStorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <OnlineStoreSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
