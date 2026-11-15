import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
import { useWishlist } from "@/components/store/wishlist";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { ProductImage } from "./ProductImage";

export function WishlistDrawer() {
  const { wishlistItems, open, setOpen, removeFromWishlist, clearWishlist, count } = useWishlist();
  const { add } = useCart();
  const { formatPrice } = useRegion();

  const handleMoveToCart = (product: (typeof wishlistItems)[0]) => {
    add(product, 1, {
      color: product.colors[0]?.name,
      size: product.sizes?.[0]?.label,
    });
    // optionally remove from wishlist once added to bag
    removeFromWishlist(product.id);
  };

  return (
    <div className={`fixed inset-0 z-60 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Close wishlist"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Slide-over panel */}
      <aside
        aria-label="Wishlist"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-card shadow-lift transition-transform duration-400 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="flex items-center gap-2">
            <Heart className="size-5 fill-accent text-accent" />
            <h2 className="font-display text-base font-bold">
              Saved Items{" "}
              {count > 0 && <span className="font-normal text-muted-foreground">({count})</span>}
            </h2>
          </div>
          <button
            type="button"
            aria-label="Close wishlist"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-full hover:bg-secondary transition-colors"
          >
            <X className="size-4" />
          </button>
        </header>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {wishlistItems.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <span className="mx-auto grid size-16 place-items-center rounded-2xl bg-sand text-accent">
                  <Heart className="size-7" />
                </span>
                <p className="mt-4 text-sm font-semibold">Your wishlist is empty</p>
                <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                  Tap the heart icon on any product card or detail page to save items for later.
                </p>
                <Link
                  to="/collections"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Discover Essentials
                </Link>
              </div>
            </div>
          ) : (
            <ul className="grid gap-4 divide-y divide-border/60">
              {wishlistItems.map((product) => (
                <li key={product.id} className="flex gap-4 pt-4 first:pt-0">
                  <Link
                    to="/products/$id"
                    params={{ id: product.id }}
                    onClick={() => setOpen(false)}
                    className="size-20 rounded-2xl bg-sand overflow-hidden shrink-0 block"
                  >
                    <ProductImage
                      src={product.image}
                      productId={product.id}
                      category={product.category}
                      alt={product.name}
                      loading="lazy"
                      width={800}
                      height={1000}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to="/products/$id"
                      params={{ id: product.id }}
                      onClick={() => setOpen(false)}
                      className="text-sm font-semibold leading-snug truncate block hover:text-accent transition-colors"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-sm font-bold tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      {product.compareAt && (
                        <span className="text-xs text-muted-foreground line-through tabular-nums">
                          {formatPrice(product.compareAt)}
                        </span>
                      )}
                    </div>

                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {product.stock > 0 ? (
                        <span className="text-emerald-700 font-medium">In stock</span>
                      ) : (
                        <span className="text-destructive font-medium">Out of stock</span>
                      )}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                      >
                        <ShoppingBag className="size-3" /> Move to Bag
                      </button>

                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from wishlist`}
                        onClick={() => removeFromWishlist(product.id)}
                        className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive transition-colors"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <footer className="border-t border-border px-6 py-4 flex items-center justify-between bg-sand/20">
            <button
              type="button"
              onClick={clearWishlist}
              className="text-xs text-muted-foreground hover:text-destructive transition-colors font-medium"
            >
              Clear wishlist
            </button>
            <Link
              to="/collections"
              onClick={() => setOpen(false)}
              className="text-xs text-accent font-semibold hover:underline"
            >
              Continue shopping →
            </Link>
          </footer>
        )}
      </aside>
    </div>
  );
}
