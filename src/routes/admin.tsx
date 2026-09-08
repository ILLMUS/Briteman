import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Plus, Pencil, Trash2, Upload, LogOut, Package, ShoppingCart, BarChart3, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { RETURN_REASONS } from "@/lib/returns";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { isAdminEmail } from "@/lib/admin-config";

const AUTH_SETTLE_TIMEOUT_MS = 1200;

async function getAdminGuardUser(): Promise<User | null> {
  const { data: userData } = await supabase.auth.getUser();
  if (userData.user) return userData.user;

  const { data: sessionData } = await supabase.auth.getSession();
  if (sessionData.session?.user) return sessionData.session.user;

  if (typeof window === "undefined") return null;

  return new Promise((resolve) => {
    let settled = false;
    let subscription: { unsubscribe: () => void } | null = null;

    const finish = (user: User | null) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      subscription?.unsubscribe();
      resolve(user);
    };

    const timeout = window.setTimeout(() => finish(null), AUTH_SETTLE_TIMEOUT_MS);

    const result = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) finish(session.user);
    });
    subscription = result.data.subscription;
  });
}

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Product CMS — Briteman Services Admin" },
      { name: "description", content: "Manage Briteman product catalog." },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  beforeLoad: async () => {
    const user = await getAdminGuardUser();
    if (!user || !isAdminEmail(user.email)) {
      throw redirect({ to: "/auth", search: { mode: "login" } });
    }
  },
  component: AdminPage,
});

export const CATEGORY_OPTIONS = [
  { value: "core_devices", label: "Core Devices" },
  { value: "power_infrastructure", label: "Power & Infrastructure" },
  { value: "peripherals", label: "Peripherals" },
  { value: "storage", label: "Storage" },
  { value: "consumer_electronics", label: "Consumer Electronics" },
  { value: "accessories", label: "Accessories" },
] as const;

type CategoryValue = (typeof CATEGORY_OPTIONS)[number]["value"];

export const SUBCATEGORIES: Record<CategoryValue, string[]> = {
  core_devices: ["Laptops", "Desktop Computers", "MacBook", "Tablets", "Workstations", "Servers"],
  power_infrastructure: ["UPS Systems", "Inverters", "Surge Protectors", "Power Cables", "Batteries"],
  peripherals: ["Mice", "Keyboards", "Monitors", "Printers", "Scanners", "Webcams", "Headsets"],
  storage: ["Portable SSDs", "Internal SSDs", "Hard Drives", "Flash Drives", "Memory Cards", "NAS"],
  consumer_electronics: ["Smartphones", "Smartwatches", "Speakers", "Headphones", "TVs", "Gaming Consoles"],
  accessories: ["Laptop Bags", "Sleeves", "Chargers", "Adapters", "Cables", "Stands"],
};

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: CategoryValue;
  subcategory: string | null;
  image_url: string | null;
  badge: string | null;
  show_on_home: boolean | null;
  is_featured: boolean | null;
  is_latest: boolean | null;
  primary_placement: "none" | "home" | "latest" | "featured" | null;
  created_at: string;
  meta: {
    images?: string[];
    attributes?: { label: string; value: string }[];
    description?: string;
    warranty?: string;
    delivery_info?: string;
    variants?: { name: string; options: { label: string; price_delta?: number }[] }[];
    sku?: string;
  } | null;
};

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `p-${Date.now()}`;

const productSchema = z.object({
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  price: z.coerce.number().min(0).max(10_000_000),
  stock: z.coerce.number().int().min(0).max(1_000_000),
  category: z.enum(["core_devices", "power_infrastructure", "peripherals", "storage", "consumer_electronics", "accessories"]),
  subcategory: z.string().trim().min(1, "Please select a subcategory").max(60),
  badge: z.string().trim().max(20).optional().or(z.literal("")),
});

function AdminPage() {
  const { user, loading, signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [fetching, setFetching] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const isSuperAdmin = isAdminEmail(user?.email);

  const fetchProducts = async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setProducts((data ?? []) as Product[]);
    setFetching(false);
  };

  useEffect(() => {
    if (isSuperAdmin) fetchProducts();
  }, [isSuperAdmin]);

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", p.id);
    if (error) toast.error(error.message);
    else {
      toast.success("Product deleted");
      fetchProducts();
    }
  };

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setOpen(true);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  if (!user || !isSuperAdmin) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Toaster />
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold">Product CMS</h1>
            <p className="text-xs text-muted-foreground">Signed in as {user.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View site</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              <LogOut className="mr-1 h-4 w-4" /> Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Tabs defaultValue="analytics" className="w-full">
          <TabsList>
            <TabsTrigger value="analytics">
              <BarChart3 className="mr-1.5 h-4 w-4" /> Analytics
            </TabsTrigger>
            <TabsTrigger value="orders">
              <ShoppingCart className="mr-1.5 h-4 w-4" /> Orders
            </TabsTrigger>
            <TabsTrigger value="products">
              <Package className="mr-1.5 h-4 w-4" /> Products
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsPanel />
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <OrdersPanel />
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Products ({products.length})</h2>
                <p className="text-sm text-muted-foreground">Manage your catalog across all categories.</p>
              </div>
              <Button onClick={openNew}>
                <Plus className="mr-1 h-4 w-4" /> New product
              </Button>
            </div>

            {fetching ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin" />
              </div>
            ) : products.length === 0 ? (
              <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
                <p className="text-muted-foreground">No products yet. Add your first one to get started.</p>
                <Button className="mt-4" onClick={openNew}>
                  <Plus className="mr-1 h-4 w-4" /> New product
                </Button>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((p) => (
                  <Card key={p.id} className="overflow-hidden">
                    <div className="aspect-video w-full bg-muted">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.name} className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="space-y-2 p-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-1 font-semibold">{p.name}</h3>
                        {p.badge && (
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {CATEGORY_OPTIONS.find((c) => c.value === p.category)?.label}
                        {p.subcategory ? ` › ${p.subcategory}` : ""}
                      </p>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                      <div className="flex items-center justify-between pt-2 text-sm">
                        <span className="font-semibold">E {Number(p.price).toLocaleString()}</span>
                        <span className="text-muted-foreground">Stock: {p.stock}</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => openEdit(p)}>
                          <Pencil className="mr-1 h-3.5 w-3.5" /> Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(p)}>
                          <Trash2 className="h-3.5 w-3.5 text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>


      <ProductDialog
        key={editing?.id ?? "new"}
        open={open}
        onOpenChange={setOpen}
        product={editing}
        userId={user.id}
        onSaved={() => {
          setOpen(false);
          fetchProducts();
        }}
      />
    </div>
  );
}

function ProductDialog({
  open,
  onOpenChange,
  product,
  userId,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product: Product | null;
  userId: string;
  onSaved: () => void;
}) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState<string>(product?.price?.toString() ?? "");
  const [stock, setStock] = useState<string>(product?.stock?.toString() ?? "0");
  const [category, setCategory] = useState<CategoryValue>(product?.category ?? "core_devices");
  const [subcategory, setSubcategory] = useState<string>(product?.subcategory ?? "");
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [showOnHome, setShowOnHome] = useState(product?.show_on_home ?? false);
  const [isFeatured, setIsFeatured] = useState(product?.is_featured ?? false);
  const [isLatest, setIsLatest] = useState(product?.is_latest ?? true);
  const [primaryPlacement, setPrimaryPlacement] = useState<"none" | "home" | "latest" | "featured">(
    product?.primary_placement ?? "none"
  );

  const meta = product?.meta ?? {};
  const [metaDescription, setMetaDescription] = useState(meta.description ?? "");
  const [metaWarranty, setMetaWarranty] = useState(meta.warranty ?? "");
  const [metaDeliveryInfo, setMetaDeliveryInfo] = useState(meta.delivery_info ?? "");
  const [metaSku, setMetaSku] = useState(meta.sku ?? "");
  const [metaImages, setMetaImages] = useState<string[]>(meta.images ?? []);
  const [metaAttributes, setMetaAttributes] = useState<{ label: string; value: string }[]>(
    meta.attributes?.length ? meta.attributes : []
  );
  const [metaVariants, setMetaVariants] = useState<
    { name: string; options: { label: string; price_delta?: number }[] }[]
  >(meta.variants ?? []);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });
    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setUploading(false);
    toast.success("Image uploaded");
    return data.publicUrl;
  };

  const addMainImage = async (file: File) => {
    const url = await handleUpload(file);
    if (url) setImageUrl(url);
  };

  const addGalleryImage = async (file: File) => {
    const url = await handleUpload(file);
    if (url) setMetaImages((prev) => [...prev, url]);
  };

  const removeGalleryImage = (url: string) => {
    setMetaImages((prev) => prev.filter((u) => u !== url));
  };

  const addAttribute = () => {
    setMetaAttributes((prev) => [...prev, { label: "", value: "" }]);
  };

  const updateAttribute = (i: number, field: "label" | "value", value: string) => {
    setMetaAttributes((prev) => prev.map((a, idx) => (idx === i ? { ...a, [field]: value } : a)));
  };

  const removeAttribute = (i: number) => {
    setMetaAttributes((prev) => prev.filter((_, idx) => idx !== i));
  };

  const addVariant = () => {
    setMetaVariants((prev) => [...prev, { name: "", options: [{ label: "" }] }]);
  };

  const updateVariantName = (i: number, name: string) => {
    setMetaVariants((prev) => prev.map((v, idx) => (idx === i ? { ...v, name } : v)));
  };

  const addVariantOption = (i: number) => {
    setMetaVariants((prev) =>
      prev.map((v, idx) => (idx === i ? { ...v, options: [...v.options, { label: "" }] } : v))
    );
  };

  const updateVariantOption = (
    variantIdx: number,
    optionIdx: number,
    field: "label" | "price_delta",
    value: string
  ) => {
    setMetaVariants((prev) =>
      prev.map((v, vIdx) => {
        if (vIdx !== variantIdx) return v;
        return {
          ...v,
          options: v.options.map((o, oIdx) =>
            oIdx === optionIdx
              ? {
                  ...o,
                  [field]:
                    field === "price_delta"
                      ? value === ""
                        ? undefined
                        : Number(value)
                      : value,
                }
              : o
          ),
        };
      })
    );
  };

  const removeVariantOption = (variantIdx: number, optionIdx: number) => {
    setMetaVariants((prev) =>
      prev.map((v, vIdx) =>
        vIdx === variantIdx
          ? { ...v, options: v.options.filter((_, oIdx) => oIdx !== optionIdx) }
          : v
      )
    );
  };

  const removeVariant = (i: number) => {
    setMetaVariants((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const parsed = productSchema.safeParse({ name, description, price, stock, category, subcategory, badge });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSaving(true);

    const cleanedAttributes = metaAttributes.filter((a) => a.label.trim() || a.value.trim());
    const cleanedVariants = metaVariants
      .filter((v) => v.name.trim() && v.options.length > 0)
      .map((v) => ({
        name: v.name.trim(),
        options: v.options
          .filter((o) => o.label.trim())
          .map((o) => ({
            label: o.label.trim(),
            price_delta: o.price_delta ? Number(o.price_delta) : undefined,
          })),
      }))
      .filter((v) => v.options.length > 0);

    const nextMeta = {
      ...(metaDescription.trim() ? { description: metaDescription.trim() } : {}),
      ...(metaWarranty.trim() ? { warranty: metaWarranty.trim() } : {}),
      ...(metaDeliveryInfo.trim() ? { delivery_info: metaDeliveryInfo.trim() } : {}),
      ...(metaSku.trim() ? { sku: metaSku.trim() } : {}),
      ...(metaImages.length > 0 ? { images: metaImages } : {}),
      ...(cleanedAttributes.length > 0 ? { attributes: cleanedAttributes } : {}),
      ...(cleanedVariants.length > 0 ? { variants: cleanedVariants } : {}),
    };

    const payload = {
      name: parsed.data.name,
      slug: product?.slug ?? slugify(parsed.data.name),
      description: parsed.data.description || null,
      price: parsed.data.price,
      stock: parsed.data.stock,
      category: parsed.data.category,
      subcategory: parsed.data.subcategory,
      badge: parsed.data.badge || null,
      image_url: imageUrl || null,
      show_on_home: primaryPlacement === "home" ? true : showOnHome,
      is_featured: primaryPlacement === "featured" ? true : isFeatured,
      is_latest: primaryPlacement === "latest" ? true : isLatest,
      primary_placement: primaryPlacement,
      created_by: userId,
      meta: Object.keys(nextMeta).length > 0 ? nextMeta : {},
    };

    const { error } = product
      ? await supabase.from("products").update(payload).eq("id", product.id)
      : await supabase.from("products").insert(payload);

    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(product ? "Product updated" : "Product created");
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? "Edit product" : "New product"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Main image */}
          <div className="space-y-2">
            <Label>Main image</Label>
            <div className="flex items-start gap-3">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border bg-muted">
                {imageUrl ? (
                  <img src={imageUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">None</div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed px-3 py-2 text-sm hover:bg-muted">
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span>{uploading ? "Uploading..." : "Upload main image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) addMainImage(f);
                    }}
                  />
                </label>
                {imageUrl && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => setImageUrl("")}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Gallery images */}
          <div className="space-y-2">
            <Label>Gallery images</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {metaImages.map((url) => (
                <div key={url} className="relative aspect-square rounded-xl border bg-muted overflow-hidden">
                  <img src={url} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(url)}
                    className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center hover:bg-black/80"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-dashed text-muted-foreground hover:bg-muted">
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                <span className="text-[10px]">Add</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) addGalleryImage(f);
                  }}
                />
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Product name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price">Price (E)</Label>
              <Input id="price" type="number" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input id="stock" type="number" min="0" step="1" value={stock} onChange={(e) => setStock(e.target.value)} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={(v) => {
                const next = v as CategoryValue;
                setCategory(next);
                if (!SUBCATEGORIES[next].includes(subcategory)) setSubcategory("");
              }}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subcategory</Label>
              <Select value={subcategory} onValueChange={setSubcategory}>
                <SelectTrigger><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {SUBCATEGORIES[category].map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge">Badge (optional, e.g. NEW, HOT, -15%)</Label>
            <Input id="badge" value={badge ?? ""} onChange={(e) => setBadge(e.target.value)} maxLength={20} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku">SKU (optional)</Label>
            <Input id="sku" value={metaSku} onChange={(e) => setMetaSku(e.target.value)} maxLength={60} placeholder="e.g. DELL-XPS-15-001" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="short-description">Short description / specs</Label>
            <Textarea
              id="short-description"
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={2000}
              placeholder="Brief specs shown on cards, e.g. Processor: i7 · RAM: 16GB · Storage: 1TB SSD"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="long-description">Full description</Label>
            <Textarea
              id="long-description"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              rows={4}
              maxLength={3000}
              placeholder="Detailed product description for the product page."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="warranty">Warranty</Label>
              <Input id="warranty" value={metaWarranty} onChange={(e) => setMetaWarranty(e.target.value)} placeholder="e.g. 1-year local warranty" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="delivery-info">Delivery info</Label>
              <Input id="delivery-info" value={metaDeliveryInfo} onChange={(e) => setMetaDeliveryInfo(e.target.value)} placeholder="e.g. Pickup from Mbabane or Manzini" />
            </div>
          </div>

          {/* Attributes builder */}
          <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold">Specifications / attributes</Label>
              <Button type="button" variant="outline" size="sm" onClick={addAttribute}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add attribute
              </Button>
            </div>
            {metaAttributes.length === 0 && (
              <p className="text-xs text-muted-foreground">No attributes yet. Add label/value pairs like "Processor: i7".</p>
            )}
            <div className="space-y-2">
              {metaAttributes.map((attr, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <Input
                    placeholder="Label"
                    value={attr.label}
                    onChange={(e) => updateAttribute(i, "label", e.target.value)}
                  />
                  <Input
                    placeholder="Value"
                    value={attr.value}
                    onChange={(e) => updateAttribute(i, "value", e.target.value)}
                  />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeAttribute(i)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Variants builder */}
          <div className="space-y-3 rounded-xl border bg-muted/30 p-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-semibold">Variants</Label>
                <p className="text-xs text-muted-foreground">Add options like storage size or color. Price delta is added to the base price.</p>
              </div>
              <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                <Plus className="mr-1 h-3.5 w-3.5" /> Add variant
              </Button>
            </div>
            {metaVariants.length === 0 && (
              <p className="text-xs text-muted-foreground">No variants yet. Add groups like "Storage: 256GB, 512GB (+E 2,000)".</p>
            )}
            <div className="space-y-4">
              {metaVariants.map((variant, vIdx) => (
                <div key={vIdx} className="rounded-lg border bg-background p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Variant name (e.g. Storage)"
                      value={variant.name}
                      onChange={(e) => updateVariantName(vIdx, e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeVariant(vIdx)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="space-y-2 pl-2 border-l-2 border-muted">
                    {variant.options.map((opt, oIdx) => (
                      <div key={oIdx} className="grid grid-cols-[1fr_80px_auto] gap-2">
                        <Input
                          placeholder="Option label (e.g. 512GB)"
                          value={opt.label}
                          onChange={(e) => updateVariantOption(vIdx, oIdx, "label", e.target.value)}
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Price +"
                          value={opt.price_delta ?? ""}
                          onChange={(e) => updateVariantOption(vIdx, oIdx, "price_delta", e.target.value)}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeVariantOption(vIdx, oIdx)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                    <Button type="button" variant="ghost" size="sm" onClick={() => addVariantOption(vIdx)}>
                      <Plus className="mr-1 h-3.5 w-3.5" /> Add option
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-md border bg-muted/30 p-3">
            <div>
              <Label className="text-sm font-semibold">Placement on storefront</Label>
              <p className="text-xs text-muted-foreground">
                Pick a primary placement (it wins on conflicts and pins the product to the top of that section). Optionally also mirror it in other sections.
              </p>
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Primary placement</Label>
              <Select value={primaryPlacement} onValueChange={(v) => setPrimaryPlacement(v as typeof primaryPlacement)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None (category page only)</SelectItem>
                  <SelectItem value="home">Home Page — Fresh Arrivals (pinned top)</SelectItem>
                  <SelectItem value="latest">Latest Products (pinned top)</SelectItem>
                  <SelectItem value="featured">Featured Products (pinned top)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 border-t pt-3">
              <Label className="text-xs uppercase tracking-wide text-muted-foreground">Also mirror in</Label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" checked={showOnHome || primaryPlacement === "home"} disabled={primaryPlacement === "home"} onChange={(e) => setShowOnHome(e.target.checked)} />
                <span>Home Page (Fresh Arrivals)</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" checked={isLatest || primaryPlacement === "latest"} disabled={primaryPlacement === "latest"} onChange={(e) => setIsLatest(e.target.checked)} />
                <span>Latest Products</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" checked={isFeatured || primaryPlacement === "featured"} disabled={primaryPlacement === "featured"} onChange={(e) => setIsFeatured(e.target.checked)} />
                <span>Featured Products</span>
              </label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving || uploading}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {product ? "Save changes" : "Create product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

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

function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<OrderStatus | "all">("all");

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setOrders((data ?? []) as Order[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    let reason: string | null = null;
    if (status === "returned") {
      const list = RETURN_REASONS.map((r, i) => `${i + 1}. ${r}`).join("\n");
      const pick = window.prompt(
        `Why was this order returned? Enter a number:\n${list}`,
        "1",
      );
      if (pick === null) return;
      const idx = Number(pick.trim()) - 1;
      reason = RETURN_REASONS[idx] ?? pick.trim();
      if (!reason) return;
    }
    const note = window.prompt(
      status === "returned"
        ? `Extra details about the return (optional):`
        : `Add a note for changing status to "${status}" (optional):`,
      "",
    );
    if (note === null) return; // cancelled
    const details = note.trim() ? note.trim() : null;
    const prev = orders;
    setOrders((os) =>
      os.map((o) =>
        o.id === id
          ? { ...o, status, return_reason: reason ?? o.return_reason, return_details: details ?? o.return_details }
          : o,
      ),
    );
    const { error } = await supabase.rpc("admin_update_order_status", {
      _order_id: id,
      _status: status,
      _note: reason ? `Returned: ${reason}${details ? ` — ${details}` : ""}` : details ?? undefined,
    });
    if (!error && status === "returned") {
      await supabase
        .from("orders")
        .update({ return_reason: reason, return_details: details, returned_at: new Date().toISOString() })
        .eq("id", id);
    }
    if (error) {
      toast.error(error.message);
      setOrders(prev);
    } else {
      toast.success(`Marked as ${status}`);
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Delete this order? This cannot be undone.")) return;
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      setOrders((os) => os.filter((o) => o.id !== id));
      toast.success("Order deleted");
    }
  };

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);
  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => ({ ...acc, [s]: orders.filter((o) => o.status === s).length }),
    { pending: 0, processing: 0, completed: 0, cancelled: 0, returned: 0 } as Record<OrderStatus, number>,
  );

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">Orders ({orders.length})</h2>
          <p className="text-sm text-muted-foreground">
            Track customer WhatsApp orders and move them through fulfillment.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All <span className="ml-1.5 text-xs opacity-70">{orders.length}</span>
          </Button>
          {STATUS_OPTIONS.map((s) => (
            <Button
              key={s}
              variant={filter === s ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(s)}
              className="capitalize"
            >
              {s} <span className="ml-1.5 text-xs opacity-70">{counts[s]}</span>
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : visible.length === 0 ? (
        <Card className="flex flex-col items-center justify-center px-6 py-20 text-center">
          <ShoppingCart className="mb-3 h-8 w-8 text-muted-foreground" />
          <p className="text-muted-foreground">No orders in this view.</p>
        </Card>
      ) : (
        <Card className="overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Placed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[60px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((o) => (
                <TableRow key={o.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {o.product_image ? (
                        <img
                          src={o.product_image}
                          alt=""
                          className="h-10 w-10 rounded object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded bg-muted" />
                      )}
                      <div>
                        <p className="text-sm font-medium leading-tight">{o.product_name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {o.quantity}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{o.customer_email ?? "—"}</TableCell>
                  <TableCell className="text-sm">{o.branch}</TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    E {Number(o.unit_price).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {new Date(o.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Select value={o.status} onValueChange={(v) => updateStatus(o.id, v as OrderStatus)}>
                      <SelectTrigger className={`h-8 w-[130px] capitalize ${statusStyles[o.status]}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s} className="capitalize">
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to="/orders/$id" params={{ id: o.id }} title="View details">
                          <Package className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteOrder(o.id)} title="Delete">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}
      <Badge variant="outline" className="mt-4 text-xs text-muted-foreground">
        Orders are logged automatically when signed-in customers tap "Order on WhatsApp".
      </Badge>
    </div>
  );
}


function buildRevenueSeries(orders: Order[], days: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const buckets: { key: string; label: string; revenue: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    buckets.push({
      key: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      revenue: 0,
    });
  }
  const index = new Map(buckets.map((b, i) => [b.key, i]));
  for (const o of orders) {
    if (o.status === "cancelled") continue;
    const key = new Date(o.created_at).toISOString().slice(0, 10);
    const i = index.get(key);
    if (i === undefined) continue;
    buckets[i].revenue += Number(o.unit_price) * o.quantity;
  }
  return buckets;
}

function AnalyticsPanel() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [productCount, setProductCount] = useState(0);
  const [lowStock, setLowStock] = useState<{ id: string; name: string; stock: number }[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [ordersRes, productsRes, lowRes] = await Promise.all([
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id,name,stock").lte("stock", 5).order("stock", { ascending: true }).limit(6),
      ]);
      if (ordersRes.error) toast.error(ordersRes.error.message);
      else setOrders((ordersRes.data ?? []) as Order[]);
      setProductCount(productsRes.count ?? 0);
      setLowStock((lowRes.data ?? []) as { id: string; name: string; stock: number }[]);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  const totalRevenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + Number(o.unit_price) * o.quantity, 0);
  const pendingRevenue = orders
    .filter((o) => o.status === "pending" || o.status === "processing")
    .reduce((sum, o) => sum + Number(o.unit_price) * o.quantity, 0);
  const counts = STATUS_OPTIONS.reduce(
    (acc, s) => ({ ...acc, [s]: orders.filter((o) => o.status === s).length }),
    { pending: 0, processing: 0, completed: 0, cancelled: 0, returned: 0 } as Record<OrderStatus, number>,
  );
  const recent = orders.slice(0, 5);

  const stats = [
    { label: "Total orders", value: orders.length.toString(), icon: ShoppingCart, tone: "text-brand-blue" },
    { label: "Completed revenue", value: `E ${totalRevenue.toLocaleString()}`, icon: DollarSign, tone: "text-emerald-600" },
    { label: "Pending revenue", value: `E ${pendingRevenue.toLocaleString()}`, icon: TrendingUp, tone: "text-amber-600" },
    { label: "Products in catalog", value: productCount.toString(), icon: Package, tone: "text-brand-red" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Store analytics</h2>
        <p className="text-sm text-muted-foreground">Snapshot of orders, revenue, and inventory health.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{s.label}</p>
              <s.icon className={`h-4 w-4 ${s.tone}`} />
            </div>
            <p className="mt-2 text-2xl font-bold">{s.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Revenue (last 14 days)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={buildRevenueSeries(orders, 14)} margin={{ top: 5, right: 12, left: -12, bottom: 0 }}>
                <defs>
                  <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--brand-blue))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--brand-blue))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" width={48} />
                <ChartTooltip
                  contentStyle={{ fontSize: 12, borderRadius: 0 }}
                  formatter={(v: number) => [`E ${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--brand-blue))" strokeWidth={2} fill="url(#revFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Status breakdown
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={STATUS_OPTIONS.map((s) => ({ name: s, value: counts[s] }))}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                >
                  {STATUS_OPTIONS.map((s) => (
                    <Cell
                      key={s}
                      fill={
                        s === "completed" ? "#10b981"
                        : s === "processing" ? "#3b82f6"
                        : s === "pending" ? "#f59e0b"
                        : "#f43f5e"
                      }
                    />
                  ))}
                </Pie>
                <ChartTooltip contentStyle={{ fontSize: 12, borderRadius: 0 }} />
                <Legend wrapperStyle={{ fontSize: 12, textTransform: "capitalize" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 border-t pt-4">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Status details
            </h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-right text-xs">Count</TableHead>
                  <TableHead className="text-right text-xs">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {STATUS_OPTIONS.map((s) => {
                  const pct = orders.length ? ((counts[s] / orders.length) * 100) : 0;
                  return (
                    <TableRow key={s}>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                s === "completed" ? "#10b981"
                                : s === "processing" ? "#3b82f6"
                                : s === "pending" ? "#f59e0b"
                                : "#f43f5e",
                            }}
                          />
                          <span className="capitalize text-sm">{s}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-2 text-right text-sm font-medium">{counts[s]}</TableCell>
                      <TableCell className="py-2 text-right text-sm text-muted-foreground">
                        {pct.toFixed(1)}%
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell className="py-2 text-sm font-medium">Total</TableCell>
                  <TableCell className="py-2 text-right text-sm font-bold">{orders.length}</TableCell>
                  <TableCell className="py-2 text-right text-sm font-bold">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Orders by status
          </h3>
          <div className="space-y-3">
            {STATUS_OPTIONS.map((s) => {
              const pct = orders.length ? Math.round((counts[s] / orders.length) * 100) : 0;
              return (
                <div key={s}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="capitalize">{s}</span>
                    <span className="text-muted-foreground">{counts[s]} · {pct}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden bg-muted">
                    <div
                      className={
                        s === "completed" ? "h-full bg-emerald-500"
                        : s === "processing" ? "h-full bg-blue-500"
                        : s === "pending" ? "h-full bg-amber-500"
                        : "h-full bg-rose-500"
                      }
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            <AlertTriangle className="h-4 w-4 text-amber-500" /> Low stock (≤ 5)
          </h3>
          {lowStock.length === 0 ? (
            <p className="text-sm text-muted-foreground">All products are well stocked.</p>
          ) : (
            <ul className="space-y-2">
              {lowStock.map((p) => (
                <li key={p.id} className="flex items-center justify-between text-sm">
                  <span className="line-clamp-1">{p.name}</span>
                  <Badge variant="outline" className="border-amber-200 bg-amber-50 text-amber-800">
                    {p.stock} left
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Recent orders
        </h3>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <ul className="divide-y">
            {recent.map((o) => (
              <li key={o.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                <div className="min-w-0">
                  <p className="line-clamp-1 font-medium">{o.product_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.customer_email ?? "—"} · {new Date(o.created_at).toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className={`capitalize ${statusStyles[o.status]}`}>
                  {o.status}
                </Badge>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
