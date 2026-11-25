import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type FeaturedBlogArticlesProps = BaseSectionProps;

const ARTICLES = [
  {
    id: "patina-notes",
    tag: "Materials",
    date: "Oct 28, 2026",
    readTime: "5 min read",
    title: "Why Vegetable-Tanned Tuscan Leather Ages Into a Mirror Patina",
    excerpt:
      "Inside Santa Croce sull'Arno's oak-bark drum tanning traditions and how rain, sunlight, and hand oils deepen Cognac Tan over ten years.",
    image: PREMIUM_ASSETS.bag,
    productId: "leather-handbag",
  },
  {
    id: "meca-quartz",
    tag: "Horology",
    date: "Oct 19, 2026",
    readTime: "4 min read",
    title: "Inside the VK64 Hybrid Chronograph Movement",
    excerpt:
      "How a mechanical reset cam marries quartz accuracy with crisp 1/5th-second chronograph pusher feedback.",
    image: PREMIUM_ASSETS.watch,
    productId: "minimalist-chronograph",
  },
  {
    id: "morning-extraction",
    tag: "Rituals",
    date: "Oct 11, 2026",
    readTime: "3 min read",
    title: "Rib Geometry & Water Flow in Hand-Thrown Stoneware Drippers",
    excerpt: "Dialing bloom temperatures and helical pouring rates for clean cup sweetness.",
    image: PREMIUM_ASSETS.mugSet,
    productId: "artisanal-pour-over-set",
  },
];

export function FeaturedBlogArticles({
  subheading = "Studio Journal",
  heading = "Essays on Materials & Craft",
  description = "Long-form dispatches from the tanneries, knitting floors, and acoustic labs behind our catalog.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: FeaturedBlogArticlesProps) {
  const lead = ARTICLES[0]!;
  const rest = ARTICLES.slice(1);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <article className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft lg:col-span-7">
          <div className="overflow-hidden bg-sand">
            <img
              src={lead.image}
              alt={lead.title}
              loading="lazy"
              decoding="async"
              width={900}
              height={540}
              className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-bold uppercase tracking-wider text-accent">{lead.tag}</span>
              <span>&middot;</span>
              <span>{lead.date}</span>
              <span>&middot;</span>
              <span>{lead.readTime}</span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold text-foreground">
              {lead.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lead.excerpt}</p>
            <Link
              to="/products/$id"
              params={{ id: lead.productId }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary hover:text-accent"
            >
              Inspect Featured Piece <ArrowUpRight className="size-3.5" />
            </Link>
          </div>
        </article>

        <div className="grid gap-6 lg:col-span-5">
          {rest.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-soft sm:flex-row sm:items-center sm:gap-5"
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                decoding="async"
                width={320}
                height={320}
                className="aspect-square w-full rounded-2xl object-cover sm:size-32 sm:shrink-0"
              />
              <div className="mt-4 sm:mt-0">
                <p className="text-[11px] font-bold uppercase tracking-wider text-accent">
                  {post.tag} · {post.readTime}
                </p>
                <h3 className="mt-1 font-display text-base font-extrabold text-foreground">
                  {post.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>
                <Link
                  to="/products/$id"
                  params={{ id: post.productId }}
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-accent"
                >
                  View Piece <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
