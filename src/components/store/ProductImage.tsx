import { useEffect, useState, type ImgHTMLAttributes } from "react";
import {
  getProductPlaceholderImage,
  resolveProductImage,
  type ProductPlaceholderHint,
} from "@/lib/catalog";

export type ProductImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src?: string | null | undefined;
  productId?: string | undefined;
  category?: string | undefined;
};

export function ProductImage({
  src,
  productId,
  category,
  alt = "",
  onError,
  ...rest
}: ProductImageProps) {
  const hint: ProductPlaceholderHint = { id: productId, category };
  const initialSrc = resolveProductImage(src, hint);
  const fallbackSrc = getProductPlaceholderImage(hint);

  const [currentSrc, setCurrentSrc] = useState<string>(initialSrc);

  useEffect(() => {
    setCurrentSrc(resolveProductImage(src, { id: productId, category }));
  }, [src, productId, category]);

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={(e) => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
        onError?.(e);
      }}
    />
  );
}
