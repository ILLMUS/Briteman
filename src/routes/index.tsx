import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSlider } from "@/components/HeroSlider";
import { FeatureBar } from "@/components/FeatureBar";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Brands } from "@/components/Brands";
import { ProductGrid } from "@/components/ProductGrid";
import { PromoSplit } from "@/components/PromoSplit";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brightman Services — Laptops, Electronics & IT in Mbabane, Eswatini" },
      { name: "description", content: "Shop genuine laptops, tablets, printers, storage and accessories in Mbabane, Eswatini. Prices in SZL (E). Fast WhatsApp ordering and same-day dispatch." },
      { property: "og:title", content: "Brightman Services — Electronics Store in Mbabane, Eswatini" },
      { property: "og:description", content: "Genuine electronics, business IT and consumer gadgets at LM Building, Unit 10, Somhlolo Road, Mbabane. Order on WhatsApp." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main>
        <HeroSlider />
        <FeatureBar />
        <CategoryStrip />
        <ProductGrid />
        <PromoSplit />
        <Brands />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
