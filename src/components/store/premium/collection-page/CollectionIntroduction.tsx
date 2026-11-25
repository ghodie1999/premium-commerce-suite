import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type CollectionIntroductionProps = BaseSectionProps & {
  curatorNote?: string;
  stats?: { label: string; value: string }[];
};

const DEFAULT_STATS = [
  { label: "Materials", value: "GOTS & Full-Grain" },
  { label: "Dispatch SLA", value: "24 Hours" },
  { label: "Warranty", value: "2-Year Care" },
];

export function CollectionIntroduction({
  subheading = "Collection Note",
  heading = "Designed for Daily Longevity, Measured in Years",
  description = "Every garment and object in this assortment was developed against three criteria: weight without bulk, quiet surface finishing, and repairability over decades of use.",
  curatorNote = "— Studio Curatorial Desk, Autumn/Winter Index",
  stats = DEFAULT_STATS,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: CollectionIntroductionProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid gap-8 border-y border-border py-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl text-balance">
            {heading}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          <p className="mt-4 text-xs font-semibold text-primary">{curatorNote}</p>
        </div>

        <dl className="grid grid-cols-3 gap-4 border-t border-border pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
          {stats.map((item) => (
            <div key={item.label}>
              <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </dt>
              <dd className="mt-1 font-display text-sm font-extrabold text-foreground sm:text-base">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PremiumSectionShell>
  );
}
