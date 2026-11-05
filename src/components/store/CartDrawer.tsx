import { useState } from "react";
import { CheckCircle2, Lock, Minus, Plus, ShoppingBag, Trash2, Truck, X } from "lucide-react";
import { formatPrice } from "@/lib/catalog";
import { useCart } from "./cart";

export function CartDrawer() {
  const { lines, open, setOpen, remove, updateQty, clearCart, subtotal, count } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const freeShippingThreshold = 100;
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 9.95;
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setOpen(false);
    if (orderComplete) {
      setTimeout(() => setOrderComplete(false), 300);
    }
  };

  return (
    <div className={`fixed inset-0 z-60 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close cart"
        onClick={handleClose}
        className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-over panel */}
      <aside
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-400 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div>
            <h2 className="font-display text-base font-bold">
              Your Shopping Bag{" "}
              {count > 0 && <span className="text-muted-foreground font-normal">({count})</span>}
            </h2>
            <p className="text-[11px] text-muted-foreground">Free 30-day global returns</p>
          </div>
          <button
            type="button"
            aria-label="Close cart"
            onClick={handleClose}
            className="grid size-9 place-items-center rounded-full hover:bg-secondary transition-colors"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Free Shipping Progress Meter */}
        <div className="border-b border-border/60 bg-sand/40 px-6 py-3.5">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-1.5 text-foreground">
              <Truck className="size-3.5 text-accent" />
              {amountNeeded === 0 ? (
                <span className="font-semibold text-emerald-700">
                  You unlocked Free Express Shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="text-accent">{formatPrice(amountNeeded)}</strong> more for
                  Free Shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {orderComplete ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="size-8" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold">Order Confirmed!</h3>
              <p className="mt-1 max-w-xs text-xs text-muted-foreground">
                Thank you for your purchase. We are preparing your order and have sent receipt
                details to your email.
              </p>
              <div className="mt-6 rounded-2xl border border-border bg-sand/30 p-4 text-left w-full text-xs">
                <div className="flex justify-between font-semibold">
                  <span>Order Reference</span>
                  <span className="font-mono">#SE-84920</span>
                </div>
                <div className="mt-2 flex justify-between text-muted-foreground">
                  <span>Delivery Method</span>
                  <span>Express Tracked (2–4 Days)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 w-full rounded-full bg-primary py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Continue Shopping
              </button>
            </div>
          ) : lines.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-sand text-accent">
                  <ShoppingBag className="size-7" />
                </span>
                <p className="mt-4 text-sm font-semibold">Your bag is empty</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Explore our curated collections to discover everyday essentials.
                </p>
                <a
                  href="/collections"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Explore Collections
                </a>
              </div>
            </div>
          ) : (
            <ul className="grid gap-4 divide-y divide-border/60">
              {lines.map((l, index) => (
                <li key={`${l.product.id}-${index}`} className="flex gap-4 pt-4 first:pt-0">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="size-20 rounded-2xl bg-sand object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug truncate">{l.product.name}</p>
                    {(l.selectedColor || l.selectedSize) && (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {l.selectedColor && <span>Color: {l.selectedColor}</span>}
                        {l.selectedColor && l.selectedSize && <span> · </span>}
                        {l.selectedSize && <span>Size: {l.selectedSize}</span>}
                      </p>
                    )}
                    <div className="mt-2 flex items-center justify-between">
                      {/* Stepper */}
                      <div className="flex items-center rounded-lg border border-border bg-secondary/50">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => updateQty(l.product.id, l.qty - 1)}
                          className="grid size-7 place-items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-semibold tabular-nums">
                          {l.qty}
                        </span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => updateQty(l.product.id, l.qty + 1)}
                          className="grid size-7 place-items-center text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>

                      <span className="text-sm font-bold tabular-nums">
                        {formatPrice(l.product.price * l.qty)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${l.product.name}`}
                    onClick={() => remove(l.product.id)}
                    className="grid size-8 place-items-center self-start rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive transition-colors shrink-0"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {!orderComplete && lines.length > 0 && (
          <footer className="border-t border-border px-6 py-5 bg-card">
            <dl className="grid gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Estimated Shipping</dt>
                <dd className="font-semibold tabular-nums">
                  {shipping === 0 ? (
                    <span className="text-emerald-700">Free</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </dd>
              </div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="font-display font-bold text-foreground">Total</dt>
                <dd className="font-display font-extrabold text-foreground tabular-nums">
                  {formatPrice(subtotal + shipping)}
                </dd>
              </div>
            </dl>

            <button
              type="button"
              disabled={checkingOut}
              onClick={handleCheckout}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-accent-gradient py-3.5 text-sm font-bold text-accent-foreground transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {checkingOut ? (
                <span>Processing Order...</span>
              ) : (
                <span>Instant Checkout · {formatPrice(subtotal + shipping)}</span>
              )}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
              <Lock className="size-3 text-accent" />
              <span>256-Bit SSL Encrypted Checkout · 30-Day Guarantee</span>
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
}
