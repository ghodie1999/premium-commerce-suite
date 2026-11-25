import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, X } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type NewsletterPopupProps = BaseSectionProps;

export function NewsletterPopup({
  subheading = "Studio Dispatch · Opt-In Modal",
  heading = "Early Access & Archive Drops",
  description = "Subscribers receive private early access to numbered editions 24 hours ahead of public launch. Trigger the modal preview below.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: NewsletterPopupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-background p-7 sm:flex-row sm:items-center sm:p-10">
        <div className="max-w-xl">
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Mail className="size-4" /> Preview Newsletter Modal
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Private Studio Dispatch Sign Up"
          className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-xs"
        >
          <div className="relative grid w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl sm:grid-cols-12">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close newsletter modal"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-background/90 text-foreground hover:bg-background"
            >
              <X className="size-4" />
            </button>

            <div className="hidden sm:col-span-5 sm:block">
              <img
                src={PREMIUM_ASSETS.perfume}
                alt="Amber Noir Limited Flacon"
                width={420}
                height={520}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-7 sm:col-span-7 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                Welcome Credit
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold text-foreground">
                Enjoy 10% Off Your First Edition
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Join 42,000+ collectors receiving studio field notes and numbered restock alerts.
              </p>

              {joined ? (
                <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-foreground">
                  <div className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="size-4 text-emerald-600" /> Subscribed ({email})
                  </div>
                  <p className="mt-1 text-muted-foreground">
                    Use code <span className="font-mono font-bold text-primary">WELCOME10</span> at
                    checkout.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    aria-label="Email address for newsletter"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    Unlock 10% Welcome Code
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </PremiumSectionShell>
  );
}
