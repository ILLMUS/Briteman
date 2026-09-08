import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { AfterSalesSection } from "@/components/AfterSalesSection";

export const Route = createFileRoute("/after-sales")({
  head: () => ({
    meta: [
      { title: "After-Sales Support & Warranty | Briteman Services" },
      { name: "description", content: "3–12 month warranties, fast replacements and dedicated technical assistance on every device bought from Briteman Services in Eswatini." },
      { property: "og:title", content: "After-Sales Support — Briteman Services" },
      { property: "og:description", content: "Warranty cover, fast replacements and technical help long after your purchase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AfterSalesPage,
});

function AfterSalesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AfterSalesSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
