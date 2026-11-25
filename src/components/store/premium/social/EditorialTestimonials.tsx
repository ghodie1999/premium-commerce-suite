import { testimonials } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type EditorialTestimonialsProps = BaseSectionProps;

export function EditorialTestimonials({
  subheading = "Client Perspectives",
  heading = "Architectural Proof in Practice",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: EditorialTestimonialsProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-10 grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {testimonials.map((t, idx) => (
          <blockquote
            key={t.name}
            className="flex flex-col justify-between py-6 md:px-7 md:first:pl-0 md:last:pr-0"
          >
            <div>
              <span className="font-mono text-xs text-accent">0{idx + 1}.</span>
              <p className="mt-3 font-display text-lg font-semibold leading-snug text-foreground">
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>
            <footer className="mt-6 text-xs text-muted-foreground">
              <strong className="font-semibold text-foreground">{t.name}</strong>
              <span aria-hidden="true"> · </span>
              <span>{t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
