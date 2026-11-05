import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Heart, ShieldCheck, ShoppingBag, Star, Truck, X } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "./cart";

export function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product;
  open: boolean;
  onClose: () => void;
}) {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]?.label);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  if (!open) return null;

  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;

  const handleAddToCart = () => {
    add(product, qty, {
      color: product.colors[selectedColor]?.name,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card shadow-lift border border-border z-10 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur hover:bg-secondary transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Product Media Column */}
        <div className="relative md:w-1/2 bg-sand shrink-0 overflow-hidden min-h-[260px] md:min-h-full">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
              {product.badge}
            </span>
          )}
        </div>

        {/* Details & Actions Column */}
        <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-8">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{product.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="size-3.5 fill-accent text-accent" />
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
            {product.name}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p>

          <div className="mt-3 flex items-baseline gap-2.5">
            <span className="font-display text-2xl font-extrabold tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(product.compareAt)}
              </span>
            )}
            {discount && (
              <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-bold text-accent">
                Save {discount}%
              </span>
            )}
          </div>

          <p className="mt-4 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Color Selector */}
          {product.colors.length > 0 && (
            <div className="mt-5">
              <label className="text-xs font-semibold text-foreground">
                Color:{" "}
                <span className="font-normal text-muted-foreground">
                  {product.colors[selectedColor]?.name}
                </span>
              </label>
              <div className="mt-2 flex items-center gap-2">
                {product.colors.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(i)}
                    style={{ backgroundColor: c.value }}
                    className={`size-6 rounded-full border border-border/80 transition-all ${
                      selectedColor === i ? "ring-2 ring-accent ring-offset-2" : ""
                    }`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-4">
              <label className="text-xs font-semibold text-foreground">Select Size</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    disabled={!s.available}
                    onClick={() => setSelectedSize(s.label)}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-medium transition-all ${
                      selectedSize === s.label
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : s.available
                          ? "border-border hover:border-foreground/30 hover:bg-secondary/60 text-foreground"
                          : "border-border/50 text-muted-foreground/50 line-through cursor-not-allowed"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border bg-secondary/50 p-1">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-8 place-items-center text-sm font-semibold hover:text-foreground text-muted-foreground transition-colors"
              >
                −
              </button>
              <span className="w-8 text-center text-xs font-bold tabular-nums">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="grid size-8 place-items-center text-sm font-semibold hover:text-foreground text-muted-foreground transition-colors"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-accent-gradient py-3 px-4 text-xs font-bold text-accent-foreground transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              {added ? (
                <>
                  <Check className="size-4" /> Added to Bag
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4" /> Add to Bag · {formatPrice(product.price * qty)}
                </>
              )}
            </button>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck className="size-3 text-accent" /> Free shipping over $100
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3 text-emerald-600" /> 30-day guarantee
            </span>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              onClick={onClose}
              className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
            >
              View Full Product Details & Reviews →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
