import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { isAdminEmail } from "@/lib/admin-config";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "returned";

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
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
  returned: "bg-purple-100 text-purple-800 border-purple-200",
};

export const Route = createFileRoute("/orders")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Orders — Briteman Services" },
      { name: "description", content: "Track the status of your Briteman Services orders." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      throw redirect({ to: "/auth", search: { mode: "login", redirect: "/orders" } });
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
      let q = supabase.from("orders").select("*").order("created_at", { ascending: false });
      if (!isAdmin) q = q.eq("user_id", user.id);
      const { data, error } = await q;
      if (!error) setOrders((data ?? []) as Order[]);
      setFetching(false);
    })();
  }, [user, isAdmin]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-blue">
              {isAdmin ? "All Orders" : "My Orders"}
            </h1>
            <p className="text-sm text-muted-foreground">
              {isAdmin
                ? "Every customer WhatsApp order across the store."
                : "Every WhatsApp order you place is recorded here so you can track its status."}
            </p>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="mr-1 h-4 w-4" /> Continue shopping</Link>
          </Button>
        </div>

        {fetching ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <ShoppingCart className="mb-3 h-8 w-8 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <Link to="/">Browse products</Link>
            </Button>
          </Card>
        ) : (
          <div className="grid gap-3">
            {orders.map((o) => (
              <Link
                key={o.id}
                to="/orders/$id"
                params={{ id: o.id }}
                className="block"
              >
                <Card className="flex items-center gap-4 p-4 hover:border-brand-blue transition-colors">
                  {o.product_image ? (
                    <img src={o.product_image} alt="" className="h-16 w-16 rounded object-cover" />
                  ) : (
                    <div className="h-16 w-16 rounded bg-muted" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold line-clamp-1">{o.product_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.branch} · Qty {o.quantity} · {new Date(o.created_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <MessageCircle className="h-3 w-3" /> Placed via WhatsApp · View details →
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-display text-base font-bold text-brand-blue">
                      E {Number(o.unit_price).toLocaleString()}
                    </p>
                    <Badge variant="outline" className={`mt-1 capitalize ${statusStyles[o.status]}`}>
                      {o.status}
                    </Badge>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
