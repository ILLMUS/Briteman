import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import {
  Truck,
  MapPin,
  Clock,
  PackageCheck,
  Phone,
  ShoppingBag,
} from "lucide-react";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      {
        title: "Delivery & Collection | Online Store",
      },
      {
        name: "description",
        content:
          "Learn how delivery and collection work at Online Store. Order electronics online and arrange collection in Manzini or contact us to discuss delivery.",
      },
      {
        property: "og:title",
        content: "Delivery & Collection | Online Store",
      },
      {
        property: "og:description",
        content:
          "Order online and arrange collection in Manzini. Contact Online Store for delivery options and order assistance.",
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
        content: "Delivery & Collection | Online Store",
      },
      {
        name: "twitter:description",
        content:
          "Order online, arrange collection in Manzini or contact Online Store about delivery options.",
      },
    ],
  }),

  component: ShippingPage,
});

const OPTIONS = [
  {
    icon: ShoppingBag,
    title: "Order Online",
    desc: "Browse our catalogue, select the products you need and place your order online.",
  },
  {
    icon: PackageCheck,
    title: "Order & Collect",
    desc: "Arrange convenient collection from our Online Store location in Manzini.",
  },
  {
    icon: Truck,
    title: "Delivery Enquiries",
    desc: "Contact our team to discuss delivery availability, timing and applicable charges for your order.",
  },
  {
    icon: Clock,
    title: "Order Updates",
    desc: "We'll communicate with you regarding your order and the next steps before collection or delivery.",
  },
];

function ShippingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-black/[0.07] bg-white py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="mx-auto mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
              <Truck className="h-5 w-5" strokeWidth={1.8} />
            </div>

            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Delivery & Collection
            </div>

            <h1 className="text-3xl font-semibold leading-[1.08] tracking-[-0.04em] text-[#1d1d1f] md:text-5xl">
              Order online.
              <br />
              Collect in Manzini.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#6e6e73] md:text-[15px]">
              Shop your electronics online and choose the most convenient way
              to receive your order. Collection is available from our Manzini
              location, while delivery arrangements can be discussed with our
              team.
            </p>
          </div>
        </section>

        <section className="bg-[#f5f5f7] py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            {/* Options */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {OPTIONS.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-black/[0.07] bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.11] hover:shadow-[0_18px_45px_-28px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f] transition-colors duration-300 group-hover:bg-brand-blue group-hover:text-white">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </div>

                  <h2 className="mt-5 text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">
                    {title}
                  </h2>

                  <p className="mt-2 text-[12px] leading-[1.65] text-[#86868b]">
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Collection */}
            <div className="mt-4 overflow-hidden rounded-3xl border border-black/[0.07] bg-white">
              <div className="grid md:grid-cols-[0.9fr_1.1fr]">
                <div className="border-b border-black/[0.07] p-7 sm:p-9 md:border-b-0 md:border-r">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    <MapPin className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </div>

                  <div className="mt-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                    Collection
                  </div>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                    Collect in Manzini.
                  </h2>

                  <p className="mt-3 text-[12px] leading-6 text-[#86868b]">
                    Place your order online and contact our team to arrange a
                    convenient collection time from our Manzini location.
                  </p>

                  <div className="mt-6 rounded-2xl bg-[#f5f5f7] p-5">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1d1d1f]">
                      Collection location
                    </div>

                    <div className="mt-2 flex items-start gap-3">
                      <MapPin
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue"
                        strokeWidth={1.8}
                      />

                      <div>
                        <p className="text-[13px] font-medium text-[#1d1d1f]">
                          Online Store
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#86868b]">
                          Manzini, Eswatini
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-7 sm:p-9">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                    How it works
                  </div>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                    A simple ordering process.
                  </h2>

                  <div className="mt-7 space-y-6">
                    <div className="flex gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-semibold text-white">
                        1
                      </div>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                          Choose your products
                        </h3>
                        <p className="mt-1 text-[11px] leading-[1.6] text-[#86868b]">
                          Browse phones, computers, TVs, appliances, audio,
                          cameras, accessories and other products.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-semibold text-white">
                        2
                      </div>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                          Place your order
                        </h3>
                        <p className="mt-1 text-[11px] leading-[1.6] text-[#86868b]">
                          Submit your order online and our team will assist
                          with confirming the order details.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-semibold text-white">
                        3
                      </div>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                          Confirm collection or delivery
                        </h3>
                        <p className="mt-1 text-[11px] leading-[1.6] text-[#86868b]">
                          We'll confirm the next steps with you, including
                          collection arrangements or available delivery
                          options.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-semibold text-white">
                        4
                      </div>

                      <div>
                        <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                          Receive your order
                        </h3>
                        <p className="mt-1 text-[11px] leading-[1.6] text-[#86868b]">
                          Collect your order in Manzini or receive it through
                          the agreed delivery arrangement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery information */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="mx-auto max-w-3xl">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  Delivery Information
                </div>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-[#1d1d1f]">
                  Delivery arrangements
                </h2>

                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                      Availability
                    </h3>
                    <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                      Delivery availability depends on the order, product,
                      destination and current delivery arrangements. Contact
                      us before placing an order if you need delivery.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                      Delivery cost
                    </h3>
                    <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                      Any applicable delivery charge will be confirmed with
                      you before your order is finalised.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                      Delivery timing
                    </h3>
                    <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                      Delivery timing will be communicated when your order is
                      confirmed. Product availability, destination and other
                      logistical factors may affect the estimated timeframe.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                      Large or business orders
                    </h3>
                    <p className="mt-2 text-[12px] leading-6 text-[#86868b]">
                      For larger orders, office equipment, school supplies or
                      business requirements, contact our team to discuss
                      delivery and collection arrangements.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-4 rounded-3xl border border-black/[0.07] bg-white p-7 sm:p-9">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                    <Phone className="h-[18px] w-[18px]" strokeWidth={1.8} />
                  </div>

                  <h2 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                    Need help with delivery?
                  </h2>

                  <p className="mt-2 max-w-xl text-[12px] leading-6 text-[#86868b]">
                    Contact Online Store to confirm product availability,
                    collection arrangements or delivery options for your order.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href="tel:76265725"
                    className="inline-flex items-center justify-center rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
                  >
                    76265725
                  </a>

                  <a
                    href="tel:76427025"
                    className="inline-flex items-center justify-center rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
                  >
                    76427025
                  </a>

                  <a
                    href="mailto:info@onlinestore.com"
                    className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-5 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-brand-blue"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>

            {/* CTA */}
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