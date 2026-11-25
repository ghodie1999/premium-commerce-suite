import { useState } from "react";
import { ShoppingBag, X } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ShoppableSocialGalleryProps = BaseSectionProps;

export function ShoppableSocialGallery({
  subheading = "Tap to Shop",
  heading = "Shoppable Community Archive",
  description = "Click any customer photograph to inspect the piece and add it directly to your bag.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ShoppableSocialGalleryProps) {
  const featured = products.slice(0, 4);
  const [activeProduct, setActiveProduct] = useState<(typeof featured)[number] | null>(null);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {featured.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveProduct(item)}
            className="group relative overflow-hidden rounded-2xl bg-sand text-left"
          >
            <ProductImage
              src={item.image}
              productId={item.id}
              category={item.category}
              alt={item.name}
              loading="lazy"
              decoding="async"
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-card/95 px-3 py-1.5 text-[11px] font-bold text-foreground shadow-soft backdrop-blur-sm">
              <ShoppingBag className="size-3 text-accent" />
              <span>Shop Look</span>
            </span>
          </button>
        ))}
      </div>

      {activeProduct && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setActiveProduct(null)}
          />
          <div className="relative z-10 flex w-full max-w-md flex-col gap-4 rounded-3xl border border-border bg-card p-6 shadow-lift sm:flex-row sm:items-center">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setActiveProduct(null)}
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="size-4" />
            </button>
            <ProductImage
              src={activeProduct.image}
              productId={activeProduct.id}
              category={activeProduct.category}
              alt={activeProduct.name}
              width={112}
              height={112}
              className="size-28 shrink-0 rounded-2xl bg-sand object-cover"
            />
            <div className="min-w-0 flex-1 pr-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                {activeProduct.category}
              </p>
              <h3 className="mt-1 font-display text-base font-bold text-foreground">
                {activeProduct.name}
              </h3>
              <p className="mt-1 font-display text-sm font-extrabold tabular-nums">
                {formatPrice(activeProduct.price)}
              </p>
              <button
                type="button"
                onClick={() => {
                  add(activeProduct, 1, { color: activeProduct.colors[0]?.name });
                  setActiveProduct(null);
                }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors"
              >
                <ShoppingBag className="size-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </PremiumSectionShell>
  );
}
