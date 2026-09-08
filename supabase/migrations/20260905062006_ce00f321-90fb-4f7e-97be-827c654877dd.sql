ALTER TYPE public.order_status ADD VALUE IF NOT EXISTS 'returned';

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS return_reason text,
  ADD COLUMN IF NOT EXISTS return_details text,
  ADD COLUMN IF NOT EXISTS returned_at timestamp with time zone;