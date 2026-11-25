import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { useWishlist } from "@/components/store/wishlist";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type WishlistPresentationProps = BaseSectionProps;

export function WishlistPresentation({
  subheading = "Saved Archive",
  heading = "Your Curated Wishlist",
  description = "Live wishlist items synchronized with your store session, paired with suggested staples when empty.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: WishlistPresentationProps) {
  const { items, toggleWishlist } = useWishlist();
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const savedProducts = items.length > 0 ? items : products.slice(0, 3);
  const usingFallback = items.length === 0;

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
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground tabular-nums">
            <Heart className="size-3.5 text-accent" />
            {usingFallback
              ? "Previewing 3 curated picks (heart any item to customize)"
              : `${items.length} saved items`}
          </span>
        }
      />

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {savedProducts.map((product) => (
          <article
            key={product.id}
            className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <Link
              to="/products/$id"
              params={{ id: product.id }}
              className="size-24 shrink-0 overflow-hidden rounded-xl bg-sand"
            >
              <ProductImage
                src={product.image}
                productId={product.id}
                category={product.category}
                alt={product.name}
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
                className="h-full w-full object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-accent">
                {product.category}
              </p>
              <h3 className="mt-0.5 truncate font-display text-sm font-bold text-foreground">
                <Link
                  to="/products/$id"
                  params={{ id: product.id }}
                  className="hover:text-accent transition-colors"
                >
                  {product.name}
                </Link>
              </h3>
              <p className="mt-1 font-display text-sm font-extrabold text-foreground tabular-nums">
                {formatPrice(product.price)}
              </p>

              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => add(product, 1)}
                  className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-accent hover:text-accent-foreground"
                >
                  <ShoppingBag className="size-3" /> Move to Bag
                </button>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={usingFallback ? `Save ${product.name}` : `Remove ${product.name}`}
                  className="grid size-7 place-items-center rounded-full border border-border text-muted-foreground hover:text-foreground"
                >
                  {usingFallback ? <Heart className="size-3.5" /> : <Trash2 className="size-3.5" />}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
