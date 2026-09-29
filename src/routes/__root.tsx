import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AuthProvider } from "@/hooks/useAuth";
import { CookieConsent } from "@/components/CookieConsent";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-4">
      <div className="w-full max-w-md rounded-3xl border border-black/[0.07] bg-white p-8 text-center sm:p-10">
        <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Online Store
        </div>

        <h1 className="mt-4 text-7xl font-semibold tracking-[-0.06em] text-[#1d1d1f]">
          404
        </h1>

        <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
          Page not found
        </h2>

        <p className="mx-auto mt-3 max-w-sm text-[13px] leading-6 text-[#86868b]">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
          >
            Go Home
          </Link>

          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-black/[0.09] bg-white px-6 py-3 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "color-scheme",
        content: "light",
      },
      {
        title: "Online Store | Electronics & Technology",
      },
      {
        name: "description",
        content:
          "Shop phones, tablets, computers, TVs, home appliances, audio, cameras, office equipment, accessories and more from Online Store. Order online and collect in Manzini.",
      },
      {
        name: "author",
        content: "Online Store",
      },
      {
        property: "og:title",
        content: "Online Store | Electronics & Technology",
      },
      {
        property: "og:description",
        content:
          "Shop phones, tablets, computers, TVs, home appliances, audio, cameras, office equipment, accessories and more. Order online and collect in Manzini.",
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
        content: "Online Store | Electronics & Technology",
      },
      {
        name: "twitter:description",
        content:
          "Shop a wide range of electronics and technology online. Order online and collect in Manzini.",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: "/favicon.png",
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }}>
      <head>
        <HeadContent />
      </head>

      <body className="bg-white text-foreground">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <AuthProvider>
      <Outlet />
      <CookieConsent />
    </AuthProvider>
  );
}