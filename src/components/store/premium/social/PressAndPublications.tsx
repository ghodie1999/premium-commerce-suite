import { useState } from "react";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

const PUBLICATIONS = [
  {
    name: "MONOCLE",
    quote: "Quietly sets the benchmark for direct-to-consumer wardrobe restraint.",
  },
  {
    name: "ARCHITECTURAL DIGEST",
    quote: "Their anodized pivot lamp looks right at home beside mid-century timber classics.",
  },
  {
    name: "WALLPAPER*",
    quote: "A rare online atelier treating everyday carryalls with Swiss industrial discipline.",
  },
  {
    name: "GQ EDIT",
    quote: "The 480GSM brushed cotton fleece outperforms hoodies twice its price tag.",
  },
];

export type PressAndPublicationsProps = BaseSectionProps;

export function PressAndPublications({
  subheading = "In the Press",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: PressAndPublicationsProps) {
  const [selected, setSelected] = useState(0);
  const current = PUBLICATIONS[selected] ?? PUBLICATIONS[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Press and publications"
      className={className}
    >
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
        <blockquote className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl text-balance">
          &ldquo;{current.quote}&rdquo;
        </blockquote>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 border-t border-border/80 pt-6">
          {PUBLICATIONS.map((pub, idx) => (
            <button
              key={pub.name}
              type="button"
              aria-pressed={selected === idx}
              onClick={() => setSelected(idx)}
              className={`rounded-full px-5 py-2 font-display text-xs font-extrabold tracking-widest transition-all ${
                selected === idx
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pub.name}
            </button>
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
