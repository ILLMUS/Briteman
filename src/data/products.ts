import pLaptop from "@/assets/p-laptop.jpg";
import pMouse from "@/assets/p-mouse.jpg";
import pKeyboard from "@/assets/p-keyboard.jpg";
import pSsd from "@/assets/p-ssd.jpg";
import pTablet from "@/assets/p-tablet.jpg";
import pUps from "@/assets/p-ups.jpg";
import pPrinter from "@/assets/p-printer.jpg";
import pBag from "@/assets/p-bag.jpg";
import pConsole from "@/assets/p-console.jpg";

export type ProductVariantOption = { label: string; price_delta?: number };
export type ProductVariant = { name: string; options: ProductVariantOption[] };
export type ProductAttribute = { label: string; value: string };

export type Product = {
  slug: string;
  img: string;
  images?: string[];
  name: string;
  specs: string;
  description?: string;
  price: number;
  oldPrice?: number;
  badge?: "HOT" | "NEW" | "-15%";
  category: string;
  categorySlug: string;
  stock: "in" | "limited" | "out";
  warranty?: string;
  deliveryInfo?: string;
  attributes?: ProductAttribute[];
  variants?: ProductVariant[];
  sku?: string;
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function specsToAttributes(specs: string): ProductAttribute[] {
  return specs.split("·").map((s) => s.trim()).filter(Boolean).map((s) => {
    // If spec contains a colon, treat it as label:value
    if (s.includes(":")) {
      const [label, ...rest] = s.split(":");
      return { label: label.trim(), value: rest.join(":").trim() };
    }
    return { label: "Spec", value: s };
  });
}

const RAW: Omit<Product, "slug" | "images" | "attributes" | "description" | "warranty" | "deliveryInfo" | "variants" | "sku">[] = [
  { img: pLaptop, name: "Dell XPS 15 (2025)", specs: "Processor: i7 · RAM: 16GB · Storage: 1TB SSD · Display: 15.6\" OLED", price: 26500, oldPrice: 30500, badge: "-15%", category: "Laptops", categorySlug: "laptops", stock: "limited" },
  { img: pLaptop, name: "HP EliteBook 840 G10", specs: "Processor: i5 · RAM: 16GB · Storage: 512GB SSD · Display: 14\"", price: 19800, category: "Laptops", categorySlug: "laptops", stock: "out" },
  { img: pLaptop, name: "MacBook Air M3 13\"", specs: "Processor: Apple M3 · RAM: 8GB · Storage: 256GB SSD · Display: 13\"", price: 23500, badge: "NEW", category: "Laptops", categorySlug: "laptops", stock: "limited" },
  { img: pTablet, name: "Apple iPad Air M2", specs: "Display: 11\" · Storage: 256GB · Connectivity: Wi-Fi + Stylus", price: 12900, badge: "NEW", category: "Tablets", categorySlug: "tablets", stock: "in" },
  { img: pTablet, name: "Samsung Galaxy Tab S9", specs: "Display: 11\" AMOLED · Storage: 128GB · Includes: S-Pen", price: 10900, category: "Tablets", categorySlug: "tablets", stock: "limited" },
  { img: pMouse, name: "Logitech G502 X Wireless", specs: "DPI: 25K · Connectivity: LIGHTSPEED · Battery: 140h", price: 2100, category: "Peripherals", categorySlug: "peripherals", stock: "in" },
  { img: pKeyboard, name: "Keychron K2 Pro Mechanical", specs: "Layout: 75% · Switches: Hot-swap · Connectivity: Bluetooth", price: 2600, badge: "HOT", category: "Peripherals", categorySlug: "peripherals", stock: "in" },
  { img: pPrinter, name: "HP DeskJet 4155e All-in-One", specs: "Functions: Print · Scan · Copy · Connectivity: Wireless", price: 2300, category: "Peripherals", categorySlug: "peripherals", stock: "in" },
  { img: pSsd, name: "Samsung T7 Portable SSD 1TB", specs: "Interface: USB 3.2 · Speed: 1,050 MB/s · Features: Shock-proof", price: 1850, category: "Storage", categorySlug: "storage", stock: "in" },
  { img: pSsd, name: "WD My Passport 2TB", specs: "Interface: USB 3.0 · Features: Encrypted · Form: Compact", price: 1370, category: "Storage", categorySlug: "storage", stock: "in" },
  { img: pSsd, name: "SanDisk Ultra Flash 128GB", specs: "Interface: USB 3.0 · Speed: 130 MB/s", price: 250, category: "Storage", categorySlug: "storage", stock: "in" },
  { img: pUps, name: "APC Back-UPS Pro 1500VA", specs: "Type: AVR · Outlets: 6 · Display: LCD", price: 3500, category: "Power & UPS", categorySlug: "power", stock: "limited" },
  { img: pUps, name: "Mercury Elite 650VA UPS", specs: "Type: Line-interactive · Outlets: 2", price: 910, category: "Power & UPS", categorySlug: "power", stock: "out" },
  { img: pBag, name: "Brightman Pro Laptop Backpack", specs: "Fits: 17\" · Features: USB charging port · Material: Water-resistant", price: 590, badge: "NEW", category: "Accessories", categorySlug: "accessories", stock: "in" },
  { img: pBag, name: "Slim Messenger Sleeve 15\"", specs: "Material: Felt + leather · Closure: Magnetic", price: 390, category: "Accessories", categorySlug: "accessories", stock: "in" },
  { img: pConsole, name: "Kids Handheld Game Console", specs: "Games: 400+ · Screen: 3.5\" · Battery: Long-life", price: 490, category: "Gaming", categorySlug: "gaming", stock: "limited" },
];

const WARRANTY_DEFAULT = "1-year local warranty with Briteman Services. Terms apply.";
const DELIVERY_DEFAULT = "Collection available at Mbabane or Manzini branch. Delivery across Eswatini arranged on WhatsApp.";

const DESCRIPTIONS: Record<string, string> = {
  "dell-xps-15-2025": "Premium business laptop with a stunning OLED display, powerful Intel Core i7 processor and blazing-fast 1TB SSD. Ideal for professionals, creatives and students who need performance on the go.",
  "hp-elitebook-840-g10": "Reliable enterprise-grade notebook with a 14-inch display, Intel Core i5 and 16GB RAM. Built for productivity and security in any workplace.",
  "macbook-air-m3-13": "Apple's ultra-light M3 MacBook Air delivers incredible speed and all-day battery in a silent, fanless design.",
  "apple-ipad-air-m2": "The redesigned iPad Air with the M2 chip is perfect for work, study and creativity. Includes Wi-Fi support and stylus compatibility.",
  "samsung-galaxy-tab-s9": "Flagship Android tablet with a vibrant 11-inch AMOLED display, 128GB storage and the included S-Pen for notes and sketching.",
  "logitech-g502-x-wireless": "Iconic gaming mouse reimagined with LIGHTSPEED wireless, 25K DPI sensor and 140-hour battery life.",
  "keychron-k2-pro-mechanical": "Compact 75% mechanical keyboard with hot-swappable switches and wireless Bluetooth connectivity for Mac and Windows.",
  "hp-deskjet-4155e-all-in-one": "Affordable wireless all-in-one printer for home or small office. Print, scan and copy from any device.",
  "samsung-t7-portable-ssd-1tb": "Pocket-sized 1TB SSD with USB 3.2 speeds up to 1,050 MB/s and shock-resistant design.",
  "wd-my-passport-2tb": "Trusted 2TB portable hard drive with password protection and hardware encryption.",
  "sandisk-ultra-flash-128gb": "High-speed 128GB USB flash drive for everyday file transfers and backups.",
  "apc-back-ups-pro-1500va": "Reliable 1500VA UPS with AVR, 6 outlets and LCD display to protect your critical equipment from power issues.",
  "mercury-elite-650va-ups": "Compact 650VA line-interactive UPS with surge protection and two battery-backed outlets.",
  "brightman-pro-laptop-backpack": "Professional laptop backpack with USB charging port, water-resistant fabric and room for up to 17-inch laptops.",
  "slim-messenger-sleeve-15": "Slim felt and leather sleeve with magnetic closure, designed to protect 15-inch laptops in style.",
  "kids-handheld-game-console": "Fun handheld console pre-loaded with 400+ games and a 3.5-inch screen. Great entertainment for kids and travel.",
};

export const PRODUCTS: Product[] = RAW.map((p) => {
  const slug = slugify(p.name);
  return {
    ...p,
    slug,
    images: [p.img],
    attributes: specsToAttributes(p.specs),
    description: DESCRIPTIONS[slug] ?? "",
    warranty: WARRANTY_DEFAULT,
    deliveryInfo: DELIVERY_DEFAULT,
  };
});

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

export function whatsappOrderLink(p: Product, branch = "Mbabane", opts?: { variantLabel?: string; finalPrice?: number }) {
  const finalPrice = opts?.finalPrice ?? p.price;
  const variantLine = opts?.variantLabel ? `• Variant: ${opts.variantLabel}\n` : "";
  const msg =
    `Hi Briteman Services (${branch}, Eswatini), I'd like to order:\n` +
    `• Product: ${p.name}\n` +
    variantLine +
    `• Price: ${fmtPrice(finalPrice)}\n\n` +
    `Preferred pickup / delivery branch: ${branch}\n\n` +
    `Could you please confirm:\n` +
    `1. Is this item currently in stock at the ${branch} branch?\n` +
    `2. What is the estimated delivery time to my location from ${branch}?`;
  return `https://wa.me/26876623733?text=${encodeURIComponent(msg)}`;
}
