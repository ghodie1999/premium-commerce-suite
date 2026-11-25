import { Link } from "@tanstack/react-router";
import { ShoppingBag, Star } from "lucide-react";
import { products } from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ProductComparisonProps = BaseSectionProps & {
  productIds?: string[];
};

export function ProductComparison({
  subheading = "Side-by-Side Specs",
  heading = "Compare Essentials",
  description = "Evaluate materials, ratings, sizing, and pricing across three customer favorites.",
  productIds = ["essential-hoodie", "leather-handbag", "minimalist-chronograph"],
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ProductComparisonProps) {
  const { add } = useCart();
  const { formatPrice } = useRegion();
  const items = productIds
    .map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const rows = [
    { label: "Category", render: (p: (typeof items)[number]) => p.category },
    {
      label: "Customer Rating",
      render: (p: (typeof items)[number]) => (
        <span className="inline-flex items-center gap-1 tabular-nums">
          <Star className="size-3.5 fill-accent text-accent" />
          {p.rating} ({p.reviews})
        </span>
      ),
    },
    { label: "Materials", render: (p: (typeof items)[number]) => p.materials },
    {
      label: "Availability",
      render: (p: (typeof items)[number]) => (
        <span className="tabular-nums font-medium">{p.stock} units ready to ship</span>
      ),
    },
    {
      label: "Colorways",
      render: (p: (typeof items)[number]) => `${p.colors.length} curated finishes`,
    },
  ];

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock
        subheading={subheading}
        heading={heading}
        description={description}
        dark={surface === "primary"}
      />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-border bg-card shadow-soft">
        <table className="w-full min-w-[680px] border-collapse text-left text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="w-44 p-5 align-bottom text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Specification
              </th>
              {items.map((p) => (
                <th key={p.id} className="p-5 align-top font-normal">
                  <Link to="/products/$id" params={{ id: p.id }} className="group block">
                    <div className="aspect-4/3 overflow-hidden rounded-2xl bg-sand">
                      <ProductImage
                        src={p.image}
                        productId={p.id}
                        category={p.category}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={240}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 font-display text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                      {p.name}
                    </p>
                    <p className="mt-0.5 font-display text-base font-extrabold tabular-nums text-accent">
                      {formatPrice(p.price)}
                    </p>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/70">
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row" className="p-4 pl-5 font-semibold text-foreground">
                  {row.label}
                </th>
                {items.map((p) => (
                  <td key={`${row.label}-${p.id}`} className="p-4 px-5 text-muted-foreground">
                    {row.render(p)}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="p-4 pl-5 font-semibold text-foreground">
                Quick Action
              </th>
              {items.map((p) => (
                <td key={`cta-${p.id}`} className="p-4 px-5">
                  <button
                    type="button"
                    onClick={() => add(p, 1, { color: p.colors[0]?.name })}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:bg-accent transition-colors"
                  >
                    <ShoppingBag className="size-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </PremiumSectionShell>
  );
}
