import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

const INTERESTS = ["Womenswear", "Menswear", "Home & Living", "Audio & Desk"] as const;

export type PremiumNewsletterPromotionProps = BaseSectionProps;

export function PremiumNewsletterPromotion({
  subheading = "Atelier Dispatch",
  heading = "Receive private restock notes & early release keys",
  description = "Curated twice monthly with fabric stories and collector previews. Zero daily blasts.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: PremiumNewsletterPromotionProps) {
  const [interest, setInterest] = useState<string>(INTERESTS[0]);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="border-y border-border py-10">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
            <h2 className="mt-2 font-display text-2xl font-extrabold sm:text-3xl text-balance">
              {heading}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{description}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setSubmitted(true);
            }}
            className="space-y-3 lg:col-span-6"
          >
            <div className="flex flex-wrap gap-1.5">
              {INTERESTS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={interest === item}
                  onClick={() => setInterest(item)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    interest === item
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary/60 text-foreground hover:bg-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address for atelier dispatch"
                className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent-gradient px-6 py-3 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                {submitted ? (
                  <>
                    <Check className="size-4" />
                    <span>Subscribed ({interest})</span>
                  </>
                ) : (
                  <>
                    <span>Join Dispatch</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
