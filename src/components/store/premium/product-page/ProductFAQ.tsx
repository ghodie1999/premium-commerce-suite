import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const QA = [
  {
    q: "Does this silhouette fit true to size?",
    a: "Yes. We cut our studio silhouettes with subtle relaxed ease across the chest and shoulder. Take your normal size for intended drape, or size down for a closer fit.",
  },
  {
    q: "How should I launder garment-dyed organic cotton?",
    a: "Machine wash cold on a gentle cycle inside-out with mild pH-neutral detergent. Lay flat on a towel or dry on low air to maintain rib tension.",
  },
  {
    q: "What if the size I need is temporarily out of stock?",
    a: "Small-batch restocks arrive every 21 days. Join our Dispatch list or contact concierge@shopease.com to reserve an allocation.",
  },
];

export type ProductFAQProps = BaseSectionProps;

export function ProductFAQ({
  subheading = "Questions Answered",
  heading = "Product Care & Sizing FAQ",
  surface = "sand",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeaderBlock subheading={subheading} heading={heading} align="center" />

        <div className="mt-8 space-y-3">
          {QA.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={item.q} className="rounded-2xl border border-border bg-card px-5 py-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left font-display text-sm font-bold text-foreground"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <Minus className="size-4 shrink-0 text-accent" />
                  ) : (
                    <Plus className="size-4 shrink-0 text-muted-foreground" />
                  )}
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{item.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
