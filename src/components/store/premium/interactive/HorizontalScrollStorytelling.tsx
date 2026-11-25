import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const CHAPTERS = [
  {
    chapter: "Chapter 01",
    title: "Morning Stillness",
    copy: "Hand-thrown matte stoneware meets balanced pour-over temperature retention.",
    image: PREMIUM_ASSETS.mugSet,
  },
  {
    chapter: "Chapter 02",
    title: "Commute Ready",
    copy: "Full-grain saddle tote geometry shaped around laptops, notebooks, and daily chargers.",
    image: PREMIUM_ASSETS.bag,
  },
  {
    chapter: "Chapter 03",
    title: "Acoustic Sanctuary",
    copy: "Zero-fatigue lambskin memory cushions isolate transit noise across long flights.",
    image: PREMIUM_ASSETS.headphones,
  },
  {
    chapter: "Chapter 04",
    title: "Evening Focus",
    copy: "Warm 2700K directional brass illumination anchors late studio sessions.",
    image: PREMIUM_ASSETS.deskLamp,
  },
];

export type HorizontalScrollStorytellingProps = BaseSectionProps;

export function HorizontalScrollStorytelling({
  subheading = "24 Hours With ShopEase",
  heading = "Horizontal Scroll Storytelling",
  surface = "primary",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: HorizontalScrollStorytellingProps) {
  const railRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: -1 | 1) => {
    railRef.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

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
        dark={surface === "primary"}
        action={
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Scroll chapters left"
              onClick={() => nudge(-1)}
              className="grid size-9 place-items-center rounded-full border border-current/25 hover:bg-white/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Scroll chapters right"
              onClick={() => nudge(1)}
              className="grid size-9 place-items-center rounded-full border border-current/25 hover:bg-white/10"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        }
      />

      <div
        ref={railRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
      >
        {CHAPTERS.map((ch) => (
          <article
            key={ch.chapter}
            className="w-80 shrink-0 snap-start overflow-hidden rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 sm:w-96"
          >
            <img
              src={ch.image}
              alt={ch.title}
              loading="lazy"
              decoding="async"
              width={420}
              height={320}
              className="aspect-4/3 w-full object-cover"
            />
            <div className="p-6">
              <p className="font-mono text-xs font-bold text-accent">{ch.chapter}</p>
              <h3 className="mt-1 font-display text-xl font-bold">{ch.title}</h3>
              <p className="mt-2 text-xs leading-relaxed opacity-75">{ch.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
