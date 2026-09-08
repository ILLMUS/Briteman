import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ServicesSection } from "@/components/ServicesSection";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "What We Do — IT Services & Electronics | Briteman Services" },
      { name: "description", content: "IT support, laptop and PC supply, smartphones, online store and after-sales support across Eswatini." },
      { property: "og:title", content: "What We Do — Briteman Services" },
      { property: "og:description", content: "Complete IT and electronics solutions for homes, students, schools and businesses in Eswatini." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <ServicesSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
