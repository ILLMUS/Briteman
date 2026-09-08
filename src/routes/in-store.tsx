import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { StoreExperienceSection } from "@/components/StoreExperienceSection";

export const Route = createFileRoute("/in-store")({
  head: () => ({
    meta: [
      { title: "In-Store Experience — Mbabane Showroom | Briteman Services" },
      { name: "description", content: "Visit the Briteman showroom at LM Building, Somhlolo Road, Mbabane. Test the latest laptops, smartphones and TVs with card and contactless payments." },
      { property: "og:title", content: "In-Store Experience — Briteman Services" },
      { property: "og:description", content: "Walk in, test the latest devices and walk out with the right one — Mbabane CBD showroom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InStorePage,
});

function InStorePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <StoreExperienceSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
