import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { PREMIUM_ASSETS, type BaseSectionProps } from "../shared";

export type VideoBackgroundHeroProps = BaseSectionProps & {
  ctaLabel?: string;
  ctaTo?: string;
  posterImage?: string;
  posterAlt?: string;
  runtimeLabel?: string;
};

export function VideoBackgroundHero({
  subheading = "Atelier Film · Kyoto & Lisbon",
  heading = "Craft in continuous motion.",
  description = "Step inside our small-batch garment and leather workshops where raw material meets measured restraint.",
  ctaLabel = "Watch & Shop Drop",
  ctaTo = "/collections/trending-now",
  posterImage = PREMIUM_ASSETS.men,
  posterAlt = "Lookbook motion frame featuring heavyweight fleece outerwear",
  runtimeLabel = "01:42 · Atelier Reel",
  className = "",
}: VideoBackgroundHeroProps) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  return (
    <section
      aria-label={heading}
      className={`relative overflow-hidden bg-black text-white ${className}`}
    >
      <div className="relative flex min-h-[520px] items-center justify-center px-5 py-20 lg:min-h-[600px] lg:px-8">
        <img
          src={posterImage}
          alt={posterAlt}
          loading="lazy"
          decoding="async"
          width={1440}
          height={810}
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[4000ms] ease-out ${
            playing ? "scale-105 opacity-70" : "scale-100 opacity-55"
          }`}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75"
        />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">{subheading}</p>
          <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl text-balance">
            {heading}
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to={ctaTo}
              className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5 whitespace-nowrap"
            >
              {ctaLabel}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-5 py-3.5 text-xs font-semibold backdrop-blur-sm transition-colors hover:bg-white/20 whitespace-nowrap"
            >
              {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              <span>{playing ? "Pause Reel" : "Play Reel"}</span>
            </button>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-5 z-10 mx-auto flex max-w-7xl items-center justify-between text-xs text-white/75 lg:px-3">
          <span className="font-mono">{runtimeLabel}</span>
          <button
            type="button"
            aria-label={muted ? "Unmute ambient audio" : "Mute ambient audio"}
            onClick={() => setMuted((m) => !m)}
            className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/40 px-3 py-1.5 backdrop-blur-sm hover:bg-black/60 transition-colors"
          >
            {muted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
            <span>{muted ? "Muted" : "Sound On"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
