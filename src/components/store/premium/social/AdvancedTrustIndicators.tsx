import { Globe, RotateCcw, ShieldCheck, Truck } from "lucide-react";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

const INDICATORS = [
  { icon: Truck, title: "Complimentary Express", meta: "Orders over $100 ship free" },
  { icon: RotateCcw, title: "30-Day Pre-Paid Returns", meta: "Zero restocking fees" },
  { icon: ShieldCheck, title: "Lifetime Craft Care", meta: "Hardware & seam warranty" },
  { icon: Globe, title: "52 Destinations", meta: "Tracked carbon-neutral routes" },
];

export type AdvancedTrustIndicatorsProps = BaseSectionProps;

export function AdvancedTrustIndicators({
  surface = "default",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: AdvancedTrustIndicatorsProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Customer guarantees"
      className={className}
    >
      <div className="grid divide-y divide-border border-y border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {INDICATORS.map(({ icon: Icon, title, meta }) => (
          <div key={title} className="flex items-start gap-3.5 px-5 py-6">
            <Icon className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-display text-sm font-bold text-foreground">{title}</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">{meta}</p>
            </div>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
