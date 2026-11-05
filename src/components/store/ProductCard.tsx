import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "./cart";
import { QuickViewModal } from "./QuickViewModal";

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [color, setColor] = useState(0);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { add } = useCart();

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;

  return (
    <>
      <article className="hover-lift group relative flex flex-col overflow-hidden rounded-3xl bg-card shadow-soft border border-border/60">
        <div className="relative overflow-hidden bg-sand">
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="block aspect-4/5 w-full overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={800}
              height={1000}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5 pointer-events-none">
            {product.badge && (
              <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {product.badge}
              </span>
            )}
            {discount && (
              <span className="rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
                −{discount}%
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={wished}
            onClick={() => setWished((v) => !v)}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur transition-transform hover:scale-110 active:scale-95"
          >
            <Heart className={`size-4 ${wished ? "fill-accent text-accent" : "text-foreground"}`} />
          </button>

          {/* Quick view button */}
          <button
            type="button"
            onClick={() => setQuickViewOpen(true)}
            className="absolute inset-x-3 bottom-3 inline-flex translate-y-3 items-center justify-center gap-1.5 rounded-full bg-card/95 py-2.5 text-xs font-semibold opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-card"
          >
            <Eye className="size-3.5" /> Quick view
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center gap-1.5 text-xs">
            <Star className="size-3.5 fill-accent text-accent" />
            <span className="font-semibold tabular-nums">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews})</span>
            {product.stock <= 10 && (
              <span className="ml-auto text-[11px] font-medium text-accent">
                Only {product.stock} left
              </span>
            )}
          </div>

          <h3 className="mt-2 text-sm font-semibold leading-snug line-clamp-1">
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              className="text-foreground transition-colors hover:text-accent"
            >
              {product.name}
            </Link>
          </h3>

          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">{product.subtitle}</p>

          {/* Color previews */}
          {product.colors.length > 0 && (
            <div className="mt-2.5 flex items-center gap-1.5">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={`Color ${c.name}`}
                  aria-pressed={color === i}
                  onClick={() => setColor(i)}
                  style={{ backgroundColor: c.value }}
                  className={`size-3.5 rounded-full border border-border/80 transition-all ${
                    color === i ? "ring-2 ring-accent ring-offset-2" : ""
                  }`}
                  title={c.name}
                />
              ))}
            </div>
          )}

          {/* Price & Action */}
          <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-border/50">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-base font-extrabold tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="text-xs text-muted-foreground line-through tabular-nums">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                add(product, 1, {
                  color: product.colors[color]?.name,
                  size: product.sizes?.[0]?.label,
                })
              }
              aria-label={`Add ${product.name} to cart`}
              className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95"
            >
              <ShoppingBag className="size-4" />
            </button>
          </div>
        </div>
      </article>

      <QuickViewModal
        product={product}
        open={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
}
