import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { products } from "@/lib/catalog";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductInformationAccordionProps = BaseSectionProps & {
  productId?: string;
};

export function ProductInformationAccordion({
  productId = "essential-hoodie",
  subheading = "Product Reference",
  heading = "Materials, Sizing & Care",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductInformationAccordionProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const [openKey, setOpenKey] = useState<string>("materials");

  const panels = [
    { key: "materials", title: "Materials & Origin", body: product.materials },
    {
      key: "dimensions",
      title: "Dimensions & Silhouette",
      body: product.dimensions ?? "Relaxed studio proportion across standard sizes.",
    },
    { key: "care", title: "Care & Maintenance", body: product.care },
    { key: "shipping", title: "Shipping & Free Returns", body: product.shippingInfo },
  ];

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeaderBlock subheading={subheading} heading={heading} />

        <div className="mt-8 divide-y divide-border border-y border-border">
          {panels.map((p) => {
            const isOpen = openKey === p.key;
            return (
              <div key={p.key} className="py-4">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenKey(isOpen ? "" : p.key)}
                  className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-foreground"
                >
                  <span>{p.title}</span>
                  <ChevronDown
                    className={`size-4 text-muted-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
