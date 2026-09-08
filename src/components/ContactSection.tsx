import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { CONTACT, WHATSAPP_LINK } from "@/lib/contact";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useBranch, setBranch } from "@/hooks/useBranch";

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const { name: activeLoc } = useBranch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const gate = useAuthGate();
  const visibleLocations = CONTACT.locations.filter((l) => l.name === activeLoc);
  const activeLocation = visibleLocations[0];
  const branchPhones = activeLocation?.phones ?? CONTACT.phones;
  const short = activeLoc.replace(" Branch", "");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth", search: { mode: "login" } });
      return;
    }
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const message = form.get("message");
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=Website%20Enquiry&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="bg-secondary/40 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Get In Touch</div>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight">
            Talk to Briteman Services.
          </h2>
          <p className="text-muted-foreground mt-3">
            Visit our store, give us a call or drop a message — we usually reply within minutes on WhatsApp.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {CONTACT.locations.map((loc) => (
            <button
              key={loc.name}
              type="button"
              onClick={() => setBranch(loc.name)}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wide border transition-colors ${
                activeLoc === loc.name
                  ? "bg-brand-blue text-white border-brand-blue"
                  : "bg-white text-foreground border-border hover:border-brand-blue"
              }`}
            >
              {loc.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-border border border-border">
          {/* Info column */}
          <div className="bg-white p-6 lg:col-span-1 space-y-5">
            {visibleLocations.map((loc) => (
              <div key={loc.name} className="flex gap-3">
                <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm uppercase tracking-wide">{loc.name}</div>
                  <p className="text-sm text-muted-foreground">
                    {loc.line1}<br />
                    {loc.line2}<br />
                    {loc.city}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
                <div>
                <div className="font-bold text-sm uppercase tracking-wide">Phone</div>
                <ul className="text-sm text-muted-foreground space-y-0.5">
                  {branchPhones.map((p) => (
                    <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-brand-blue">{p}</a></li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm uppercase tracking-wide">Email</div>
                <a href={`mailto:${CONTACT.email}`} className="text-sm text-muted-foreground hover:text-brand-blue break-all">{CONTACT.email}</a>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-brand-blue text-white flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm uppercase tracking-wide">Hours</div>
                <ul className="text-sm text-muted-foreground space-y-0.5">
                  {CONTACT.hours.map((h) => (
                    <li key={h.day}><span className="font-semibold text-foreground">{h.day}:</span> {h.time}</li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={WHATSAPP_LINK(`Hi Briteman Services, I'd like to enquire about a product.`, short)}
              onClick={gate()}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center justify-center gap-2 w-full bg-whatsapp text-white px-4 py-3 text-xs font-bold uppercase tracking-wide hover:opacity-90"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>

          {/* Map */}
          <div className="bg-white lg:col-span-1 min-h-[280px] flex flex-col">
            {visibleLocations.map((loc) => (
              <div key={loc.name} className="relative flex-1 min-h-[180px] border-b border-border last:border-b-0">
                <div className="absolute top-2 left-2 z-10 bg-brand-blue text-white text-[10px] font-bold uppercase tracking-wide px-2 py-1">
                  {loc.name}
                </div>
                <iframe
                  title={`Briteman Services — ${loc.name}`}
                  src={`https://www.google.com/maps?q=${loc.mapQuery}&z=17&output=embed`}
                  className="w-full h-full min-h-[180px] border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white p-6 lg:col-span-1">
            <div className="font-display text-xl font-bold mb-4">Send a Message</div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input name="name" required placeholder="Your name" className="w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-blue" />
              <input name="email" type="email" required placeholder="Email address" className="w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-blue" />
              <textarea name="message" required rows={5} placeholder="How can we help?" className="w-full border border-border px-3 py-2.5 text-sm outline-none focus:border-brand-blue resize-none" />
              <button type="submit" className="inline-flex items-center justify-center gap-2 w-full bg-brand-blue text-white px-4 py-3 text-xs font-bold uppercase tracking-wide hover:bg-brand-red transition-colors">
                <Send className="w-4 h-4" /> {sent ? "Opening Email…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
