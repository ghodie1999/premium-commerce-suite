import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { getProductById, type Product } from "@/lib/catalog";

type WishlistApi = {
  wishlistIds: string[];
  wishlistItems: Product[];
  count: number;
  isWished: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const WISHLIST_STORAGE_KEY = "shopease_wishlist_ids_v1";

// Guarantee a single Context instance across all module paths, SSR, and client chunks
const WISHLIST_CONTEXT_KEY = Symbol.for("shopease.wishlist.context");
type GlobalWithWishlist = typeof globalThis & {
  [WISHLIST_CONTEXT_KEY]?: React.Context<WishlistApi | null>;
};

const WishlistContext: React.Context<WishlistApi | null> = ((globalThis as GlobalWithWishlist)[
  WISHLIST_CONTEXT_KEY
] ||= createContext<WishlistApi | null>(null));

const defaultWishlistApi: WishlistApi = {
  wishlistIds: [],
  wishlistItems: [],
  count: 0,
  isWished: () => false,
  toggleWishlist: () => {},
  removeFromWishlist: () => {},
  clearWishlist: () => {},
  open: false,
  setOpen: () => {},
};

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setWishlistIds(parsed);
        }
      }
    } catch {
      // ignore JSON parse or storage access errors
    } finally {
      setHydrated(true);
    }
  }, []);

  // Sync to localStorage on changes after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore storage write errors
    }
  }, [wishlistIds, hydrated]);

  const api = useMemo<WishlistApi>(() => {
    const items = wishlistIds
      .map((id) => getProductById(id))
      .filter((p): p is Product => p !== undefined);

    return {
      wishlistIds,
      wishlistItems: items,
      count: wishlistIds.length,
      isWished: (productId: string) => wishlistIds.includes(productId),
      toggleWishlist: (product: Product) => {
        setWishlistIds((prev) => {
          if (prev.includes(product.id)) {
            return prev.filter((id) => id !== product.id);
          }
          return [...prev, product.id];
        });
      },
      removeFromWishlist: (productId: string) => {
        setWishlistIds((prev) => prev.filter((id) => id !== productId));
      },
      clearWishlist: () => {
        setWishlistIds([]);
      },
      open,
      setOpen,
    };
  }, [wishlistIds, open]);

  return <WishlistContext.Provider value={api}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistApi {
  const ctx = useContext(WishlistContext);
  return ctx ?? defaultWishlistApi;
}
