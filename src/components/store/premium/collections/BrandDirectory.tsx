import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories, collections } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type BrandDirectoryProps = BaseSectionProps;

export function BrandDirectory({
  subheading = "Complete Store Index",
  heading = "Department & Capsule Directory",
  description = "Structured navigation across every studio department, seasonal capsule, and archive release.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BrandDirectoryProps) {
  const allEntries = [
    ...categories
      .filter((c) => c.slug !== "all")
      .map((c) => ({
        name: c.name,
        slug: c.slug,
        meta: `${c.items} studio items`,
      })),
    ...collections.map((c) => ({
      name: c.name,
      slug: c.slug,
      meta: c.subtitle,
    })),
  ];

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid divide-y divide-border border-y border-border md:grid-cols-2 md:gap-x-10">
        {allEntries.map((entry, idx) => (
          <Link
            key={`${entry.slug}-${idx}`}
            to="/collections/$slug"
            params={{ slug: entry.slug }}
            className="group flex items-center justify-between py-4 transition-colors hover:text-accent"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-muted-foreground tabular-nums">
                {(idx + 1).toString().padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-base font-bold text-foreground group-hover:text-accent transition-colors">
                  {entry.name}
                </p>
                <p className="text-xs text-muted-foreground">{entry.meta}</p>
              </div>
            </div>
            <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
