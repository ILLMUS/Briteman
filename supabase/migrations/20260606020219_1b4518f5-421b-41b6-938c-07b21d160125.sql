DO $$ BEGIN
  CREATE TYPE public.product_primary_placement AS ENUM ('none','home','latest','featured');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS primary_placement public.product_primary_placement NOT NULL DEFAULT 'none';

CREATE INDEX IF NOT EXISTS idx_products_primary_placement
  ON public.products(primary_placement)
  WHERE primary_placement <> 'none';