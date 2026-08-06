import { ArrowRight, Globe, Lock, Sparkles, Truck } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

const features = [
  { icon: Truck, label: "Free Shipping", sub: "Orders over $100" },
  { icon: Sparkles, label: "Premium Quality", sub: "100% authentic" },
  { icon: Lock, label: "Secure Checkout", sub: "PCI compliant" },
  { icon: Globe, label: "Worldwide", sub: "2–5 day delivery" },
];

export function Hero() {
  return (
    <section className="px-5 pb-6 pt-2 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-4xl bg-hero-gradient shadow-card">
        <div className="grid items-center gap-10 px-7 py-12 sm:px-12 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:py-16">
          <div className="reveal-up text-primary-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-widest">
              Limited time only
            </span>
            <h1 className="mt-6 text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">
              Shop Smarter.
              <span className="block bg-accent-gradient bg-clip-text text-transparent">
                Live Better.
              </span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-primary-foreground/75">
              Discover premium products curated for modern living — considered
              materials, honest pricing, delivered fast.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#new-arrivals"
                className="group inline-flex items-center gap-2 rounded-full bg-accent-gradient px-7 py-3.5 text-sm font-bold text-accent-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Shop Collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#deal"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Explore Deals
              </a>
            </div>

            <ul className="mt-10 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {features.map(({ icon: Icon, label, sub }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10">
                    <Icon className="size-4.5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block text-sm font-semibold">{label}</span>
                    <span className="block text-xs text-primary-foreground/60">{sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Cream leather tote bag, white sneakers and an olive vase on beige pedestals"
              width={1200}
              height={1008}
              className="w-full rounded-3xl object-cover"
            />
            <div className="absolute -left-2 top-6 grid size-24 place-items-center rounded-full bg-accent-gradient text-center text-accent-foreground shadow-lift sm:size-28">
              <span className="font-display text-xl font-extrabold leading-none sm:text-2xl">
                50%
                <span className="mt-1 block text-[10px] font-semibold tracking-widest">
                  UP TO OFF
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
