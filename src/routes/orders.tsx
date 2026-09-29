import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Loader2,
  ShoppingCart,
  MessageCircle,
  ArrowLeft,
  PackageCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isAdminEmail } from "@/lib/admin-config";

type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled"
  | "returned";

type Order = {
  id: string;
  product_slug: string;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  branch: string;
  status: OrderStatus;
  created_at: string;
};

const statusStyles: Record<OrderStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  processing: "border-blue-200 bg-blue-50 text-blue-700",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-700",
  cancelled: "border-rose-200 bg-rose-50 text-rose-700",
  returned: "border-purple-200 bg-purple-50 text-purple-700",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  completed: "Completed",
  cancelled: "Cancelled",
  returned: "Returned",
};

export const Route = createFileRoute("/orders")({
  ssr: false,

  head: () => ({
    meta: [
      {
        title: "My Orders | Online Store",
      },
      {
        name: "description",
        content:
          "View and track your Online Store orders and their current status.",
      },
      {
        name: "robots",
        content: "noindex,nofollow",
      },
    ],
  }),

  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();

    if (!data.session?.user) {
      throw redirect({
        to: "/auth",
        search: {
          mode: "login",
          redirect: "/orders",
        },
      });
    }
  },

  component: OrdersPage,
});

function OrdersPage() {
  const { user, loading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [fetching, setFetching] = useState(true);

  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    if (!user) return;

    (async () => {
      setFetching(true);

      let q = supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!isAdmin) {
        q = q.eq("user_id", user.id);
      }

      const { data, error } = await q;

      if (!error) {
        setOrders((data ?? []) as Order[]);
      }

      setFetching(false);
    })();
  }, [user, isAdmin]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="h-5 w-5 animate-spin text-[#86868b]" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f5f7]">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-black/[0.07] bg-white py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-blue">
                  Online Store
                </div>

                <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#1d1d1f] md:text-4xl">
                  {isAdmin ? "All Orders" : "My Orders"}
                </h1>

                <p className="mt-3 max-w-xl text-[13px] leading-6 text-[#86868b]">
                  {isAdmin
                    ? "View and manage customer orders placed through the store."
                    : "View your orders and keep track of their current status."}
                </p>
              </div>

              <Link
                to="/deals"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-black/[0.09] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            {fetching ? (
              <div className="flex items-center justify-center rounded-3xl border border-black/[0.07] bg-white py-24">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-5 w-5 animate-spin text-[#86868b]" />
                  <span className="text-[11px] text-[#86868b]">
                    Loading your orders...
                  </span>
                </div>
              </div>
            ) : orders.length === 0 ? (
              <Card className="flex flex-col items-center justify-center rounded-3xl border-black/[0.07] bg-white px-6 py-20 text-center shadow-none">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f5f5f7]">
                  <ShoppingCart
                    className="h-5 w-5 text-[#1d1d1f]"
                    strokeWidth={1.8}
                  />
                </div>

                <h2 className="mt-5 text-[16px] font-semibold text-[#1d1d1f]">
                  No orders yet
                </h2>

                <p className="mt-2 max-w-sm text-[12px] leading-6 text-[#86868b]">
                  Your orders will appear here once you place your first order
                  with Online Store.
                </p>

                <Link
                  to="/"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1d1d1f] px-6 py-3 text-[11px] font-semibold text-white transition-all duration-200 hover:bg-brand-blue active:scale-[0.98]"
                >
                  Browse Products
                </Link>
              </Card>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <Link
                    key={order.id}
                    to="/orders/$id"
                    params={{ id: order.id }}
                    className="group block"
                  >
                    <Card className="overflow-hidden rounded-2xl border-black/[0.07] bg-white p-0 shadow-none transition-all duration-300 hover:-translate-y-0.5 hover:border-black/[0.11] hover:shadow-[0_18px_45px_-28px_rgba(0,0,0,0.3)]">
                      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                        {/* Product image */}
                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#f5f5f7] sm:h-24 sm:w-24">
                          {order.product_image ? (
                            <img
                              src={order.product_image}
                              alt={order.product_name}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <PackageCheck
                                className="h-5 w-5 text-[#86868b]"
                                strokeWidth={1.6}
                              />
                            </div>
                          )}
                        </div>

                        {/* Order information */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="line-clamp-1 text-[14px] font-semibold tracking-[-0.01em] text-[#1d1d1f] transition-colors group-hover:text-brand-blue">
                              {order.product_name}
                            </h2>

                            <Badge
                              variant="outline"
                              className={`rounded-full px-2.5 py-1 text-[9px] font-semibold capitalize ${statusStyles[order.status]}`}
                            >
                              {statusLabels[order.status]}
                            </Badge>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-[#86868b]">
                            <span>
                              Qty {order.quantity}
                            </span>

                            <span>
                              {new Date(
                                order.created_at,
                              ).toLocaleDateString()}
                            </span>

                            <span>
                              {new Date(
                                order.created_at,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>

                          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-[#86868b]">
                            <MessageCircle
                              className="h-3 w-3"
                              strokeWidth={1.8}
                            />
                            <span>Order placed via WhatsApp</span>
                            <span className="text-[#c7c7cc]">·</span>
                            <span className="font-medium text-brand-blue">
                              View details
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex shrink-0 items-center justify-between gap-5 border-t border-black/[0.06] pt-4 sm:block sm:border-t-0 sm:pt-0 sm:text-right">
                          <div className="text-[10px] text-[#86868b] sm:hidden">
                            Order total
                          </div>

                          <div>
                            <p className="text-[16px] font-semibold tracking-[-0.02em] text-[#1d1d1f]">
                              E{" "}
                              {Number(order.unit_price).toLocaleString(
                                undefined,
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                },
                              )}
                            </p>

                            <p className="mt-1 text-[9px] text-[#86868b]">
                              per item
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}