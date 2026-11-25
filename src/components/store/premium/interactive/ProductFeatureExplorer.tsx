import { useState } from "react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const FEATURES = [
  {
    code: "F1",
    name: "Dual-Axis Counterweight Arm",
    detail:
      "Silent brass friction joints hold exact beam geometry at any elevation without tightening knobs.",
    spec: "270° Tilt · 360° Base Rotation",
  },
  {
    code: "F2",
    name: "97+ CRI Warm Architectural LED",
    detail:
      "Flicker-free 2700K optic diffuser engineered to render natural skin, paper, and pigment tones accurately.",
    spec: "50,000 Hour Rated Diode",
  },
  {
    code: "F3",
    name: "CNC-Machined Anodized Aluminum",
    detail:
      "Bead-blasted aircraft alloy housing dissipates heat passively while resisting fingerprints.",
    spec: "1.8 kg Weighted Base",
  },
];

export type ProductFeatureExplorerProps = BaseSectionProps;

export function ProductFeatureExplorer({
  subheading = "Industrial Breakdown",
  heading = "Engineering Feature Explorer",
  description = "Select any hardware subsystem to inspect tolerances and acoustic/optical specifications.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductFeatureExplorerProps) {
  const [selected, setSelected] = useState(0);
  const current = FEATURES[selected] ?? FEATURES[0]!;

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
        <div className="overflow-hidden rounded-3xl bg-sand lg:col-span-6">
          <img
            src={PREMIUM_ASSETS.deskLamp}
            alt="Architectural Pivot Desk Lamp engineering view"
            loading="lazy"
            decoding="async"
            width={680}
            height={680}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="space-y-4 lg:col-span-6">
          <div className="flex flex-wrap gap-2">
            {FEATURES.map((feat, idx) => (
              <button
                key={feat.code}
                type="button"
                aria-pressed={selected === idx}
                onClick={() => setSelected(idx)}
                className={`rounded-full px-4 py-2 font-mono text-xs font-bold transition-colors ${
                  selected === idx
                    ? "bg-accent text-accent-foreground"
                    : "border border-border bg-secondary text-foreground hover:bg-sand-deep"
                }`}
              >
                {feat.code} · {feat.name.split(" ")[0]}
              </button>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-sand/30 p-7">
            <span className="font-mono text-xs font-bold text-accent">{current.spec}</span>
            <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground">
              {current.name}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{current.detail}</p>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
