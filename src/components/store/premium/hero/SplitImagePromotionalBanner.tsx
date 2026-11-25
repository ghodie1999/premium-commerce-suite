import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, type BaseSectionProps } from "../shared";

export type SplitImagePromotionalBannerProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
  image?: string;
  imageAlt?: string;
  offerCode?: string;
};

export function SplitImagePromotionalBanner({
  subheading = "Member Exclusive",
  heading = "Take 15% off paired leather & apparel sets.",
  description = "Automatically applied when combining any two capsule garments or accessories in your bag.",
  ctaLabel = "Build Your Set",
  ctaTo = "/collections",
  offerCode = "PAIR15",
  image = PREMIUM_ASSETS.bag,
  imageAlt = "Cream Italian leather tote bag",
  className = "",
}: SplitImagePromotionalBannerProps) {
  return (
    <section aria-label={heading} className={`px-5 py-8 lg:px-8 ${className}`}>
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground lg:grid-cols-12">
        <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl text-balance">
            {heading}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/75">
            {description}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Link
              to={ctaTo}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            {offerCode && (
              <span className="font-mono text-xs tracking-wider text-primary-foreground/75">
                Code: <strong className="text-primary-foreground">{offerCode}</strong>
              </span>
            )}
          </div>
        </div>
        <div className="min-h-[280px] overflow-hidden bg-sand lg:col-span-6">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={720}
            height={540}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
