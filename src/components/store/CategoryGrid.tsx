import { ArrowUpRight } from "lucide-react";
import { categories, collections } from "@/lib/catalog";

export function CategoryGrid() {
  return (
    <section className="px-5 py-12 lg:px-8" id="categories">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            Curated departments
          </p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Shop by Category</h2>
        </header>

        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {categories.map((c) => (
            <li key={c.name}>
              <a
                href="#"
                className="group block overflow-hidden rounded-3xl bg-card shadow-soft transition-shadow hover:shadow-lift"
              >
                <span className="block overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex items-center justify-between px-4 py-4">
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{c.name}</span>
                    <span className="block text-xs text-muted-foreground">{c.items} products</span>
                  </span>
                  <ArrowUpRight className="size-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {collections.map((c) => (
            <li key={c.name}>
              <a href="#" className="group relative block overflow-hidden rounded-3xl shadow-soft">
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  width={800}
                  height={1000}
                  className="aspect-16/10 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/25 to-transparent" />
                <span className="absolute inset-x-6 bottom-6 text-primary-foreground">
                  <span className="font-display block text-xl font-bold">{c.name}</span>
                  <span className="mt-1 block text-xs text-primary-foreground/75">{c.copy}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
