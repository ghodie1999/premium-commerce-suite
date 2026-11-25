import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { products, type Product } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const STORAGE_KEY = "shopease.recently_viewed.ids";

export type RecentlyViewedProductsProps = BaseSectionProps & {
  limit?: number;
};

export function RecentlyViewedProducts({
  subheading = "Browsing History",
  heading = "Recently Viewed",
  description = "Pick up right where you left off across garments, carryalls, and desk hardware.",
  limit = 4,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: RecentlyViewedProductsProps) {
  const [recentIds, setRecentIds] = useState<string[]>(() =>
    products.slice(0, limit).map((p) => p.id),
  );

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRecentIds(parsed.filter((v): v is string => typeof v === "string"));
        }
      }
    } catch {
      // Ignore storage failures
    }
  }, []);

  const items: Product[] = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, limit);

  const visibleItems = items.length > 0 ? items : products.slice(0, limit);

  const resetHistory = () => {
    const defaults = products.slice(0, limit).map((p) => p.id);
    setRecentIds(defaults);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures
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
      <SectionHeaderBlock
        subheading={subheading}
        heading={heading}
        description={description}
        dark={surface === "primary"}
        action={
          <button
            type="button"
            onClick={resetHistory}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset View History</span>
          </button>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
