import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Loader2, ArrowLeft, MessageCircle, MapPin, Package, Clock,
  User as UserIcon, ShoppingCart, ExternalLink, RotateCcw,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RETURN_WINDOW_DAYS } from "@/lib/returns";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { isAdminEmail } from "@/lib/admin-config";
import { Textarea } from "@/components/ui/textarea";
import { fmtPrice } from "@/data/products";
import { RETURN_REASONS } from "@/lib/returns";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled" | "returned";

type Order = {
  id: string;
  user_id: string;
  customer_email: string | null;
  product_slug: string;
  product_name: string;
  product_image: string | null;
  unit_price: number;
  quantity: number;
  branch: string;
  note: string | null;
  status: OrderStatus;
  return_reason: string | null;
  return_details: string | null;
  returned_at: string | null;
  created_at: string;
  updated_at: string;
};

type HistoryEntry = {
  id: string;
  order_id: string;
  status: OrderStatus;
  previous_status: OrderStatus | null;
  changed_by: string | null;
  note: string | null;
  created_at: string;
};

const STATUS_OPTIONS: OrderStatus[] = ["pending", "processing", "completed", "cancelled", "returned"];
const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  processing: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
  returned: "bg-purple-100 text-purple-800 border-purple-200",
};

export const Route = createFileRoute("/orders/$id")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Order Details — Briteman Services" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  beforeLoad: async ({ params }) => {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) {
      throw redirect({ to: "/auth", search: { mode: "login", redirect: `/orders/${params.id}` } });
    }
  },
  component: OrderDetailsPage,
});

function buildWhatsappMessage(o: Order): string {
  const branchShort = o.branch.replace(" Branch", "");
  return (
    `Hi Briteman Services (${branchShort}, Eswatini), I'd like to order:\n` +
    `• Product: ${o.product_name}\n` +
    `• Price: ${fmtPrice(Number(o.unit_price))}\n` +
    `• Quantity: ${o.quantity}\n\n` +
    `Preferred pickup / delivery branch: ${branchShort}\n\n` +
    `Could you please confirm:\n` +
    `1. Is this item currently in stock at the ${branchShort} branch?\n` +
    `2. What is the estimated delivery time to my location from ${branchShort}?`
  );
}

function OrderDetailsPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [fetching, setFetching] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [statusNote, setStatusNote] = useState("");
  const [returnReason, setReturnReason] = useState<string>("");
  const [returnOpen, setReturnOpen] = useState(false);
  const [customerReason, setCustomerReason] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [requesting, setRequesting] = useState(false);

  const isAdmin = isAdminEmail(user?.email);

  const requestReturn = async () => {
    if (!order || !customerReason) {
      toast.error("Please choose a return reason");
      return;
    }
    setRequesting(true);
    const { error } = await supabase.rpc("request_order_return", {
      _order_id: order.id,
      _reason: customerReason,
      _details: customerDetails.trim() || undefined,
    });
    setRequesting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Return request submitted");
    setReturnOpen(false);
    setCustomerReason("");
    setCustomerDetails("");
    void load();
  };

  const load = async () => {
    setFetching(true);
    const [o, h] = await Promise.all([
      supabase.from("orders").select("*").eq("id", id).maybeSingle(),
      supabase.from("order_status_history").select("*").eq("order_id", id).order("created_at", { ascending: true }),
    ]);
    if (o.error) toast.error(o.error.message);
    setOrder((o.data as Order | null) ?? null);
    setHistory(((h.data as HistoryEntry[] | null) ?? []));
    setFetching(false);
  };

  useEffect(() => {
    if (user) void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, id]);

  const updateStatus = async (status: OrderStatus) => {
    if (!order) return;
    if (status === "returned" && !returnReason) {
      toast.error("Pick a return reason first");
      return;
    }
    setUpdating(true);
    const note = statusNote.trim();
    const { error } = await supabase.rpc("admin_update_order_status", {
      _order_id: order.id,
      _status: status,
      _note:
        status === "returned"
          ? `Returned: ${returnReason}${note ? ` — ${note}` : ""}`
          : note
            ? note
            : undefined,
    });
    if (!error && status === "returned") {
      await supabase
        .from("orders")
        .update({
          return_reason: returnReason,
          return_details: note || null,
          returned_at: new Date().toISOString(),
        })
        .eq("id", order.id);
    }
    setUpdating(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setStatusNote("");
    toast.success(`Marked as ${status}`);
    void load();
  };

  if (loading || fetching) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-16 text-center">
          <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
          <h1 className="font-display text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-muted-foreground mb-6">This order may have been removed or you don't have access to view it.</p>
          <Button onClick={() => navigate({ to: isAdmin ? "/admin" : "/orders" })}>
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const branchShort = order.branch.replace(" Branch", "");
  const waMsg = buildWhatsappMessage(order);
  const waLink = `https://wa.me/26876623733?text=${encodeURIComponent(waMsg)}`;
  const lineTotal = Number(order.unit_price) * order.quantity;
  const returnDeadline = new Date(order.created_at).getTime() + RETURN_WINDOW_DAYS * 86400000;
  const withinWindow = Date.now() <= returnDeadline;
  const isOwner = user?.id === order.user_id;
  const canReturn =
    isOwner && withinWindow && ["pending", "processing", "completed"].includes(order.status);

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Toaster />
      <SiteHeader />
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <div>
            <Link
              to={isAdmin ? "/admin" : "/orders"}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-blue mb-2"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> {isAdmin ? "Back to admin" : "Back to my orders"}
            </Link>
            <h1 className="font-display text-3xl font-bold text-brand-blue">
              Order #{order.id.slice(0, 8).toUpperCase()}
            </h1>
            <p className="text-xs text-muted-foreground">
              Placed {new Date(order.created_at).toLocaleString()} · Last updated {new Date(order.updated_at).toLocaleString()}
            </p>
          </div>
          <Badge variant="outline" className={`text-sm capitalize px-3 py-1 ${statusStyles[order.status]}`}>
            {order.status}
          </Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: item + WhatsApp */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4 flex items-center gap-2">
                <Package className="h-4 w-4" /> Item
              </h2>
              <div className="flex gap-4">
                {order.product_image ? (
                  <img src={order.product_image} alt="" className="h-24 w-24 rounded object-cover shrink-0" />
                ) : (
                  <div className="h-24 w-24 rounded bg-muted shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    to="/product/$slug"
                    params={{ slug: order.product_slug }}
                    className="font-semibold hover:text-brand-blue"
                  >
                    {order.product_name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">Quantity: {order.quantity}</p>
                  <p className="text-xs text-muted-foreground">Unit price: {fmtPrice(Number(order.unit_price))}</p>
                  <p className="font-display text-lg font-bold text-brand-blue mt-2">
                    Total: {fmtPrice(lineTotal)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4 flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> WhatsApp message
              </h2>
              <pre className="bg-muted/50 border border-border p-4 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                {waMsg}
              </pre>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild className="bg-whatsapp hover:bg-whatsapp/90 text-white">
                  <a href={waLink} target="_blank" rel="noopener">
                    <MessageCircle className="mr-1 h-4 w-4" /> Reopen in WhatsApp <ExternalLink className="ml-1 h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button variant="outline" onClick={() => { void navigator.clipboard.writeText(waMsg); toast.success("Message copied"); }}>
                  Copy message
                </Button>
              </div>
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Status history
              </h2>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">No history recorded yet.</p>
              ) : (
                <ol className="relative border-l-2 border-border ml-2 space-y-4">
                  {history.map((h) => (
                    <li key={h.id} className="pl-4 relative">
                      <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-background ${statusStyles[h.status].split(" ")[0]}`} />
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className={`capitalize ${statusStyles[h.status]}`}>
                          {h.status}
                        </Badge>
                        {h.previous_status && (
                          <span className="text-xs text-muted-foreground">
                            from <span className="capitalize">{h.previous_status}</span>
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(h.created_at).toLocaleString()}
                        {h.note ? ` · ${h.note}` : ""}
                      </p>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>

          {/* Right column: branch + customer + admin controls */}
          <div className="space-y-6">
            <Card className="p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Branch
              </h2>
              <p className="font-semibold text-brand-blue">{branchShort} Branch</p>
              <p className="text-xs text-muted-foreground mt-1">
                This order will be fulfilled from the {branchShort} office.
              </p>
            </Card>

            <Card className="p-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                <UserIcon className="h-4 w-4" /> Customer
              </h2>
              <p className="text-sm break-all">{order.customer_email ?? "—"}</p>
            </Card>

            {order.status === "returned" && (
              <Card className="p-5 border-purple-200 bg-purple-50/60">
                <h2 className="text-sm font-bold uppercase tracking-wide text-purple-800 mb-2">
                  Return
                </h2>
                <p className="text-sm font-medium">{order.return_reason ?? "Reason not recorded"}</p>
                {order.return_details && (
                  <p className="text-sm text-muted-foreground mt-1">{order.return_details}</p>
                )}
                {order.returned_at && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Returned {new Date(order.returned_at).toLocaleString()}
                  </p>
                )}
                <Link to="/returns" className="text-xs text-brand-blue underline mt-2 inline-block">
                  Read the returns policy
                </Link>
              </Card>
            )}

            {order.status !== "returned" && isOwner && !isAdmin && (
              <Card className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" /> Returns
                </h2>
                {canReturn ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-3">
                      Something wrong with this item? You can request a return until{" "}
                      <span className="font-medium text-foreground">
                        {new Date(returnDeadline).toLocaleDateString()}
                      </span>{" "}
                      ({RETURN_WINDOW_DAYS}-day window).
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
                      onClick={() => setReturnOpen(true)}
                    >
                      <RotateCcw className="mr-1 h-4 w-4" /> Return this item
                    </Button>
                  </>
                ) : withinWindow ? (
                  <p className="text-sm text-muted-foreground">
                    This order is {order.status}, so it can no longer be returned online.{" "}
                    <Link to="/returns" className="text-brand-blue underline">View the returns policy</Link>.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    The {RETURN_WINDOW_DAYS}-day return window closed on{" "}
                    {new Date(returnDeadline).toLocaleDateString()}. Faulty devices are still covered
                    by warranty — <Link to="/after-sales" className="text-brand-blue underline">contact after-sales support</Link>.
                  </p>
                )}
              </Card>
            )}

            {isAdmin && (
              <Card className="p-5">
                <h2 className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-3">
                  Update status
                </h2>
                <Select value={returnReason} onValueChange={setReturnReason} disabled={updating}>
                  <SelectTrigger className="mb-3">
                    <SelectValue placeholder="Return reason (required to mark as returned)" />
                  </SelectTrigger>
                  <SelectContent>
                    {RETURN_REASONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  value={statusNote}
                  onChange={(e) => setStatusNote(e.target.value)}
                  placeholder="Optional note (e.g. reason for cancellation, ETA for processing)…"
                  className="mb-3 min-h-[80px] text-sm"
                  disabled={updating}
                />
                <Select
                  value={order.status}
                  onValueChange={(v) => updateStatus(v as OrderStatus)}
                  disabled={updating}
                >
                  <SelectTrigger className={`capitalize ${statusStyles[order.status]}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((s) => (
                      <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-2">
                  Change the status to save this note in the timeline below.
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Dialog open={returnOpen} onOpenChange={setReturnOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Return this item</DialogTitle>
            <DialogDescription>
              Tell us why you're returning <span className="font-medium">{order.product_name}</span>.
              Bring the item with all accessories and packaging to your nearest Briteman branch.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <Select value={customerReason} onValueChange={setCustomerReason} disabled={requesting}>
              <SelectTrigger>
                <SelectValue placeholder="Select a return reason" />
              </SelectTrigger>
              <SelectContent>
                {RETURN_REASONS.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              value={customerDetails}
              onChange={(e) => setCustomerDetails(e.target.value)}
              placeholder="Optional details (e.g. what happened, when the fault started)…"
              className="min-h-[90px] text-sm"
              disabled={requesting}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setReturnOpen(false)} disabled={requesting}>
              Cancel
            </Button>
            <Button
              className="bg-brand-red hover:bg-brand-red-dark text-white"
              onClick={requestReturn}
              disabled={requesting || !customerReason}
            >
              {requesting ? <Loader2 className="mr-1 h-4 w-4 animate-spin" /> : <RotateCcw className="mr-1 h-4 w-4" />}
              Submit return request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  );
}
