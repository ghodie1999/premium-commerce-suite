import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AsymmetricCollectionGridProps = BaseSectionProps;

export function AsymmetricCollectionGrid({
  subheading = "Department Architecture",
  heading = "Asymmetric Collection Grid",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AsymmetricCollectionGridProps) {
  const list = categories.filter((c) => c.slug !== "all" && c.image).slice(0, 5);
  const lead = list[0]!;
  const rest = list.slice(1, 5);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-4 lg:grid-cols-12">
        <Link
          to="/collections/$slug"
          params={{ slug: lead.slug }}
          className="group relative overflow-hidden rounded-3xl bg-sand lg:col-span-6"
        >
          <img
            src={lead.image!}
            alt={lead.name}
            loading="lazy"
            decoding="async"
            width={700}
            height={740}
            className="aspect-square h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent">
                Featured Department
              </p>
              <h3 className="mt-1 font-display text-2xl font-extrabold">{lead.name}</h3>
            </div>
            <ArrowUpRight className="size-5 text-white" />
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          {rest.map((item) => (
            <Link
              key={item.slug}
              to="/collections/$slug"
              params={{ slug: item.slug }}
              className="group relative overflow-hidden rounded-2xl bg-sand"
            >
              <img
                src={item.image!}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={380}
                height={380}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              />
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-white">
                <span className="font-display text-sm font-bold">{item.name}</span>
                <span className="text-[11px] opacity-75 tabular-nums">{item.items}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
