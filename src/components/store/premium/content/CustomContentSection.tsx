import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type CustomContentSectionProps = BaseSectionProps & {
  reverseLayout?: boolean;
};

const HIGHLIGHTS = [
  { metric: "450 GSM", detail: "Custom-milled pre-shrunk organic cotton fleece" },
  { metric: "316L Steel", detail: "Marine-grade brushed chronograph housing" },
  { metric: "100% Traceable", detail: "Partner mills certified across Italy, Portugal & Japan" },
];

export function CustomContentSection({
  subheading = "Modular Block Canvas",
  heading = "Built From Traceable European & Japanese Workshops",
  description = "Combine editorial typography, structured proof points, and asymmetrical photography to assemble bespoke campaign stories without custom engineering.",
  reverseLayout = false,
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: CustomContentSectionProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className={`lg:col-span-6 ${reverseLayout ? "lg:order-2" : ""}`}>
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

          <dl className="mt-7 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
            {HIGHLIGHTS.map((item) => (
              <div key={item.metric}>
                <dt className="font-display text-lg font-extrabold text-primary tabular-nums">
                  {item.metric}
                </dt>
                <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {item.detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7">
            <Link
              to="/collections/$slug"
              params={{ slug: "best-sellers" }}
              className="inline-flex items-center gap-2 rounded-full border border-primary bg-background px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Explore Material Archive <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </div>

        <div
          className={`grid grid-cols-2 gap-4 lg:col-span-6 ${reverseLayout ? "lg:order-1" : ""}`}
        >
          <img
            src={PREMIUM_ASSETS.sneakers}
            alt="Calfskin Low Leather Sneakers"
            loading="lazy"
            decoding="async"
            width={520}
            height={680}
            className="aspect-3/4 w-full rounded-2xl object-cover bg-sand"
          />
          <img
            src={PREMIUM_ASSETS.deskLamp}
            alt="Architectural Solid Brass Desk Lamp"
            loading="lazy"
            decoding="async"
            width={520}
            height={680}
            className="mt-6 aspect-3/4 w-full rounded-2xl object-cover bg-sand"
          />
        </div>
      </div>
    </PremiumSectionShell>
  );
}
