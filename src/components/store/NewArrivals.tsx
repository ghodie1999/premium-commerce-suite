import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { products } from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

const filters = ["Newest", "Popular", "Best Selling", "Luxury Collection"] as const;

export function NewArrivals() {
  const [active, setActive] = useState<string>(filters[0]);

  const sorted = [...products].sort((a, b) => {
    if (active === "Popular") return b.reviews - a.reviews;
    if (active === "Best Selling") return b.rating - a.rating;
    if (active === "Luxury Collection") return b.price - a.price;
    return 0;
  });

  return (
    <section className="px-5 py-12 lg:px-8" id="new-arrivals">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Just landed</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl text-foreground">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <span>View all products</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </header>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActive(f)}
              aria-pressed={active === f}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                active === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-sand-deep border border-border"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
