import { useEffect, useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import watch from "@/assets/deal-watch.jpg";
import { formatPrice } from "@/lib/catalog";

const DEAL_SECONDS = 8 * 3600 + 42 * 60 + 15;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function DealOfDay() {
  const [left, setLeft] = useState(DEAL_SECONDS);

  useEffect(() => {
    const id = window.setInterval(() => {
      setLeft((s) => (s > 0 ? s - 1 : DEAL_SECONDS));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { label: "Hrs", value: Math.floor(left / 3600) },
    { label: "Min", value: Math.floor((left % 3600) / 60) },
    { label: "Sec", value: left % 60 },
  ];

  return (
    <section className="px-5 py-12 lg:px-8" id="deal">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-4xl bg-sand-gradient px-7 py-10 shadow-soft sm:px-12 lg:grid-cols-2">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accent/12 px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
            <Flame className="size-3.5" /> Deal of the day
          </p>
          <h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">
            Grab it before
            <span className="block">it&apos;s gone.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Smart Watch Pro — fitness and health tracking with a 7-day battery. Only a handful left
            at this price.
          </p>

          <div className="mt-6 flex items-end gap-3">
            <span className="font-display text-3xl font-extrabold text-accent">
              {formatPrice(59.99)}
            </span>
            <span className="pb-1 text-sm text-muted-foreground line-through">
              {formatPrice(119.99)}
            </span>
            <span className="mb-1 rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
              −50%
            </span>
          </div>

          <div className="mt-5 max-w-xs">
            <div className="mb-2 flex justify-between text-xs font-medium">
              <span>Only 23 items left</span>
              <span className="text-muted-foreground">77% claimed</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-card">
              <div className="h-full w-[77%] rounded-full bg-accent-gradient" />
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {units.map((u) => (
              <div
                key={u.label}
                className="grid w-16 place-items-center rounded-2xl bg-card px-2 py-2.5 shadow-soft"
              >
                <span className="font-display text-lg font-extrabold tabular-nums">
                  {pad(u.value)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {u.label}
                </span>
              </div>
            ))}
            <a
              href="#new-arrivals"
              className="group ml-1 inline-flex items-center gap-2 rounded-full bg-accent-gradient px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5"
            >
              Shop the deal
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="rounded-3xl bg-card p-6 shadow-card">
          <img
            src={watch}
            alt="Smart Watch Pro with fitness tracking display"
            loading="lazy"
            width={1000}
            height={1000}
            className="mx-auto w-full max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
}
