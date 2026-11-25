import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { products, resolveProductGallery } from "@/lib/catalog";
import { ProductImage } from "@/components/store/ProductImage";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedProductGalleryProps = BaseSectionProps & {
  productId?: string;
};

export function AdvancedProductGallery({
  productId = "minimalist-chronograph",
  subheading = "Multi-Angle Viewer",
  heading = "Studio Product Gallery",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedProductGalleryProps) {
  const product = products.find((p) => p.id === productId) ?? products[0]!;
  const gallery = resolveProductGallery(product.gallery, product.image, product);
  const [idx, setIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} />

      <div className="mt-8 grid gap-5 lg:grid-cols-12">
        <div className="flex gap-3 overflow-x-auto lg:col-span-2 lg:flex-col">
          {gallery.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`Select angle ${i + 1}`}
              aria-pressed={idx === i}
              className={`size-20 shrink-0 overflow-hidden rounded-2xl border-2 bg-sand transition-all ${
                idx === i ? "border-accent" : "border-border opacity-70 hover:opacity-100"
              }`}
            >
              <ProductImage
                src={src}
                productId={product.id}
                category={product.category}
                alt={`${product.name} thumbnail ${i + 1}`}
                loading="lazy"
                decoding="async"
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-border bg-sand lg:col-span-10">
          <div className="aspect-16/10 overflow-hidden">
            <ProductImage
              src={gallery[idx] ?? product.image}
              productId={product.id}
              category={product.category}
              alt={product.name}
              loading="lazy"
              decoding="async"
              width={1000}
              height={625}
              className={`h-full w-full object-cover transition-transform duration-500 ${
                zoomed ? "scale-125 cursor-zoom-out" : "scale-100 cursor-zoom-in"
              }`}
            />
          </div>

          <div className="absolute right-4 top-4 flex gap-2">
            <button
              type="button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              onClick={() => setZoomed((z) => !z)}
              className="grid size-10 place-items-center rounded-full bg-card/90 text-foreground shadow-soft backdrop-blur-sm"
            >
              {zoomed ? <ZoomOut className="size-4" /> : <ZoomIn className="size-4" />}
            </button>
          </div>

          {gallery.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => setIdx((i) => (i - 1 + gallery.length) % gallery.length)}
                className="grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-soft"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setIdx((i) => (i + 1) % gallery.length)}
                className="grid size-9 place-items-center rounded-full bg-card/90 text-foreground shadow-soft"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
