import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/catalog";

export type CartLine = {
  product: Product;
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  add: (product: Product, qty?: number, options?: { color?: string; size?: string }) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clearCart: () => void;
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
      add: (product, qty = 1, options) => {
        setLines((prev) => {
          const matchIndex = prev.findIndex(
            (l) =>
              l.product.id === product.id &&
              l.selectedColor === options?.color &&
              l.selectedSize === options?.size,
          );
          if (matchIndex > -1) {
            const updated = [...prev];
            const current = updated[matchIndex];
            if (current) {
              updated[matchIndex] = {
                ...current,
                qty: current.qty + qty,
              };
            }
            return updated;
          }
          return [
            ...prev,
            {
              product,
              qty,
              selectedColor: options?.color,
              selectedSize: options?.size,
            },
          ];
        });
        setOpen(true);
      },
      updateQty: (id, newQty) => {
        if (newQty <= 0) {
          setLines((prev) => prev.filter((l) => l.product.id !== id));
        } else {
          setLines((prev) => prev.map((l) => (l.product.id === id ? { ...l, qty: newQty } : l)));
        }
      },
      remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
      clearCart: () => setLines([]),
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
