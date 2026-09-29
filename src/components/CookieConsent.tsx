import { useEffect, useState } from "react";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "online-store-cookie-consent-v1";

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
      // Ignore storage errors
    }
  }, []);

  const save = (value: Exclude<ConsentValue, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // Ignore storage errors
    }

    setConsent(value);
  };

  if (!mounted || consent) return null;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[390px]">
      <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-6">

        {/* Close */}
        <button
          type="button"
          onClick={() => save("essential")}
          aria-label="Close cookie notice"
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700"
        >
          <X className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Icon */}
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
          <Cookie
            className="h-5 w-5 text-neutral-700"
            strokeWidth={1.8}
          />
        </div>

        {/* Content */}
        <div className="pr-6">
          <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-neutral-950">
            Your privacy matters
          </h3>

          <p className="mt-2 text-[13px] leading-[1.6] text-neutral-500">
            Online Store uses cookies to keep you signed in, remember your
            cart and improve your shopping experience.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-5 flex items-center gap-2">
          <button
            type="button"
            onClick={() => save("all")}
            className="flex-1 rounded-full bg-neutral-950 px-4 py-2.5 text-[12px] font-semibold text-white transition-all duration-200 hover:bg-neutral-800 active:scale-[0.98]"
          >
            Accept All
          </button>

          <button
            type="button"
            onClick={() => save("essential")}
            className="flex-1 rounded-full border border-black/[0.08] bg-white px-4 py-2.5 text-[12px] font-semibold text-neutral-700 transition-all duration-200 hover:bg-neutral-50 active:scale-[0.98]"
          >
            Essential Only
          </button>
        </div>

        {/* Subtle bottom detail */}
        <div className="mt-4 text-center">
          <span className="text-[10px] text-neutral-400">
            You can change your preference at any time.
          </span>
        </div>
      </div>
    </div>
  );
}