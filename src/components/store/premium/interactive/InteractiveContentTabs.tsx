import { useState } from "react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const CONTENT_TABS = [
  {
    id: "provenance",
    label: "01. Origin & Mills",
    title: "Single-mill organic yarns & heritage hides",
    copy: "We work directly with family-operated workshops across Porto, Vicenza, and Kyoto—removing traditional wholesale markups while guaranteeing living wages.",
    image: PREMIUM_ASSETS.hoodie,
  },
  {
    id: "testing",
    label: "02. Endurance Lab",
    title: "Tested past 50,000 flex & wash cycles",
    copy: "Every zipper teeth track, brass clasp spring, and seam allowance undergoes mechanical stress cycles prior to batch sign-off.",
    image: PREMIUM_ASSETS.watch,
  },
  {
    id: "packaging",
    label: "03. Circular Delivery",
    title: "FSC cotton dust bags & soy-ink mailers",
    copy: "98% of outer cartons and inner cushioning are home-compostable or crafted from recycled post-consumer linen pulp.",
    image: PREMIUM_ASSETS.bag,
  },
];

export type InteractiveContentTabsProps = BaseSectionProps;

export function InteractiveContentTabs({
  subheading = "Atelier Standards",
  heading = "Inside Every Release",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: InteractiveContentTabsProps) {
  const [active, setActive] = useState(CONTENT_TABS[0]!.id);
  const current = CONTENT_TABS.find((t) => t.id === active) ?? CONTENT_TABS[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid items-center gap-8 lg:grid-cols-12">
        <div className="space-y-2 lg:col-span-5">
          {CONTENT_TABS.map((tab) => {
            const isSelected = tab.id === active;
            return (
              <button
                key={tab.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActive(tab.id)}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground hover:bg-secondary/60"
                }`}
              >
                <span className="font-mono text-xs font-bold text-accent">{tab.label}</span>
                <h3 className="mt-1 font-display text-base font-bold">{tab.title}</h3>
                {isSelected && (
                  <p className="mt-2 text-xs leading-relaxed opacity-85">{tab.copy}</p>
                )}
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-sand lg:col-span-7">
          <img
            src={current.image}
            alt={current.title}
            loading="lazy"
            decoding="async"
            width={760}
            height={540}
            className="aspect-4/3 w-full object-cover"
          />
        </div>
      </div>
    </PremiumSectionShell>
  );
}
