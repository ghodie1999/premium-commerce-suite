import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type FeaturedCollectionGridProps = BaseSectionProps & {
  collectionSlug?: string;
  limit?: number;
  ctaLabel?: string;
  ctaTo?: string;
};

export function FeaturedCollectionGrid({
  subheading = "Curated Selection",
  heading = "Featured Collection",
  description = "Timeless silhouettes and everyday objects crafted for durability and tactile comfort.",
  collectionSlug = "best-sellers",
  limit = 4,
  ctaLabel = "View Collection",
  ctaTo,
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  align = "left",
  className = "",
}: FeaturedCollectionGridProps) {
  const filtered = products.filter(
    (p) => collectionSlug === "all" || p.collectionSlugs.includes(collectionSlug),
  );
  const items = (filtered.length > 0 ? filtered : products).slice(0, limit);

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
        align={align}
        dark={surface === "primary"}
        action={
          <Link
            to={ctaTo ?? `/collections/${collectionSlug}`}
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline whitespace-nowrap"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
