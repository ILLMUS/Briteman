
CREATE TABLE public.order_status_history (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  status order_status NOT NULL,
  previous_status order_status,
  changed_by uuid,
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX idx_order_status_history_order_id ON public.order_status_history(order_id, created_at DESC);

GRANT SELECT, INSERT, DELETE ON public.order_status_history TO authenticated;
GRANT ALL ON public.order_status_history TO service_role;

ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view history of their own orders"
  ON public.order_status_history FOR SELECT
  TO authenticated
  USING (
    is_super_admin()
    OR EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_status_history.order_id
        AND o.user_id = auth.uid()
    )
  );

CREATE POLICY "Admins can insert history"
  ON public.order_status_history FOR INSERT
  TO authenticated
  WITH CHECK (is_super_admin());

CREATE POLICY "Admins can delete history"
  ON public.order_status_history FOR DELETE
  TO authenticated
  USING (is_super_admin());

-- Trigger function: log status transitions
CREATE OR REPLACE FUNCTION public.log_order_status_change()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.order_status_history (order_id, status, previous_status, changed_by, note)
    VALUES (NEW.id, NEW.status, NULL, NEW.user_id, 'Order placed');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.order_status_history (order_id, status, previous_status, changed_by, note)
    VALUES (NEW.id, NEW.status, OLD.status, auth.uid(), NULL);
    NEW.updated_at = now();
    RETURN NEW;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_orders_status_history ON public.orders;
CREATE TRIGGER trg_orders_status_history
  AFTER INSERT ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_status_change();

DROP TRIGGER IF EXISTS trg_orders_status_history_upd ON public.orders;
CREATE TRIGGER trg_orders_status_history_upd
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.log_order_status_change();

-- Backfill: seed an initial history row for existing orders that have none
INSERT INTO public.order_status_history (order_id, status, previous_status, changed_by, note, created_at)
SELECT o.id, o.status, NULL, o.user_id, 'Order placed', o.created_at
FROM public.orders o
WHERE NOT EXISTS (
  SELECT 1 FROM public.order_status_history h WHERE h.order_id = o.id
);
