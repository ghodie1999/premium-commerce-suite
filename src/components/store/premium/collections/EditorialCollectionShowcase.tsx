import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type EditorialCollectionShowcaseProps = BaseSectionProps;

export function EditorialCollectionShowcase({
  subheading = "Curated Capsules",
  heading = "Editorial Collection Stories",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: EditorialCollectionShowcaseProps) {
  const featured = collections.slice(0, 2);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {featured.map((col, idx) => (
          <article key={col.slug} className="group flex flex-col">
            <Link
              to="/collections/$slug"
              params={{ slug: col.slug }}
              className="overflow-hidden rounded-3xl bg-sand"
            >
              <img
                src={col.image}
                alt={col.name}
                loading="lazy"
                decoding="async"
                width={720}
                height={520}
                className="aspect-16/11 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <div className="mt-5 flex items-start justify-between gap-4 border-b border-border/70 pb-5">
              <div>
                <p className="font-mono text-xs font-semibold text-accent">
                  0{idx + 1} · {col.subtitle}
                </p>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-foreground">
                  {col.name}
                </h3>
                <p className="mt-2 max-w-md text-xs leading-relaxed text-muted-foreground">
                  {col.copy}
                </p>
              </div>
              <Link
                to="/collections/$slug"
                params={{ slug: col.slug }}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-bold text-foreground hover:border-accent hover:text-accent transition-colors whitespace-nowrap"
              >
                <span>Open</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
