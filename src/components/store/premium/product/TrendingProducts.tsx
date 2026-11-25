import { Link } from "@tanstack/react-router";
import { ArrowRight, TrendingUp } from "lucide-react";
import { getTrendingProducts } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type TrendingProductsProps = BaseSectionProps & {
  limit?: number;
};

export function TrendingProducts({
  subheading = "Live Storefront Momentum",
  heading = "Trending Right Now",
  description = "Ranked by recent shopper interest, verified rating velocity, and limited inventory.",
  limit = 4,
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: TrendingProductsProps) {
  const trending = getTrendingProducts(limit);

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
            to="/collections/$slug"
            params={{ slug: "trending-now" }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline whitespace-nowrap"
          >
            <TrendingUp className="size-4" />
            <span>Explore Trending</span>
            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {trending.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
