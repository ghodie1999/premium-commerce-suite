import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type CompleteTheLookProps = BaseSectionProps & {
  editorialImage?: string;
  productIds?: string[];
};

export function CompleteTheLook({
  subheading = "Styled Pairing",
  heading = "Complete the Look",
  description = "Every component featured in the frame, ready to add individually or together.",
  editorialImage = PREMIUM_ASSETS.hero,
  productIds = ["leather-handbag", "classic-sneakers", "riviera-sunglasses"],
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: CompleteTheLookProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const items = productIds
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
      <div className="grid items-stretch gap-8 lg:grid-cols-12">
        <div className="overflow-hidden rounded-3xl bg-sand lg:col-span-6">
          <img
            src={editorialImage}
            alt="Full styled outfit and lifestyle setup"
            loading="lazy"
            decoding="async"
            width={720}
            height={720}
            className="h-full w-full object-cover aspect-square lg:aspect-auto"
          />
        </div>

        <div className="flex flex-col justify-between lg:col-span-6">
          <SectionHeaderBlock
            subheading={subheading}
            heading={heading}
            description={description}
            dark={surface === "primary"}
          />

          <ul className="mt-6 divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-4">
                <Link
                  to="/products/$id"
                  params={{ id: item.id }}
                  className="flex items-center gap-4 min-w-0 group"
                >
                  <ProductImage
                    src={item.image}
                    productId={item.id}
                    category={item.category}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={72}
                    height={72}
                    className="size-16 shrink-0 rounded-xl bg-sand object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-sm font-bold text-foreground truncate group-hover:text-accent transition-colors">
                      {item.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                    <p className="mt-1 text-xs font-extrabold tabular-nums text-foreground">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    add(item, 1, {
                      color: item.colors[0]?.name,
                      size: item.sizes?.[0]?.label,
                    })
                  }
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors whitespace-nowrap"
                >
                  <ShoppingBag className="size-3.5" />
                  <span>Add</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
