import { Link } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Star } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type BestSellersShowcaseProps = BaseSectionProps;

export function BestSellersShowcase({
  subheading = "Customer Favorites",
  heading = "Proven Best Sellers",
  description = "Our highest-rated pieces chosen repeatedly by returning collectors.",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BestSellersShowcaseProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const ranked = [...products].sort((a, b) => b.reviews - a.reviews);
  const heroPick = ranked[0]!;
  const supporting = ranked.slice(1, 5);

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
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:col-span-5">
          <Link
            to="/products/$id"
            params={{ id: heroPick.id }}
            className="block bg-sand overflow-hidden"
          >
            <ProductImage
              src={heroPick.image}
              productId={heroPick.id}
              category={heroPick.category}
              alt={heroPick.name}
              loading="lazy"
              decoding="async"
              width={640}
              height={640}
              className="aspect-4/4 w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </Link>
          <div className="p-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-bold uppercase tracking-widest text-accent">
                No. 1 Most Reviewed
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-foreground tabular-nums">
                <Star className="size-3.5 fill-accent text-accent" />
                {heroPick.rating} ({heroPick.reviews})
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-extrabold text-foreground">
              {heroPick.name}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {heroPick.description}
            </p>
            <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
              <span className="font-display text-xl font-black tabular-nums text-foreground">
                {formatPrice(heroPick.price)}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => add(heroPick, 1, { color: heroPick.colors[0]?.name })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors"
                >
                  <ShoppingBag className="size-3.5" />
                  <span>Add</span>
                </button>
                <Link
                  to="/products/$id"
                  params={{ id: heroPick.id }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                >
                  <span>Details</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:col-span-7">
          {supporting.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
