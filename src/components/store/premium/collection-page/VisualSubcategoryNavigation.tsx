import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type VisualSubcategoryNavigationProps = BaseSectionProps;

export function VisualSubcategoryNavigation({
  subheading = "Department Filter",
  heading = "Browse by Subcategory",
  description = "Select a focused department tile below to preview its active silhouettes live.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: VisualSubcategoryNavigationProps) {
  const visualCategories = categories.filter((c) => c.slug !== "all" && c.image);
  const [selectedSlug, setSelectedSlug] = useState<string>("all");

  const visibleProducts =
    selectedSlug === "all"
      ? products.slice(0, 4)
      : products
          .filter(
            (p) =>
              p.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedSlug ||
              p.collectionSlugs.includes(selectedSlug),
          )
          .slice(0, 4);

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
          <Link
            to="/collections/$slug"
            params={{ slug: selectedSlug }}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent"
          >
            Open Full Category <ArrowRight className="size-3.5" />
          </Link>
        }
      />

      <div className="mt-7 flex gap-3 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedSlug("all")}
          aria-pressed={selectedSlug === "all"}
          className={`flex shrink-0 items-center gap-3 rounded-2xl border px-4 py-2.5 text-left transition-all ${
            selectedSlug === "all"
              ? "border-primary bg-primary text-primary-foreground shadow-soft"
              : "border-border bg-card text-foreground hover:border-primary/40"
          }`}
        >
          <div>
            <p className="font-display text-xs font-bold uppercase tracking-wider">All Items</p>
            <p
              className={`text-[11px] tabular-nums ${
                selectedSlug === "all" ? "text-primary-foreground/75" : "text-muted-foreground"
              }`}
            >
              {products.length} products
            </p>
          </div>
        </button>

        {visualCategories.map((cat) => {
          const active = selectedSlug === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedSlug(cat.slug)}
              aria-pressed={active}
              className={`flex shrink-0 items-center gap-3 rounded-2xl border p-2 pr-4 text-left transition-all ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              <img
                src={cat.image!}
                alt={cat.name}
                loading="lazy"
                decoding="async"
                width={96}
                height={96}
                className="size-11 rounded-xl object-cover"
              />
              <div>
                <p className="font-display text-xs font-bold">{cat.name}</p>
                <p
                  className={`text-[11px] tabular-nums ${
                    active ? "text-primary-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  {cat.items} pieces
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
