import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type EditorialQuoteProps = BaseSectionProps & {
  quote?: string;
  author?: string;
  role?: string;
};

export function EditorialQuote({
  quote = "True utility reveals itself five years after purchase — when the leather softens, the cotton holds its shoulder line, and the object still earns its space on your table.",
  author = "Clara Vance",
  role = "Creative Director, ShopEase Atelier",
  surface = "sand",
  spacing = "spacious",
  fullWidth = false,
  className = "",
}: EditorialQuoteProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Editorial statement"
      className={className}
    >
      <figure className="mx-auto max-w-3xl border-y border-border/80 py-10 text-center">
        <blockquote className="font-display text-xl font-bold leading-snug tracking-tight sm:text-3xl text-balance">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <figcaption className="mt-5 text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">{author}</span>
          <span aria-hidden="true"> · </span>
          <span>{role}</span>
        </figcaption>
      </figure>
    </PremiumSectionShell>
  );
}
