import { Plus, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductBundlePromotionProps = BaseSectionProps & {
  primaryProductId?: string;
  secondaryProductId?: string;
  savingsPercent?: number;
};

export function ProductBundlePromotion({
  subheading = "Paired Value",
  heading = "Daily Uniform Duo",
  description = "Combine our Heavyweight Hoodie and Minimalist Sneakers in one click for automatic set savings.",
  primaryProductId = "essential-hoodie",
  secondaryProductId = "classic-sneakers",
  savingsPercent = 15,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductBundlePromotionProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const itemA = products.find((p) => p.id === primaryProductId) ?? products[0]!;
  const itemB = products.find((p) => p.id === secondaryProductId) ?? products[2]!;

  const combined = itemA.price + itemB.price;
  const offer = combined * (1 - savingsPercent / 100);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid items-center gap-8 rounded-3xl border border-border bg-sand/30 p-6 sm:p-10 lg:grid-cols-12">
        <div className="flex items-center justify-center gap-4 lg:col-span-6">
          <div className="w-44 overflow-hidden rounded-2xl border border-border bg-card p-3">
            <ProductImage
              src={itemA.image}
              productId={itemA.id}
              category={itemA.category}
              alt={itemA.name}
              loading="lazy"
              decoding="async"
              width={200}
              height={220}
              className="aspect-4/4 w-full rounded-xl object-cover"
            />
            <p className="mt-2 truncate text-xs font-bold">{itemA.name}</p>
          </div>
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
            <Plus className="size-4" />
          </span>
          <div className="w-44 overflow-hidden rounded-2xl border border-border bg-card p-3">
            <ProductImage
              src={itemB.image}
              productId={itemB.id}
              category={itemB.category}
              alt={itemB.name}
              loading="lazy"
              decoding="async"
              width={200}
              height={220}
              className="aspect-4/4 w-full rounded-xl object-cover"
            />
            <p className="mt-2 truncate text-xs font-bold">{itemB.name}</p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div>
              <span className="font-display text-3xl font-black text-accent tabular-nums">
                {formatPrice(offer)}
              </span>
              <span className="ml-2 text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(combined)}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                add(itemA, 1, { color: itemA.colors[0]?.name, size: itemA.sizes?.[0]?.label });
                add(itemB, 1, { color: itemB.colors[0]?.name, size: itemB.sizes?.[0]?.label });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <ShoppingBag className="size-4" />
              <span>Add Both ({savingsPercent}% Off)</span>
            </button>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
