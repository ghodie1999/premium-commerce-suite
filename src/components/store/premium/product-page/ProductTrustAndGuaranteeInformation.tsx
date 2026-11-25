import { Lock, RotateCcw, ShieldCheck, Wrench } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: "Authenticity Certificate",
    body: "Batch-verified materials direct from our partner mills.",
  },
  {
    icon: Wrench,
    title: "Lifetime Hardware Care",
    body: "Complimentary brass snap, zipper, and clasp servicing.",
  },
  {
    icon: RotateCcw,
    title: "30-Day Home Trial",
    body: "Free return pickup or prepaid label on unworn pieces.",
  },
  {
    icon: Lock,
    title: "256-Bit Encrypted Checkout",
    body: "Protected checkout across Apple Pay, cards, and Klarna.",
  },
];

export type ProductTrustAndGuaranteeInformationProps = BaseSectionProps;

export function ProductTrustAndGuaranteeInformation({
  subheading = "ShopEase Assurance",
  heading = "Built to Stand Behind Every Order",
  surface = "primary",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductTrustAndGuaranteeInformationProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} dark={surface === "primary"} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {GUARANTEES.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl border border-current/15 bg-white/5 p-5">
            <Icon className="size-5 text-accent" />
            <h3 className="mt-3 font-display text-sm font-bold">{title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed opacity-75">{body}</p>
          </div>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
