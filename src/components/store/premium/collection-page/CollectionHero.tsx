import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/catalog";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type CollectionHeroProps = BaseSectionProps & {
  collectionSlug?: string;
};

export function CollectionHero({
  collectionSlug = "best-sellers",
  subheading,
  heading,
  description,
  surface = "primary",
  spacing = "normal",
  fullWidth = true,
  className = "",
}: CollectionHeroProps) {
  const collection = getCollectionBySlug(collectionSlug);
  const count = getProductsByCollection(collectionSlug).length;
  const resolvedSubheading = subheading ?? collection?.subtitle ?? "Curated Collection";
  const resolvedHeading = heading ?? collection?.name ?? "Seasonal Essentials";
  const resolvedDescription =
    description ??
    collection?.copy ??
    "Architectural silhouettes and tactile materials edited for enduring daily wear.";
  const cover = collection?.image ?? PREMIUM_ASSETS.men;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={resolvedHeading}
      className={`overflow-hidden ${className}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-accent">
            <span>{resolvedSubheading}</span>
            <span className="h-px w-8 bg-accent/50" aria-hidden="true" />
            <span className="tabular-nums text-primary-foreground/75">{count} pieces</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl text-balance">
            {resolvedHeading}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/80 sm:text-base">
            {resolvedDescription}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              to="/collections/$slug"
              params={{ slug: collectionSlug }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
            >
              Explore {resolvedHeading}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/collections/$slug"
              params={{ slug: "all" }}
              className="inline-flex items-center rounded-full border border-primary-foreground/25 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              View All Archive
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 bg-black/20">
            <img
              src={cover}
              alt={resolvedHeading}
              loading="lazy"
              decoding="async"
              width={900}
              height={720}
              className="aspect-5/4 w-full object-cover"
            />
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
