import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/catalog";

export type CartLine = { product: Product; qty: number };

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartApi | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const api = useMemo<CartApi>(() => {
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      add: (product) => {
        setLines((prev) => {
          const found = prev.find((l) => l.product.id === product.id);
          if (found) {
            return prev.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l));
          }
          return [...prev, { product, qty: 1 }];
        });
        setOpen(true);
      },
      remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
      open,
      setOpen,
    };
  }, [lines, open]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
