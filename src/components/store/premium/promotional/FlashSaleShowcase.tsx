import { Link } from "@tanstack/react-router";
import { ShoppingBag, Timer } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type FlashSaleShowcaseProps = BaseSectionProps;

export function FlashSaleShowcase({
  subheading = "48-Hour Archive Pricing",
  heading = "Private Sale Selection",
  description = "Direct studio markdowns on selected garments, audio hardware, and everyday leather carry.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: FlashSaleShowcaseProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const discounted = products.filter((p) => p.compareAt && p.compareAt > p.price).slice(0, 4);

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
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent">
            <Timer className="size-4" />
            <span>Valid while batch stock lasts</span>
          </span>
        }
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {discounted.map((item) => {
          const pct = item.compareAt ? Math.round((1 - item.price / item.compareAt) * 100) : 0;
          return (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-4"
            >
              <Link
                to="/products/$id"
                params={{ id: item.id }}
                className="relative block aspect-square overflow-hidden rounded-xl bg-sand"
              >
                <ProductImage
                  src={item.image}
                  productId={item.id}
                  category={item.category}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={360}
                  className="h-full w-full object-cover"
                />
                <span className="absolute left-2.5 top-2.5 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold text-accent-foreground">
                  −{pct}%
                </span>
              </Link>
              <h3 className="mt-3 font-display text-sm font-bold text-foreground truncate">
                {item.name}
              </h3>
              <div className="mt-2 flex items-center justify-between border-t border-border/60 pt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-base font-black tabular-nums text-foreground">
                    {formatPrice(item.price)}
                  </span>
                  {item.compareAt && (
                    <span className="text-xs text-muted-foreground line-through tabular-nums">
                      {formatPrice(item.compareAt)}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => add(item, 1, { color: item.colors[0]?.name })}
                  aria-label={`Add ${item.name} to bag`}
                  className="grid size-8 place-items-center rounded-full bg-primary text-primary-foreground hover:bg-accent transition-colors"
                >
                  <ShoppingBag className="size-3.5" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </PremiumSectionShell>
  );
}
