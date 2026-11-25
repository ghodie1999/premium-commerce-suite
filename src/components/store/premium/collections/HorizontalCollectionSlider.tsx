import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type HorizontalCollectionSliderProps = BaseSectionProps;

export function HorizontalCollectionSlider({
  subheading = "Swipe Departments",
  heading = "Horizontal Collection Slider",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: HorizontalCollectionSliderProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const items = categories.filter((c) => c.slug !== "all" && c.image);

  const slide = (dir: -1 | 1) => {
    scrollerRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock
        subheading={subheading}
        heading={heading}
        action={
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous collections"
              onClick={() => slide(-1)}
              className="grid size-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next collections"
              onClick={() => slide(1)}
              className="grid size-9 place-items-center rounded-full border border-border bg-card hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      />

      <div
        ref={scrollerRef}
        className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [scrollbar-width:thin]"
      >
        {items.map((item) => (
          <Link
            key={item.slug}
            to="/collections/$slug"
            params={{ slug: item.slug }}
            className="group w-64 shrink-0 snap-start overflow-hidden rounded-2xl border border-border bg-card"
          >
            <div className="aspect-4/3 overflow-hidden bg-sand">
              <img
                src={item.image!}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={320}
                height={240}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="font-display text-sm font-bold text-foreground">{item.name}</span>
              <span className="text-xs text-muted-foreground tabular-nums">{item.items}</span>
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
