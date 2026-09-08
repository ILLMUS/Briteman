import { useSyncExternalStore } from "react";
import { CONTACT } from "@/lib/contact";

const KEY = "briteman:branch";
const listeners = new Set<() => void>();

function readName(): string {
  if (typeof window === "undefined") return CONTACT.locations[0].name;
  return localStorage.getItem(KEY) || CONTACT.locations[0].name;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (typeof window === "undefined") {
    return () => {
      listeners.delete(cb);
    };
  }
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) cb();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function setBranch(name: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, name);
  listeners.forEach((l) => l());
}

export function useBranch() {
  const name = useSyncExternalStore(
    subscribe,
    readName,
    () => CONTACT.locations[0].name,
  );
  const location =
    CONTACT.locations.find((l) => l.name === name) || CONTACT.locations[0];
  return { name: location.name, location, setBranch };
}
