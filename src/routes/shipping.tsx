import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Truck, MapPin, Clock, PackageCheck, Phone } from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping & Delivery Policy | Briteman Services" },
      { name: "description", content: "Delivery and pickup options for orders from Briteman Services in Mbabane and Manzini only." },
      { property: "og:title", content: "Shipping & Delivery | Briteman Services" },
      { property: "og:description", content: "Same-day dispatch, free delivery thresholds and pickup points in Mbabane and Manzini from Briteman Services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShippingPage,
});

const deliveryZones = [
  {
    zone: "Mbabane",
    areas: "Somhlolo Road, town centre and surrounding suburbs",
    time: "Same day or next business day",
    cost: "Free on orders over E 7,500",
  },
  {
    zone: "Manzini",
    areas: "Hyatt Building Complex / Maphaka Street area and surrounding suburbs",
    time: "1–2 business days",
    cost: "Free on orders over E 7,500",
  },
];

const highlights = [
  { icon: Truck, title: "Same-day dispatch", desc: "Orders confirmed before 14:00 are dispatched the same business day." },
  { icon: MapPin, title: "Two delivery cities", desc: "Delivery and pickup available in Mbabane and Manzini only." },
  { icon: Clock, title: "Realistic timelines", desc: "Delivery estimates are provided before you confirm your order." },
  { icon: PackageCheck, title: "Tracked handover", desc: "You receive an order reference and status updates via WhatsApp." },
];

function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-brand-blue-dark text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Truck className="w-12 h-12 mx-auto mb-4 text-brand-red" />
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">Shipping & Delivery</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Fast, reliable delivery and pickup in Mbabane and Manzini only. Choose your preferred branch or have your order delivered straight to your door.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-6xl mx-auto px-4">
            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {highlights.map((h) => (
                <div key={h.title} className="bg-card border border-border p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow scroll-reveal">
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-lg flex items-center justify-center mb-4">
                    <h.icon className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="font-bold font-display text-lg mb-2">{h.title}</h3>
                  <p className="text-sm text-muted-foreground">{h.desc}</p>
                </div>
              ))}
            </div>

            {/* Delivery table */}
            <div className="overflow-hidden rounded-xl border border-border shadow-sm mb-12 scroll-reveal">
              <div className="bg-brand-blue text-white px-6 py-4">
                <h2 className="text-lg font-bold font-display">Delivery zones & estimates</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-secondary/70 text-left">
                    <tr>
                      <th className="px-6 py-3 font-semibold">Zone</th>
                      <th className="px-6 py-3 font-semibold">Coverage</th>
                      <th className="px-6 py-3 font-semibold">Estimated time</th>
                      <th className="px-6 py-3 font-semibold">Delivery cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {deliveryZones.map((z) => (
                      <tr key={z.zone} className="hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-foreground">{z.zone}</td>
                        <td className="px-6 py-4 text-muted-foreground">{z.areas}</td>
                        <td className="px-6 py-4 text-muted-foreground">{z.time}</td>
                        <td className="px-6 py-4 text-muted-foreground">{z.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Policy text */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8 scroll-reveal">
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display mb-3">Order processing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Orders placed through the website are prepared at the branch you selected (Mbabane or Manzini). You will receive a WhatsApp confirmation with your order reference and estimated ready/delivery time.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display mb-3">Pickup option</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    You can collect your order in person from your selected branch. Bring your order reference and a form of identification. Collection is free regardless of order value.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display mb-3">Delivery confirmation</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We contact you before dispatch and on the day of delivery. Please ensure someone is available to receive the package, or arrange an alternative with our team in advance.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display mb-3">Delays and force majeure</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    While we strive to meet every estimated timeline, delays may occur due to stock availability, weather, public holidays, or other events beyond our control. We will keep you informed.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-display mb-3">Other areas</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    For now we only deliver to Mbabane and Manzini. If you are outside these cities, contact us and we will let you know as soon as delivery expands to your area.
                  </p>
                </div>
              </div>

              <div className="mt-12 p-6 md:p-8 bg-secondary/50 rounded-xl border border-border scroll-reveal">
                <h2 className="text-xl font-bold font-display mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-brand-red" /> Need help with delivery?
                </h2>
                <p className="text-muted-foreground mb-4">
                  Contact us to confirm stock, arrange a courier, or get a custom delivery quote for large orders within Mbabane or Manzini.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="tel:+26876623733" className="text-brand-blue hover:text-brand-red transition-colors font-medium">
                    +268 7662 3733
                  </a>
                  <a href="mailto:ajapresd@gmail.com" className="text-brand-blue hover:text-brand-red transition-colors font-medium">
                    ajapresd@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Continue shopping
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
