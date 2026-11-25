import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const PRINCIPLES = [
  {
    index: "01",
    title: "Material Provenance",
    copy: "Every fabric lot and hide is traceable to single-origin certified mills operating under strict closed-loop water standards.",
  },
  {
    index: "02",
    title: "Zero Seasonal Clearance",
    copy: "We produce disciplined small-batch runs priced transparently year-round rather than inflating RRP for artificial markdowns.",
  },
  {
    index: "03",
    title: "Design for Repairability",
    copy: "Solid brass hardware, replaceable watch gaskets, and serviceable batteries extend useful life well beyond warranty.",
  },
];

export type BrandPhilosophyProps = BaseSectionProps;

export function BrandPhilosophy({
  subheading = "Our Manifesto",
  heading = "Three principles behind everything we release",
  surface = "primary",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BrandPhilosophyProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} dark={surface === "primary"} />

      <div className="mt-10 divide-y divide-current/15 border-y border-current/15">
        {PRINCIPLES.map((item) => (
          <div key={item.index} className="grid gap-4 py-7 md:grid-cols-12 md:items-baseline">
            <span className="font-mono text-sm font-bold text-accent md:col-span-2">
              {item.index}.
            </span>
            <h3 className="font-display text-xl font-bold md:col-span-4">{item.title}</h3>
            <p className="text-sm leading-relaxed opacity-75 md:col-span-6">{item.copy}</p>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
