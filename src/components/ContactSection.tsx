import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
} from "lucide-react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/contact";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useAuthGate } from "@/hooks/useAuthGate";

const STORE = {
  name: "Online Store",
  location: "Manzini",
  phone: "76265725",
  phoneSecondary: "76427025",
  email: "info@onlinestore.com",
};

export function ContactSection() {
  const [sent, setSent] = useState(false);

  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const gate = useAuthGate();

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
  ) {
    e.preventDefault();

    if (loading) return;

    if (!user) {
      navigate({
        to: "/auth",
        search: {
          mode: "login",
        },
      });

      return;
    }

    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");

    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;

    window.location.href =
      `mailto:${STORE.email}` +
      `?subject=Online%20Store%20Enquiry` +
      `&body=${body}`;

    setSent(true);
  }

  return (
    <section
      id="contact"
      className="
        border-t
        border-black/[0.07]
        bg-[#f5f5f7]
        py-16
        md:py-20
      "
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* =====================================================
            SECTION INTRO
        ===================================================== */}

        <div className="mx-auto mb-10 max-w-2xl text-center">

          <div
            className="
              mb-3
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-brand-blue
            "
          >
            Get In Touch
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
            We're here to help.
          </h2>

          <p
            className="
              mx-auto
              mt-4
              max-w-xl
              text-sm
              leading-7
              text-[#6e6e73]
              md:text-[15px]
            "
          >
            Have a question about a product, an order or collection?
            Contact the Online Store team and we'll help you find the
            information you need.
          </p>
        </div>

        {/* =====================================================
            CONTACT CONTENT
        ===================================================== */}

        <div
          className="
            grid
            overflow-hidden
            rounded-3xl
            border
            border-black/[0.07]
            bg-white
            lg:grid-cols-[0.85fr_1.15fr]
          "
        >

          {/* ===================================================
              CONTACT INFORMATION
          ==================================================== */}

          <div
            className="
              border-b
              border-black/[0.07]
              lg:border-b-0
              lg:border-r
            "
          >

            {/* Header */}

            <div className="px-6 py-7 sm:px-8">

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
                "
              >
                <MessageCircle
                  className="h-[18px] w-[18px]"
                  strokeWidth={1.8}
                />
              </div>

              <div
                className="
                  mt-5
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-brand-blue
                "
              >
                Contact Online Store
              </div>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-semibold
                  tracking-[-0.025em]
                  text-[#1d1d1f]
                "
              >
                Let's talk.
              </h3>

              <p
                className="
                  mt-2
                  text-[12px]
                  leading-6
                  text-[#86868b]
                "
              >
                We're available to assist with products, orders,
                collection and general enquiries.
              </p>
            </div>

            {/* Details */}

            <div
              className="
                border-t
                border-black/[0.07]
                divide-y
                divide-black/[0.07]
              "
            >

              {/* Location */}

              <div className="flex gap-4 px-6 py-5 sm:px-8">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f7]
                    text-[#1d1d1f]
                  "
                >
                  <MapPin
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <div
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#1d1d1f]
                    "
                  >
                    Location
                  </div>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      leading-relaxed
                      text-[#6e6e73]
                    "
                  >
                    {STORE.location}
                    <br />
                    Eswatini
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex gap-4 px-6 py-5 sm:px-8">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f7]
                    text-[#1d1d1f]
                  "
                >
                  <Phone
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <div
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#1d1d1f]
                    "
                  >
                    Phone
                  </div>

                  <div className="mt-1 flex flex-col gap-1">

                    <a
                      href="tel:76265725"
                      className="
                        text-[12px]
                        text-[#6e6e73]
                        transition-colors
                        hover:text-brand-blue
                      "
                    >
                      {STORE.phone}
                    </a>

                    <a
                      href="tel:76427025"
                      className="
                        text-[12px]
                        text-[#6e6e73]
                        transition-colors
                        hover:text-brand-blue
                      "
                    >
                      {STORE.phoneSecondary}
                    </a>

                  </div>
                </div>
              </div>

              {/* Email */}

              <div className="flex gap-4 px-6 py-5 sm:px-8">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f7]
                    text-[#1d1d1f]
                  "
                >
                  <Mail
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div className="min-w-0">

                  <div
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#1d1d1f]
                    "
                  >
                    Email
                  </div>

                  <a
                    href={`mailto:${STORE.email}`}
                    className="
                      mt-1
                      block
                      break-all
                      text-[12px]
                      text-[#6e6e73]
                      transition-colors
                      hover:text-brand-blue
                    "
                  >
                    {STORE.email}
                  </a>

                </div>
              </div>

              {/* Hours */}

              <div className="flex gap-4 px-6 py-5 sm:px-8">

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f5f5f7]
                    text-[#1d1d1f]
                  "
                >
                  <Clock
                    className="h-4 w-4"
                    strokeWidth={1.8}
                  />
                </div>

                <div>

                  <div
                    className="
                      text-[10px]
                      font-semibold
                      uppercase
                      tracking-[0.12em]
                      text-[#1d1d1f]
                    "
                  >
                    Store Hours
                  </div>

                  <p
                    className="
                      mt-1
                      text-[12px]
                      leading-relaxed
                      text-[#6e6e73]
                    "
                  >
                    Please contact us for
                    <br />
                    current opening hours.
                  </p>

                </div>
              </div>

            </div>

            {/* WhatsApp */}

            <div
              className="
                border-t
                border-black/[0.07]
                bg-[#f5f5f7]
                p-6
                sm:p-8
              "
            >

              <p
                className="
                  mb-3
                  text-[11px]
                  leading-relaxed
                  text-[#86868b]
                "
              >
                Looking for a product or want to place an order?
                Chat with us directly.
              </p>

              <a
                href={WHATSAPP_LINK(
                  "Hi Online Store, I'd like to enquire about a product.",
                  STORE.location,
                )}
                onClick={gate()}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#1d1d1f]
                  px-4
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
                <MessageCircle
                  className="h-4 w-4"
                  strokeWidth={1.8}
                />

                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* ===================================================
              RIGHT SIDE
          ==================================================== */}

          <div className="grid md:grid-cols-2">

            {/* =================================================
                MAP
            ================================================== */}

            <div
              className="
                relative
                min-h-[320px]
                bg-[#e5e5e7]
                md:min-h-full
              "
            >

              <div
                className="
                  absolute
                  left-4
                  top-4
                  z-10
                  flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-black/[0.08]
                  bg-white/90
                  px-3
                  py-2
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-[#1d1d1f]
                  shadow-sm
                  backdrop-blur-md
                "
              >
                <MapPin
                  className="h-3 w-3"
                  strokeWidth={1.8}
                />

                Manzini
              </div>

              <iframe
                title="Online Store — Manzini"
                src="https://www.google.com/maps?q=Manzini,Eswatini&z=14&output=embed"
                className="
                  h-full
                  min-h-[320px]
                  w-full
                  border-0
                "
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* =================================================
                MESSAGE FORM
            ================================================== */}

            <div className="border-t border-black/[0.07] md:border-l md:border-t-0">

              <div
                className="
                  border-b
                  border-black/[0.07]
                  px-6
                  py-6
                  sm:px-7
                "
              >

                <div
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-brand-blue
                  "
                >
                  Online Enquiry
                </div>

                <h3
                  className="
                    mt-2
                    text-xl
                    font-semibold
                    tracking-[-0.02em]
                    text-[#1d1d1f]
                  "
                >
                  Send us a message.
                </h3>

              </div>

              <div className="p-6 sm:p-7">

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >

                  {/* Name */}

                  <div>

                    <label
                      htmlFor="contact-name"
                      className="
                        mb-1.5
                        block
                        text-[10px]
                        font-semibold
                        text-[#6e6e73]
                      "
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/[0.09]
                        bg-[#f5f5f7]
                        px-3.5
                        py-3
                        text-[13px]
                        text-[#1d1d1f]
                        outline-none
                        transition-all
                        placeholder:text-[#a1a1a6]
                        focus:border-brand-blue
                        focus:bg-white
                        focus:ring-2
                        focus:ring-brand-blue/10
                      "
                    />

                  </div>

                  {/* Email */}

                  <div>

                    <label
                      htmlFor="contact-email"
                      className="
                        mb-1.5
                        block
                        text-[10px]
                        font-semibold
                        text-[#6e6e73]
                      "
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-black/[0.09]
                        bg-[#f5f5f7]
                        px-3.5
                        py-3
                        text-[13px]
                        text-[#1d1d1f]
                        outline-none
                        transition-all
                        placeholder:text-[#a1a1a6]
                        focus:border-brand-blue
                        focus:bg-white
                        focus:ring-2
                        focus:ring-brand-blue/10
                      "
                    />

                  </div>

                  {/* Message */}

                  <div>

                    <label
                      htmlFor="contact-message"
                      className="
                        mb-1.5
                        block
                        text-[10px]
                        font-semibold
                        text-[#6e6e73]
                      "
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-black/[0.09]
                        bg-[#f5f5f7]
                        px-3.5
                        py-3
                        text-[13px]
                        leading-relaxed
                        text-[#1d1d1f]
                        outline-none
                        transition-all
                        placeholder:text-[#a1a1a6]
                        focus:border-brand-blue
                        focus:bg-white
                        focus:ring-2
                        focus:ring-brand-blue/10
                      "
                    />

                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="
                      inline-flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#1d1d1f]
                      px-4
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
                    <Send
                      className="h-3.5 w-3.5"
                      strokeWidth={1.8}
                    />

                    {sent
                      ? "Opening Email…"
                      : "Send Message"}
                  </button>

                  <p
                    className="
                      text-center
                      text-[10px]
                      leading-relaxed
                      text-[#a1a1a6]
                    "
                  >
                    Your email application will open to
                    send the enquiry.
                  </p>

                </form>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            CONTACT FOOTER
        ===================================================== */}

        <div
          className="
            mt-5
            flex
            flex-col
            items-center
            justify-center
            gap-2
            text-center
            sm:flex-row
            sm:gap-5
          "
        >

          <span className="text-[10px] text-[#86868b]">
            Online Store
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#d2d2d7] sm:block" />

          <span className="text-[10px] text-[#86868b]">
            Manzini, Eswatini
          </span>

          <span className="hidden h-1 w-1 rounded-full bg-[#d2d2d7] sm:block" />

          <a
            href={`mailto:${STORE.email}`}
            className="
              text-[10px]
              text-[#86868b]
              transition-colors
              hover:text-[#1d1d1f]
            "
          >
            {STORE.email}
          </a>

        </div>
      </div>
    </section>
  );
}