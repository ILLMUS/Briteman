import {
  MessageCircle,
  Heart,
  ShoppingCart,
} from "lucide-react";
import {
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { toast } from "sonner";
import {
  fmtPrice,
  whatsappOrderLink,
  type Product,
} from "@/data/products";
import { useAuthGate } from "@/hooks/useAuthGate";
import { useAuth } from "@/hooks/useAuth";
import { useBranch } from "@/hooks/useBranch";
import { logOrder } from "@/lib/log-order";
import {
  useFavorites,
  toggleFavorite,
} from "@/hooks/useFavorites";
import { addToCart } from "@/hooks/useCart";

function badgeClass(b?: string) {
  if (b === "HOT") {
    return "bg-[#1d1d1f] text-white";
  }

  if (b === "NEW") {
    return "bg-white text-[#1d1d1f] border border-black/[0.08]";
  }

  return "bg-white text-[#1d1d1f] border border-black/[0.08]";
}

const stockLabels: Record<Product["stock"], string> = {
  in: "In Stock",
  limited: "Limited",
  out: "Out of Stock",
};

export function ProductCard({ p }: { p: Product }) {
  const gate = useAuthGate();
  const navigate = useNavigate();

  // Branch remains internal for ordering/logging.
  // It is not displayed to customers.
  const { name: branch } = useBranch();

  const { user } = useAuth();

  const favSlugs = useFavorites();
  const isFav = favSlugs.includes(p.slug);
  const isOut = p.stock === "out";
  const isSignedUp = !!user;

  function openProductDetails(
    e: React.MouseEvent<HTMLAnchorElement>,
  ) {
    if (user) {
      return;
    }

    e.preventDefault();

    navigate({
      to: "/auth",
      search: {
        mode: "login",
      },
    });
  }

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-2xl
        border border-black/[0.07]
        bg-white
        transition-all duration-300
        hover:-translate-y-0.5
        hover:border-black/[0.11]
        hover:shadow-[0_18px_45px_-24px_rgba(0,0,0,0.28)]
      "
    >
      {/* =========================================================
          PRODUCT IMAGE
      ========================================================= */}

      <div className="relative">
        <Link
          to="/product/$slug"
          params={{ slug: p.slug }}
          onClick={openProductDetails}
          className="
            relative block aspect-square
            overflow-hidden
            bg-[#f5f5f7]
          "
          aria-label={`View details for ${p.name}`}
        >
          {/* Product badge */}

          {p.badge && (
            <span
              className={`
                absolute left-3 top-3 z-10
                rounded-full
                px-2.5 py-1
                text-[9px]
                font-semibold
                tracking-wide
                ${badgeClass(p.badge)}
              `}
            >
              {p.badge}
            </span>
          )}

          {/* Product image */}

          <img
            src={p.img}
            alt={p.name}
            width={800}
            height={800}
            loading="lazy"
            className={`
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.035]
              ${
                isOut
                  ? "grayscale opacity-55"
                  : ""
              }
            `}
          />

          {/* Bottom gradient */}

          <div
            className="
              pointer-events-none
              absolute inset-x-0 bottom-0
              h-20
              bg-gradient-to-t
              from-black/[0.08]
              to-transparent
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />
        </Link>

        {/* =======================================================
            FAVOURITE BUTTON
        ======================================================= */}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();

            toggleFavorite(p.slug);

            toast.success(
              isFav
                ? "Removed from favourites"
                : "Added to favourites",
            );
          }}
          aria-label={
            isFav
              ? "Remove from favourites"
              : "Add to favourites"
          }
          className="
            absolute
            right-3
            top-3
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-black/[0.07]
            bg-white/90
            text-[#6e6e73]
            shadow-[0_4px_14px_rgba(0,0,0,0.08)]
            backdrop-blur-md
            transition-all
            duration-200
            hover:scale-105
            hover:bg-white
            hover:text-[#1d1d1f]
            active:scale-95
          "
        >
          <Heart
            className={`
              h-[17px]
              w-[17px]
              transition-colors
              ${
                isFav
                  ? "fill-brand-red text-brand-red"
                  : "text-[#6e6e73]"
              }
            `}
            strokeWidth={1.8}
          />
        </button>

        {/* =======================================================
            STOCK INDICATOR
        ======================================================= */}

        <div className="absolute bottom-3 left-3 z-10">
          <span
            className={`
              inline-flex
              items-center
              gap-1.5
              rounded-full
              border
              border-white/70
              bg-white/90
              px-2.5
              py-1
              text-[9px]
              font-medium
              text-[#1d1d1f]
              shadow-sm
              backdrop-blur-md
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${
                  p.stock === "in"
                    ? "bg-emerald-500"
                    : p.stock === "limited"
                      ? "bg-amber-500 animate-pulse"
                      : "bg-neutral-400"
                }
              `}
            />

            {stockLabels[p.stock]}
          </span>
        </div>
      </div>

      {/* =========================================================
          PRODUCT INFORMATION
      ========================================================= */}

      <div className="flex flex-1 flex-col p-4 sm:p-5">

        {/* Category */}

        <span
          className="
            mb-2
            text-[10px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#86868b]
          "
        >
          {p.category}
        </span>

        {/* Product Name */}

        <Link
          to="/product/$slug"
          params={{ slug: p.slug }}
          onClick={openProductDetails}
          className="block"
        >
          <h3
            className="
              line-clamp-2
              min-h-[40px]
              text-[14px]
              font-semibold
              leading-[1.35]
              tracking-[-0.01em]
              text-[#1d1d1f]
              transition-colors
              group-hover:text-brand-blue
              sm:text-[15px]
            "
          >
            {p.name}
          </h3>
        </Link>

        {/* Specifications */}

        <p
          className="
            mt-2
            line-clamp-2
            min-h-[32px]
            text-[11px]
            leading-[1.5]
            text-[#86868b]
          "
        >
          {p.specs}
        </p>

        {/* =======================================================
            PRICE
        ======================================================= */}

        <div className="mt-4">
          {isSignedUp ? (
            <div className="flex items-baseline gap-2">
              <span
                className="
                  text-[17px]
                  font-semibold
                  tracking-[-0.02em]
                  text-[#1d1d1f]
                  sm:text-[18px]
                "
              >
                {fmtPrice(p.price)}
              </span>

              {p.oldPrice && (
                <span
                  className="
                    text-[11px]
                    text-[#86868b]
                    line-through
                  "
                >
                  {fmtPrice(p.oldPrice)}
                </span>
              )}
            </div>
          ) : (
            <Link
              to="/product/$slug"
              params={{ slug: p.slug }}
              onClick={openProductDetails}
              className="
                inline-flex
                items-center
                text-[12px]
                font-medium
                text-brand-blue
                transition-colors
                hover:text-brand-blue-dark
              "
              aria-label={`Sign in or sign up to view details about ${p.name}`}
            >
              Sign in to view price
              <span className="ml-1">→</span>
            </Link>
          )}
        </div>

        {/* =======================================================
            ACTIONS
        ======================================================= */}

        <div className="mt-auto pt-5">
          {isOut ? (
            <div>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#f5f5f7]
                  px-4
                  py-2.5
                  text-[11px]
                  font-semibold
                  text-[#86868b]
                  cursor-not-allowed
                "
              >
                <MessageCircle
                  className="h-3.5 w-3.5"
                  strokeWidth={1.8}
                />

                Currently Unavailable
              </button>

              <p
                className="
                  mt-2
                  text-center
                  text-[10px]
                  leading-relaxed
                  text-[#86868b]
                "
              >
                Contact us for alternatives or availability.
              </p>
            </div>
          ) : (
            <div className="flex items-center gap-2">

              {/* Add to cart */}

              <button
                type="button"
                onClick={() => {
                  addToCart(p.slug, 1);

                  toast.success(
                    `${p.name} added to cart`,
                  );
                }}
                aria-label={`Add ${p.name} to cart`}
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-black/[0.09]
                  bg-white
                  text-[#1d1d1f]
                  transition-all
                  duration-200
                  hover:border-black/[0.18]
                  hover:bg-[#f5f5f7]
                  active:scale-95
                "
              >
                <ShoppingCart
                  className="h-[17px] w-[17px]"
                  strokeWidth={1.8}
                />
              </button>

              {/* WhatsApp / Order */}

              <a
                href={whatsappOrderLink(
                  p,
                  branch.replace(" Branch", ""),
                )}
                onClick={gate(() => {
                  void logOrder(p, branch);
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  flex
                  h-10
                  flex-1
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-[#1d1d1f]
                  px-4
                  text-[11px]
                  font-semibold
                  text-white
                  transition-all
                  duration-200
                  hover:bg-brand-blue
                  active:scale-[0.98]
                "
              >
                <MessageCircle
                  className="h-[15px] w-[15px]"
                  strokeWidth={1.9}
                />

                Order
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}