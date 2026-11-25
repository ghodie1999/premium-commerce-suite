import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type EditorialImageCollageProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
};

export function EditorialImageCollage({
  subheading = "Seasonal Notes",
  heading = "Built around quiet rituals",
  description = "From morning pour-over coffee to late-night studio sessions, every object balances ergonomic tactility with visual calm.",
  ctaLabel = "Explore Objects",
  ctaTo = "/collections/home-living",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: EditorialImageCollageProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="relative lg:col-span-7">
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7 overflow-hidden rounded-3xl border border-border/70 bg-card">
              <img
                src={PREMIUM_ASSETS.mugSet}
                alt="Hand-thrown ceramic pour-over coffee set"
                loading="lazy"
                decoding="async"
                width={520}
                height={620}
                className="aspect-4/5 w-full object-cover"
              />
            </div>
            <div className="col-span-5 space-y-4">
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
                <img
                  src={PREMIUM_ASSETS.deskLamp}
                  alt="Articulated anodized desk lamp"
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={360}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="overflow-hidden rounded-3xl border border-border/70 bg-card">
                <img
                  src={PREMIUM_ASSETS.watch}
                  alt="Atelier 40mm surgical steel chronograph"
                  loading="lazy"
                  decoding="async"
                  width={360}
                  height={280}
                  className="aspect-4/3 w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl text-balance">
            {heading}
          </h2>
          <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">{description}</p>
          <Link
            to={ctaTo}
            className="group mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
