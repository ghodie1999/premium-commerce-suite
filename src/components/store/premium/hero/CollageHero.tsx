import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, SURFACE_MAP, type BaseSectionProps } from "../shared";

export type CollageHeroProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
  primaryImage?: string;
  topImage?: string;
  bottomImage?: string;
};

export function CollageHero({
  subheading = "Curated Wardrobe Matrix",
  heading = "Three signatures, one effortless uniform.",
  description = "Pair heavyweight brushed fleece with calfskin sneakers and Italian acetate eyewear.",
  ctaLabel = "Shop the Trio",
  ctaTo = "/collections/best-sellers",
  primaryImage = PREMIUM_ASSETS.hoodie,
  topImage = PREMIUM_ASSETS.sneakers,
  bottomImage = PREMIUM_ASSETS.sunglasses,
  surface = "sand",
  className = "",
}: CollageHeroProps) {
  return (
    <section aria-label={heading} className={`${SURFACE_MAP[surface]} py-12 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl text-balance">
              {heading}
            </h1>
            <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">{description}</p>
            <div className="mt-7">
              <Link
                to={ctaTo}
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {ctaLabel}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-3 lg:col-span-7">
            <div className="col-span-7 overflow-hidden rounded-3xl bg-card border border-border/70">
              <img
                src={primaryImage}
                alt="Essential heavyweight hoodie"
                loading="lazy"
                decoding="async"
                width={600}
                height={760}
                className="h-full w-full object-cover aspect-4/5"
              />
            </div>
            <div className="col-span-5 grid gap-3">
              <div className="overflow-hidden rounded-3xl bg-card border border-border/70">
                <img
                  src={topImage}
                  alt="White leather minimalist sneakers"
                  loading="lazy"
                  decoding="async"
                  width={440}
                  height={370}
                  className="h-full w-full object-cover aspect-square"
                />
              </div>
              <div className="overflow-hidden rounded-3xl bg-card border border-border/70">
                <img
                  src={bottomImage}
                  alt="Tortoiseshell sculpted acetate sunglasses"
                  loading="lazy"
                  decoding="async"
                  width={440}
                  height={370}
                  className="h-full w-full object-cover aspect-square"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
