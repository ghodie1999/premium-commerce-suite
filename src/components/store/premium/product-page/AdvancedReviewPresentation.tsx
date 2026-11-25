import { useState } from "react";
import { CheckCircle2, Star, ThumbsUp } from "lucide-react";
import { products } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedReviewPresentationProps = BaseSectionProps & {
  productId?: string;
};

export function AdvancedReviewPresentation({
  productId = "essential-hoodie",
  subheading = "Owner Feedback",
  heading = "Verified Customer Reviews",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedReviewPresentationProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const [filterStars, setFilterStars] = useState<number | "all">("all");
  const [helpfulMap, setHelpfulMap] = useState<Record<string, number>>({});

  const visible =
    filterStars === "all"
      ? product.reviewsList
      : product.reviewsList.filter((r) => r.rating === filterStars);

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
          <div className="flex flex-wrap gap-1.5">
            {(["all", 5, 4] as const).map((val) => (
              <button
                key={String(val)}
                type="button"
                aria-pressed={filterStars === val}
                onClick={() => setFilterStars(val)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  filterStars === val
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-secondary text-foreground hover:bg-sand-deep"
                }`}
              >
                {val === "all" ? `All (${product.reviewsList.length})` : `${val} Stars`}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="rounded-2xl border border-border bg-sand/30 p-6 lg:col-span-4">
          <p className="font-display text-5xl font-black tabular-nums text-foreground">
            {product.rating}
          </p>
          <div className="mt-2 flex gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-accent text-accent" />
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground tabular-nums">
            {product.reviews} verified owner reviews
          </p>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-card px-6 lg:col-span-8">
          {visible.map((rev) => {
            const count = rev.helpfulCount + (helpfulMap[rev.id] ?? 0);
            return (
              <article key={rev.id} className="py-5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{rev.author}</span>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-success">
                        <CheckCircle2 className="size-3" /> Verified
                      </span>
                    )}
                  </div>
                  <span className="text-muted-foreground">{rev.date}</span>
                </div>
                <h3 className="mt-2 text-sm font-bold text-foreground">{rev.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{rev.content}</p>
                <button
                  type="button"
                  onClick={() =>
                    setHelpfulMap((prev) => ({
                      ...prev,
                      [rev.id]: prev[rev.id] ? 0 : 1,
                    }))
                  }
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
                >
                  <ThumbsUp className="size-3" />
                  <span className="tabular-nums">Helpful ({count})</span>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
