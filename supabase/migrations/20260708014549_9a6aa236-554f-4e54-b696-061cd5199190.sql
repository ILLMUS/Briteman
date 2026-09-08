
CREATE OR REPLACE FUNCTION public.log_order_status_change()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  _note text;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.order_status_history (order_id, status, previous_status, changed_by, note)
    VALUES (NEW.id, NEW.status, NULL, NEW.user_id, 'Order placed');
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    BEGIN
      _note := current_setting('app.status_note', true);
    EXCEPTION WHEN OTHERS THEN
      _note := NULL;
    END;
    IF _note = '' THEN _note := NULL; END IF;
    INSERT INTO public.order_status_history (order_id, status, previous_status, changed_by, note)
    VALUES (NEW.id, NEW.status, OLD.status, auth.uid(), _note);
    NEW.updated_at = now();
    RETURN NEW;
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.admin_update_order_status(
  _order_id uuid,
  _status public.order_status,
  _note text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NOT public.is_super_admin() THEN
    RAISE EXCEPTION 'Not authorized';
  END IF;
  PERFORM set_config('app.status_note', coalesce(_note, ''), true);
  UPDATE public.orders SET status = _status WHERE id = _order_id;
  PERFORM set_config('app.status_note', '', true);
END;
$$;

GRANT EXECUTE ON FUNCTION public.admin_update_order_status(uuid, public.order_status, text) TO authenticated;
