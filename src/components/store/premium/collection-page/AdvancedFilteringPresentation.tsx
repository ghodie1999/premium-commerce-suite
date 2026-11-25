import { useMemo, useState } from "react";
import { RotateCcw, SlidersHorizontal } from "lucide-react";
import { products, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedFilteringPresentationProps = BaseSectionProps;

const CATEGORY_OPTIONS: ("All" | Product["category"])[] = [
  "All",
  "Women",
  "Men",
  "Home & Living",
  "Beauty",
  "Electronics",
  "Accessories",
];

export function AdvancedFilteringPresentation({
  subheading = "Faceted Discovery",
  heading = "Precision Catalog Filtering",
  description = "Filter live inventory by category, badge status, stock threshold, and maximum budget.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedFilteringPresentationProps) {
  const { formatPrice } = useRegion();
  const [category, setCategory] = useState<"All" | Product["category"]>("All");
  const [badgeFilter, setBadgeFilter] = useState<"All" | "Best Seller" | "New" | "Limited">("All");
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [lowStockOnly, setLowStockOnly] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (badgeFilter !== "All" && p.badge !== badgeFilter) return false;
      if (p.price > maxPrice) return false;
      if (lowStockOnly && p.stock > 8) return false;
      return true;
    });
  }, [category, badgeFilter, maxPrice, lowStockOnly]);

  const reset = () => {
    setCategory("All");
    setBadgeFilter("All");
    setMaxPrice(250);
    setLowStockOnly(false);
  };

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
        description={description}
        action={
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:border-primary"
          >
            <RotateCcw className="size-3.5" /> Reset Filters
          </button>
        }
      />

      <div className="mt-7 rounded-2xl border border-border bg-background p-5">
        <div className="grid gap-5 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <p className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <SlidersHorizontal className="size-3.5 text-accent" /> Department
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORY_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setCategory(opt)}
                  aria-pressed={category === opt}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    category === opt
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Edition Status
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(["All", "Best Seller", "New", "Limited"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setBadgeFilter(status)}
                  aria-pressed={badgeFilter === status}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                    badgeFilter === status
                      ? "bg-accent text-accent-foreground"
                      : "border border-border bg-card text-foreground hover:border-primary/40"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="flex items-center justify-between text-xs">
              <label
                htmlFor="filter-max-price"
                className="font-bold uppercase tracking-wider text-muted-foreground"
              >
                Max Price:{" "}
                <span className="text-foreground tabular-nums">{formatPrice(maxPrice)}</span>
              </label>
              <label className="inline-flex cursor-pointer items-center gap-1.5 font-medium text-foreground">
                <input
                  type="checkbox"
                  checked={lowStockOnly}
                  onChange={(e) => setLowStockOnly(e.target.checked)}
                  className="accent-primary"
                />
                Limited stock (&le; 8)
              </label>
            </div>
            <input
              id="filter-max-price"
              type="range"
              min={40}
              max={250}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2.5 w-full accent-primary"
            />
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold text-muted-foreground tabular-nums">
        Showing {filtered.length} of {products.length} studio pieces
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="font-display text-base font-bold text-foreground">
            No items match this filter combination
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Widen the budget slider or clear one of the active facets.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </PremiumSectionShell>
  );
}
