import { Link } from "@tanstack/react-router";
import { AlertCircle, ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type LimitedStockPromotionProps = BaseSectionProps;

export function LimitedStockPromotion({
  subheading = "Final Batch Inventory",
  heading = "Low-Stock Studio Pieces",
  description = "Small-batch pieces down to their last single-digit allocations before next quarter's restock.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: LimitedStockPromotionProps) {
  const { formatPrice } = useRegion();
  const scarce = [...products].sort((a, b) => a.stock - b.stock).slice(0, 3);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {scarce.map((item) => {
          const fillPct = Math.max(15, Math.min(92, 100 - item.stock * 6));
          return (
            <Link
              key={item.id}
              to="/products/$id"
              params={{ id: item.id }}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex items-center gap-4">
                <ProductImage
                  src={item.image}
                  productId={item.id}
                  category={item.category}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  width={88}
                  height={88}
                  className="size-20 shrink-0 rounded-xl bg-sand object-cover"
                />
                <div className="min-w-0">
                  <p className="font-display text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs font-bold tabular-nums text-foreground">
                    {formatPrice(item.price)}
                  </p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-accent tabular-nums">
                    <AlertCircle className="size-3" />
                    <span>Only {item.stock} units left</span>
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    style={{ width: `${fillPct}%` }}
                    className="h-full rounded-full bg-accent-gradient"
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{fillPct}% allocated</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                    Reserve now <ArrowRight className="size-3" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </PremiumSectionShell>
  );
}
