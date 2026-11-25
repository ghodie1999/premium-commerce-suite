import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type StickyAddToCartPresentationProps = BaseSectionProps & {
  productId?: string;
};

export function StickyAddToCartPresentation({
  productId = "essential-hoodie",
  surface = "default",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: StickyAddToCartPresentationProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const [size, setSize] = useState(product.sizes?.[1]?.label ?? product.sizes?.[0]?.label ?? "M");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const onAdd = () => {
    add(product, qty, { color: product.colors[0]?.name, size });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Sticky buy bar presentation"
      className={className}
    >
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-4 shadow-card sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 min-w-0">
          <ProductImage
            src={product.image}
            productId={product.id}
            category={product.category}
            alt={product.name}
            width={52}
            height={52}
            className="size-13 shrink-0 rounded-xl bg-sand object-cover"
          />
          <div className="min-w-0">
            <p className="font-display text-sm font-bold text-foreground truncate">
              {product.name}
            </p>
            <p className="text-xs font-extrabold tabular-nums text-accent">
              {formatPrice(product.price * qty)}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {product.sizes && product.sizes.length > 0 && (
            <select
              aria-label="Select size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-xs font-semibold outline-none focus:border-accent"
            >
              {product.sizes
                .filter((s) => s.available)
                .map((s) => (
                  <option key={s.label} value={s.label}>
                    Size {s.label}
                  </option>
                ))}
            </select>
          )}

          <div className="flex items-center rounded-xl border border-border bg-secondary/60 px-1 py-1">
            <button
              type="button"
              aria-label="Decrease"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid size-7 place-items-center rounded-lg hover:bg-card"
            >
              <Minus className="size-3" />
            </button>
            <span className="w-7 text-center text-xs font-bold tabular-nums">{qty}</span>
            <button
              type="button"
              aria-label="Increase"
              onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              className="grid size-7 place-items-center rounded-lg hover:bg-card"
            >
              <Plus className="size-3" />
            </button>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-2.5 text-xs font-bold text-accent-foreground shadow-soft transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            {added ? <Check className="size-3.5" /> : <ShoppingBag className="size-3.5" />}
            <span>{added ? "Added to Bag" : "Add to Bag"}</span>
          </button>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
