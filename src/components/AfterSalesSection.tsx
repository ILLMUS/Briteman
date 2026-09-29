import {
  ShieldCheck,
  Settings,
  RefreshCw,
  MessageCircle,
  Wrench,
  Headphones,
} from "lucide-react";

const ITEMS = [
  {
    icon: Settings,
    title: "Device Setup",
    desc: "Need help getting started? We can assist with setup and basic configuration.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Support",
    desc: "Eligible products are supported according to their applicable supplier or store warranty.",
  },
  {
    icon: Headphones,
    title: "Product Guidance",
    desc: "Get help understanding your device and choosing the right accessories for it.",
  },
  {
    icon: RefreshCw,
    title: "Returns & Support",
    desc: "If there is a problem with your purchase, contact us so we can guide you through the next steps.",
  },
  {
    icon: Wrench,
    title: "Technical Assistance",
    desc: "Our team can help with product questions, basic troubleshooting and support enquiries.",
  },
  {
    icon: MessageCircle,
    title: "Easy to Reach",
    desc: "Contact Online Store by phone, email or through our available online channels.",
  },
];

export function AfterSalesSection() {
  return (
    <section
      id="support"
      className="bg-[#f5f5f7] py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mx-auto max-w-2xl text-center">

          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Support After Your Purchase
          </div>

          <h2
            className="
              text-3xl
              font-semibold
              leading-[1.08]
              tracking-[-0.035em]
              text-[#1d1d1f]
              md:text-4xl
            "
          >
            We’re here when
            <br />
            you need us.
          </h2>

          <p
            className="
              mt-4
              text-sm
              leading-7
              text-[#6e6e73]
              md:text-[15px]
            "
          >
            Buying your technology is only part of the experience. Online
            Store provides practical support, product guidance and assistance
            when you need help after your purchase.
          </p>
        </div>

        {/* =====================================================
            SUPPORT CARDS
        ===================================================== */}

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

          {ITEMS.map(
            ({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="
                  group
                  rounded-2xl
                  border
                  border-black/[0.07]
                  bg-white
                  p-6
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:border-black/[0.11]
                  hover:shadow-[0_18px_45px_-28px_rgba(0,0,0,0.3)]
                "
              >

                {/* Icon */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f7]
                    text-[#1d1d1f]
                    transition-all
                    duration-300
                    group-hover:bg-brand-blue
                    group-hover:text-white
                  "
                >
                  <Icon
                    className="h-[18px] w-[18px]"
                    strokeWidth={1.8}
                  />
                </div>

                {/* Content */}

                <h3
                  className="
                    mt-5
                    text-[14px]
                    font-semibold
                    tracking-[-0.01em]
                    text-[#1d1d1f]
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    mt-2
                    text-[12px]
                    leading-[1.65]
                    text-[#86868b]
                  "
                >
                  {desc}
                </p>
              </div>
            ),
          )}
        </div>

        {/* =====================================================
            CONTACT STRIP
        ===================================================== */}

        <div
          className="
            mt-4
            flex
            flex-col
            items-start
            justify-between
            gap-4
            rounded-2xl
            border
            border-black/[0.07]
            bg-white
            px-6
            py-5
            sm:flex-row
            sm:items-center
          "
        >
          <div>
            <p className="text-[13px] font-semibold text-[#1d1d1f]">
              Need help with your order?
            </p>

            <p className="mt-1 text-[11px] text-[#86868b]">
              Contact the Online Store team and we’ll help point you in the
              right direction.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">

            <a
              href="tel:76265725"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-black/[0.09]
                px-4
                py-2.5
                text-[11px]
                font-semibold
                text-[#1d1d1f]
                transition-colors
                hover:bg-[#f5f5f7]
              "
            >
              76265725
            </a>

            <a
              href="mailto:info@onlinestore.com"
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-[#1d1d1f]
                px-4
                py-2.5
                text-[11px]
                font-semibold
                text-white
                transition-colors
                hover:bg-brand-blue
              "
            >
              <MessageCircle
                className="h-3.5 w-3.5"
                strokeWidth={1.8}
              />
              Contact Us
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}