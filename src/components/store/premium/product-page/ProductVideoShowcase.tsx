import { useState } from "react";
import { Pause, Play } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const CHAPTERS = [
  { time: "00:00", label: "Silhouette & Drape", image: PREMIUM_ASSETS.hoodie },
  { time: "00:18", label: "Seam & Ribbing Detail", image: PREMIUM_ASSETS.men },
  { time: "00:34", label: "Footwear Pairing", image: PREMIUM_ASSETS.sneakers },
];

export type ProductVideoShowcaseProps = BaseSectionProps;

export function ProductVideoShowcase({
  subheading = "Studio Motion",
  heading = "Product Video Showcase",
  description = "Inspect fabric movement, seam weight, and proportions in real studio lighting.",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductVideoShowcaseProps) {
  const [chapter, setChapter] = useState(0);
  const [playing, setPlaying] = useState(true);
  const current = CHAPTERS[chapter] ?? CHAPTERS[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-black text-white shadow-card">
        <div className="relative aspect-16/9 max-h-[520px] w-full overflow-hidden">
          <img
            src={current.image}
            alt={current.label}
            loading="lazy"
            decoding="async"
            width={1100}
            height={620}
            className={`h-full w-full object-cover transition-transform duration-[3000ms] ${
              playing ? "scale-105 opacity-85" : "scale-100 opacity-70"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

          <div className="absolute inset-x-5 bottom-5 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-foreground"
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span>{playing ? "Pause Preview" : "Play Preview"}</span>
            </button>

            <div className="flex flex-wrap gap-1.5">
              {CHAPTERS.map((c, idx) => (
                <button
                  key={c.time}
                  type="button"
                  onClick={() => setChapter(idx)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    chapter === idx
                      ? "bg-accent text-accent-foreground"
                      : "bg-black/55 text-white/85 hover:bg-black/80"
                  }`}
                >
                  <span className="font-mono mr-1.5">{c.time}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
