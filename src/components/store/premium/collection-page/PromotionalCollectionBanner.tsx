import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type PromotionalCollectionBannerProps = BaseSectionProps & {
  collectionSlug?: string;
  offerCode?: string;
};

export function PromotionalCollectionBanner({
  collectionSlug = "home-living",
  offerCode = "STUDIO15",
  subheading = "Mid-Grid Editorial Insert",
  heading = "Complimentary Express Delivery on Pairs & Sets",
  description = "Pair any desk lighting or hand-thrown ceramic vessel with a lifestyle carry piece and unlock automatic 15% studio bundle pricing at checkout.",
  surface = "default",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: PromotionalCollectionBannerProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:grid-cols-12">
        <div className="flex flex-col justify-center p-7 sm:p-10 lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl text-balance">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              to="/collections/$slug"
              params={{ slug: collectionSlug }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Shop Paired Sets <ArrowRight className="size-3.5" />
            </Link>
            <span className="border-l border-border pl-3 text-xs font-semibold text-foreground">
              Code <span className="font-mono font-bold text-accent">{offerCode}</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 bg-sand lg:col-span-5">
          <img
            src={PREMIUM_ASSETS.deskLamp}
            alt="Architectural Pivot Desk Lamp"
            loading="lazy"
            decoding="async"
            width={480}
            height={520}
            className="h-56 w-full object-cover lg:h-full"
          />
          <img
            src={PREMIUM_ASSETS.mugSet}
            alt="Artisanal Ceramic Pour-Over Set"
            loading="lazy"
            decoding="async"
            width={480}
            height={520}
            className="h-56 w-full object-cover lg:h-full"
          />
        </div>
      </div>
    </PremiumSectionShell>
  );
}
