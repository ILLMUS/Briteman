import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Shield, Mail, Phone } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
        title: "Privacy Policy | Online Store",
      },
      {
        name: "description",
        content:
          "Learn how Online Store collects, uses and protects personal information when you browse, create an account, place an order or contact us.",
      },
      {
        property: "og:title",
        content: "Privacy Policy | Online Store",
      },
      {
        property: "og:description",
        content:
          "Learn how Online Store handles personal information, cookies, orders and privacy requests.",
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
        content: "Privacy Policy | Online Store",
      },
      {
        name: "twitter:description",
        content:
          "Learn how Online Store handles personal information, cookies and online orders.",
      },
    ],
  }),

  component: PrivacyPage,
});

const sections = [
  {
    title: "1. Information we collect",
    body: `When you use Online Store, we may collect information such as your name, email address, phone number, delivery or collection details, order information, payment reference where applicable, account information, and messages you send to us through WhatsApp, email or other available communication channels. We may also collect technical information such as your IP address, browser type, device information and website activity to help us operate and improve the website.`,
  },
  {
    title: "2. How we use your information",
    body: `We use your information to create and manage your account, process and fulfil orders, communicate with you about purchases, arrange collection or delivery, provide after-sales support, respond to enquiries and improve our website and services. Where permitted and where you have provided the appropriate consent, we may also use your contact details to communicate information about promotions, products or new arrivals.`,
  },
  {
    title: "3. Cookies and local storage",
    body: `Online Store may use cookies and browser storage technologies to support essential website functions such as remembering your preferences, maintaining your cart, storing favourites and recording your cookie consent preference. Some technical information may also be used to understand how visitors interact with the website and to improve the shopping experience. You can manage or disable cookies through your browser settings, although some website features may not function correctly as a result.`,
  },
  {
    title: "4. WhatsApp and other communications",
    body: `When you choose to contact us through WhatsApp, email, telephone or another communication channel, information contained in your message may include product details, order information and contact information needed to respond to your request. WhatsApp and other third-party communication services operate under their own privacy policies and terms.`,
  },
  {
    title: "5. Orders and customer information",
    body: `Information associated with an order may be retained so that we can process the transaction, provide customer support, manage returns or refunds, maintain appropriate business records and respond to enquiries relating to the purchase. We only request information that is reasonably necessary for these purposes.`,
  },
  {
    title: "6. Data sharing and third parties",
    body: `We do not sell or rent your personal information. We may share relevant information with trusted service providers where reasonably necessary to operate the website, provide hosting or technical services, process payments, communicate with customers, arrange delivery or otherwise fulfil an order or service you have requested. Information shared for these purposes is limited to what is reasonably necessary.`,
  },
  {
    title: "7. Data security",
    body: `We use reasonable technical and organisational measures designed to protect personal information against unauthorised access, loss, misuse or disclosure. However, no website, internet transmission or electronic storage system can guarantee absolute security.`,
  },
  {
    title: "8. Your privacy rights",
    body: `Depending on the applicable law and circumstances, you may have rights relating to your personal information, including the ability to request access to, correction of, or deletion of information we hold about you. You may also contact us with questions or concerns about how your information is used.`,
  },
  {
    title: "9. Data retention",
    body: `We retain personal information for as long as reasonably necessary for the purposes for which it was collected, including order fulfilment, customer support, returns, refunds, accounting, legal or regulatory obligations and the resolution of disputes. Retention periods may therefore vary depending on the type of information and the reason it was collected.`,
  },
  {
    title: "10. Changes to this policy",
    body: `We may update this Privacy Policy from time to time to reflect changes to our website, services, technology or legal requirements. The updated version will be published on this page together with an updated effective date.`,
  },
];

function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/[0.07] bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <Shield className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
              Privacy Policy
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] md:text-[15px]">
              Your privacy matters to us. This policy explains how Online Store
              collects, uses and protects information when you use our website
              and services.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f7] py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Effective date */}
            <div className="mb-4 rounded-2xl border border-black/[0.07] bg-white px-5 py-4">
              <p className="text-[11px] leading-relaxed text-[#86868b]">
                <span className="font-semibold text-[#1d1d1f]">
                  Effective date:
                </span>{" "}
                {new Date().getFullYear()}. Online Store (“we”, “us” or “our”)
                operates this website and provides the associated online
                shopping and customer services.
              </p>
            </div>

            {/* Policy sections */}
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

            {/* Contact */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                <Shield className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Contact us about your privacy
              </h2>

              <p className="mt-2 max-w-2xl text-[12px] leading-6 text-[#86868b]">
                If you have questions about this Privacy Policy, want to
                request access to or correction of your information, or have a
                privacy concern, please contact the Online Store team.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="mailto:info@onlinestore.com"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
                >
                  <Mail className="h-3.5 w-3.5" strokeWidth={1.8} />
                  info@onlinestore.com
                </a>

                <a
                  href="tel:76265725"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                  76265725
                </a>

                <a
                  href="tel:76427025"
                  className="inline-flex items-center gap-2 rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
                >
                  <Phone className="h-3.5 w-3.5" strokeWidth={1.8} />
                  76427025
                </a>
              </div>
            </div>

            {/* Related policies */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <h2 className="text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Related policies
              </h2>

              <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                You may also want to review the other Online Store policies:
              </p>

              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                <Link
                  to="/terms"
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue"
                >
                  Terms of Service →
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
                  className="rounded-xl border border-black/[0.07] bg-[#f5f5f7] px-4 py-3 text-[11px] font-medium text-[#1d1d1f] transition-colors hover:bg-white hover:text-brand-blue"
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