import { Check } from "lucide-react";
import { products } from "@/lib/catalog";
import { PremiumSectionShell, type BaseSectionProps } from "../shared";

export type EditorialProductDescriptionProps = BaseSectionProps & {
  productId?: string;
};

export function EditorialProductDescription({
  productId = "leather-handbag",
  subheading = "In Detail",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: EditorialProductDescriptionProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel="Editorial product overview"
      className={className}
    >
      <div className="grid gap-10 border-y border-border py-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">{subheading}</p>
          <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight text-foreground">
            {product.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{product.subtitle}</p>
        </div>

        <div className="space-y-6 lg:col-span-7">
          <p className="text-base leading-relaxed text-foreground/85">{product.description}</p>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
