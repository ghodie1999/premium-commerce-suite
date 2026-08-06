import { Lock, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart";

export function CartDrawer() {
  const { lines, open, setOpen, remove, subtotal, count } = useCart();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.95;

  return (
    <div
      className={`fixed inset-0 z-60 ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-400 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-display text-base font-bold">
            Your bag {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </h2>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          {lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-sand text-accent">
                  <ShoppingBag className="size-6" />
                </span>
                <p className="mt-4 text-sm font-semibold">Your bag is empty</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Add something you love to get started.
                </p>
              </div>
            </div>
          ) : (
            <ul className="grid gap-4">
              {lines.map((l) => (
                <li key={l.product.id} className="flex gap-4">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="size-20 rounded-2xl bg-sand object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold leading-snug">{l.product.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Qty {l.qty}</p>
                    <p className="mt-1 text-sm font-bold">
                      {formatPrice(l.product.price * l.qty)}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${l.product.name}`}
                    onClick={() => remove(l.product.id)}
                    className="grid size-9 place-items-center self-start rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="border-t border-border px-6 py-5">
          <dl className="grid gap-1.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-semibold">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-semibold">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </dd>
            </div>
            <div className="mt-1 flex justify-between border-t border-border pt-2">
              <dt className="font-display font-bold">Total</dt>
              <dd className="font-display font-extrabold">
                {formatPrice(subtotal + shipping)}
              </dd>
            </div>
          </dl>
          <button
            type="button"
            disabled={lines.length === 0}
            className="mt-4 w-full rounded-full bg-accent-gradient py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0"
          >
            Checkout
          </button>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
            <Lock className="size-3" /> Secure encrypted checkout
          </p>
        </footer>
      </aside>
    </div>
  );
}
