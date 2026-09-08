create or replace function public.request_order_return(
  _order_id uuid,
  _reason text,
  _details text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  _order public.orders%rowtype;
  _window_days constant int := 7;
begin
  select * into _order from public.orders where id = _order_id;
  if not found then
    raise exception 'Order not found';
  end if;
  if _order.user_id <> auth.uid() then
    raise exception 'You can only return your own orders';
  end if;
  if _order.status in ('cancelled', 'returned') then
    raise exception 'This order can no longer be returned';
  end if;
  if _order.created_at < now() - make_interval(days => _window_days) then
    raise exception 'The %s-day return window has closed. Contact us about warranty support instead.', _window_days;
  end if;
  if _reason is null or btrim(_reason) = '' then
    raise exception 'A return reason is required';
  end if;

  update public.orders
  set status = 'returned',
      return_reason = btrim(_reason),
      return_details = nullif(btrim(coalesce(_details, '')), ''),
      returned_at = now(),
      updated_at = now()
  where id = _order_id;

  insert into public.order_status_history (order_id, status, previous_status, changed_by, note)
  values (
    _order_id,
    'returned',
    _order.status,
    auth.uid(),
    'Return requested by customer: ' || btrim(_reason)
      || case when _details is not null and btrim(_details) <> '' then ' — ' || btrim(_details) else '' end
  );
end;
$$;

revoke all on function public.request_order_return(uuid, text, text) from public, anon;
grant execute on function public.request_order_return(uuid, text, text) to authenticated;