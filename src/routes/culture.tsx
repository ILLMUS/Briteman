import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { VisionMissionSection } from "@/components/VisionMissionSection";

export const Route = createFileRoute("/culture")({
  head: () => ({
    meta: [
      { title: "Our Culture, Vision & Mission | Briteman Services" },
      { name: "description", content: "The Briteman Services director's message, vision and mission — building Eswatini's most trusted computer and electronics retailer." },
      { property: "og:title", content: "Our Culture — Briteman Services" },
      { property: "og:description", content: "Driven by purpose, powered by people: our director's message, vision and mission." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CulturePage,
});

function CulturePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <VisionMissionSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
