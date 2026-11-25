import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const STAGES = [
  {
    step: "01. Sourcing",
    title: "Long-staple organic fibers",
    copy: "Harvested without synthetic defoliants and spun for natural strength.",
    image: PREMIUM_ASSETS.hoodie,
  },
  {
    step: "02. Patterning",
    title: "Ergonomic block cutting",
    copy: "Articulated seams tested across real posture and movement ranges.",
    image: PREMIUM_ASSETS.bag,
  },
  {
    step: "03. Finishing",
    title: "Edge-painted hardware",
    copy: "Three-coat hand edge sealing and brushed PVD metal clasps.",
    image: PREMIUM_ASSETS.watch,
  },
  {
    step: "04. Inspection",
    title: "Batch numbered audit",
    copy: "Every piece clears a 14-point tactile and stitch verification.",
    image: PREMIUM_ASSETS.sneakers,
  },
];

export type CraftsmanshipAndProcessProps = BaseSectionProps;

export function CraftsmanshipAndProcess({
  subheading = "Workshop Notes",
  heading = "Craftsmanship & Production Process",
  description = "Four deliberate stages between raw harvest and your doorstep.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: CraftsmanshipAndProcessProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage) => (
          <article key={stage.step} className="group flex flex-col">
            <div className="overflow-hidden rounded-2xl bg-sand border border-border/70">
              <img
                src={stage.image}
                alt={stage.title}
                loading="lazy"
                decoding="async"
                width={420}
                height={320}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-4 font-mono text-xs font-semibold text-accent">{stage.step}</p>
            <h3 className="mt-1 font-display text-base font-bold text-foreground">{stage.title}</h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{stage.copy}</p>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
