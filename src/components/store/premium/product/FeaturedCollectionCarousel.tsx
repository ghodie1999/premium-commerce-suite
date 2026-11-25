import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type FeaturedCollectionCarouselProps = BaseSectionProps & {
  collectionSlug?: string;
};

export function FeaturedCollectionCarousel({
  subheading = "Swipe & Explore",
  heading = "Atelier Signature Lineup",
  description = "Scroll horizontally through our seasonal highlights with instant quick-view and bag controls.",
  collectionSlug = "all",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: FeaturedCollectionCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items =
    collectionSlug === "all"
      ? products
      : products.filter((p) => p.collectionSlugs.includes(collectionSlug));

  const scrollByAmount = (direction: -1 | 1) => {
    const node = trackRef.current;
    if (!node) return;
    node.scrollBy({ left: direction * 340, behavior: "smooth" });
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
        description={description}
        dark={surface === "primary"}
        action={
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Scroll products left"
              onClick={() => scrollByAmount(-1)}
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll products right"
              onClick={() => scrollByAmount(1)}
              className="grid size-10 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      />

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scroll-smooth [scrollbar-width:thin]"
      >
        {items.map((product) => (
          <div key={product.id} className="w-[270px] shrink-0 snap-start sm:w-[290px] lg:w-[300px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
