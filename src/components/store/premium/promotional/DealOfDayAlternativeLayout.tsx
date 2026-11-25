import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { type BaseSectionProps } from "../shared";

export type DealOfDayAlternativeLayoutProps = BaseSectionProps & {
  productId?: string;
};

export function DealOfDayAlternativeLayout({
  productId = "minimalist-chronograph",
  subheading = "Daily Atelier Feature",
  className = "",
}: DealOfDayAlternativeLayoutProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const { add } = useCart();
  const { formatPrice } = useRegion();

  return (
    <section aria-label={product.name} className={`px-5 py-10 lg:px-8 ${className}`}>
      <div className="mx-auto grid max-w-7xl items-center overflow-hidden rounded-3xl bg-primary text-primary-foreground lg:grid-cols-12">
        <div className="aspect-4/3 h-full overflow-hidden bg-sand lg:col-span-5">
          <ProductImage
            src={product.image}
            productId={product.id}
            category={product.category}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={620}
            height={480}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="p-8 sm:p-12 lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl text-balance">
            {product.name}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/75">
            {product.description}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            <div>
              <span className="font-display text-3xl font-black text-accent tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.compareAt && (
                <span className="ml-2 text-sm text-primary-foreground/60 line-through tabular-nums">
                  {formatPrice(product.compareAt)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => add(product, 1, { color: product.colors[0]?.name })}
              className="inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              <ShoppingBag className="size-4" />
              <span>Claim Today&apos;s Price</span>
            </button>
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary-foreground/85 hover:text-accent transition-colors"
            >
              <span>Inspect Details</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
