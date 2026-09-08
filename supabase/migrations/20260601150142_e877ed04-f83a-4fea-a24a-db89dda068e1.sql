-- Seed existing catalog products so they can be edited/deleted from the admin CMS.
-- image_url left null; admin can upload an image per product. Slugs match the static catalog.
INSERT INTO public.products (name, slug, description, price, stock, category, badge) VALUES
  ('Dell XPS 15 (2025)', 'dell-xps-15-2025', 'i7 · 16GB · 1TB SSD · 15.6" OLED', 26500, 3, 'core_devices', '-15%'),
  ('HP EliteBook 840 G10', 'hp-elitebook-840-g10', 'i5 · 16GB · 512GB SSD · 14"', 19800, 0, 'core_devices', NULL),
  ('MacBook Air M3 13"', 'macbook-air-m3-13', 'Apple M3 · 8GB · 256GB SSD', 23500, 3, 'core_devices', 'NEW'),
  ('Apple iPad Air M2', 'apple-ipad-air-m2', '11" · 256GB · Wi-Fi + Stylus', 12900, 10, 'core_devices', 'NEW'),
  ('Samsung Galaxy Tab S9', 'samsung-galaxy-tab-s9', '11" AMOLED · 128GB · S-Pen', 10900, 3, 'core_devices', NULL),
  ('Logitech G502 X Wireless', 'logitech-g502-x-wireless', '25K DPI · LIGHTSPEED · 140h battery', 2100, 10, 'peripherals', NULL),
  ('Keychron K2 Pro Mechanical', 'keychron-k2-pro-mechanical', '75% layout · Hot-swap · Bluetooth', 2600, 10, 'peripherals', 'HOT'),
  ('HP DeskJet 4155e All-in-One', 'hp-deskjet-4155e-all-in-one', 'Print · Scan · Copy · Wireless', 2300, 10, 'peripherals', NULL),
  ('Samsung T7 Portable SSD 1TB', 'samsung-t7-portable-ssd-1tb', 'USB 3.2 · 1,050 MB/s · Shock-proof', 1850, 10, 'storage', NULL),
  ('WD My Passport 2TB', 'wd-my-passport-2tb', 'USB 3.0 · Encrypted · Compact', 1370, 10, 'storage', NULL),
  ('SanDisk Ultra Flash 128GB', 'sandisk-ultra-flash-128gb', 'USB 3.0 · 130 MB/s', 250, 10, 'storage', NULL),
  ('APC Back-UPS Pro 1500VA', 'apc-back-ups-pro-1500va', 'AVR · 6 outlets · LCD display', 3500, 3, 'power_infrastructure', NULL),
  ('Mercury Elite 650VA UPS', 'mercury-elite-650va-ups', 'Line-interactive · 2 outlets', 910, 0, 'power_infrastructure', NULL),
  ('Brightman Pro Laptop Backpack', 'brightman-pro-laptop-backpack', 'Fits 17" · USB charging port · Water-resistant', 590, 10, 'accessories', 'NEW'),
  ('Slim Messenger Sleeve 15"', 'slim-messenger-sleeve-15', 'Felt + leather · Magnetic close', 390, 10, 'accessories', NULL),
  ('Kids Handheld Game Console', 'kids-handheld-game-console', '400+ games · 3.5" screen · Long battery', 490, 3, 'consumer_electronics', NULL)
ON CONFLICT (slug) DO NOTHING;