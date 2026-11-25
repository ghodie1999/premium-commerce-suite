import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

type GalleryFrame = {
  id: string;
  tag: "Apparel" | "Living" | "Accessories";
  title: string;
  image: string;
};

const FRAMES: GalleryFrame[] = [
  { id: "g1", tag: "Apparel", title: "Heavyweight Fleece Knit", image: PREMIUM_ASSETS.hoodie },
  { id: "g2", tag: "Accessories", title: "Full-Grain Italian Tote", image: PREMIUM_ASSETS.bag },
  { id: "g3", tag: "Living", title: "Anodized Pivot Lamp", image: PREMIUM_ASSETS.deskLamp },
  { id: "g4", tag: "Accessories", title: "40mm Sapphire Chronograph", image: PREMIUM_ASSETS.watch },
  { id: "g5", tag: "Living", title: "Matte Ceramic Pour-Over", image: PREMIUM_ASSETS.mugSet },
  { id: "g6", tag: "Apparel", title: "Calfskin Court Trainers", image: PREMIUM_ASSETS.sneakers },
];

export type InteractiveImageGalleryProps = BaseSectionProps;

export function InteractiveImageGallery({
  subheading = "Visual Archive",
  heading = "Filterable Studio Gallery",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: InteractiveImageGalleryProps) {
  const [filter, setFilter] = useState<"All" | GalleryFrame["tag"]>("All");
  const [zoomed, setZoomed] = useState<GalleryFrame | null>(null);

  const visible = filter === "All" ? FRAMES : FRAMES.filter((f) => f.tag === filter);

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
        action={
          <div className="flex flex-wrap gap-1.5">
            {(["All", "Apparel", "Living", "Accessories"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={filter === t}
                onClick={() => setFilter(t)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  filter === t
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-card text-foreground hover:bg-secondary"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {visible.map((frame) => (
          <button
            key={frame.id}
            type="button"
            onClick={() => setZoomed(frame)}
            className="group relative overflow-hidden rounded-2xl bg-sand text-left"
          >
            <img
              src={frame.image}
              alt={frame.title}
              loading="lazy"
              decoding="async"
              width={480}
              height={360}
              className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-card/90 text-foreground opacity-0 transition-opacity group-hover:opacity-100">
              <Maximize2 className="size-3.5" />
            </span>
            <span className="absolute bottom-3 left-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-bold text-foreground">
              {frame.title}
            </span>
          </button>
        ))}
      </div>

      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setZoomed(null)}
          />
          <div className="relative z-10 max-w-2xl overflow-hidden rounded-3xl bg-card shadow-lift">
            <button
              type="button"
              aria-label="Close lightbox"
              onClick={() => setZoomed(null)}
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-card/90 text-foreground"
            >
              <X className="size-4" />
            </button>
            <img
              src={zoomed.image}
              alt={zoomed.title}
              width={900}
              height={680}
              className="max-h-[75vh] w-full object-cover"
            />
            <div className="flex items-center justify-between px-6 py-4">
              <h3 className="font-display text-base font-bold">{zoomed.title}</h3>
              <span className="text-xs text-muted-foreground">{zoomed.tag}</span>
            </div>
          </div>
        </div>
      )}
    </PremiumSectionShell>
  );
}
