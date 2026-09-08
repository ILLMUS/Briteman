import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Briteman Services — Mbabane & Manzini, Eswatini" },
      { name: "description", content: "Call, WhatsApp, email or visit Briteman Services in Mbabane (Somhlolo Road) or Manzini (The Hyatt Building Complex, 217 Maphaka Street). We reply within minutes." },
      { property: "og:title", content: "Contact Briteman Services" },
      { property: "og:description", content: "Two branches in Eswatini — Mbabane and Manzini. Talk to us on WhatsApp, phone or email." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <ContactSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
