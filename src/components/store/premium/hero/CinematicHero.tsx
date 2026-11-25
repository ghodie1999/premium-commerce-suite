import { Link } from "@tanstack/react-router";
import { ArrowDownRight } from "lucide-react";
import { PREMIUM_ASSETS, SURFACE_MAP, type BaseSectionProps } from "../shared";

export type CinematicHeroProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
  image?: string;
  imageAlt?: string;
};

export function CinematicHero({
  subheading = "Edition 2026 · Monochrome Study",
  heading = "Designed to outlast every season.",
  description = "Architectural restraint meets everyday utility across tailored layers, travel carryalls, and tactile desk tools.",
  ctaLabel = "Enter the Edit",
  ctaTo = "/collections",
  image = PREMIUM_ASSETS.home,
  imageAlt = "Wide architectural living scene showcasing ceramic and timber pieces",
  surface = "white",
  className = "",
}: CinematicHeroProps) {
  return (
    <section aria-label={heading} className={`${SURFACE_MAP[surface]} py-10 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-6 pb-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
              {subheading}
            </p>
            <h1 className="mt-3 font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl text-balance">
              {heading}
            </h1>
          </div>
          <div className="md:col-span-4 md:pb-1">
            <p className="text-sm leading-relaxed opacity-75">{description}</p>
            <Link
              to={ctaTo}
              className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-bold text-accent hover:underline"
            >
              <span>{ctaLabel}</span>
              <ArrowDownRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/70 bg-sand">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={1400}
            height={600}
            className="aspect-16/7 w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
