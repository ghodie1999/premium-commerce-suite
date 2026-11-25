import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { History, ShoppingBag, Trash2, X } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type RecentlyViewedDrawerProps = BaseSectionProps;

export function RecentlyViewedDrawer({
  subheading = "Browsing Memory",
  heading = "Recently Viewed Drawer",
  description = "A slide-over history panel that restores browsed silhouettes with one-click Add to Bag.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: RecentlyViewedDrawerProps) {
  const [open, setOpen] = useState(false);
  const [recentIds, setRecentIds] = useState<string[]>([
    "minimalist-chronograph",
    "leather-handbag",
    "studio-master-headphones",
    "essential-hoodie",
  ]);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const recentItems = recentIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-background p-7 sm:flex-row sm:items-center sm:p-10">
        <div className="max-w-xl">
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <History className="size-4" /> Open History Drawer ({recentItems.length})
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs">
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Recently Viewed Items"
            className="flex h-full w-full max-w-md flex-col border-l border-border bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  Session History
                </p>
                <h3 className="font-display text-lg font-extrabold text-foreground">
                  Recently Viewed ({recentItems.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close recently viewed drawer"
                className="grid size-9 place-items-center rounded-full border border-border text-foreground hover:bg-background"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-6">
              {recentItems.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center">
                  <p className="font-display text-sm font-bold text-foreground">History cleared</p>
                  <button
                    type="button"
                    onClick={() =>
                      setRecentIds([
                        "minimalist-chronograph",
                        "leather-handbag",
                        "studio-master-headphones",
                        "essential-hoodie",
                      ])
                    }
                    className="mt-3 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
                  >
                    Restore Sample History
                  </button>
                </div>
              ) : (
                recentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3"
                  >
                    <Link
                      to="/products/$id"
                      params={{ id: item.id }}
                      onClick={() => setOpen(false)}
                      className="size-20 shrink-0 overflow-hidden rounded-xl bg-sand"
                    >
                      <ProductImage
                        src={item.image}
                        productId={item.id}
                        category={item.category}
                        alt={item.name}
                        width={160}
                        height={160}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-sm font-bold text-foreground">
                        {item.name}
                      </p>
                      <p className="mt-0.5 text-xs font-semibold text-muted-foreground tabular-nums">
                        {formatPrice(item.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => add(item, 1)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        <ShoppingBag className="size-3" /> Add to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {recentItems.length > 0 && (
              <div className="border-t border-border p-5">
                <button
                  type="button"
                  onClick={() => setRecentIds([])}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Trash2 className="size-3.5" /> Clear Viewing History
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </PremiumSectionShell>
  );
}
