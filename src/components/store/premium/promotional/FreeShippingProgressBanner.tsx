import { Plus, Truck } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type FreeShippingProgressBannerProps = BaseSectionProps & {
  thresholdUsd?: number;
};

export function FreeShippingProgressBanner({
  thresholdUsd = 100,
  surface = "white",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: FreeShippingProgressBannerProps) {
  const { subtotal, add } = useCart();
  const { formatPrice } = useRegion();
  const remaining = Math.max(0, thresholdUsd - subtotal);
  const progress = Math.min(100, Math.round((subtotal / thresholdUsd) * 100));
  const unlocked = remaining <= 0;

  const quickAddon = products.find((p) => p.id === "artisanal-pour-over-set") ?? products[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Free express shipping status"
      className={className}
    >
      <div className="flex flex-col justify-between gap-5 rounded-2xl border border-border bg-sand/35 p-5 sm:flex-row sm:items-center">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-xs font-bold text-foreground">
            <Truck className="size-4 text-accent" />
            <span>
              {unlocked
                ? "Complimentary Global Express Shipping unlocked for your bag."
                : `Add ${formatPrice(remaining)} more to unlock free global express shipping.`}
            </span>
          </div>
          <div className="mt-2.5 h-2 w-full max-w-md overflow-hidden rounded-full bg-border">
            <div
              style={{ width: `${progress}%` }}
              className="h-full rounded-full bg-accent-gradient transition-all duration-300"
            />
          </div>
        </div>

        {!unlocked && (
          <button
            type="button"
            onClick={() => add(quickAddon, 1)}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground hover:border-accent transition-colors whitespace-nowrap shrink-0"
          >
            <Plus className="size-3.5 text-accent" />
            <span>
              Add {quickAddon.name} ({formatPrice(quickAddon.price)})
            </span>
          </button>
        )}
      </div>
    </PremiumSectionShell>
  );
}
