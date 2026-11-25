import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { type BaseSectionProps } from "../shared";

export type CountdownPromotionalBannerProps = BaseSectionProps & {
  initialSeconds?: number;
  ctaLabel?: string;
  ctaTo?: string;
};

export function CountdownPromotionalBanner({
  subheading = "Limited Release Window",
  heading = "Archive Capsule Ends Soon",
  initialSeconds = 14 * 3600 + 28 * 60 + 42,
  ctaLabel = "Shop Capsule",
  ctaTo = "/collections/best-sellers",
  className = "",
}: CountdownPromotionalBannerProps) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : initialSeconds));
    }, 1000);
    return () => window.clearInterval(id);
  }, [initialSeconds]);

  const hrs = Math.floor(secondsLeft / 3600);
  const min = Math.floor((secondsLeft % 3600) / 60);
  const sec = secondsLeft % 60;

  return (
    <section
      aria-label={heading}
      className={`bg-primary px-5 py-6 text-primary-foreground lg:px-8 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
            {subheading}
          </p>
          <h2 className="mt-0.5 font-display text-xl font-extrabold sm:text-2xl">{heading}</h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center gap-2 font-mono text-lg font-bold tabular-nums">
            {[
              { value: hrs, label: "H" },
              { value: min, label: "M" },
              { value: sec, label: "S" },
            ].map((u) => (
              <span
                key={u.label}
                className="rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5"
              >
                {u.value.toString().padStart(2, "0")}
                <span className="ml-0.5 text-xs text-accent">{u.label}</span>
              </span>
            ))}
          </div>

          <Link
            to={ctaTo}
            className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-5 py-2.5 text-xs font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <span>{ctaLabel}</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
