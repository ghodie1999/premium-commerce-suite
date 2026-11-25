import { Link } from "@tanstack/react-router";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type AsymmetricImageGridProps = BaseSectionProps;

export function AsymmetricImageGrid({
  subheading = "Visual Rhythm",
  heading = "Studies in Texture & Form",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AsymmetricImageGridProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-4 md:grid-cols-12">
        <Link
          to="/collections/women"
          className="group relative overflow-hidden rounded-2xl bg-sand md:col-span-5"
        >
          <img
            src={PREMIUM_ASSETS.bag}
            alt="Full-grain cream leather tote"
            loading="lazy"
            decoding="async"
            width={620}
            height={780}
            className="aspect-4/5 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3.5 py-1.5 text-xs font-bold text-foreground backdrop-blur-sm">
            Leather Atelier
          </span>
        </Link>

        <div className="grid gap-4 md:col-span-7">
          <Link
            to="/collections/home-living"
            className="group relative overflow-hidden rounded-2xl bg-sand"
          >
            <img
              src={PREMIUM_ASSETS.home}
              alt="Sculptural tableware and brass lighting"
              loading="lazy"
              decoding="async"
              width={820}
              height={420}
              className="aspect-16/8 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-card/90 px-3.5 py-1.5 text-xs font-bold text-foreground backdrop-blur-sm">
              Home &amp; Living
            </span>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            <Link
              to="/collections/beauty"
              className="group relative overflow-hidden rounded-2xl bg-sand"
            >
              <img
                src={PREMIUM_ASSETS.perfume}
                alt="Botanical extrait de parfum bottle"
                loading="lazy"
                decoding="async"
                width={400}
                height={340}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground backdrop-blur-sm">
                Apothecary
              </span>
            </Link>
            <Link
              to="/collections/electronics"
              className="group relative overflow-hidden rounded-2xl bg-sand"
            >
              <img
                src={PREMIUM_ASSETS.headphones}
                alt="Wireless reference headphones"
                loading="lazy"
                decoding="async"
                width={400}
                height={340}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground backdrop-blur-sm">
                Audio Tech
              </span>
            </Link>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
