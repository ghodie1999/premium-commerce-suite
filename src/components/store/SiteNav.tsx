import { useEffect, useState } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "./cart";

const links = ["New In", "Women", "Men", "Home & Living", "Beauty", "Deals"];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, setOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/90 shadow-soft backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center gap-6 px-5 py-4 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-accent-foreground">
            <ShoppingBag className="size-4.5" />
          </span>
          <span className="font-display text-lg font-extrabold leading-none tracking-tight">
            Shop<span className="text-accent">Ease</span>
            <span className="block text-[10px] font-medium tracking-widest text-muted-foreground">
              SHOP SMART. LIVE BETTER.
            </span>
          </span>
        </a>

        <ul className="ml-4 hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href="#"
                className="relative py-2 text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-1.5">
          <div className="hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              aria-label="Search products"
              placeholder="Search products"
              className="w-36 bg-transparent text-sm outline-none placeholder:text-muted-foreground lg:w-48"
            />
          </div>
          <button
            type="button"
            aria-label="Wishlist"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <Heart className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Account"
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <User className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label={`Cart, ${count} items`}
            onClick={() => setOpen(true)}
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-4.5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <ul className="grid gap-1 text-sm font-medium">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="block rounded-lg px-3 py-2.5 hover:bg-secondary">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
