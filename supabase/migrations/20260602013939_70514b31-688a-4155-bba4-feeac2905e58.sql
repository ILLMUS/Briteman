
-- Restrict product writes to the super admin email only
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT lower(coalesce((auth.jwt() ->> 'email'), '')) = 'ajapresd@gmail.com';
$$;

DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;

CREATE POLICY "Super admin can insert products"
ON public.products FOR INSERT TO authenticated
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admin can update products"
ON public.products FOR UPDATE TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

CREATE POLICY "Super admin can delete products"
ON public.products FOR DELETE TO authenticated
USING (public.is_super_admin());
