import { useState } from "react";
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

type LookEntry = {
  code: string;
  title: string;
  caption: string;
  image: string;
  productIds: string[];
};

const LOOKS: LookEntry[] = [
  {
    code: "Look 01",
    title: "City Uniform",
    caption: "Heavyweight brushed cotton paired with crisp calfskin footwear.",
    image: PREMIUM_ASSETS.men,
    productIds: ["essential-hoodie", "classic-sneakers"],
  },
  {
    code: "Look 02",
    title: "Gallery Carry",
    caption: "Vegetable-tanned Italian tote styled with sculpted acetate frames.",
    image: PREMIUM_ASSETS.women,
    productIds: ["leather-handbag", "riviera-sunglasses"],
  },
  {
    code: "Look 03",
    title: "Quiet Study",
    caption: "Precision task lighting alongside matte stoneware and wireless acoustics.",
    image: PREMIUM_ASSETS.home,
    productIds: ["architectural-desk-lamp", "artisanal-pour-over-set"],
  },
];

export type InteractiveLookbookProps = BaseSectionProps;

export function InteractiveLookbook({
  subheading = "Interactive Lookbook",
  heading = "Shop by Editorial Frame",
  description = "Select any look below to inspect and add the featured pieces directly to your bag.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: InteractiveLookbookProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const currentLook = LOOKS[activeIndex] ?? LOOKS[0]!;
  const featuredProducts = currentLook.productIds
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
      <SectionHeaderBlock
        subheading={subheading}
        heading={heading}
        description={description}
        action={
          <div className="flex gap-1.5">
            {LOOKS.map((look, idx) => (
              <button
                key={look.code}
                type="button"
                aria-pressed={activeIndex === idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeIndex === idx
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {look.code}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl bg-sand lg:col-span-7">
          <img
            src={currentLook.image}
            alt={currentLook.title}
            loading="lazy"
            decoding="async"
            width={820}
            height={680}
            className="aspect-4/3 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 text-white">
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
              {currentLook.code}
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold">{currentLook.title}</h3>
            <p className="mt-1 text-xs text-white/80">{currentLook.caption}</p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-4 lg:col-span-5">
          <div className="space-y-4">
            {featuredProducts.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
              >
                <Link to="/products/$id" params={{ id: item.id }} className="shrink-0">
                  <ProductImage
                    src={item.image}
                    productId={item.id}
                    category={item.category}
                    alt={item.name}
                    loading="lazy"
                    decoding="async"
                    width={96}
                    height={96}
                    className="size-22 rounded-xl bg-sand object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    to="/products/$id"
                    params={{ id: item.id }}
                    className="font-display text-sm font-bold text-foreground hover:text-accent transition-colors block truncate"
                  >
                    {item.name}
                  </Link>
                  <p className="mt-0.5 text-xs text-muted-foreground truncate">{item.subtitle}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-extrabold tabular-nums">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => add(item, 1, { color: item.colors[0]?.name })}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1.5 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors"
                    >
                      <ShoppingBag className="size-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/collections"
            className="rounded-2xl border border-border bg-sand/40 px-5 py-4 text-center text-xs font-semibold text-foreground hover:bg-sand/70 transition-colors"
          >
            Explore Full Seasonal Archive →
          </Link>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
