import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "briteman-cookie-consent-v1";

type ConsentValue = "all" | "essential" | null;

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue;
      setConsent(stored);
    } catch {
      // ignore
    }
  }, []);

  const save = (value: Exclude<ConsentValue, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // ignore
    }
    setConsent(value);
  };

  if (!mounted || consent) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:bottom-6 md:max-w-md">
      <div className="bg-brand-blue-dark text-white shadow-2xl border-l-4 border-brand-red p-5 relative">
        <button
          onClick={() => save("essential")}
          aria-label="Dismiss"
          className="absolute top-2 right-2 text-white/60 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="bg-brand-red p-2 shrink-0">
            <Cookie className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-bold text-sm uppercase tracking-wide mb-1">
              We use cookies
            </h3>
            <p className="text-xs text-white/85 leading-relaxed mb-3">
              Briteman Online Store uses cookies to keep you signed in, remember your cart,
              and improve our service. Choose your preference below.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => save("all")}
                className="bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold uppercase tracking-wide px-4 py-2 transition-colors"
              >
                Accept all
              </button>
              <button
                onClick={() => save("essential")}
                className="bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wide px-4 py-2 transition-colors"
              >
                Essential only
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
