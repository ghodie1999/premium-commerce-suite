import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type LoadMorePaginationOptionsProps = BaseSectionProps;

export function LoadMorePaginationOptions({
  subheading = "Catalog Paging",
  heading = "Load More & Paginated Archive",
  description = "Switch seamlessly between progressive reveal mode and numbered page navigation.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: LoadMorePaginationOptionsProps) {
  const [mode, setMode] = useState<"progressive" | "paged">("progressive");
  const [visibleCount, setVisibleCount] = useState(3);
  const [page, setPage] = useState(1);

  const pageSize = 3;
  const totalPages = Math.ceil(products.length / pageSize);

  const displayed =
    mode === "progressive"
      ? products.slice(0, visibleCount)
      : products.slice((page - 1) * pageSize, page * pageSize);

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
        action={
          <div className="inline-flex rounded-full border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setMode("progressive")}
              aria-pressed={mode === "progressive"}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                mode === "progressive"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              }`}
            >
              Load More
            </button>
            <button
              type="button"
              onClick={() => setMode("paged")}
              aria-pressed={mode === "paged"}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                mode === "paged" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              Page Numbers
            </button>
          </div>
        }
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-xs text-muted-foreground tabular-nums">
          {mode === "progressive"
            ? `Showing ${displayed.length} of ${products.length} products`
            : `Page ${page} of ${totalPages} · ${products.length} total pieces`}
        </p>

        {mode === "progressive" ? (
          <div className="flex items-center gap-3">
            {visibleCount < products.length ? (
              <button
                type="button"
                onClick={() => setVisibleCount((c) => Math.min(products.length, c + 3))}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Plus className="size-3.5" /> Load 3 More Pieces
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setVisibleCount(3)}
                className="rounded-full border border-border bg-background px-6 py-3 text-xs font-semibold text-foreground hover:border-primary"
              >
                Collapse Back to First 3
              </button>
            )}
          </div>
        ) : (
          <nav aria-label="Collection pagination" className="flex items-center gap-2">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              aria-label="Previous page"
              className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground disabled:opacity-40"
            >
              <ChevronLeft className="size-4" />
            </button>
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                aria-current={page === n ? "page" : undefined}
                className={`grid size-9 place-items-center rounded-full text-xs font-bold tabular-nums transition-colors ${
                  page === n
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:border-primary"
                }`}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              aria-label="Next page"
              className="grid size-9 place-items-center rounded-full border border-border bg-background text-foreground disabled:opacity-40"
            >
              <ChevronRight className="size-4" />
            </button>
          </nav>
        )}
      </div>
    </PremiumSectionShell>
  );
}
