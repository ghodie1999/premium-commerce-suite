import { Link } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type RecentlyRestockedProductsProps = BaseSectionProps & {
  limit?: number;
};

export function RecentlyRestockedProducts({
  subheading = "Small-Batch Replenishment",
  heading = "Recently Restocked",
  description = "Sold-out editions freshly arrived in limited warehouse quantities.",
  limit = 4,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: RecentlyRestockedProductsProps) {
  const restocked = [...products].sort((a, b) => a.stock - b.stock).slice(0, limit);

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
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline whitespace-nowrap"
          >
            <RefreshCw className="size-3.5" />
            <span>View Full Inventory</span>
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {restocked.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
