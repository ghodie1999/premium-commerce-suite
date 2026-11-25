import { useState } from "react";
import { Check, Star } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductComparisonPresentationProps = BaseSectionProps;

export function ProductComparisonPresentation({
  subheading = "Side-by-Side Spec Matrix",
  heading = "Compare Silhouettes & Materials",
  description = "Toggle up to three studio items to inspect rating, dispatch time, materials, and pricing side by side.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductComparisonPresentationProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    "essential-hoodie",
    "leather-handbag",
    "minimalist-chronograph",
  ]);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const toggleProduct = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.length > 2 ? prev.filter((item) => item !== id) : prev;
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const compared = selectedIds
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
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-6 flex flex-wrap gap-2">
        {products.slice(0, 6).map((p) => {
          const active = selectedIds.includes(p.id);
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => toggleProduct(p.id)}
              aria-pressed={active}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground hover:border-primary/40"
              }`}
            >
              {active && <Check className="size-3" />}
              {p.name}
            </button>
          );
        })}
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-background">
        <table className="w-full min-w-[640px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border bg-card">
              <th className="w-40 p-4 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Specification
              </th>
              {compared.map((item) => (
                <th key={item.id} className="p-4 align-top">
                  <div className="flex items-center gap-3">
                    <ProductImage
                      src={item.image}
                      productId={item.id}
                      category={item.category}
                      alt={item.name}
                      loading="lazy"
                      decoding="async"
                      width={80}
                      height={80}
                      className="size-12 rounded-lg object-cover bg-sand"
                    />
                    <div>
                      <p className="font-display text-sm font-bold text-foreground">{item.name}</p>
                      <p className="text-[11px] font-normal text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-4 font-semibold text-foreground">Price</td>
              {compared.map((item) => (
                <td key={item.id} className="p-4 font-display text-sm font-extrabold tabular-nums">
                  {formatPrice(item.price)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-foreground">Rating</td>
              {compared.map((item) => (
                <td key={item.id} className="p-4 tabular-nums">
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <Star className="size-3.5 fill-accent text-accent" /> {item.rating} (
                    {item.reviews})
                  </span>
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-foreground">Materials</td>
              {compared.map((item) => (
                <td key={item.id} className="p-4 text-muted-foreground">
                  {item.materials}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-foreground">Shipping</td>
              {compared.map((item) => (
                <td key={item.id} className="p-4 text-muted-foreground">
                  {item.shippingInfo}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold text-foreground">Action</td>
              {compared.map((item) => (
                <td key={item.id} className="p-4">
                  <button
                    type="button"
                    onClick={() => add(item, 1)}
                    className="rounded-full bg-primary px-4 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                  >
                    Add to Bag
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </PremiumSectionShell>
  );
}
