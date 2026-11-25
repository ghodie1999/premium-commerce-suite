import { Globe, RotateCcw, Truck } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

const SHIPPING_ZONES = [
  { region: "North America", speed: "2–3 business days", threshold: "Free over $100" },
  { region: "Europe & UK", speed: "2–4 business days", threshold: "Duties & VAT included" },
  { region: "Asia-Pacific", speed: "3–5 business days", threshold: "Tracked DHL Express" },
];

export type ShippingAndReturnsInformationProps = BaseSectionProps;

export function ShippingAndReturnsInformation({
  subheading = "Dispatch & Exchanges",
  heading = "Worldwide Express Shipping & 30-Day Returns",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ShippingAndReturnsInformationProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="divide-y divide-border rounded-2xl border border-border bg-card lg:col-span-7">
          {SHIPPING_ZONES.map((z) => (
            <div
              key={z.region}
              className="flex flex-wrap items-center justify-between gap-2 p-5 text-xs"
            >
              <span className="inline-flex items-center gap-2 font-display text-sm font-bold text-foreground">
                <Globe className="size-4 text-accent" />
                {z.region}
              </span>
              <span className="font-semibold tabular-nums">{z.speed}</span>
              <span className="text-muted-foreground">{z.threshold}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-border bg-sand/40 p-6 lg:col-span-5">
          <div className="flex items-start gap-3">
            <RotateCcw className="mt-0.5 size-5 shrink-0 text-accent" />
            <div>
              <h3 className="font-display text-base font-bold text-foreground">
                Zero-Friction Return Guarantee
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                Try pieces at home with tags intact. Use the enclosed pre-paid return label within
                30 days for instant exchange credit or original payment refund.
              </p>
            </div>
          </div>
          <p className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs font-semibold text-foreground">
            <Truck className="size-4 text-success" />
            <span>Orders placed before 2:00 PM EST ship same day.</span>
          </p>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
