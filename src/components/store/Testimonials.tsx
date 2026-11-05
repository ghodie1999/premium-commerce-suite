import { BadgeCheck, Star } from "lucide-react";
import { testimonials } from "@/lib/catalog";

export function Testimonials() {
  return (
    <section className="px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            40,000+ happy customers
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Loved for the details</h2>
        </header>

        <ul className="grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="hover-lift rounded-3xl bg-card p-7 shadow-soft">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
                  {t.name.charAt(0)}
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <BadgeCheck className="size-3.5 text-success" /> {t.role}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
