import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedCustomerReviewCarouselProps = BaseSectionProps;

export function AdvancedCustomerReviewCarousel({
  subheading = "Verified Reviews",
  heading = "Voices Across Our Community",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedCustomerReviewCarouselProps) {
  const entries = products.flatMap((p) =>
    p.reviewsList.slice(0, 1).map((rev) => ({ product: p, review: rev })),
  );
  const [index, setIndex] = useState(0);

  const visibleCount = 3;
  const maxStart = Math.max(0, entries.length - visibleCount);
  const visible = entries.slice(index, index + visibleCount);

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous reviews"
              disabled={index === 0}
              onClick={() => setIndex((i) => Math.max(0, i - 1))}
              className="grid size-9 place-items-center rounded-full border border-border bg-card disabled:opacity-40 hover:bg-secondary"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next reviews"
              disabled={index >= maxStart}
              onClick={() => setIndex((i) => Math.min(maxStart, i + 1))}
              className="grid size-9 place-items-center rounded-full border border-border bg-card disabled:opacity-40 hover:bg-secondary"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {visible.map(({ product, review }) => (
          <article
            key={review.id}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-3.5 ${
                        i < review.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span>{review.date}</span>
              </div>
              <h3 className="mt-3 font-display text-sm font-bold text-foreground">
                {review.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                &ldquo;{review.content}&rdquo;
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
              <div>
                <p className="text-xs font-semibold text-foreground">{review.author}</p>
                {review.verified && (
                  <p className="inline-flex items-center gap-1 text-[11px] text-success">
                    <CheckCircle2 className="size-3" /> Verified Buyer
                  </p>
                )}
              </div>
              <Link
                to="/products/$id"
                params={{ id: product.id }}
                className="flex items-center gap-2 text-xs font-semibold text-accent hover:underline"
              >
                <ProductImage
                  src={product.image}
                  productId={product.id}
                  category={product.category}
                  alt={product.name}
                  loading="lazy"
                  decoding="async"
                  width={36}
                  height={36}
                  className="size-9 rounded-lg object-cover bg-sand"
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
