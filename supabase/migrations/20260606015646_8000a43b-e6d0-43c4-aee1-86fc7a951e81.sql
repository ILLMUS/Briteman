ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS show_on_home boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_latest boolean NOT NULL DEFAULT false;
CREATE INDEX IF NOT EXISTS idx_products_show_on_home ON public.products(show_on_home) WHERE show_on_home;
CREATE INDEX IF NOT EXISTS idx_products_is_featured ON public.products(is_featured) WHERE is_featured;
CREATE INDEX IF NOT EXISTS idx_products_is_latest ON public.products(is_latest) WHERE is_latest;