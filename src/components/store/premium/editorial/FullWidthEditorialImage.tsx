import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PREMIUM_ASSETS, type BaseSectionProps } from "../shared";

export type FullWidthEditorialImageProps = BaseSectionProps & {
  image?: string;
  imageAlt?: string;
  ctaLabel?: string;
  ctaTo?: string;
};

export function FullWidthEditorialImage({
  subheading = "Campaign Frame 08",
  heading = "Honest materials that patina with every mile.",
  ctaLabel = "Discover Leather Carry",
  ctaTo = "/collections/accessories",
  image = PREMIUM_ASSETS.women,
  imageAlt = "Editorial close-up featuring structured calfskin leather bag",
  className = "",
}: FullWidthEditorialImageProps) {
  return (
    <section aria-label={heading} className={`relative overflow-hidden ${className}`}>
      <div className="relative h-[420px] w-full sm:h-[520px]">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          decoding="async"
          width={1440}
          height={600}
          className="h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
        />
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl flex-col justify-between gap-4 px-5 py-10 text-white sm:flex-row sm:items-end lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
            <h2 className="mt-2 max-w-xl font-display text-2xl font-extrabold sm:text-4xl text-balance">
              {heading}
            </h2>
          </div>
          <Link
            to={ctaTo}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap self-start sm:self-auto"
          >
            <span>{ctaLabel}</span>
            <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
