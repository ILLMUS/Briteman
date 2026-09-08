import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { ImportExportSection } from "@/components/ImportExportSection";

export const Route = createFileRoute("/import-export")({
  head: () => ({
    meta: [
      { title: "Import & Export Services in Eswatini | Briteman Services" },
      { name: "description", content: "International sourcing, air and sea freight, customs clearing and affordable courier delivery across Eswatini with Briteman Services." },
      { property: "og:title", content: "Import & Export — Briteman Services" },
      { property: "og:description", content: "Global sourcing, locally delivered: freight, customs and last-mile courier solutions for any order size." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImportExportPage,
});

function ImportExportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <ImportExportSection />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
