import { Link } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type RecentlyViewedShowcaseProps = BaseSectionProps;

export function RecentlyViewedShowcase({
  subheading = "Continue Browsing",
  heading = "Recently Viewed Objects",
  surface = "sand",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: RecentlyViewedShowcaseProps) {
  const { formatPrice } = useRegion();
  const items = products.slice(4, 8);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.id}
            to="/products/$id"
            params={{ id: p.id }}
            className="group rounded-2xl border border-border bg-card p-3 transition-colors hover:border-accent/50"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-sand">
              <ProductImage
                src={p.image}
                productId={p.id}
                category={p.category}
                alt={p.name}
                loading="lazy"
                decoding="async"
                width={260}
                height={260}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <p className="mt-2.5 truncate font-display text-xs font-bold text-foreground">
              {p.name}
            </p>
            <p className="mt-0.5 text-xs font-extrabold tabular-nums text-accent">
              {formatPrice(p.price)}
            </p>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
