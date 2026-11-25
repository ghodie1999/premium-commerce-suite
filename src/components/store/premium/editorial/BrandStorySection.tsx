import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type BrandStorySectionProps = BaseSectionProps & {
  image?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function BrandStorySection({
  subheading = "Founded 2021 · New York Atelier",
  heading = "Less clutter. Longer utility.",
  description = "ShopEase started as a protest against disposable seasonal drops. We partner directly with heritage tanneries, stoneware kilns, and acoustic labs to deliver heirloom-grade essentials without retail markups.",
  ctaLabel = "Browse Full Collection",
  ctaTo = "/collections",
  image = PREMIUM_ASSETS.hero,
  surface = "sand",
  spacing = "spacious",
  fullWidth = false,
  className = "",
}: BrandStorySectionProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl text-balance">
            {heading}
          </h2>
          <p className="mt-5 text-sm leading-relaxed opacity-80 sm:text-base">{description}</p>
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6">
            <div>
              <p className="font-display text-2xl font-extrabold tabular-nums">14</p>
              <p className="mt-1 text-xs opacity-70">Independent partner workshops</p>
            </div>
            <div>
              <p className="font-display text-2xl font-extrabold tabular-nums">98%</p>
              <p className="mt-1 text-xs opacity-70">Plastic-free parcel packaging</p>
            </div>
          </div>
          <Link
            to={ctaTo}
            className="mt-7 inline-flex items-center gap-1.5 font-display text-sm font-bold text-primary hover:text-accent transition-colors"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border/70 bg-card lg:col-span-7">
          <img
            src={image}
            alt="ShopEase atelier collection objects arranged on stone plinths"
            loading="lazy"
            decoding="async"
            width={900}
            height={680}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </PremiumSectionShell>
  );
}
