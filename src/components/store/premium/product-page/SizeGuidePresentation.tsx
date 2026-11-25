import { useState } from "react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const SIZE_ROWS = [
  { size: "XS", chestIn: "34–36", lengthIn: "26.0", sleeveIn: "32.0" },
  { size: "S", chestIn: "36–38", lengthIn: "27.0", sleeveIn: "33.0" },
  { size: "M", chestIn: "39–41", lengthIn: "28.0", sleeveIn: "34.0" },
  { size: "L", chestIn: "42–44", lengthIn: "29.0", sleeveIn: "35.0" },
  { size: "XL", chestIn: "45–47", lengthIn: "30.0", sleeveIn: "36.0" },
];

export type SizeGuidePresentationProps = BaseSectionProps;

export function SizeGuidePresentation({
  subheading = "Fit Reference",
  heading = "Garment Size & Measurement Guide",
  description = "Switch between inches and centimeters to find your exact studio fit.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: SizeGuidePresentationProps) {
  const [unit, setUnit] = useState<"in" | "cm">("in");

  const convert = (raw: string) => {
    if (unit === "in") return `${raw}"`;
    if (raw.includes("–")) {
      const [a, b] = raw.split("–").map(Number);
      return `${Math.round((a ?? 0) * 2.54)}–${Math.round((b ?? 0) * 2.54)} cm`;
    }
    return `${(Number(raw) * 2.54).toFixed(1)} cm`;
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
        description={description}
        action={
          <div className="inline-flex rounded-full border border-border bg-secondary p-1 text-xs font-bold">
            {(["in", "cm"] as const).map((u) => (
              <button
                key={u}
                type="button"
                aria-pressed={unit === u}
                onClick={() => setUnit(u)}
                className={`rounded-full px-4 py-1.5 uppercase transition-colors ${
                  unit === u ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {u}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full min-w-[480px] text-left text-xs">
          <thead className="border-b border-border bg-sand/40 text-muted-foreground">
            <tr>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Size</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Chest</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Body Length</th>
              <th className="px-5 py-3.5 font-bold uppercase tracking-wider">Sleeve</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {SIZE_ROWS.map((r) => (
              <tr key={r.size}>
                <td className="px-5 py-3.5 font-display font-bold text-foreground">{r.size}</td>
                <td className="px-5 py-3.5 tabular-nums">{convert(r.chestIn)}</td>
                <td className="px-5 py-3.5 tabular-nums">{convert(r.lengthIn)}</td>
                <td className="px-5 py-3.5 tabular-nums">{convert(r.sleeveIn)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PremiumSectionShell>
  );
}
