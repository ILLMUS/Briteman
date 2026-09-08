import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

/**
 * Logs a pending order for the current signed-in user. Fire-and-forget:
 * we don't block the WhatsApp redirect if the insert fails.
 *
 * NOTE: this must only ever be called when the customer actually attempts to
 * place an order (WhatsApp checkout). Adding to cart or favourites must never
 * create an order record.
 */
export async function logOrder(p: Product, branch: string, quantity = 1) {
  try {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;
    if (!user) return;
    await supabase.from("orders").insert({
      user_id: user.id,
      customer_email: user.email ?? null,
      product_slug: p.slug,
      product_name: p.name,
      product_image: p.img,
      unit_price: p.price,
      quantity: Math.max(1, Math.floor(quantity)),
      branch,
      status: "pending",
    });
  } catch {
    // swallow — ordering must not be interrupted
  }
}
