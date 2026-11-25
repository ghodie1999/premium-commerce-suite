import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, SURFACE_MAP, type BaseSectionProps } from "../shared";

export type EditorialSplitHeroProps = BaseSectionProps & {
  eyebrow?: string;
  ctaLabel?: string;
  ctaTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
};

export function EditorialSplitHero({
  eyebrow = "Autumn / Winter Atelier",
  heading = "Quiet luxury built for everyday movement.",
  description = "Considered organic fabrics, vegetable-tanned leathers, and restrained silhouettes engineered for longevity.",
  ctaLabel = "Explore Collection",
  ctaTo = "/collections",
  secondaryLabel = "View Best Sellers",
  secondaryTo = "/collections/best-sellers",
  image = PREMIUM_ASSETS.women,
  imageAlt = "Editorial look featuring structured outerwear and minimalist tote",
  surface = "white",
  fullWidth = false,
  reverse = false,
  className = "",
}: EditorialSplitHeroProps) {
  return (
    <section
      aria-label={heading}
      className={`${SURFACE_MAP[surface]} border-b border-border/70 ${className}`}
    >
      <div className={fullWidth ? "w-full" : "mx-auto max-w-7xl px-5 lg:px-8"}>
        <div className="grid items-stretch lg:grid-cols-12">
          <div
            className={`flex flex-col justify-between py-12 lg:col-span-6 lg:py-20 ${
              reverse ? "lg:order-2 lg:pl-14" : "lg:pr-14"
            }`}
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl text-balance">
                {heading}
              </h1>
              <p className="mt-5 max-w-md text-sm leading-relaxed opacity-80 sm:text-base">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to={ctaTo}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap shrink-0"
                >
                  {ctaLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to={secondaryTo}
                  className="text-sm font-semibold underline-offset-4 hover:underline whitespace-nowrap shrink-0"
                >
                  {secondaryLabel}
                </Link>
              </div>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-border/80 pt-6 text-xs">
              <div>
                <dt className="opacity-65">Fabric Standard</dt>
                <dd className="mt-1 font-display text-sm font-bold">100% GOTS</dd>
              </div>
              <div>
                <dt className="opacity-65">Dispatch Window</dt>
                <dd className="mt-1 font-display text-sm font-bold tabular-nums">24 Hours</dd>
              </div>
              <div>
                <dt className="opacity-65">Warranty</dt>
                <dd className="mt-1 font-display text-sm font-bold">Lifetime Care</dd>
              </div>
            </dl>
          </div>

          <div
            className={`relative min-h-[380px] overflow-hidden bg-sand lg:col-span-6 lg:min-h-[580px] ${
              reverse ? "lg:order-1" : ""
            }`}
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              width={900}
              height={1100}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
