import { useState } from "react";
import { Check, Gift } from "lucide-react";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

const AMOUNTS = [50, 100, 250, 500];

export type GiftCardPromotionProps = BaseSectionProps;

export function GiftCardPromotion({
  subheading = "Studio Gifting",
  heading = "The ShopEase Digital & Linen Gift Card",
  description = "Delivered instantly by email or embossed inside a cotton-linen sleeve with zero expiration fees.",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: GiftCardPromotionProps) {
  const [selected, setSelected] = useState(100);
  const [confirmed, setConfirmed] = useState(false);
  const { formatPrice } = useRegion();

  const handleConfirm = () => {
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 2000);
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="relative mx-auto aspect-16/10 max-w-md overflow-hidden rounded-3xl bg-hero-gradient p-7 text-primary-foreground shadow-card flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-extrabold">
                Shop<span className="text-accent">Ease</span>
              </span>
              <Gift className="size-5 text-accent" />
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary-foreground/65">
                Atelier Credit
              </p>
              <p className="mt-1 font-display text-3xl font-black tabular-nums">
                {formatPrice(selected)}
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-balance">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-80">{description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                aria-pressed={selected === amt}
                onClick={() => setSelected(amt)}
                className={`rounded-full px-5 py-2.5 text-xs font-bold tabular-nums transition-colors ${
                  selected === amt
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {formatPrice(amt)}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleConfirm}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            {confirmed ? (
              <>
                <Check className="size-4" />
                <span>Gift Card Prepared ({formatPrice(selected)})</span>
              </>
            ) : (
              <span>Select {formatPrice(selected)} Gift Card</span>
            )}
          </button>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
