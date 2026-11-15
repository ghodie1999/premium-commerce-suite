import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ArrowUpRight } from "lucide-react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SectionReveal({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight * 0.92;
    if (alreadyInView) {
      setVisible(true);
      return;
    }

    setArmed(true);
    setVisible(false);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -36px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motionStyle = armed
    ? {
        transitionDelay: `${delayMs}ms`,
        transform: visible
          ? "translate3d(0, 0, 0) scale(1)"
          : "translate3d(0, 28px, 0) scale(0.985)",
        opacity: visible ? 1 : 0,
      }
    : undefined;

  return (
    <div ref={ref} style={motionStyle} className={`section-motion-ease ${className}`}>
      {children}
    </div>
  );
}

export function ParallaxFrame({
  children,
  className = "",
  intensity = 22,
  enableTilt = true,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
  enableTilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const normalized = Math.max(
        -1,
        Math.min(1, (elementCenter - viewportCenter) / window.innerHeight),
      );
      setScrollYOffset(normalized * intensity);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [intensity]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enableTilt || e.pointerType === "touch" || prefersReducedMotion()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: Number((-y * 3).toFixed(2)),
      ry: Number((x * 3).toFixed(2)),
    });
  };

  const resetTilt = () => {
    if (tilt.rx !== 0 || tilt.ry !== 0) {
      setTilt({ rx: 0, ry: 0 });
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
      style={{
        transform: `perspective(1200px) translate3d(0, ${scrollYOffset.toFixed(1)}px, 0) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition:
          tilt.rx === 0 && tilt.ry === 0
            ? "transform 350ms cubic-bezier(0.16, 1, 0.3, 1)"
            : "transform 90ms linear",
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}

const bridgeLinks = [
  { label: "Women's Collection", slug: "women" },
  { label: "Men's Collection", slug: "men" },
  { label: "Home & Living", slug: "home-living" },
  { label: "Beauty & Fragrance", slug: "beauty" },
  { label: "Audio & Tech", slug: "electronics" },
  { label: "Accessories", slug: "accessories" },
];

export function KineticCollectionBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shiftX, setShiftX] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const progress = Math.max(
        -0.5,
        Math.min(1.5, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)),
      );
      setShiftX((progress - 0.5) * -90);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Explore store departments"
      className="my-4 overflow-hidden border-y border-border/70 bg-sand/35 py-3.5 select-none"
    >
      <div
        style={{ transform: `translate3d(${shiftX.toFixed(1)}px, 0, 0)` }}
        className="mx-auto flex w-max items-center gap-6 px-6 will-change-transform"
      >
        {[...bridgeLinks, ...bridgeLinks].map((item, idx) => (
          <div key={`${item.slug}-${idx}`} className="flex items-center gap-6">
            <Link
              to="/collections/$slug"
              params={{ slug: item.slug }}
              className="group inline-flex items-center gap-1.5 font-display text-xs font-bold text-foreground/80 transition-colors hover:text-accent whitespace-nowrap"
            >
              <span>{item.label}</span>
              <ArrowUpRight className="size-3.5 text-accent/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
            </Link>
            <span aria-hidden="true" className="text-muted-foreground/40 text-xs">
              ·
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export type SectionNavItem = {
  id: string;
  label: string;
};

export function ScrollSectionRail({ sections }: { sections: SectionNavItem[] }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    let rafId = 0;

    const updateProgress = () => {
      rafId = 0;
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? Math.max(0, Math.min(1, scrollTop / maxScroll)) : 0;
      setScrollProgress(ratio);

      const probeY = scrollTop + window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const node = document.getElementById(section.id);
        if (node && node.offsetTop <= probeY) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [sections]);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  const activeIndex = Math.max(
    0,
    sections.findIndex((s) => s.id === activeId),
  );
  const nextSection = sections[activeIndex + 1];

  return (
    <>
      {/* Continuous Hairline Scroll Progress Bar */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-55 h-0.5 bg-transparent"
      >
        <div
          style={{ transform: `scaleX(${scrollProgress})` }}
          className="h-full w-full origin-left bg-accent-gradient will-change-transform"
        />
      </div>

      {/* Interactive Desktop Section Navigator */}
      <nav
        aria-label="Page sections"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-1.5 rounded-2xl border border-border/70 bg-card/85 p-2 shadow-soft backdrop-blur-md xl:flex"
      >
        {sections.map((section) => {
          const isActive = section.id === activeId;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollToSection(section.id)}
              aria-current={isActive ? "true" : undefined}
              className={`group flex items-center gap-2 rounded-xl px-2.5 py-1.5 text-right text-[11px] font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-sand/60 hover:text-foreground"
              }`}
            >
              <span className="whitespace-nowrap">{section.label}</span>
            </button>
          );
        })}

        <div className="mt-1 flex w-full items-center justify-end gap-1 border-t border-border/60 pt-1.5">
          {nextSection ? (
            <button
              type="button"
              aria-label={`Jump to ${nextSection.label}`}
              onClick={() => scrollToSection(nextSection.id)}
              className="inline-flex w-full items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-semibold text-accent transition-colors hover:bg-sand/70"
            >
              <span>Next</span>
              <ArrowDown className="size-3" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Back to top"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: prefersReducedMotion() ? "auto" : "smooth",
                })
              }
              className="inline-flex w-full items-center justify-center gap-1 rounded-xl px-2 py-1 text-[11px] font-semibold text-accent transition-colors hover:bg-sand/70"
            >
              <span>Top</span>
              <ArrowUp className="size-3" />
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
