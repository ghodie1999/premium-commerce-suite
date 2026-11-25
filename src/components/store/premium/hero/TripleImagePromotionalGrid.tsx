import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type PromoTile = {
  kicker: string;
  title: string;
  ctaLabel: string;
  to: string;
  image: string;
  alt: string;
};

const defaultTiles: PromoTile[] = [
  {
    kicker: "Apothecary",
    title: "Botanical Eau de Parfum",
    ctaLabel: "Shop Beauty",
    to: "/collections/beauty",
    image: PREMIUM_ASSETS.beauty,
    alt: "Minimalist glass parfum bottle on travertine stone",
  },
  {
    kicker: "Sound & Desk",
    title: "Reference Audio Hardware",
    ctaLabel: "Shop Electronics",
    to: "/collections/tech",
    image: PREMIUM_ASSETS.tech,
    alt: "Studio wireless headphones",
  },
  {
    kicker: "Interiors",
    title: "Sculptural Stoneware & Lighting",
    ctaLabel: "Shop Home",
    to: "/collections/home-living",
    image: PREMIUM_ASSETS.home,
    alt: "Ceramic dining vessels and brass lamp",
  },
];

export type TripleImagePromotionalGridProps = BaseSectionProps & {
  tiles?: PromoTile[];
};

export function TripleImagePromotionalGrid({
  subheading = "Department Spotlights",
  heading = "Three worlds of thoughtful design",
  tiles = defaultTiles,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: TripleImagePromotionalGridProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {tiles.map((tile) => (
          <Link
            key={tile.title}
            to={tile.to}
            className="group relative block overflow-hidden rounded-2xl border border-border/70 bg-card"
          >
            <div className="aspect-3/4 overflow-hidden bg-sand">
              <img
                src={tile.image}
                alt={tile.alt}
                loading="lazy"
                decoding="async"
                width={560}
                height={740}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  {tile.kicker}
                </p>
                <h3 className="mt-0.5 font-display text-base font-bold text-foreground">
                  {tile.title}
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/80 group-hover:text-accent transition-colors whitespace-nowrap">
                {tile.ctaLabel}
                <ArrowRight className="size-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
