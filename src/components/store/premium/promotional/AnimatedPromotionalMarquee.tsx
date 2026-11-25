import { type BaseSectionProps } from "../shared";

const DEFAULT_ITEMS = [
  "Complimentary Global Express Over $100",
  "Lifetime Brass & Stitch Guarantee",
  "30-Day Pre-Paid Returns",
  "Use Code PAIR15 for Bundle Savings",
  "Carbon-Neutral Tracked Dispatch",
];

export type AnimatedPromotionalMarqueeProps = BaseSectionProps & {
  messages?: string[];
  tone?: "primary" | "accent" | "sand";
};

export function AnimatedPromotionalMarquee({
  messages = DEFAULT_ITEMS,
  tone = "sand",
  className = "",
}: AnimatedPromotionalMarqueeProps) {
  const toneClass =
    tone === "primary"
      ? "bg-primary text-primary-foreground"
      : tone === "accent"
        ? "bg-accent text-accent-foreground"
        : "border-y border-border bg-sand/50 text-foreground";

  return (
    <div
      aria-label="Storefront promotions"
      className={`overflow-hidden py-3 select-none ${toneClass} ${className}`}
    >
      <div className="marquee-track text-xs font-semibold tracking-wider uppercase">
        {[...messages, ...messages].map((msg, idx) => (
          <span key={idx} className="mx-8 inline-flex items-center gap-3">
            <span aria-hidden="true" className="text-accent">
              ◆
            </span>
            <span>{msg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
