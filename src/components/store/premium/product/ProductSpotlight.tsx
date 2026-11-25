import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type ProductSpotlightProps = BaseSectionProps & {
  productId?: string;
};

export function ProductSpotlight({
  productId = "studio-master-headphones",
  subheading = "Object in Focus",
  heading,
  description,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductSpotlightProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const [colorIdx, setColorIdx] = useState(0);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading ?? product.name}
      className={className}
    >
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="overflow-hidden rounded-3xl border border-border/80 bg-sand lg:col-span-6">
          <ProductImage
            src={product.image}
            productId={product.id}
            category={product.category}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={760}
            height={760}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="lg:col-span-6 lg:pl-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl text-balance">
            {heading ?? product.name}
          </h2>
          <p className="mt-3 text-sm leading-relaxed opacity-80">
            {description ?? product.description}
          </p>

          <ul className="mt-6 grid gap-2.5 border-y border-border/70 py-5 text-xs">
            {product.highlights.slice(0, 4).map((h) => (
              <li key={h} className="flex items-start gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="font-display text-2xl font-black tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.colors.length > 0 && (
                <div className="mt-2 flex items-center gap-2">
                  {product.colors.map((c, idx) => (
                    <button
                      key={c.name}
                      type="button"
                      aria-label={`Color ${c.name}`}
                      onClick={() => setColorIdx(idx)}
                      style={{ backgroundColor: c.value }}
                      className={`size-5 rounded-full border border-border ${
                        colorIdx === idx ? "ring-2 ring-accent ring-offset-2" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  add(product, 1, {
                    color: product.colors[colorIdx]?.name,
                    size: product.sizes?.[0]?.label,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground shadow-card transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <ShoppingBag className="size-4" />
                <span>Add to Bag</span>
              </button>
              <Link
                to="/products/$id"
                params={{ id: product.id }}
                className="text-xs font-semibold underline-offset-4 hover:underline whitespace-nowrap"
              >
                View Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
