import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { OnlineStoreSection } from "@/components/OnlineStoreSection";

export const Route = createFileRoute("/online-store")({
  head: () => ({
    meta: [
      {
        title: "Online Store | Phones, Computers, TVs & Electronics",
      },
      {
        name: "description",
        content:
          "Shop phones, tablets, computers, TVs, home appliances, audio, cameras, office equipment, accessories and more from Online Store. Order online and collect in Manzini.",
      },
      {
        property: "og:title",
        content: "Online Store | Electronics & Technology",
      },
      {
        property: "og:description",
        content:
          "Shop phones, computers, TVs, appliances, audio, cameras, accessories and more. Order online and collect in Manzini.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Online Store",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Online Store | Electronics & Technology",
      },
      {
        name: "twitter:description",
        content:
          "Shop a wide range of electronics and technology online. Order online and collect in Manzini.",
      },
    ],
  }),

  component: OnlineStorePage,
});

function OnlineStorePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <OnlineStoreSection />
      </main>

      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}