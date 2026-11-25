import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ALIGN_MAP, PremiumSectionShell, type BaseSectionProps } from "../shared";

export type RichTextEditorialSectionProps = BaseSectionProps & {
  primaryCtaLabel?: string;
  collectionSlug?: string;
};

export function RichTextEditorialSection({
  subheading = "Studio Manifesto",
  heading = "Fewer Things, Held Longer.",
  description = "We reject seasonal landfill churn in favor of architectural everyday objects: dense organic textiles, honest vegetable-tanned leathers, solid brass pivots, and optical glass designed to stay in rotation for a decade.",
  primaryCtaLabel = "Browse Permanent Archive",
  collectionSlug = "all",
  surface = "sand",
  spacing = "spacious",
  align = "center",
  fullWidth = false,
  className = "",
}: RichTextEditorialSectionProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className={`flex max-w-3xl flex-col ${ALIGN_MAP[align]}`}>
        {subheading && (
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-accent">{subheading}</p>
        )}
        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl text-balance">
          {heading}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
        <div className="mt-8">
          <Link
            to="/collections/$slug"
            params={{ slug: collectionSlug }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {primaryCtaLabel} <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
