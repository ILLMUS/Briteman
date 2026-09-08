import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { AboutSection } from "@/components/AboutSection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Briteman Services — IT & Electronics Retailer in Eswatini" },
      { name: "description", content: "Briteman Services is a Mbabane-based IT and electronics retailer serving Eswatini since 2013 with laptops, PCs, smartphones and IT support." },
      { property: "og:title", content: "About Briteman Services — Trusted Since 2013" },
      { property: "og:description", content: "A modern Eswatini tech retailer built on trust, serving Mbabane and Manzini since our 2022 expansion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AboutSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
