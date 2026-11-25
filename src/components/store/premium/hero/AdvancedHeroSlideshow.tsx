import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { PREMIUM_ASSETS, type BaseSectionProps } from "../shared";

export type HeroSlide = {
  eyebrow: string;
  title: string;
  copy: string;
  ctaLabel: string;
  ctaTo: string;
  image: string;
  imageAlt: string;
};

const defaultSlides: HeroSlide[] = [
  {
    eyebrow: "Chapter 01 · Leather Goods",
    title: "Structured Italian Tote",
    copy: "Full-grain saddle leather shaped with architectural precision and solid brass hardware.",
    ctaLabel: "Shop Leatherwear",
    ctaTo: "/collections/women",
    image: PREMIUM_ASSETS.women,
    imageAlt: "Structured tote carryall in sunlit editorial frame",
  },
  {
    eyebrow: "Chapter 02 · Acoustic Craft",
    title: "Studio Master Wireless",
    copy: "CNC-milled aluminum cups paired with 40-hour endurance and neutral reference tuning.",
    ctaLabel: "Explore Electronics",
    ctaTo: "/collections/electronics",
    image: PREMIUM_ASSETS.tech,
    imageAlt: "Minimalist reference headphones on stone backdrop",
  },
  {
    eyebrow: "Chapter 03 · Living Spaces",
    title: "Sculptural Brass & Stoneware",
    copy: "Tactile desk lamps and stoneware pour-over vessels designed to anchor quiet routines.",
    ctaLabel: "Shop Home & Living",
    ctaTo: "/collections/home-living",
    image: PREMIUM_ASSETS.home,
    imageAlt: "Architectural ceramic vessels and warm lighting",
  },
];

export type AdvancedHeroSlideshowProps = BaseSectionProps & {
  slides?: HeroSlide[];
  autoplay?: boolean;
  intervalMs?: number;
};

export function AdvancedHeroSlideshow({
  slides = defaultSlides,
  autoplay = true,
  intervalMs = 5500,
  fullWidth = false,
  className = "",
}: AdvancedHeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  useEffect(() => {
    if (!isPlaying || slides.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((curr) => (curr + 1) % slides.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [isPlaying, intervalMs, slides.length]);

  const current = slides[index] ?? slides[0]!;
  const prev = () => setIndex((curr) => (curr - 1 + slides.length) % slides.length);
  const next = () => setIndex((curr) => (curr + 1) % slides.length);

  return (
    <section
      aria-label="Featured seasonal slideshow"
      className={`${fullWidth ? "" : "mx-auto max-w-7xl px-5 py-6 lg:px-8"} ${className}`}
    >
      <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground shadow-card">
        <div className="grid min-h-[480px] lg:grid-cols-12">
          <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                {current.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl text-balance">
                {current.title}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-primary-foreground/75">
                {current.copy}
              </p>
              <div className="mt-7">
                <Link
                  to={current.ctaTo}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                >
                  {current.ctaLabel}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-between border-t border-primary-foreground/15 pt-5">
              <div className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    aria-label={`Go to slide ${i + 1}: ${s.title}`}
                    aria-pressed={i === index}
                    onClick={() => setIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === index
                        ? "w-8 bg-accent"
                        : "w-3 bg-primary-foreground/30 hover:bg-primary-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                  onClick={() => setIsPlaying((p) => !p)}
                  className="grid size-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  {isPlaying ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                </button>
                <button
                  type="button"
                  aria-label="Previous slide"
                  onClick={prev}
                  className="grid size-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next slide"
                  onClick={next}
                  className="grid size-9 place-items-center rounded-full border border-primary-foreground/20 hover:bg-primary-foreground/10 transition-colors"
                >
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-sand lg:col-span-7">
            <img
              key={current.image}
              src={current.image}
              alt={current.imageAlt}
              loading="lazy"
              decoding="async"
              width={960}
              height={640}
              className="h-full w-full object-cover transition-opacity duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
