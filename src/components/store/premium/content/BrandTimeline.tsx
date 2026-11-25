import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type BrandTimelineProps = BaseSectionProps;

const MILESTONES = [
  {
    year: "2021",
    title: "First 450 GSM Mill Partnership",
    copy: "Launched with a single heavyweight organic cotton hoodie engineered alongside a family-run Portuguese knitting house.",
  },
  {
    year: "2023",
    title: "Santa Croce Vegetable Tannery",
    copy: "Introduced our Full-Grain Leather Tote Line using zero-chrome Italian hides and solid cast brass hardware.",
  },
  {
    year: "2024",
    title: "Acoustics & Home Objects",
    copy: "Expanded beyond wardrobe essentials into architectural task lighting, high-fire stoneware, and studio reference audio.",
  },
  {
    year: "2026",
    title: "Three Global Flagships",
    copy: "Opened community showrooms in New York, London, and Tokyo with lifetime garment and timepiece servicing.",
  },
];

export function BrandTimeline({
  subheading = "2021 — 2026",
  heading = "Built Slowly, Piece by Piece",
  description = "A chronological record of the material workshops and design milestones behind our collection.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BrandTimelineProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {MILESTONES.map((step, idx) => (
          <div key={step.year} className="relative border-t-2 border-primary pt-5">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-extrabold text-primary tabular-nums">
                {step.year}
              </span>
              <span className="text-[11px] font-bold text-accent tabular-nums">0{idx + 1}</span>
            </div>
            <h3 className="mt-3 font-display text-base font-bold text-foreground">{step.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{step.copy}</p>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
