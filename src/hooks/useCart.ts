import { useSyncExternalStore } from "react";

export type CartItem = { slug: string; qty: number };

const KEY = "briteman:cart";
const listeners = new Set<() => void>();

function readRaw(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((x): x is CartItem => x && typeof x.slug === "string" && typeof x.qty === "number")
      .map((x) => ({ slug: x.slug, qty: Math.max(1, Math.floor(x.qty)) }));
  } catch {
    return [];
  }
}

let snapshot: CartItem[] = readRaw();
const serverSnapshot: CartItem[] = [];

function refresh() {
  snapshot = readRaw();
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) refresh();
  };
  if (typeof window !== "undefined") window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    if (typeof window !== "undefined") window.removeEventListener("storage", onStorage);
  };
}

function write(next: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  refresh();
}

export function addToCart(slug: string, qty = 1) {
  const cur = readRaw();
  const existing = cur.find((i) => i.slug === slug);
  const next = existing
    ? cur.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i))
    : [...cur, { slug, qty: Math.max(1, qty) }];
  write(next);
}

export function setCartQty(slug: string, qty: number) {
  const cur = readRaw();
  if (qty <= 0) {
    write(cur.filter((i) => i.slug !== slug));
    return;
  }
  write(cur.map((i) => (i.slug === slug ? { ...i, qty: Math.floor(qty) } : i)));
}

export function removeFromCart(slug: string) {
  write(readRaw().filter((i) => i.slug !== slug));
}

export function clearCart() {
  write([]);
}

export function useCart() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}
