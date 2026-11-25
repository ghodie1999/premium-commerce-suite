import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type EditorialCollectionBannerProps = BaseSectionProps & {
  collectionSlug?: string;
  image?: string;
};

export function EditorialCollectionBanner({
  collectionSlug = "limited-edition",
  image = PREMIUM_ASSETS.hero,
  subheading = "Atelier Release · Edition 04",
  heading = "Small-Batch Tailoring & Tactile Hardware",
  description = "Produced in numbered runs across partner workshops in Tuscany, Grasse, and Kyoto. Once an edition retires, silhouettes enter the permanent archive.",
  surface = "default",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: EditorialCollectionBannerProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="relative overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground">
        <img
          src={image}
          alt={heading}
          loading="lazy"
          decoding="async"
          width={1440}
          height={640}
          className="h-72 w-full object-cover opacity-50 sm:h-80 lg:h-96"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-primary via-primary/85 to-transparent"
        />
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10 lg:p-14">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">{subheading}</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-extrabold tracking-tight sm:text-4xl text-balance">
            {heading}
          </h2>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
            {description}
          </p>
          <div className="mt-6">
            <Link
              to="/collections/$slug"
              params={{ slug: collectionSlug }}
              className="inline-flex items-center gap-2 rounded-full bg-card px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View Release Notes
              <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
