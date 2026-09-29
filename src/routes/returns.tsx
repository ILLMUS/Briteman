import { createFileRoute, Link } from "@tanstack/react-router";
import {
  RotateCcw,
  ShieldCheck,
  Clock,
  PackageCheck,
  XCircle,
  MessageCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { Button } from "@/components/ui/button";
import { RETURN_REASONS, RETURN_WINDOW_DAYS } from "@/lib/returns";
import { WHATSAPP_LINK } from "@/lib/contact";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      {
        title: "Returns & Refunds Policy | Online Store",
      },
      {
        name: "description",
        content: `Online Store returns and refunds policy: eligible items may be returned within ${RETURN_WINDOW_DAYS} days, subject to the applicable return conditions.`,
      },
      {
        property: "og:title",
        content: "Returns & Refunds Policy | Online Store",
      },
      {
        property: "og:description",
        content:
          "Learn how returns, exchanges and refunds work at Online Store.",
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
        content: "Returns & Refunds Policy | Online Store",
      },
      {
        name: "twitter:description",
        content:
          "Learn how to request a return, exchange or refund from Online Store.",
      },
    ],
  }),

  component: ReturnsPage,
});

const STEPS = [
  {
    icon: MessageCircle,
    title: "1. Contact us",
    desc: `Contact the Online Store team within ${RETURN_WINDOW_DAYS} days of receiving or collecting your item and provide your order details.`,
  },
  {
    icon: PackageCheck,
    title: "2. Prepare the item",
    desc: "Keep the product, accessories, cables, manuals and original packaging together where possible.",
  },
  {
    icon: ShieldCheck,
    title: "3. We assess",
    desc: "We'll review the return request and inspect the item where necessary before confirming the available resolution.",
  },
  {
    icon: RotateCcw,
    title: "4. Resolution",
    desc: "Depending on the circumstances, the outcome may include a repair, replacement, exchange, store credit or refund.",
  },
];

function ReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/[0.07] bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <RotateCcw className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Online Store
            </div>

            <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
              Returns &amp; Refunds
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] md:text-[15px]">
              We want you to be comfortable with your purchase. Eligible
              products can be returned within {RETURN_WINDOW_DAYS} days,
              subject to the conditions outlined below.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f7] py-14 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            {/* Return process */}
            <div className="grid overflow-hidden rounded-3xl border border-black/[0.07] bg-black/[0.07] sm:grid-cols-2">
              {STEPS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="flex gap-4 bg-white p-6 sm:p-7"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    <Icon className="h-[17px] w-[17px]" strokeWidth={1.8} />
                  </div>

                  <div>
                    <h2 className="text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                      {title}
                    </h2>

                    <p className="mt-2 text-[12px] leading-[1.65] text-[#86868b]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Return window */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                <Clock className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Return window
              </h2>

              <p className="mt-3 text-[12px] leading-6 text-[#86868b]">
                You have {RETURN_WINDOW_DAYS} days from delivery or collection
                to request a return on an eligible online order. Products
                covered by a separate manufacturer or supplier warranty may
                remain subject to that warranty's terms after the return
                window closes.
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#86868b]">
                For more information about support after your purchase, see
                our{" "}
                <Link
                  to="/after-sales"
                  className="font-medium text-brand-blue transition-colors hover:underline"
                >
                  after-sales support
                </Link>
                .
              </p>
            </div>

            {/* Accepted reasons */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Eligibility
              </div>

              <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Accepted return reasons
              </h2>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {RETURN_REASONS.map((reason) => (
                  <li
                    key={reason}
                    className="flex items-start gap-3 rounded-xl bg-[#f5f5f7] px-4 py-3 text-[12px] leading-relaxed text-[#6e6e73]"
                  >
                    <PackageCheck
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                      strokeWidth={1.8}
                    />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-[11px] leading-6 text-[#86868b]">
                Return requests are recorded against the relevant order so
                that the customer and Online Store team can keep track of the
                request and its outcome.
              </p>
            </div>

            {/* Not accepted */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                <XCircle className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                What we generally cannot accept
              </h2>

              <ul className="mt-5 space-y-3">
                <li className="flex gap-3 text-[12px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                  Items with physical damage, liquid damage or burn marks
                  caused after delivery or collection.
                </li>

                <li className="flex gap-3 text-[12px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                  Software or licence keys that have already been activated.
                </li>

                <li className="flex gap-3 text-[12px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                  Consumables or hygiene-sensitive items that have been opened
                  where applicable.
                </li>

                <li className="flex gap-3 text-[12px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                  Products returned without reasonable proof of purchase.
                </li>

                <li className="flex gap-3 text-[12px] leading-relaxed text-[#6e6e73]">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#86868b]" />
                  Change-of-mind returns where the product has been used,
                  damaged or is no longer in an acceptable return condition.
                </li>
              </ul>
            </div>

            {/* Refunds */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Refunds
              </div>

              <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                Refund process
              </h2>

              <p className="mt-4 text-[12px] leading-6 text-[#86868b]">
                Once a return has been assessed and approved, the available
                refund or alternative resolution will be communicated to you.
                Refund timing and method may depend on the original payment
                method and the circumstances of the return.
              </p>

              <p className="mt-3 text-[12px] leading-6 text-[#86868b]">
                Where a return is required because the wrong, damaged or
                defective item was supplied, please contact us as soon as
                possible so that we can assist with the appropriate next
                steps.
              </p>
            </div>

            {/* Contact CTA */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    <MessageCircle
                      className="h-[18px] w-[18px]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                    Need to return something?
                  </h2>

                  <p className="mt-2 max-w-xl text-[12px] leading-6 text-[#86868b]">
                    Contact Online Store with your order number and a short
                    description of the issue. Our team will guide you through
                    the next steps.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    asChild
                    className="rounded-full bg-[#1d1d1f] px-5 text-[11px] font-semibold hover:bg-brand-blue"
                  >
                    <a
                      href={WHATSAPP_LINK(
                        "Hi Online Store, I'd like to return an item I bought online.",
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <MessageCircle className="mr-1.5 h-4 w-4" />
                      Start a Return
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-black/[0.09] px-5 text-[11px] font-semibold"
                  >
                    <Link to="/orders">My Orders</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/deals"
                className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-7 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
              >
                Continue Shopping
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