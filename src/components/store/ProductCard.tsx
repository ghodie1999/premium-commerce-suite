import { useState } from "react";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "./cart";

export function ProductCard({ product }: { product: Product }) {
  const [wished, setWished] = useState(false);
  const [color, setColor] = useState(0);
  const { add } = useCart();

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;

  return (
    <article className="hover-lift group relative overflow-hidden rounded-3xl bg-card shadow-soft">
      <div className="relative overflow-hidden bg-sand">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={1000}
          className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
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

        <button
          type="button"
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          onClick={() => setWished((v) => !v)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            className={`size-4 ${wished ? "fill-accent text-accent" : "text-foreground"}`}
          />
        </button>

        <button
          type="button"
          className="absolute inset-x-3 bottom-3 inline-flex translate-y-3 items-center justify-center gap-2 rounded-full bg-card/95 py-2.5 text-xs font-semibold opacity-0 shadow-soft backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Eye className="size-3.5" /> Quick view
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-1.5 text-xs">
          <Star className="size-3.5 fill-accent text-accent" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-muted-foreground">({product.reviews})</span>
          {product.stock <= 12 && (
            <span className="ml-auto text-[11px] font-medium text-accent">
              Only {product.stock} left
            </span>
          )}
        </div>

        <h3 className="mt-2 text-sm font-semibold leading-snug">{product.name}</h3>

        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map((c, i) => (
            <button
              key={c}
              type="button"
              aria-label={`Color option ${i + 1}`}
              aria-pressed={color === i}
              onClick={() => setColor(i)}
              style={{ backgroundColor: c }}
              className={`size-4 rounded-full border transition-all ${
                color === i ? "ring-2 ring-accent ring-offset-2" : ""
              }`}
            />
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base font-extrabold">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => add(product)}
            aria-label={`Add ${product.name} to cart`}
            className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ShoppingBag className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
