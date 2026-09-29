import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { FileText, Scale } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
        title: "Terms of Service | Online Store",
      },
      {
        name: "description",
        content:
          "Read the Terms of Service for using Online Store, browsing products, creating an account, placing orders and purchasing electronics in Eswatini.",
      },
      {
        property: "og:title",
        content: "Terms of Service | Online Store",
      },
      {
        property: "og:description",
        content:
          "Terms and conditions for browsing, ordering and purchasing products from Online Store.",
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
        content: "Terms of Service | Online Store",
      },
      {
        name: "twitter:description",
        content:
          "Terms and conditions for using Online Store and placing orders.",
      },
    ],
  }),

  component: TermsPage,
});

const sections = [
  {
    title: "1. Acceptance of terms",
    body: `By accessing or using the Online Store website and services, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use the website or place an order through it.`,
  },
  {
    title: "2. Use of the website",
    body: `You may browse products, create an account, add items to your cart or favourites, and place orders through the website. You agree to provide accurate information and to use the website lawfully. You must not misuse the website, interfere with its operation, or attempt to compromise its security or availability.`,
  },
  {
    title: "3. Account registration",
    body: `Some features require an account. You are responsible for keeping your login credentials secure and for activity carried out through your account. If you believe your account has been accessed without your permission, contact us as soon as possible.`,
  },
  {
    title: "4. Product information and pricing",
    body: `We aim to provide accurate product names, descriptions, images, specifications, prices and stock information. However, errors or omissions may occur. We reserve the right to correct information, update stock availability and correct pricing errors. Where an order has been affected by a significant pricing or stock error, we may contact you before confirming the order or cancel the affected order.`,
  },
  {
    title: "5. Orders and acceptance",
    body: `Submitting an order through the website, WhatsApp, cart or another available ordering channel does not automatically constitute acceptance of the order. An order is confirmed once Online Store acknowledges the order and provides confirmation or an order reference. We may decline or cancel an order where a product is unavailable, information is incorrect, a pricing error has occurred, or there are reasonable concerns regarding fraudulent or unauthorised activity.`,
  },
  {
    title: "6. Payment",
    body: `Payment arrangements are confirmed during the order process. You are responsible for providing accurate payment information and completing any required payment before an order is prepared, where applicable. Available payment methods may vary and will be communicated or displayed during the ordering process.`,
  },
  {
    title: "7. Delivery and collection",
    body: `Delivery and collection arrangements are subject to our Delivery & Collection policy. Online orders may be collected from our Manzini location. Where delivery is available, applicable delivery charges, timing and arrangements will be confirmed with you before the order is finalised.`,
  },
  {
    title: "8. Returns, refunds and warranties",
    body: `Returns and refunds are subject to our Returns & Refunds Policy. Where a product is covered by a manufacturer, supplier or store warranty, the applicable warranty terms will apply. Warranty coverage can vary by product and may be stated on the product page, invoice, warranty documentation or other purchase documentation.`,
  },
  {
    title: "9. Limitation of liability",
    body: `To the extent permitted by applicable law, Online Store will not be liable for indirect, incidental or consequential losses arising from the use of the website or the purchase or use of products. Nothing in these terms is intended to exclude or limit any liability that cannot lawfully be excluded or limited.`,
  },
  {
    title: "10. Governing law",
    body: `These Terms of Service are governed by the laws of the Kingdom of Eswatini. Where a dispute cannot be resolved directly between the parties, it will be subject to the applicable courts and legal processes of Eswatini.`,
  },
  {
    title: "11. Changes to these terms",
    body: `We may update these Terms of Service from time to time to reflect changes to our services, website or policies. The updated version will be published on this page. Continued use of the website after an update constitutes acceptance of the revised terms to the extent permitted by applicable law.`,
  },
];

function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/[0.07] bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <Scale className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
              Terms of Service
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] md:text-[15px]">
              These terms explain the rules that apply when you browse Online
              Store, create an account, place an order or purchase products
              from us.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f7] py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Last updated */}
            <div className="mb-4 rounded-2xl border border-black/[0.07] bg-white px-5 py-4">
              <p className="text-[11px] leading-relaxed text-[#86868b]">
                <span className="font-semibold text-[#1d1d1f]">
                  Last updated:
                </span>{" "}
                {new Date().getFullYear()}. By using this website, you agree
                to the applicable terms and conditions described below.
              </p>
            </div>

            {/* Terms */}
            <div className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white">
              <div className="divide-y divide-black/[0.07]">
                {sections.map((section) => (
                  <section
                    key={section.title}
                    className="px-6 py-7 sm:px-8 sm:py-9"
                  >
                    <h2 className="text-[16px] font-semibold tracking-[-0.02em] text-[#1d1d1f] sm:text-[17px]">
                      {section.title}
                    </h2>

                    <p className="mt-3 text-[12px] leading-[1.8] text-[#6e6e73] sm:text-[13px]">
                      {section.body}
                    </p>
                  </section>
                ))}
              </div>
            </div>

            {/* Related policies */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                <FileText className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Related policies
              </h2>

              <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                These terms should be read together with our other store
                policies:
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <Link
                  to="/privacy"
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue"
                >
                  Privacy Policy →
                </Link>

                <Link
                  to="/shipping"
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue"
                >
                  Delivery & Collection →
                </Link>

                <Link
                  to="/returns"
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue"
                >
                  Returns & Refunds →
                </Link>

                <Link
                  to="/after-sales"
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue sm:col-span-3"
                >
                  After-Sales Support →
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <Link
                to="/deals"
                className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-7 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
              >
                Back to Store
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