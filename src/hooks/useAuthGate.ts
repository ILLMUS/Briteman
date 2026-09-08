import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

/**
 * Returns a click interceptor. If the user is not signed in, the original
 * action is blocked and they are sent to /auth (login) with a `redirect`
 * search param so they return to the exact link/section after auth. If
 * signed in, the default browser/link behaviour runs as normal.
 */
export function useAuthGate() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return function gate(action?: () => void) {
    return (e?: React.SyntheticEvent) => {
      if (loading) {
        e?.preventDefault();
        return;
      }
      if (!user) {
        e?.preventDefault();
        e?.stopPropagation();

        // Resolve where to send the user after auth.
        let redirect: string | undefined;
        const target = e?.currentTarget as HTMLAnchorElement | null;
        const href = target?.getAttribute?.("href") ?? undefined;

        if (href && /^https?:\/\//i.test(href)) {
          // External link (e.g. WhatsApp) — open after login.
          redirect = href;
        } else if (href && href.startsWith("#")) {
          redirect = window.location.pathname + window.location.search + href;
        } else if (href) {
          redirect = href;
        } else {
          redirect = window.location.pathname + window.location.search + window.location.hash;
        }

        navigate({ to: "/auth", search: { mode: "login", redirect } });
        return;
      }
      action?.();
    };
  };
}
