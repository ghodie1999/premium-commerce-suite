import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag } from "lucide-react";
import { products, type Product } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type QuickAddPresentationProps = BaseSectionProps;

function QuickAddRowCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.find((s) => s.available)?.label ?? "",
  );
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
  const [added, setAdded] = useState(false);

  const handleQuickAdd = () => {
    add(product, 1, {
      color: selectedColor || undefined,
      size: selectedSize || undefined,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <Link
        to="/products/$id"
        params={{ id: product.id }}
        className="relative aspect-4/5 overflow-hidden bg-sand"
      >
        <ProductImage
          src={product.image}
          productId={product.id}
          category={product.category}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width={720}
          height={900}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
              {product.category}
            </p>
            <h3 className="mt-1 font-display text-base font-bold text-foreground">
              <Link
                to="/products/$id"
                params={{ id: product.id }}
                className="hover:text-accent transition-colors"
              >
                {product.name}
              </Link>
            </h3>
          </div>
          <span className="font-display text-base font-extrabold tabular-nums">
            {formatPrice(product.price)}
          </span>
        </div>

        {product.colors.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setSelectedColor(c.name)}
                aria-pressed={selectedColor === c.name}
                className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                  selectedColor === c.name
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                <span
                  className="size-2.5 rounded-full border border-border"
                  style={{ backgroundColor: c.value }}
                />
                {c.name.split(" / ")[0]}
              </button>
            ))}
          </div>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.sizes.map((s) => (
              <button
                key={s.label}
                type="button"
                disabled={!s.available}
                onClick={() => setSelectedSize(s.label)}
                aria-pressed={selectedSize === s.label}
                className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors ${
                  !s.available
                    ? "cursor-not-allowed border-border/50 text-muted-foreground/40 line-through"
                    : selectedSize === s.label
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleQuickAdd}
          className="mt-auto pt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground mt-4"
        >
          {added ? (
            <>
              <Check className="size-3.5" /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag className="size-3.5" /> Quick Add
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export function QuickAddPresentation({
  subheading = "Instant Variant Selection",
  heading = "Collection Quick-Add Grid",
  description = "Select finishes and sizes directly in the collection grid without opening a product modal.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: QuickAddPresentationProps) {
  const featured = [products[0], products[2], products[3]];

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {featured.map((product) => (
          <QuickAddRowCard key={product.id} product={product} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
