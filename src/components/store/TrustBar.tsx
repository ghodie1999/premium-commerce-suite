import { Award, Headphones, RefreshCcw, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: Truck, title: "Free Shipping", copy: "On all orders over $100" },
  { icon: RefreshCcw, title: "30-Day Returns", copy: "No questions asked" },
  { icon: Award, title: "100% Authentic", copy: "Verified sourcing" },
  { icon: ShieldCheck, title: "Secure Payments", copy: "Encrypted checkout" },
  { icon: Headphones, title: "24/7 Support", copy: "Real humans, fast" },
];

export function TrustBar() {
  return (
    <section className="px-5 py-6 lg:px-8">
      <ul className="mx-auto grid max-w-7xl gap-3 rounded-3xl bg-sand-gradient p-4 sm:grid-cols-2 lg:grid-cols-5">
        {items.map(({ icon: Icon, title, copy }) => (
          <li
            key={title}
            className="hover-lift flex items-center gap-3 rounded-2xl bg-card/70 px-4 py-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/8 text-accent">
              <Icon className="size-4.5" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold">{title}</span>
              <span className="block text-xs text-muted-foreground">{copy}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
