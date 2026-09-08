import { supabase } from "@/integrations/supabase/client";
import pLaptop from "@/assets/p-laptop.jpg";
import pTablet from "@/assets/p-tablet.jpg";
import pMouse from "@/assets/p-mouse.jpg";
import pSsd from "@/assets/p-ssd.jpg";
import pUps from "@/assets/p-ups.jpg";
import pBag from "@/assets/p-bag.jpg";
import pConsole from "@/assets/p-console.jpg";
import type { Product } from "@/data/products";

type DbCategory =
  | "core_devices"
  | "power_infrastructure"
  | "peripherals"
  | "storage"
  | "consumer_electronics"
  | "accessories";

export const STOREFRONT_CATEGORY_MAP: Record<
  string,
  { dbCategory: DbCategory; subcategories?: string[]; label: string }
> = {
  laptops: {
    dbCategory: "core_devices",
    subcategories: ["Laptops", "Desktop Computers", "MacBook", "Workstations", "Servers"],
    label: "Laptops",
  },
  tablets: { dbCategory: "core_devices", subcategories: ["Tablets"], label: "Tablets" },
  peripherals: { dbCategory: "peripherals", label: "Peripherals" },
  storage: { dbCategory: "storage", label: "Storage" },
  power: { dbCategory: "power_infrastructure", label: "Power" },
  accessories: { dbCategory: "accessories", label: "Accessories" },
  gaming: {
    dbCategory: "consumer_electronics",
    subcategories: ["Gaming Consoles"],
    label: "Gaming",
  },
};

const FALLBACK_IMG_BY_CATEGORY: Record<DbCategory, string> = {
  core_devices: pLaptop,
  power_infrastructure: pUps,
  peripherals: pMouse,
  storage: pSsd,
  consumer_electronics: pConsole,
  accessories: pBag,
};

const FALLBACK_IMG_BY_SUBCATEGORY: Record<string, string> = {
  Tablets: pTablet,
  "Laptop Bags": pBag,
  Sleeves: pBag,
};

type DbProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  stock: number;
  category: DbCategory;
  subcategory: string | null;
  image_url: string | null;
  badge: string | null;
  show_on_home?: boolean | null;
  is_featured?: boolean | null;
  is_latest?: boolean | null;
  primary_placement?: string | null;
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

function extractMeta(row: DbProductRow) {
  const meta = row.meta ?? {};
  const images = meta.images?.length ? meta.images : row.image_url ? [row.image_url] : [];
  const attributes = meta.attributes?.length
    ? meta.attributes
    : row.description
    ? row.description.split("·").map((s) => s.trim()).filter(Boolean).map((s) => {
        if (s.includes(":")) {
          const [label, ...rest] = s.split(":");
          return { label: label.trim(), value: rest.join(":").trim() };
        }
        return { label: "Spec", value: s };
      })
    : [];
  return {
    images,
    attributes,
    description: meta.description ?? row.description ?? row.subcategory ?? "",
    warranty: meta.warranty ?? undefined,
    deliveryInfo: meta.delivery_info ?? undefined,
    variants: meta.variants ?? undefined,
    sku: meta.sku ?? undefined,
  };
}

function reverseStorefrontSlug(row: DbProductRow): string {
  for (const [slug, map] of Object.entries(STOREFRONT_CATEGORY_MAP)) {
    if (map.dbCategory !== row.category) continue;
    if (!map.subcategories) return slug;
    if (row.subcategory && map.subcategories.includes(row.subcategory)) return slug;
  }
  return "accessories";
}

function adaptRow(row: DbProductRow, storefrontSlug?: string): Product {
  const slug = storefrontSlug ?? reverseStorefrontSlug(row);
  const stock: Product["stock"] = row.stock <= 0 ? "out" : row.stock <= 3 ? "limited" : "in";
  const meta = extractMeta(row);
  const img =
    meta.images[0] ||
    row.image_url ||
    (row.subcategory && FALLBACK_IMG_BY_SUBCATEGORY[row.subcategory]) ||
    FALLBACK_IMG_BY_CATEGORY[row.category];
  const badge =
    row.badge === "HOT" || row.badge === "NEW" || row.badge === "-15%" ? row.badge : undefined;
  return {
    slug: row.slug,
    img,
    images: meta.images,
    name: row.name,
    specs: row.description ?? row.subcategory ?? "",
    description: meta.description,
    price: Number(row.price),
    badge,
    category: row.subcategory ?? STOREFRONT_CATEGORY_MAP[slug]?.label ?? row.category,
    categorySlug: slug,
    stock,
    attributes: meta.attributes,
    warranty: meta.warranty,
    deliveryInfo: meta.deliveryInfo,
    variants: meta.variants,
    sku: meta.sku,
  };
}

export async function fetchProductsForStorefrontCategory(slug: string): Promise<Product[]> {
  const map = STOREFRONT_CATEGORY_MAP[slug];
  if (!map) return [];
  let query = supabase
    .from("products")
    .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,show_on_home,is_featured,is_latest,meta")
    .eq("category", map.dbCategory)
    .order("created_at", { ascending: false });
  if (map.subcategories && map.subcategories.length > 0) {
    query = query.in("subcategory", map.subcategories);
  }
  const { data, error } = await query;
  if (error || !data) return [];
  return (data as DbProductRow[]).map((r) => adaptRow(r, slug));
}

type PlacementKey = "home" | "latest" | "featured";
const FLAG_BY_PLACEMENT: Record<PlacementKey, "show_on_home" | "is_latest" | "is_featured"> = {
  home: "show_on_home",
  latest: "is_latest",
  featured: "is_featured",
};

async function fetchByPlacement(placement: PlacementKey): Promise<Product[]> {
  const flag = FLAG_BY_PLACEMENT[placement];
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,show_on_home,is_featured,is_latest,primary_placement,meta")
    .or(`${flag}.eq.true,primary_placement.eq.${placement}`)
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  // Sort: rows whose primary_placement matches come first, preserving created_at desc within each group.
  const rows = data as (DbProductRow & { primary_placement?: string | null })[];
  rows.sort((a, b) => {
    const aPrimary = a.primary_placement === placement ? 0 : 1;
    const bPrimary = b.primary_placement === placement ? 0 : 1;
    return aPrimary - bPrimary;
  });
  return rows.map((r) => adaptRow(r));
}

export const fetchHomePageProducts = () => fetchByPlacement("home");
export const fetchFeaturedProducts = () => fetchByPlacement("featured");
export const fetchLatestProducts = () => fetchByPlacement("latest");

export function mergeProducts(staticList: Product[], dbList: Product[]): Product[] {
  const dbSlugs = new Set(dbList.map((p) => p.slug));
  const filteredStatic = staticList.filter((p) => !dbSlugs.has(p.slug));
  return [...dbList, ...filteredStatic];
}

export async function fetchProductsBySlugs(slugs: string[]): Promise<Product[]> {
  if (slugs.length === 0) return [];
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,show_on_home,is_featured,is_latest,meta")
    .in("slug", slugs);
  if (error || !data) return [];
  return (data as DbProductRow[]).map((r) => adaptRow(r));
}

export async function fetchHotDeals(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,show_on_home,is_featured,is_latest,meta")
    .in("badge", ["HOT", "-15%"])
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return (data as DbProductRow[]).map((r) => adaptRow(r));
}

export async function searchDbProducts(term: string, limit = 8): Promise<Product[]> {
  const q = term.trim();
  if (q.length < 2) return [];
  const { data, error } = await supabase
    .from("products")
    .select("id,name,slug,description,price,stock,category,subcategory,image_url,badge,show_on_home,is_featured,is_latest,meta")
    .or(`name.ilike.%${q}%,description.ilike.%${q}%,subcategory.ilike.%${q}%`)
    .limit(limit);
  if (error || !data) return [];
  return (data as DbProductRow[]).map((r) => adaptRow(r));
}
