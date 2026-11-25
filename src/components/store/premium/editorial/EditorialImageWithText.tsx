import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PREMIUM_ASSETS, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type EditorialImageWithTextProps = BaseSectionProps & {
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaTo?: string;
  imagePosition?: "left" | "right";
};

export function EditorialImageWithText({
  subheading = "Material Provenance",
  heading = "Woven for a decade of daily wear.",
  description = "Our 480GSM organic cotton jersey is ring-spun in small Portuguese mills, garment-dyed in mineral baths, and pre-shrunk for consistent drape wash after wash.",
  ctaLabel = "Discover Apparel",
  ctaTo = "/collections/men",
  image = PREMIUM_ASSETS.men,
  imageAlt = "Structured organic fleece pullover in neutral studio setting",
  imagePosition = "left",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: EditorialImageWithTextProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div
          className={`overflow-hidden rounded-3xl bg-sand lg:col-span-6 ${
            imagePosition === "right" ? "lg:order-2" : ""
          }`}
        >
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            width={720}
            height={820}
            className="aspect-4/4 w-full object-cover"
          />
        </div>

        <div
          className={`lg:col-span-6 ${
            imagePosition === "right" ? "lg:order-1 lg:pr-10" : "lg:pl-10"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl text-balance">
            {heading}
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed opacity-80 sm:text-base">
            {description}
          </p>
          <div className="mt-7 border-t border-border/70 pt-6">
            <Link
              to={ctaTo}
              className="group inline-flex items-center gap-2 font-display text-sm font-bold text-accent hover:underline"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
