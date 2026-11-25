import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy, Sparkles, X } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type PromotionalPopupProps = BaseSectionProps & {
  promoCode?: string;
};

export function PromotionalPopup({
  promoCode = "ARCHIVE20",
  subheading = "Seasonal Conversion Modal",
  heading = "Private Vault Event Offer",
  description = "A tactile promotional modal with click-to-copy discount code and direct collection routing.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: PromotionalPopupProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="flex flex-col justify-between gap-6 rounded-3xl border border-border bg-card p-7 sm:flex-row sm:items-center sm:p-10">
        <div className="max-w-xl">
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]"
        >
          <Sparkles className="size-4" /> Launch Offer Popup
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Seasonal Promotional Offer"
          className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-primary text-primary-foreground shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close promotional modal"
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-black/35 text-white hover:bg-black/55"
            >
              <X className="size-4" />
            </button>

            <img
              src={PREMIUM_ASSETS.watch}
              alt="Atelier Chronograph Promotional Showcase"
              width={640}
              height={320}
              className="h-44 w-full object-cover"
            />

            <div className="p-7 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-accent">
                48-Hour Studio Privilege
              </p>
              <h3 className="mt-2 font-display text-2xl font-extrabold">
                Take 20% Off Orders Above $180
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-primary-foreground/75">
                Valid across Heavyweight French Terry, Tuscan Leather, and Atelier Timepieces.
              </p>

              <div className="mt-5 flex items-center justify-center gap-2">
                <span className="rounded-xl border border-primary-foreground/25 bg-black/25 px-4 py-2 font-mono text-sm font-bold tracking-widest">
                  {promoCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-4 py-2 text-xs font-bold text-accent-foreground"
                >
                  {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>

              <div className="mt-5">
                <Link
                  to="/collections/$slug"
                  params={{ slug: "best-sellers" }}
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full bg-card px-6 py-2.5 text-xs font-bold text-foreground hover:bg-sand"
                >
                  Shop Eligible Pieces
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </PremiumSectionShell>
  );
}
