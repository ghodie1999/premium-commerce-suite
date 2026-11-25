import { useState } from "react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const DEFAULT_TABS = [
  { label: "Best Sellers", slug: "best-sellers" },
  { label: "Trending Now", slug: "trending-now" },
  { label: "Home & Living", slug: "home-living" },
  { label: "Electronics", slug: "electronics" },
];

export type TabbedProductCollectionsProps = BaseSectionProps & {
  tabs?: { label: string; slug: string }[];
  limit?: number;
};

export function TabbedProductCollections({
  subheading = "Browse by Department",
  heading = "Curated Collection Tabs",
  tabs = DEFAULT_TABS,
  limit = 4,
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: TabbedProductCollectionsProps) {
  const [activeSlug, setActiveSlug] = useState(tabs[0]?.slug ?? "best-sellers");
  const filtered = products.filter((p) => p.collectionSlugs.includes(activeSlug)).slice(0, limit);
  const items = filtered.length > 0 ? filtered : products.slice(0, limit);

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
        dark={surface === "primary"}
        action={
          <div className="inline-flex flex-wrap gap-1 rounded-2xl border border-border bg-card p-1">
            {tabs.map((tab) => (
              <button
                key={tab.slug}
                type="button"
                aria-pressed={activeSlug === tab.slug}
                onClick={() => setActiveSlug(tab.slug)}
                className={`rounded-xl px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  activeSlug === tab.slug
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
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
