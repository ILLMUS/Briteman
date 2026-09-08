import { createFileRoute, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { isAdminEmail } from "@/lib/admin-config";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>): { mode: "login" | "signup"; redirect?: string } => ({
    mode: (s.mode === "signup" ? "signup" : "login") as "login" | "signup",
    ...(typeof s.redirect === "string" ? { redirect: s.redirect } : {}),
  }),

  beforeLoad: async ({ search }) => {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user ?? null;
    if (user) {
      if (search.redirect) {
        if (typeof window !== "undefined") window.location.assign(search.redirect);
        return;
      }
      throw redirect({ to: isAdminEmail(user.email) ? "/admin" : "/" });
    }
  },

  head: () => ({
    meta: [
      { title: "Sign in — Brightman Services" },
      { name: "description", content: "Sign in or create your Brightman Services account." },
    ],
  }),
  component: AuthPage,
});

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(128),
});

const signupSchema = loginSchema.extend({
  displayName: z.string().trim().min(1, { message: "Name is required" }).max(80),
});

function AuthPage() {
  const { mode, redirect: redirectTo } = Route.useSearch();
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const goPostAuth = (email?: string | null) => {
    if (redirectTo) {
      window.location.assign(redirectTo);
      return;
    }
    navigate({ to: isAdminEmail(email) ? "/admin" : "/" });
  };


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    const parsed = isSignup
      ? signupSchema.safeParse({ email, password, displayName })
      : loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    setLoading(true);
    try {
      if (isSignup) {
        const { error: err } = await supabase.auth.signUp({
          email: parsed.data.email,
          password: parsed.data.password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
            data: { display_name: displayName },
          },
        });
        if (err) throw err;
        goPostAuth(parsed.data.email);
      } else {
        const { data: signInData, error: err } = await supabase.auth.signInWithPassword({
          email: parsed.data.email,
          password: parsed.data.password,
        });
        if (err) throw err;
        goPostAuth(signInData.user?.email);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white border border-border p-8 shadow-sm">
          <div className="flex border-b border-border mb-6">
            <Link
              to="/auth"
              search={{ mode: "login", redirect: redirectTo }}
              className={`flex-1 text-center pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                !isSignup ? "text-brand-blue border-b-2 border-brand-blue -mb-px" : "text-muted-foreground"
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup", redirect: redirectTo }}
              className={`flex-1 text-center pb-3 text-sm font-bold uppercase tracking-wider transition-colors ${
                isSignup ? "text-brand-blue border-b-2 border-brand-blue -mb-px" : "text-muted-foreground"
              }`}
            >
              Register
            </Link>
          </div>

          <h1 className="font-display text-2xl font-bold mb-1">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {isSignup ? "Sign up to track orders and save favourites." : "Sign in to your Brightman account."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Full Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                  maxLength={80}
                  className="w-full px-3 py-2.5 border border-border focus:border-brand-blue outline-none text-sm"
                  placeholder="Jane Dlamini"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                maxLength={255}
                className="w-full px-3 py-2.5 border border-border focus:border-brand-blue outline-none text-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                maxLength={128}
                className="w-full px-3 py-2.5 border border-border focus:border-brand-blue outline-none text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="bg-brand-red/10 border border-brand-red text-brand-red text-sm px-3 py-2">
                {error}
              </div>
            )}
            {info && (
              <div className="bg-whatsapp/10 border border-whatsapp text-foreground text-sm px-3 py-2">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-brand-blue text-white px-5 py-3 text-sm font-bold uppercase tracking-wider hover:bg-brand-red transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSignup ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

