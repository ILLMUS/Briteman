import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { FileText, Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Briteman Services Online Store" },
      { name: "description", content: "Read the Terms of Service for using the Briteman Services website, placing orders, and purchasing IT and electronics products in Eswatini." },
      { property: "og:title", content: "Terms of Service | Briteman Services" },
      { property: "og:description", content: "Terms and conditions for browsing, ordering and purchasing from Briteman Services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing or using the Briteman Services website and online store, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.`,
  },
  {
    title: "2. Use of the website",
    body: `You may browse, create an account, add items to your cart or favourites, and place orders through the website. You agree to provide accurate information and not to misuse the site, including attempting to interfere with its security or availability.`,
  },
  {
    title: "3. Account registration",
    body: `Some features require an account. You are responsible for keeping your login details secure and for all activity under your account. Notify us immediately if you suspect unauthorised access.`,
  },
  {
    title: "4. Product information and pricing",
    body: `We aim to display accurate product descriptions, images, prices and stock levels. However, errors may occur. We reserve the right to correct pricing errors, cancel orders placed at incorrect prices, and update stock availability without notice.`,
  },
  {
    title: "5. Orders and acceptance",
    body: `Placing an order via WhatsApp, cart checkout or any other channel does not guarantee acceptance. An order is only confirmed once we acknowledge it and provide an order reference. We may refuse or cancel orders for reasons including stock unavailability, pricing errors, or suspected fraud.`,
  },
  {
    title: "6. Payment",
    body: `Payment terms are agreed at checkout or via WhatsApp. Orders are prepared once payment has been received and confirmed. We accept the payment methods displayed during the order process.`,
  },
  {
    title: "7. Delivery and risk",
    body: `Delivery is subject to our Shipping Policy. Risk in the products passes to you upon delivery or collection, whichever occurs first.`,
  },
  {
    title: "8. Warranties and returns",
    body: `Warranty coverage and return conditions are described in our After-Sales Support page. Warranty periods vary by product and are stated on the product page or invoice.`,
  },
  {
    title: "9. Limitation of liability",
    body: `To the extent permitted by law, Briteman Services is not liable for indirect, incidental, or consequential damages arising from the use of the website or purchase of products. Our total liability is limited to the amount paid for the relevant product or service.`,
  },
  {
    title: "10. Governing law",
    body: `These Terms are governed by the laws of the Kingdom of Eswatini. Any disputes will be resolved in the courts of Eswatini.`,
  },
  {
    title: "11. Changes to terms",
    body: `We may update these Terms of Service at any time. Continued use of the website after changes constitutes acceptance of the revised terms.`,
  },
];

function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-brand-blue-dark text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Scale className="w-12 h-12 mx-auto mb-4 text-brand-red" />
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">Terms of Service</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              These terms govern your use of the Briteman Services website and online store. Please read them carefully before placing an order.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-10">
                Last updated: {new Date().getFullYear()}. By using this website, you agree to the following terms and conditions.
              </p>

              <div className="space-y-10">
                {sections.map((s) => (
                  <div key={s.title} className="scroll-reveal">
                    <h2 className="text-xl md:text-2xl font-bold font-display text-foreground mb-3">{s.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-14 p-6 md:p-8 bg-secondary/50 rounded-xl border border-border">
                <h2 className="text-xl font-bold font-display mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-red" /> Related policies
                </h2>
                <p className="text-muted-foreground mb-4">
                  These terms work together with our other policies:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><Link to="/privacy" className="text-brand-blue hover:text-brand-red transition-colors">Privacy Policy</Link></li>
                  <li><Link to="/shipping" className="text-brand-blue hover:text-brand-red transition-colors">Shipping Policy</Link></li>
                  <li><Link to="/after-sales" className="text-brand-blue hover:text-brand-red transition-colors">After-Sales Support & Warranty</Link></li>
                </ul>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Back to store
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
