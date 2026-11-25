import { products } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type TechnicalSpecificationsShowcaseProps = BaseSectionProps & {
  productId?: string;
};

export function TechnicalSpecificationsShowcase({
  productId = "minimalist-chronograph",
  subheading = "Engineering Sheet",
  heading = "Technical Specifications",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: TechnicalSpecificationsShowcaseProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;

  const specs = [
    { key: "Model Reference", val: product.id.toUpperCase() },
    { key: "Department", val: product.category },
    { key: "Materials", val: product.materials },
    { key: "Dimensions & Fit", val: product.dimensions ?? "Standard tailored studio fit" },
    { key: "Care Protocol", val: product.care },
    { key: "Dispatch SLA", val: product.shippingInfo },
  ];

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {specs.map((row) => (
          <div key={row.key} className="grid gap-2 py-4 sm:grid-cols-12">
            <dt className="text-xs font-bold uppercase tracking-wider text-muted-foreground sm:col-span-4">
              {row.key}
            </dt>
            <dd className="text-sm text-foreground sm:col-span-8">{row.val}</dd>
          </div>
        ))}
      </dl>
    </PremiumSectionShell>
  );
}
