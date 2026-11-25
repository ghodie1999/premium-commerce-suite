import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

type JournalItem = {
  id: string;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  body: string;
  image: string;
};

const ARTICLES: JournalItem[] = [
  {
    id: "textile-weight",
    category: "Materials",
    readTime: "4 min read",
    title: "Why 480GSM loop-back fleece drapes differently",
    excerpt:
      "Understanding yarn twist, enzyme washing, and collar ribbing retention over 100+ wears.",
    body: "Heavyweight jersey feels structured without stiffness when knit with combed long-staple ring-spun yarns. Pre-washing before cutting eliminates post-purchase shrinkage.",
    image: PREMIUM_ASSETS.hoodie,
  },
  {
    id: "desk-ergonomics",
    category: "Interiors",
    readTime: "3 min read",
    title: "Warm task illumination for calmer evening focus",
    excerpt:
      "Pairing high-CRI 2700K directional optics with matte anodized surfaces to reduce screen glare.",
    body: "Harsh overhead LEDs flatten workspace depth. A counterweighted brass pivot lamp casts an even pool across notebooks while preserving peripheral calm.",
    image: PREMIUM_ASSETS.deskLamp,
  },
  {
    id: "botanical-sourcing",
    category: "Apothecary",
    readTime: "5 min read",
    title: "Cold-pressed bergamot & Atlas cedarwood harvests",
    excerpt:
      "Traceable small-batch maceration techniques that yield 8+ hours of balanced skin projection.",
    body: "Rather than synthetic fixatives, our Grasse perfumers rest oils for six weeks in dark stone vessels so top notes transition seamlessly into resinous base woods.",
    image: PREMIUM_ASSETS.perfume,
  },
];

export type JournalHighlightsProps = BaseSectionProps;

export function JournalHighlights({
  subheading = "The Atelier Journal",
  heading = "Notes on Craft & Living",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: JournalHighlightsProps) {
  const [selected, setSelected] = useState<JournalItem | null>(null);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {ARTICLES.map((article) => (
          <article
            key={article.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card"
          >
            <div className="aspect-16/10 overflow-hidden bg-sand">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                decoding="async"
                width={540}
                height={340}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-semibold text-accent">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="mt-2 font-display text-base font-bold leading-snug text-foreground">
                {article.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
              <button
                type="button"
                onClick={() => setSelected(article)}
                className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-bold text-primary hover:text-accent transition-colors self-start"
              >
                <span>Read Note</span>
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          />
          <div className="relative z-10 max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-accent">
                  {selected.category} · {selected.readTime}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  {selected.title}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close journal article"
                onClick={() => setSelected(null)}
                className="grid size-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{selected.body}</p>
          </div>
        </div>
      )}
    </PremiumSectionShell>
  );
}
