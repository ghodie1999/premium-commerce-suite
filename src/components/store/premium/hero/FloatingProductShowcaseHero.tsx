import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { SURFACE_MAP, type BaseSectionProps } from "../shared";

export type FloatingProductShowcaseHeroProps = BaseSectionProps & {
  productId?: string;
};

export function FloatingProductShowcaseHero({
  productId = "minimalist-chronograph",
  subheading = "Signature Object",
  heading,
  description,
  surface = "sand",
  className = "",
}: FloatingProductShowcaseHeroProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const [selectedColor, setSelectedColor] = useState(0);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  return (
    <section
      aria-label={heading ?? product.name}
      className={`${SURFACE_MAP[surface]} py-12 lg:py-20 ${className}`}
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl text-balance">
            {heading ?? product.name}
          </h1>
          <p className="mt-4 text-sm leading-relaxed opacity-80 sm:text-base">
            {description ?? product.subtitle}
          </p>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-2xl font-extrabold tabular-nums">
              {formatPrice(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-sm opacity-55 line-through tabular-nums">
                {formatPrice(product.compareAt)}
              </span>
            )}
          </div>

          {product.colors.length > 0 && (
            <div className="mt-5 flex items-center gap-2.5">
              {product.colors.map((c, idx) => (
                <button
                  key={c.name}
                  type="button"
                  aria-label={`Finish ${c.name}`}
                  onClick={() => setSelectedColor(idx)}
                  style={{ backgroundColor: c.value }}
                  className={`size-7 rounded-full border border-border transition-transform ${
                    selectedColor === idx
                      ? "ring-2 ring-accent ring-offset-2 scale-110"
                      : "hover:scale-105"
                  }`}
                />
              ))}
              <span className="ml-1 text-xs opacity-75">{product.colors[selectedColor]?.name}</span>
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() =>
                add(product, 1, {
                  color: product.colors[selectedColor]?.name,
                  size: product.sizes?.[0]?.label,
                })
              }
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <ShoppingBag className="size-4" />
              <span>Add to Bag</span>
            </button>
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-secondary transition-colors whitespace-nowrap"
            >
              <span>Full Specs</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="relative mx-auto max-w-xl rounded-4xl bg-card p-6 sm:p-10 shadow-card border border-border/70">
            <ProductImage
              src={product.image}
              productId={product.id}
              category={product.category}
              alt={product.name}
              loading="lazy"
              decoding="async"
              width={700}
              height={700}
              className="aspect-square w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
