import { ArrowRight, PackageCheck, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductBundleShowcaseProps = BaseSectionProps & {
  productIds?: string[];
  bundleDiscount?: number;
};

export function ProductBundleShowcase({
  subheading = "Studio Architecture Kit",
  heading = "The Focused Workspace Bundle",
  description = "Pair our precision lamp, wireless acoustics, and hand-thrown stoneware set with automatic bundle savings.",
  productIds = ["architectural-desk-lamp", "studio-master-headphones", "artisanal-pour-over-set"],
  bundleDiscount = 20,
  surface = "primary",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductBundleShowcaseProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const bundleItems = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const original = bundleItems.reduce((sum, p) => sum + p.price, 0);
  const finalPrice = original * (1 - bundleDiscount / 100);

  const addBundle = () => {
    for (const p of bundleItems) {
      add(p, 1, { color: p.colors[0]?.name });
    }
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
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-right">
              <span className="block text-xs opacity-70 line-through tabular-nums">
                {formatPrice(original)}
              </span>
              <span className="font-display text-2xl font-black text-accent tabular-nums">
                {formatPrice(finalPrice)}
              </span>
            </div>
            <button
              type="button"
              onClick={addBundle}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <ShoppingBag className="size-4" />
              <span>Add Full Kit ({bundleDiscount}% Off)</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        }
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {bundleItems.map((item, idx) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-4"
          >
            <div className="aspect-4/3 overflow-hidden rounded-xl bg-sand">
              <ProductImage
                src={item.image}
                productId={item.id}
                category={item.category}
                alt={item.name}
                loading="lazy"
                decoding="async"
                width={420}
                height={315}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
                  Piece 0{idx + 1}
                </p>
                <h3 className="mt-0.5 font-display text-base font-bold">{item.name}</h3>
                <p className="mt-1 text-xs opacity-75">{item.subtitle}</p>
              </div>
              <span className="text-xs font-bold tabular-nums opacity-85">
                {formatPrice(item.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 flex items-center gap-2 text-xs opacity-75">
        <PackageCheck className="size-4 text-success" />
        All three pieces ship together in protective plastic-free presentation boxes.
      </p>
    </PremiumSectionShell>
  );
}
