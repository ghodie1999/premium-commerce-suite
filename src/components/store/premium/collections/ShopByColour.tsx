import { useState } from "react";
import { products } from "@/lib/catalog";
import { ProductCard } from "@/components/store/ProductCard";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const PALETTES = [
  { label: "Forest & Olive", swatch: "#1B3B2B", keywords: ["forest", "green", "olive"] },
  {
    label: "Charcoal & Obsidian",
    swatch: "#1F2421",
    keywords: ["charcoal", "black", "obsidian", "slate"],
  },
  {
    label: "Ivory & Travertine",
    swatch: "#EADBC8",
    keywords: ["cream", "ivory", "oatmeal", "clay", "bone", "sand"],
  },
  {
    label: "Cognac & Tortoise",
    swatch: "#B57B4A",
    keywords: ["cognac", "tortoise", "amber", "brass"],
  },
];

export type ShopByColourProps = BaseSectionProps;

export function ShopByColour({
  subheading = "Tone & Finish",
  heading = "Shop by Colour",
  description = "Filter studio essentials directly by signature pigment and finish palette.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ShopByColourProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = PALETTES[selectedIdx] ?? PALETTES[0]!;

  const matched = products.filter((p) =>
    p.colors.some((c) => active.keywords.some((kw) => c.name.toLowerCase().includes(kw))),
  );
  const shown = (matched.length > 0 ? matched : products).slice(0, 4);

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
          <div className="flex flex-wrap items-center gap-2">
            {PALETTES.map((pal, idx) => (
              <button
                key={pal.label}
                type="button"
                aria-pressed={selectedIdx === idx}
                onClick={() => setSelectedIdx(idx)}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap ${
                  selectedIdx === idx
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                <span
                  aria-hidden="true"
                  style={{ backgroundColor: pal.swatch }}
                  className="size-3.5 rounded-full border border-black/15"
                />
                <span>{pal.label}</span>
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </PremiumSectionShell>
  );
}
