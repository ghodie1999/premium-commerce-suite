import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const HOTSPOTS = [
  { id: "leather-handbag", x: "28%", y: "48%", label: "Structured Leather Tote" },
  { id: "classic-sneakers", x: "55%", y: "66%", label: "Minimalist Leather Sneakers" },
  { id: "artisanal-pour-over-set", x: "78%", y: "42%", label: "Sculptural Vessel" },
];

export type InteractiveImageHotspotsProps = BaseSectionProps;

export function InteractiveImageHotspots({
  subheading = "Interactive Scene",
  heading = "Inspect Every Piece in Context",
  description = "Select any numbered marker on the plinth arrangement to inspect and add the featured object.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: InteractiveImageHotspotsProps) {
  const [activeId, setActiveId] = useState(HOTSPOTS[0]!.id);
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const activeProduct = products.find((p) => p.id === activeId) ?? products[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
        <div className="relative overflow-hidden rounded-3xl bg-sand lg:col-span-8">
          <img
            src={PREMIUM_ASSETS.hero}
            alt="Interactive product showcase scene"
            loading="lazy"
            decoding="async"
            width={1000}
            height={750}
            className="aspect-4/3 w-full object-cover"
          />
          {HOTSPOTS.map((spot, idx) => {
            const isSelected = spot.id === activeId;
            return (
              <button
                key={spot.id}
                type="button"
                aria-label={`Inspect ${spot.label}`}
                aria-pressed={isSelected}
                onClick={() => setActiveId(spot.id)}
                style={{ left: spot.x, top: spot.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 grid size-9 place-items-center rounded-full font-mono text-xs font-bold shadow-lift transition-transform ${
                  isSelected
                    ? "scale-115 bg-accent text-accent-foreground ring-4 ring-white/80"
                    : "bg-primary text-primary-foreground hover:scale-110"
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft lg:col-span-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-accent">
            Selected Marker
          </p>
          <h3 className="mt-2 font-display text-xl font-extrabold text-foreground">
            {activeProduct.name}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {activeProduct.description}
          </p>
          <p className="mt-4 font-display text-2xl font-black tabular-nums text-foreground">
            {formatPrice(activeProduct.price)}
          </p>
          <button
            type="button"
            onClick={() => add(activeProduct, 1, { color: activeProduct.colors[0]?.name })}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            <ShoppingBag className="size-4" />
            <span>Add Piece to Bag</span>
          </button>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
