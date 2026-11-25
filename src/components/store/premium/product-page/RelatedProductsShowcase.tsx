import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type RelatedProductsShowcaseProps = BaseSectionProps & {
  excludeId?: string;
};

export function RelatedProductsShowcase({
  subheading = "Complementary Pieces",
  heading = "Related Essentials",
  excludeId = "essential-hoodie",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: RelatedProductsShowcaseProps) {
  const related = products.filter((p) => p.id !== excludeId).slice(0, 4);

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
          <Link
            to="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
          >
            <span>All Products</span>
            <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
