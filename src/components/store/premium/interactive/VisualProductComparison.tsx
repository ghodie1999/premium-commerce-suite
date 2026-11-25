import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type VisualProductComparisonProps = BaseSectionProps;

export function VisualProductComparison({
  subheading = "Interactive Selector",
  heading = "Visual Product Comparison",
  description = "Choose any two products from our catalog to compare rating, finish options, stock, and price.",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: VisualProductComparisonProps) {
  const [leftId, setLeftId] = useState(products[0]!.id);
  const [rightId, setRightId] = useState(products[1]!.id);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const left = products.find((p) => p.id === leftId) ?? products[0]!;
  const right = products.find((p) => p.id === rightId) ?? products[1]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {[
          { item: left, selectedId: leftId, setSelectedId: setLeftId, label: "Left Item" },
          { item: right, selectedId: rightId, setSelectedId: setRightId, label: "Right Item" },
        ].map(({ item, selectedId, setSelectedId, label }) => (
          <div
            key={label}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft flex flex-col"
          >
            <select
              aria-label={`Choose ${label}`}
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs font-semibold outline-none focus:border-accent"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({formatPrice(p.price)})
                </option>
              ))}
            </select>

            <div className="mt-5 aspect-4/3 overflow-hidden rounded-2xl bg-sand">
              <ProductImage
                src={item.image}
                productId={item.id}
                category={item.category}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={520}
                height={390}
                className="h-full w-full object-cover"
              />
            </div>

            <dl className="mt-5 divide-y divide-border/70 text-xs">
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Price</dt>
                <dd className="font-display font-extrabold tabular-nums">
                  {formatPrice(item.price)}
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-semibold">{item.category}</dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Verified Rating</dt>
                <dd className="font-semibold tabular-nums">
                  {item.rating} / 5 ({item.reviews})
                </dd>
              </div>
              <div className="flex justify-between py-2.5">
                <dt className="text-muted-foreground">Stock Ready</dt>
                <dd className="font-semibold tabular-nums text-accent">{item.stock} units</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => add(item, 1, { color: item.colors[0]?.name })}
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors"
            >
              <ShoppingBag className="size-3.5" />
              <span>Add {item.name}</span>
            </button>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
