import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroSlider } from "@/components/HeroSlider";
import { FeatureBar } from "@/components/FeatureBar";
import { CategoryStrip } from "@/components/CategoryStrip";
import { Brands } from "@/components/Brands";
import { TrustStrip } from "@/components/TrustStrip";
import { ProductGrid } from "@/components/ProductGrid";
import { LatestArrivals } from "@/components/LatestArrivals";
import { HomeHighlights } from "@/components/HomeHighlights";
import { PromoSplit } from "@/components/PromoSplit";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Briteman Services — Eswatini's Trusted IT & Electronics Store | Mbabane" },
      { name: "description", content: "Affordable laptops, smartphones, accessories and IT support in Mbabane and Manzini, Eswatini. Genuine products, warranty included, fast WhatsApp ordering." },
      { name: "keywords", content: "IT services Eswatini, laptop shop Mbabane, electronics store Eswatini, affordable laptops Eswatini, computer shop Mbabane, smartphone retailer Eswatini, IT support services Eswatini" },
      { property: "og:title", content: "Briteman Services — Eswatini's Trusted IT & Electronics Store" },
      { property: "og:description", content: "Genuine, warrantied electronics and IT services at LM Building, Somhlolo Road, Mbabane. Order on WhatsApp." },
      { property: "og:type", content: "website" },
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
        <CategoryStrip />
        <HomeHighlights />
        <Brands />
        <FeatureBar />
        <LatestArrivals />
        <TrustStrip />
        <ProductGrid />
        <PromoSplit />
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
