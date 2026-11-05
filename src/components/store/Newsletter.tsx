import { useState } from "react";
import { Check, Mail } from "lucide-react";

const benefits = ["Exclusive discounts", "Early access to drops", "VIP-only offers"];

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section className="px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-4xl bg-hero-gradient px-7 py-12 text-primary-foreground shadow-card sm:px-12 lg:grid-cols-2">
        <div>
          <span className="grid size-12 place-items-center rounded-2xl bg-accent-gradient text-accent-foreground">
            <Mail className="size-5" />
          </span>
          <h2 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Get exclusive offers &amp; updates
          </h2>
          <p className="mt-3 max-w-md text-sm text-primary-foreground/75">
            Join the list and take 10% off your first order.
          </p>
          <ul className="mt-6 grid gap-2 text-sm">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="size-4 text-accent" /> {b}
              </li>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setDone(true);
          }}
          className="rounded-3xl bg-primary-foreground/8 p-6 backdrop-blur"
        >
          <label
            htmlFor="newsletter-email"
            className="text-xs font-semibold uppercase tracking-widest text-primary-foreground/70"
          >
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-2 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 py-3.5 text-sm text-primary-foreground outline-none placeholder:text-primary-foreground/45 focus:border-accent"
          />
          <button
            type="submit"
            className="mt-3 w-full rounded-full bg-accent-gradient py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5"
          >
            {done ? "You're on the list" : "Subscribe"}
          </button>
          <p className="mt-3 text-center text-[11px] text-primary-foreground/55">
            No spam. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </section>
  );
}
