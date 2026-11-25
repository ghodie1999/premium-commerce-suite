import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type VisualCategoryGridProps = BaseSectionProps;

export function VisualCategoryGrid({
  subheading = "Department Archive",
  heading = "Visual Category Index",
  description = "Full-bleed photographic entrances to every primary studio collection.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: VisualCategoryGridProps) {
  const list = categories.filter((c) => c.slug !== "all" && c.image).slice(0, 6);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {list.map((c) => (
          <Link
            key={c.slug}
            to="/collections/$slug"
            params={{ slug: c.slug }}
            className="group relative block overflow-hidden rounded-2xl bg-sand"
          >
            <img
              src={c.image!}
              alt={c.name}
              loading="lazy"
              decoding="async"
              width={400}
              height={540}
              className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
            />
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between text-white">
              <div>
                <p className="font-display text-sm font-bold">{c.name}</p>
                <p className="text-[11px] text-white/75 tabular-nums">{c.items} pieces</p>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
