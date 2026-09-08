import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Shield, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Briteman Services Online Store" },
      { name: "description", content: "Learn how Briteman Services collects, uses and protects your personal information when you browse, order or create an account on our online store." },
      { property: "og:title", content: "Privacy Policy | Briteman Services" },
      { property: "og:description", content: "How Briteman Services handles your data, cookies, WhatsApp orders and your privacy rights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information we collect",
    body: `When you use the Briteman Services online store, we may collect: your name, email address, phone number, delivery address, order details, payment reference (where applicable), and any messages you send via WhatsApp or email. We also collect technical data such as your IP address, browser type, and device information to help us improve the site.`,
  },
  {
    title: "2. How we use your information",
    body: `We use your information to process and deliver orders, communicate with you about your purchase, provide after-sales support, send order updates, and improve our website experience. With your consent, we may also contact you about promotions or new arrivals.`,
  },
  {
    title: "3. Cookies and tracking",
    body: `Our website uses cookies to remember your branch selection (Mbabane or Manzini), cart contents, favourites, and to understand how visitors use the site. You can disable cookies in your browser settings, but some features such as cart persistence may not work correctly.`,
  },
  {
    title: "4. WhatsApp orders",
    body: `When you click "Order on WhatsApp", your selected products, branch preference and message are sent through WhatsApp to our sales team. This information is handled in accordance with this Privacy Policy and is only used to fulfil your request.`,
  },
  {
    title: "5. Data sharing and third parties",
    body: `We do not sell or rent your personal information. We only share data with trusted service providers who help us operate the website, process payments, or deliver orders, and only to the extent necessary for those purposes.`,
  },
  {
    title: "6. Data security",
    body: `We implement reasonable technical and organisational measures to protect your data from unauthorised access, loss, or misuse. However, no online platform can guarantee complete security.`,
  },
  {
    title: "7. Your rights",
    body: `You have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us using the details below.`,
  },
  {
    title: "8. Changes to this policy",
    body: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.`,
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-brand-blue-dark text-white py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-brand-red" />
            <h1 className="text-3xl md:text-5xl font-bold font-display mb-4">Privacy Policy</h1>
            <p className="text-white/80 max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how Briteman Services collects, uses and protects your information when you use our online store.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-10">
                Effective date: {new Date().getFullYear()}. Briteman Services (“we”, “us”, or “our”) operates the Briteman Services website and online store.
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
                <h2 className="text-xl font-bold font-display mb-4">Contact us about your privacy</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or how we handle your data, please reach out.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="mailto:ajapresd@gmail.com" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-red transition-colors">
                    <Mail className="w-4 h-4" /> ajapresd@gmail.com
                  </a>
                  <a href="tel:+26876623733" className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-red transition-colors">
                    <Phone className="w-4 h-4" /> +268 7662 3733
                  </a>
                </div>
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
