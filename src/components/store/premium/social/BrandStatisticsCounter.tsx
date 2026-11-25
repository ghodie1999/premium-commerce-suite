import { useEffect, useRef, useState } from "react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const STATS = [
  { target: 40000, suffix: "+", label: "Collectors Served Globally" },
  { target: 98, suffix: "%", label: "Plastic-Free Packaging" },
  { target: 52, suffix: "", label: "Countries Shipped Weekly" },
  { target: 24, suffix: "h", label: "Average Atelier Dispatch" },
];

export type BrandStatisticsCounterProps = BaseSectionProps;

export function BrandStatisticsCounter({
  subheading = "Verified Impact",
  heading = "Measured Commitment Across Every Parcel",
  surface = "primary",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: BrandStatisticsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setProgress(0);

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          const start = performance.now();
          const tick = (now: number) => {
            const pct = Math.min(1, (now - start) / 700);
            setProgress(pct);
            if (pct < 1) window.requestAnimationFrame(tick);
          };
          window.requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div ref={ref}>
        <SectionHeaderBlock
          subheading={subheading}
          heading={heading}
          dark={surface === "primary"}
        />
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-current/15 pt-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="text-xs opacity-75">{stat.label}</dt>
              <dd className="mt-2 font-display text-4xl font-black tabular-nums text-accent sm:text-5xl">
                {Math.round(stat.target * progress).toLocaleString()}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </PremiumSectionShell>
  );
}
