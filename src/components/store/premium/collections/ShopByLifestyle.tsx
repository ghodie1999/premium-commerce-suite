import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const LIFESTYLES = [
  {
    id: "work",
    label: "Studio & Desk",
    summary: "Tactile task lighting, acoustic headphones, and stoneware pour-over rituals.",
    ids: ["architectural-desk-lamp", "studio-master-headphones", "artisanal-pour-over-set"],
    to: "/collections/home-living",
  },
  {
    id: "travel",
    label: "Weekend Transit",
    summary: "Carryall leather totes, heavyweight knit layers, and polished calfskin trainers.",
    ids: ["leather-handbag", "essential-hoodie", "classic-sneakers"],
    to: "/collections/trending-now",
  },
  {
    id: "evening",
    label: "Signature Grooming",
    summary: "Botanical extrait fragrances, steel chronographs, and sculpted acetate frames.",
    ids: ["eau-de-parfum", "minimalist-chronograph", "riviera-sunglasses"],
    to: "/collections/accessories",
  },
];

export type ShopByLifestyleProps = BaseSectionProps;

export function ShopByLifestyle({
  subheading = "Curated Contexts",
  heading = "Shop by Lifestyle",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ShopByLifestyleProps) {
  const [selectedId, setSelectedId] = useState(LIFESTYLES[0]!.id);
  const current = LIFESTYLES.find((l) => l.id === selectedId) ?? LIFESTYLES[0]!;
  const items = current.ids
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
        description={current.summary}
        action={
          <div className="flex flex-wrap gap-1.5">
            {LIFESTYLES.map((l) => (
              <button
                key={l.id}
                type="button"
                aria-pressed={selectedId === l.id}
                onClick={() => setSelectedId(l.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedId === l.id
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Link
          to={current.to}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-accent hover:underline"
        >
          <span>Shop {current.label} Collection</span>
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </PremiumSectionShell>
  );
}
