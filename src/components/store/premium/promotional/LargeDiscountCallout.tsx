import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type LargeDiscountCalloutProps = BaseSectionProps & {
  percentText?: string;
  promoCode?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function LargeDiscountCallout({
  subheading = "First Order Privilege",
  heading = "Save on your debut studio order",
  description = "Apply at checkout on any full-price outerwear, leatherware, or homeware release.",
  percentText = "20%",
  promoCode = "WELCOME20",
  ctaLabel = "Apply & Shop",
  ctaTo = "/collections",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: LargeDiscountCalloutProps) {
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(promoCode);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid items-center gap-8 border-y border-border py-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-display text-6xl font-black tracking-tight text-accent sm:text-7xl tabular-nums">
            {percentText}
          </span>
          <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {subheading}
          </p>
        </div>

        <div className="md:col-span-5">
          <h2 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:col-span-3 md:justify-end">
          <button
            type="button"
            onClick={copyCode}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 font-mono text-xs font-bold text-foreground hover:border-accent transition-colors"
          >
            <span>{promoCode}</span>
            {copied ? <Check className="size-3.5 text-success" /> : <Copy className="size-3.5" />}
          </button>
          <Link
            to={ctaTo}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors whitespace-nowrap"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
