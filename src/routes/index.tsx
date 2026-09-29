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
      {
        title: "Online Store | Electronics & Technology",
      },
      {
        name: "description",
        content:
          "Shop phones, tablets, computers, TVs, home appliances, audio, cameras, office equipment, accessories and more from Online Store. Order online and collect in Manzini.",
      },
      {
        name: "keywords",
        content:
          "electronics store Eswatini, online electronics store, phones Eswatini, tablets Eswatini, computers Eswatini, laptops Eswatini, TVs Eswatini, home appliances Eswatini, audio Eswatini, cameras Eswatini, electronics accessories Eswatini, Online Store Manzini",
      },
      {
        property: "og:title",
        content: "Online Store | Electronics & Technology",
      },
      {
        property: "og:description",
        content:
          "Shop phones, tablets, computers, TVs, home appliances, audio, cameras, office equipment, accessories and more. Order online and collect in Manzini.",
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
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),

  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
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