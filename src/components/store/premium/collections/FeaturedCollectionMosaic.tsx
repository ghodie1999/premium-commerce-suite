import { Link } from "@tanstack/react-router";
import { collections } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type FeaturedCollectionMosaicProps = BaseSectionProps;

export function FeaturedCollectionMosaic({
  subheading = "Seasonal Mosaic",
  heading = "Explore Our Three Signature Capsules",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: FeaturedCollectionMosaicProps) {
  const capsules = collections.slice(0, 3);

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
        {capsules.map((cap, i) => (
          <Link
            key={cap.slug}
            to="/collections/$slug"
            params={{ slug: cap.slug }}
            className={`group relative overflow-hidden rounded-3xl bg-sand ${
              i === 0 ? "md:col-span-6" : "md:col-span-3"
            }`}
          >
            <img
              src={cap.image}
              alt={cap.name}
              loading="lazy"
              decoding="async"
              width={680}
              height={520}
              className="aspect-4/3 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 md:aspect-auto md:h-80"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent"
            />
            <div className="absolute inset-x-5 bottom-5 text-primary-foreground">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                {cap.subtitle}
              </p>
              <h3 className="mt-1 font-display text-lg font-extrabold">{cap.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
