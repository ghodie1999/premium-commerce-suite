import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedSortingControlsProps = BaseSectionProps;

type SortMode = "featured" | "price-asc" | "price-desc" | "rating" | "most-reviewed";

const SORT_OPTIONS: { id: SortMode; label: string }[] = [
  { id: "featured", label: "Curated Order" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Highest Rated" },
  { id: "most-reviewed", label: "Most Reviewed" },
];

export function AdvancedSortingControls({
  subheading = "Merchandising Order",
  heading = "Interactive Sorting Toolbar",
  description = "Reorder the collection instantly by price, customer rating, or review volume.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedSortingControlsProps) {
  const [sortMode, setSortMode] = useState<SortMode>("featured");

  const sorted = useMemo(() => {
    const copy = [...products];
    if (sortMode === "price-asc") copy.sort((a, b) => a.price - b.price);
    if (sortMode === "price-desc") copy.sort((a, b) => b.price - a.price);
    if (sortMode === "rating") copy.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    if (sortMode === "most-reviewed") copy.sort((a, b) => b.reviews - a.reviews);
    return copy.slice(0, 4);
  }, [sortMode]);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card px-5 py-3.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <ArrowUpDown className="size-4 text-accent" />
          <span className="tabular-nums">Displaying top 4 of {products.length} sorted results</span>
        </div>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Sort collection">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortMode(option.id)}
              aria-pressed={sortMode === option.id}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                sortMode === option.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-background text-foreground hover:bg-sand"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
