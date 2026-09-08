import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw, ShieldCheck, Clock, PackageCheck, XCircle, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { RETURN_REASONS, RETURN_WINDOW_DAYS } from "@/lib/returns";
import { WHATSAPP_LINK } from "@/lib/contact";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & Refunds Policy | Briteman Services" },
      {
        name: "description",
        content: `Briteman Services online store returns policy: ${RETURN_WINDOW_DAYS}-day returns on eligible items, free replacement of defective devices in Mbabane and Manzini.`,
      },
      { property: "og:title", content: "Returns & Refunds Policy — Briteman Services" },
      { property: "og:description", content: "How to return or exchange an item bought from the Briteman Services online store." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReturnsPage,
});

const STEPS = [
  { icon: MessageCircle, title: "1. Tell us", desc: "Message us on WhatsApp or visit a branch within " + RETURN_WINDOW_DAYS + " days of receiving your item, with your order details." },
  { icon: PackageCheck, title: "2. Bring the item", desc: "Return the product with all accessories, cables and the original packaging where possible." },
  { icon: ShieldCheck, title: "3. We inspect", desc: "Our technicians check the item, usually within 48 hours, and confirm the outcome with you." },
  { icon: RotateCcw, title: "4. Repair, swap or refund", desc: "You get a repair, a replacement unit, store credit or a refund to your original payment method." },
];

function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-brand-blue text-white py-14">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-white/70 mb-2">Online Store</div>
            <h1 className="font-display text-3xl md:text-4xl font-bold">Returns &amp; Refunds Policy</h1>
            <p className="text-white/80 mt-3 max-w-2xl">
              Shop with confidence. Eligible items bought from our online store can be returned or exchanged
              within {RETURN_WINDOW_DAYS} days, and every device carries a written warranty.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 space-y-12">
          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {STEPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white p-6 flex gap-4">
                <div className="w-11 h-11 bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display text-base font-bold mb-1">{title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-red" /> Return window
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              You have {RETURN_WINDOW_DAYS} days from delivery or collection to request a return on an online
              order. Faulty devices remain covered by their 3–12 month warranty even after the return window
              closes — see our <Link to="/after-sales" className="text-brand-blue underline">after-sales support</Link>.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Accepted return reasons</h2>
            <ul className="grid sm:grid-cols-2 gap-2">
              {RETURN_REASONS.map((r) => (
                <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <PackageCheck className="w-4 h-4 text-brand-blue mt-0.5 shrink-0" /> {r}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-3">
              Every return we process is recorded against your order with the reason, so you and our team
              always see the same history.
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-brand-red" /> What we cannot accept
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-muted-foreground text-sm">
              <li>Items with physical damage, liquid damage or burn marks caused after delivery.</li>
              <li>Software or licence keys that have already been activated.</li>
              <li>Consumables and hygiene items (earphones, ink, batteries) once opened.</li>
              <li>Products returned without proof of purchase.</li>
              <li>Change-of-mind returns on items that have been opened or used.</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-3">Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Approved refunds are issued to the original payment method within 7 working days of inspection.
              Delivery fees are refunded only when the return is caused by a fault on our side (wrong, damaged
              or defective item). Returns are handled at our Mbabane and Manzini branches.
            </p>
          </div>

          <div className="border border-border p-6 bg-muted/30 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <div>
              <div className="font-display text-lg font-bold">Need to return something?</div>
              <p className="text-sm text-muted-foreground">Message us on WhatsApp with your order number and we'll take it from there.</p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="bg-whatsapp hover:bg-whatsapp/90">
                <a href={WHATSAPP_LINK("Hi Briteman Services, I'd like to return an item I bought online.")} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1 h-4 w-4" /> Start a return
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link to="/orders">My orders</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
