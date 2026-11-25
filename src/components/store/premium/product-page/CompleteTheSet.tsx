import { ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type CompleteTheSetProps = BaseSectionProps & {
  productIds?: string[];
};

export function CompleteTheSet({
  subheading = "Coordinated Dressing",
  heading = "Complete the Set",
  productIds = ["essential-hoodie", "classic-sneakers", "riviera-sunglasses"],
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: CompleteTheSetProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const setItems = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const total = setItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock
        subheading={subheading}
        heading={heading}
        action={
          <button
            type="button"
            onClick={() => setItems.forEach((p) => add(p, 1, { color: p.colors[0]?.name }))}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="size-3.5" />
            <span>Add Complete Set · {formatPrice(total)}</span>
          </button>
        }
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {setItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
          >
            <ProductImage
              src={item.image}
              productId={item.id}
              category={item.category}
              alt={item.name}
              loading="lazy"
              decoding="async"
              width={88}
              height={88}
              className="size-22 shrink-0 rounded-xl bg-sand object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-bold text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">{item.category}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-display text-sm font-extrabold tabular-nums">
                  {formatPrice(item.price)}
                </span>
                <button
                  type="button"
                  onClick={() => add(item, 1, { color: item.colors[0]?.name })}
                  className="text-xs font-bold text-accent hover:underline"
                >
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
