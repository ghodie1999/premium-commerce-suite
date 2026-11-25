import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_ASSETS, type BaseSectionProps } from "../shared";

export type FullWidthImmersiveHeroProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
  image?: string;
  imageAlt?: string;
};

export function FullWidthImmersiveHero({
  subheading = "Season 04 · Architectural Essentials",
  heading = "Form follows function.",
  description = "Sculptural wardrobe staples and precision home objects crafted for modern spaces.",
  ctaLabel = "Shop the Capsule",
  ctaTo = "/collections",
  image = PREMIUM_ASSETS.hero,
  imageAlt = "Minimalist leather tote, white sneakers and olive vase on stone plinths",
  align = "left",
  className = "",
}: FullWidthImmersiveHeroProps) {
  return (
    <section
      aria-label={heading}
      className={`relative overflow-hidden bg-primary text-primary-foreground ${className}`}
    >
      <div className="relative min-h-[460px] w-full sm:min-h-[560px] lg:min-h-[640px]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width={1440}
          height={720}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/15"
        />

        <div className="relative mx-auto flex min-h-[460px] max-w-7xl flex-col justify-end px-5 py-12 sm:min-h-[560px] lg:min-h-[640px] lg:px-8 lg:py-16">
          <div
            className={`max-w-xl ${
              align === "center"
                ? "mx-auto text-center"
                : align === "right"
                  ? "ml-auto text-right"
                  : ""
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {subheading}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-none tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              {heading}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-white/80 sm:text-base">{description}</p>
            <div className="mt-7">
              <Link
                to={ctaTo}
                className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
