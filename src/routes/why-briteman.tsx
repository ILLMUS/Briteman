import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { TrustValueSection } from "@/components/TrustValueSection";

export const Route = createFileRoute("/why-briteman")({
  head: () => ({
    meta: [
      { title: "Why Briteman — Affordable, Genuine, Warranty-Backed Tech" },
      { name: "description", content: "Six reasons Eswatini customers choose Briteman Services: affordable pricing, student-friendly deals, genuine products, warranties, reliable support and fast service." },
      { property: "og:title", content: "Why Briteman Services" },
      { property: "og:description", content: "Affordable pricing, genuine warrantied products and dependable after-sales support across Eswatini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WhyPage,
});

function WhyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <TrustValueSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
