import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type RelatedBlogArticlesProps = BaseSectionProps;

const RELATED = [
  {
    id: "optical-mineral-glass",
    category: "Optical Care",
    title: "Mineral Glass vs Polymer Lenses Under Coastal Sunlight",
    readTime: "4 min read",
    image: PREMIUM_ASSETS.sunglasses,
    productId: "riviera-sunglasses",
  },
  {
    id: "450gsm-terry",
    category: "Textile Engineering",
    title: "Why Heavyweight French Terry Holds Architectural Shoulder Lines",
    readTime: "6 min read",
    image: PREMIUM_ASSETS.hoodie,
    productId: "essential-hoodie",
  },
  {
    id: "neutral-acoustics",
    category: "Acoustics",
    title: "Tuning 45mm Neodymium Drivers for Zero Listener Fatigue",
    readTime: "5 min read",
    image: PREMIUM_ASSETS.headphones,
    productId: "studio-master-headphones",
  },
];

export function RelatedBlogArticles({
  subheading = "Further Reading",
  heading = "Related Studio Dispatches",
  description = "Continue exploring material science, textile care, and industrial engineering notes.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: RelatedBlogArticlesProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {RELATED.map((article) => (
          <article key={article.id} className="group flex flex-col">
            <div className="overflow-hidden rounded-2xl bg-sand">
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                decoding="async"
                width={640}
                height={480}
                className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-accent">
              {article.category} · {article.readTime}
            </p>
            <h3 className="mt-1 font-display text-base font-extrabold leading-snug text-foreground">
              {article.title}
            </h3>
            <Link
              to="/products/$id"
              params={{ id: article.productId }}
              className="mt-auto pt-3 inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent"
            >
              Read & Inspect Object <ArrowRight className="size-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
