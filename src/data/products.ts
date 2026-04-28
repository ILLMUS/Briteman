import pLaptop from "@/assets/p-laptop.jpg";
import pMouse from "@/assets/p-mouse.jpg";
import pKeyboard from "@/assets/p-keyboard.jpg";
import pSsd from "@/assets/p-ssd.jpg";
import pTablet from "@/assets/p-tablet.jpg";
import pUps from "@/assets/p-ups.jpg";
import pPrinter from "@/assets/p-printer.jpg";
import pBag from "@/assets/p-bag.jpg";
import pConsole from "@/assets/p-console.jpg";

export type Product = {
  img: string;
  name: string;
  specs: string;
  price: number;
  oldPrice?: number;
  badge?: "HOT" | "NEW" | "-15%";
  category: string;
  categorySlug: string;
};

export const PRODUCTS: Product[] = [
  { img: pLaptop, name: "Dell XPS 15 (2025)", specs: "i7 · 16GB · 1TB SSD · 15.6\" OLED", price: 26500, oldPrice: 30500, badge: "-15%", category: "Laptops", categorySlug: "laptops" },
  { img: pLaptop, name: "HP EliteBook 840 G10", specs: "i5 · 16GB · 512GB SSD · 14\"", price: 19800, category: "Laptops", categorySlug: "laptops" },
  { img: pLaptop, name: "MacBook Air M3 13\"", specs: "Apple M3 · 8GB · 256GB SSD", price: 23500, badge: "NEW", category: "Laptops", categorySlug: "laptops" },
  { img: pTablet, name: "Apple iPad Air M2", specs: "11\" · 256GB · Wi-Fi + Stylus", price: 12900, badge: "NEW", category: "Tablets", categorySlug: "tablets" },
  { img: pTablet, name: "Samsung Galaxy Tab S9", specs: "11\" AMOLED · 128GB · S-Pen", price: 10900, category: "Tablets", categorySlug: "tablets" },
  { img: pMouse, name: "Logitech G502 X Wireless", specs: "25K DPI · LIGHTSPEED · 140h battery", price: 2100, category: "Peripherals", categorySlug: "peripherals" },
  { img: pKeyboard, name: "Keychron K2 Pro Mechanical", specs: "75% layout · Hot-swap · Bluetooth", price: 2600, badge: "HOT", category: "Peripherals", categorySlug: "peripherals" },
  { img: pPrinter, name: "HP DeskJet 4155e All-in-One", specs: "Print · Scan · Copy · Wireless", price: 2300, category: "Peripherals", categorySlug: "peripherals" },
  { img: pSsd, name: "Samsung T7 Portable SSD 1TB", specs: "USB 3.2 · 1,050 MB/s · Shock-proof", price: 1850, category: "Storage", categorySlug: "storage" },
  { img: pSsd, name: "WD My Passport 2TB", specs: "USB 3.0 · Encrypted · Compact", price: 1370, category: "Storage", categorySlug: "storage" },
  { img: pSsd, name: "SanDisk Ultra Flash 128GB", specs: "USB 3.0 · 130 MB/s", price: 250, category: "Storage", categorySlug: "storage" },
  { img: pUps, name: "APC Back-UPS Pro 1500VA", specs: "AVR · 6 outlets · LCD display", price: 3500, category: "Power", categorySlug: "power" },
  { img: pUps, name: "Mercury Elite 650VA UPS", specs: "Line-interactive · 2 outlets", price: 910, category: "Power", categorySlug: "power" },
  { img: pBag, name: "Brightman Pro Laptop Backpack", specs: "Fits 17\" · USB charging port · Water-resistant", price: 590, badge: "NEW", category: "Accessories", categorySlug: "accessories" },
  { img: pBag, name: "Slim Messenger Sleeve 15\"", specs: "Felt + leather · Magnetic close", price: 390, category: "Accessories", categorySlug: "accessories" },
  { img: pConsole, name: "Kids Handheld Game Console", specs: "400+ games · 3.5\" screen · Long battery", price: 490, category: "Gaming", categorySlug: "gaming" },
];

export const CATEGORIES: { slug: string; label: string; description: string }[] = [
  { slug: "laptops", label: "Laptops", description: "Business, gaming and student laptops from Dell, HP, Apple, Lenovo and more." },
  { slug: "tablets", label: "Tablets", description: "iPads and Android tablets for work, study and creativity." },
  { slug: "peripherals", label: "Peripherals", description: "Mice, keyboards and printers for productive workspaces." },
  { slug: "storage", label: "Storage", description: "Portable SSDs, hard drives and flash drives." },
  { slug: "power", label: "Power & UPS", description: "UPS systems and chargers to keep your equipment running." },
  { slug: "accessories", label: "Accessories", description: "Bags, sleeves and everyday essentials." },
  { slug: "gaming", label: "Gaming", description: "Consoles and gaming gear for kids and enthusiasts." },
];

export const fmtPrice = (n: number) => "E " + n.toLocaleString();

export function whatsappOrderLink(p: Product) {
  const msg =
    `Hi Brightman (Mbabane, Eswatini), I'd like to order:\n` +
    `• Product: ${p.name}\n` +
    `• Price: ${fmtPrice(p.price)}\n\n` +
    `Could you please confirm:\n` +
    `1. Is this item currently in stock?\n` +
    `2. What is the estimated delivery time to my location in Mbabane / Eswatini?`;
  return `https://wa.me/26878000000?text=${encodeURIComponent(msg)}`;
}
