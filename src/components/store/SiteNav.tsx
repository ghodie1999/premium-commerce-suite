import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "./cart";

const navItems = [
  { label: "New In", to: "/collections/trending-now" },
  { label: "Women", to: "/collections/women" },
  { label: "Men", to: "/collections/men" },
  { label: "Home", to: "/collections/home-living" },
  { label: "Beauty", to: "/collections/beauty" },
  { label: "Catalog", to: "/collections" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, setOpen } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({
        to: "/collections",
        search: { q: searchQuery.trim() },
      });
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 shadow-soft backdrop-blur-xl" : "bg-card/70 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-8 px-5 py-4 lg:px-8">
        {/* Brand Zone */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-accent-foreground shadow-sm">
            <ShoppingBag className="size-4.5" />
          </span>
          <span className="font-display text-lg font-extrabold leading-none tracking-tight">
            Shop<span className="text-accent">Ease</span>
          </span>
        </Link>

        {/* Navigation Links Zone */}
        <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="relative py-1.5 text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 whitespace-nowrap"
                activeProps={{
                  className: "text-foreground font-semibold after:scale-x-100",
                }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions Zone */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 md:flex"
          >
            <Search className="size-3.5 text-muted-foreground" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
              placeholder="Search catalog..."
              className="w-32 bg-transparent text-xs outline-none placeholder:text-muted-foreground lg:w-44"
            />
          </form>

          {/* Mobile search toggle */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary md:hidden"
          >
            <Search className="size-4" />
          </button>

          {/* Cart Trigger */}
          <button
            type="button"
            aria-label={`Cart, ${count} items`}
            onClick={() => setOpen(true)}
            className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-4.5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-sm">
                {count}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
          >
            {menuOpen ? <X className="size-4" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile search dropdown */}
      {searchOpen && (
        <div className="border-t border-border bg-card px-5 py-3 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-2"
          >
            <Search className="size-4 text-muted-foreground" />
            <input
              type="search"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, materials..."
              className="flex-1 bg-transparent text-xs outline-none"
            />
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="border-t border-border bg-card px-5 py-4 lg:hidden">
          <ul className="grid gap-1 text-sm font-medium">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-secondary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
