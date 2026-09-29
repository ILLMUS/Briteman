import {
  MapPin,
  CreditCard,
  ShoppingBag,
  PackageCheck,
} from "lucide-react";
import heroStore from "@/assets/hero-store.jpg";

const HIGHLIGHTS = [
  {
    icon: ShoppingBag,
    title: "Shop Online",
    desc: "Browse electronics and everyday tech from wherever you are.",
  },
  {
    icon: CreditCard,
    title: "Flexible Payments",
    desc: "Choose from convenient payment options when placing your order.",
  },
  {
    icon: PackageCheck,
    title: "Order & Collect",
    desc: "Order online and arrange convenient collection from our Manzini location.",
  },
  {
    icon: MapPin,
    title: "Manzini",
    desc: "Visit us in Manzini for collection, enquiries and product assistance.",
  },
];

export function StoreExperienceSection() {
  return (
    <section
      id="store"
      className="bg-white py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">

        {/* =====================================================
            STORE IMAGE
        ===================================================== */}

        <div className="relative overflow-hidden rounded-3xl bg-[#f5f5f7]">

          <div className="aspect-[4/3]">
            <img
              src={heroStore}
              alt="Online Store in Manzini"
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                hover:scale-[1.02]
              "
              loading="lazy"
            />
          </div>

          {/* Image overlay */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              h-40
              bg-gradient-to-t
              from-black/65
              via-black/20
              to-transparent
            "
          />

          {/* Location */}

          <div className="absolute bottom-5 left-5 text-white sm:bottom-6 sm:left-6">
            <div className="mb-1 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <MapPin className="h-3.5 w-3.5" />
              Visit Us
            </div>

            <div className="text-xl font-semibold tracking-tight sm:text-2xl">
              Online Store · Manzini
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div>

          {/* Eyebrow */}

          <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Shop With Us
          </div>

          {/* Heading */}

          <h2
            className="
              max-w-xl
              text-3xl
              font-semibold
              leading-[1.08]
              tracking-[-0.035em]
              text-[#1d1d1f]
              md:text-4xl
              lg:text-5xl
            "
          >
            Technology made
            <br />
            simple.
          </h2>

          {/* Description */}

          <p
            className="
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-[#6e6e73]
              md:text-[15px]
            "
          >
            Browse phones, computers, televisions, appliances, audio,
            cameras, office equipment and accessories from one convenient
            online store. Order online and collect from our Manzini location.
          </p>

          {/* Highlights */}

          <div
            className="
              mt-8
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
            "
          >
            {HIGHLIGHTS.map(
              ({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="
                    rounded-2xl
                    border
                    border-black/[0.07]
                    bg-[#f5f5f7]
                    p-4
                    transition-all
                    duration-300
                    hover:border-black/[0.12]
                    hover:bg-white
                    hover:shadow-[0_12px_35px_-25px_rgba(0,0,0,0.25)]
                  "
                >
                  <div
                    className="
                      mb-3
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#1d1d1f]
                      shadow-sm
                    "
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="text-[13px] font-semibold text-[#1d1d1f]">
                    {title}
                  </div>

                  <div
                    className="
                      mt-1
                      text-[11px]
                      leading-[1.5]
                      text-[#86868b]
                    "
                  >
                    {desc}
                  </div>
                </div>
              ),
            )}
          </div>

          {/* Actions */}

          <div className="mt-7 flex flex-wrap items-center gap-3">

            <a
              href="/shop"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                bg-[#1d1d1f]
                px-6
                py-3
                text-[11px]
                font-semibold
                text-white
                transition-all
                duration-200
                hover:bg-brand-blue
                active:scale-[0.98]
              "
            >
              Shop Online
            </a>

            <a
              href="/contact"
              className="
                inline-flex
                items-center
                justify-center
                rounded-full
                border
                border-black/[0.09]
                bg-white
                px-6
                py-3
                text-[11px]
                font-semibold
                text-[#1d1d1f]
                transition-all
                duration-200
                hover:bg-[#f5f5f7]
                active:scale-[0.98]
              "
            >
              Contact Us
            </a>
          </div>

          {/* Contact information */}

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-[#86868b]">
            <a
              href="tel:76265725"
              className="transition-colors hover:text-[#1d1d1f]"
            >
              76265725
            </a>

            <a
              href="tel:76427025"
              className="transition-colors hover:text-[#1d1d1f]"
            >
              76427025
            </a>

            <a
              href="mailto:info@onlinestore.com"
              className="transition-colors hover:text-[#1d1d1f]"
            >
              info@onlinestore.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}