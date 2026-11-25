import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type BannerTile = {
  eyebrow: string;
  title: string;
  to: string;
  image: string;
  alt: string;
};

export type DualPromotionalBannerProps = BaseSectionProps & {
  leftBanner?: BannerTile;
  rightBanner?: BannerTile;
};

export function DualPromotionalBanner({
  leftBanner = {
    eyebrow: "Womenswear",
    title: "Structured Leather & Tailored Knitwear",
    to: "/collections/women",
    image: PREMIUM_ASSETS.women,
    alt: "Womenswear leather tote and minimalist silhouette",
  },
  rightBanner = {
    eyebrow: "Menswear",
    title: "480GSM Fleece & Everyday Uniforms",
    to: "/collections/men",
    image: PREMIUM_ASSETS.men,
    alt: "Menswear architectural cotton hoodie and trousers",
  },
  surface = "default",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: DualPromotionalBannerProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Dual seasonal campaigns"
      className={className}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {[leftBanner, rightBanner].map((banner) => (
          <Link
            key={banner.title}
            to={banner.to}
            className="group relative block overflow-hidden rounded-3xl bg-sand"
          >
            <img
              src={banner.image}
              alt={banner.alt}
              loading="lazy"
              decoding="async"
              width={720}
              height={540}
              className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent"
            />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                  {banner.eyebrow}
                </span>
                <h3 className="mt-1 font-display text-xl font-bold leading-snug sm:text-2xl">
                  {banner.title}
                </h3>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
