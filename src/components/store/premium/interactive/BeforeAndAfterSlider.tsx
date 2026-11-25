import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type BeforeAndAfterSliderProps = BaseSectionProps & {
  beforeLabel?: string;
  afterLabel?: string;
  beforeImage?: string;
  afterImage?: string;
};

export function BeforeAndAfterSlider({
  subheading = "Finish & Environment Study",
  heading = "Daylight Calm vs. Evening Warmth",
  description = "Drag the divider handle to compare raw stoneware tones against architectural studio lighting.",
  beforeLabel = "Daylight Studio",
  afterLabel = "Evening Task Mood",
  beforeImage = PREMIUM_ASSETS.mugSet,
  afterImage = PREMIUM_ASSETS.deskLamp,
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BeforeAndAfterSliderProps) {
  const [position, setPosition] = useState(50);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 relative mx-auto max-w-4xl select-none overflow-hidden rounded-3xl border border-border bg-card shadow-card">
        <div className="relative aspect-16/10 w-full">
          <img
            src={afterImage}
            alt={afterLabel}
            loading="lazy"
            decoding="async"
            width={1000}
            height={625}
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            className="absolute inset-0 overflow-hidden"
          >
            <img
              src={beforeImage}
              alt={beforeLabel}
              loading="lazy"
              decoding="async"
              width={1000}
              height={625}
              className="h-full w-full object-cover"
            />
          </div>

          <div
            aria-hidden="true"
            style={{ left: `${position}%` }}
            className="pointer-events-none absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white shadow-sm"
          >
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white text-foreground shadow-lift">
              <MoveHorizontal className="size-4" />
            </span>
          </div>

          <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {beforeLabel}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {afterLabel}
          </span>
        </div>

        <input
          type="range"
          min={5}
          max={95}
          value={position}
          aria-label="Compare before and after studio finishes"
          onChange={(e) => setPosition(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </PremiumSectionShell>
  );
}
