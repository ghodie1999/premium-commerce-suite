import { useState } from "react";
import { Columns2, Columns3, LayoutGrid } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductGridLayoutSwitcherProps = BaseSectionProps;

type ColumnDensity = 2 | 3 | 4;

const GRID_CLASS: Record<ColumnDensity, string> = {
  2: "grid gap-6 sm:grid-cols-2",
  3: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
};

export function ProductGridLayoutSwitcher({
  subheading = "Viewport Density",
  heading = "Adaptive Grid Switcher",
  description = "Switch between editorial two-column spread, balanced three-column, or compact four-column views.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductGridLayoutSwitcherProps) {
  const [cols, setCols] = useState<ColumnDensity>(3);
  const items = products.slice(0, 6);

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
          <div
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background p-1"
            role="group"
            aria-label="Grid column count"
          >
            <button
              type="button"
              onClick={() => setCols(2)}
              aria-pressed={cols === 2}
              aria-label="2 columns"
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                cols === 2 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Columns2 className="size-3.5" /> 2-Col
            </button>
            <button
              type="button"
              onClick={() => setCols(3)}
              aria-pressed={cols === 3}
              aria-label="3 columns"
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                cols === 3 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <Columns3 className="size-3.5" /> 3-Col
            </button>
            <button
              type="button"
              onClick={() => setCols(4)}
              aria-pressed={cols === 4}
              aria-label="4 columns"
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                cols === 4 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="size-3.5" /> 4-Col
            </button>
          </div>
        }
      />

      <div className={`mt-8 ${GRID_CLASS[cols]}`}>
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
