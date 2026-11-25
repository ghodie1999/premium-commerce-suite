import { useState } from "react";
import { Check, Plus, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type FrequentlyBoughtTogetherProps = BaseSectionProps & {
  productIds?: string[];
  bundleDiscountPercent?: number;
};

export function FrequentlyBoughtTogether({
  subheading = "Curated Pairings",
  heading = "Frequently Bought Together",
  description = "Combine complementary studio pieces for an instant paired discount.",
  productIds = ["essential-hoodie", "leather-handbag", "classic-sneakers"],
  bundleDiscountPercent = 12,
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: FrequentlyBoughtTogetherProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const bundleItems = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const [selectedIds, setSelectedIds] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(bundleItems.map((p) => [p.id, true])),
  );

  const chosen = bundleItems.filter((p) => selectedIds[p.id]);
  const rawTotal = chosen.reduce((acc, p) => acc + p.price, 0);
  const discountedTotal =
    chosen.length >= 2 ? rawTotal * (1 - bundleDiscountPercent / 100) : rawTotal;

  const toggle = (id: string) => {
    setSelectedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddSelected = () => {
    for (const item of chosen) {
      add(item, 1, {
        color: item.colors[0]?.name,
        size: item.sizes?.[0]?.label,
      });
    }
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft">
        <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
          <div className="flex flex-wrap items-center gap-3 lg:col-span-7">
            {bundleItems.map((item, idx) => {
              const checked = Boolean(selectedIds[item.id]);
              return (
                <div key={item.id} className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    aria-pressed={checked}
                    className={`group relative w-32 sm:w-40 overflow-hidden rounded-2xl border p-2 text-left transition-all ${
                      checked
                        ? "border-primary bg-background shadow-soft"
                        : "border-border opacity-50 hover:opacity-80"
                    }`}
                  >
                    <div className="aspect-square overflow-hidden rounded-xl bg-sand">
                      <ProductImage
                        src={item.image}
                        productId={item.id}
                        category={item.category}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        width={180}
                        height={180}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="mt-2 truncate text-xs font-semibold text-foreground">
                      {item.name}
                    </p>
                    <p className="text-xs font-bold tabular-nums text-accent">
                      {formatPrice(item.price)}
                    </p>
                    <span
                      className={`absolute right-3 top-3 grid size-5 place-items-center rounded-full border ${
                        checked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card"
                      }`}
                    >
                      {checked && <Check className="size-3" />}
                    </span>
                  </button>
                  {idx < bundleItems.length - 1 && (
                    <Plus className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-border pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs text-muted-foreground">
              Selected {chosen.length} of {bundleItems.length} items
              {chosen.length >= 2 && ` · ${bundleDiscountPercent}% bundle savings applied`}
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-display text-3xl font-black tabular-nums text-foreground">
                {formatPrice(discountedTotal)}
              </span>
              {chosen.length >= 2 && (
                <span className="text-sm text-muted-foreground line-through tabular-nums">
                  {formatPrice(rawTotal)}
                </span>
              )}
            </div>
            <button
              type="button"
              disabled={chosen.length === 0}
              onClick={handleAddSelected}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:opacity-40"
            >
              <ShoppingBag className="size-4" />
              <span>Add Selected Set to Bag</span>
            </button>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
