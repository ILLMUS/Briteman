import { useSyncExternalStore } from "react";

const KEY = "briteman:favorites";
const listeners = new Set<() => void>();

function readRaw(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

let snapshot: string[] = readRaw();
let serverSnapshot: string[] = [];

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

function write(next: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(next));
  refresh();
}

export function toggleFavorite(slug: string) {
  const current = readRaw();
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [...current, slug];
  write(next);
}

export function isFavorite(slug: string): boolean {
  return readRaw().includes(slug);
}

export function clearFavorites() {
  write([]);
}

export function useFavorites() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}
