import { Award, Feather, Leaf, Shield } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const BENEFITS = [
  {
    icon: Leaf,
    title: "100% Organic Cotton",
    copy: "GOTS-certified long-staple yarns woven without harsh bleaches.",
  },
  {
    icon: Feather,
    title: "Pre-Shrunk Garment Wash",
    copy: "Enzyme tumbled so silhouette proportions remain true after laundering.",
  },
  {
    icon: Shield,
    title: "Reinforced Stress Seams",
    copy: "Double-needle chainstitch shoulders and bar-tacked pocket corners.",
  },
  {
    icon: Award,
    title: "Direct Atelier Pricing",
    copy: "Zero middleman retail markups—honest investment in material quality.",
  },
];

export type ProductBenefitsGridProps = BaseSectionProps;

export function ProductBenefitsGrid({
  subheading = "Design Highlights",
  heading = "Why It Stands Apart",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductBenefitsGridProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-2xl border border-border/80 bg-card p-6">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-accent">
              <Icon className="size-5" />
            </span>
            <h3 className="mt-4 font-display text-base font-bold text-foreground">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
