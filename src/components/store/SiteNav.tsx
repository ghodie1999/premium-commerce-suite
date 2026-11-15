import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "@tanstack/react-router";
import { useCart } from "@/components/store/cart";
import { useRegion } from "@/components/store/region";
import { useWishlist } from "@/components/store/wishlist";
import { ProductImage } from "@/components/store/ProductImage";
import { getTrendingProducts, getTrendingSearches, searchProducts } from "@/lib/catalog";

// Uniform SVG icon components for header across all platform pages
function UniformBagIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function UniformHeartIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function UniformSearchIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7.5" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function UniformMenuIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function UniformCloseIcon({ className = "size-4.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function UniformTrendIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </svg>
  );
}

function UniformArrowUpRightIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

function UniformGlobeIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19" />
      <path d="M12 2.5a14.5 14.5 0 0 0 0 19 14.5 14.5 0 0 0 0-19Z" />
    </svg>
  );
}

const navItems = [
  { label: "New In", subtitle: "Seasonal highlights", to: "/collections/trending-now" },
  { label: "Women", subtitle: "Modern silhouettes", to: "/collections/women" },
  { label: "Men", subtitle: "Architectural essentials", to: "/collections/men" },
  { label: "Home", subtitle: "Intentional spaces", to: "/collections/home-living" },
  { label: "Beauty", subtitle: "Botanical perfumery", to: "/collections/beauty" },
  { label: "Catalog", subtitle: "All curated designs", to: "/collections" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const desktopInputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const { count: cartCount, setOpen: setCartOpen } = useCart();
  const { count: wishlistCount, setOpen: setWishlistOpen } = useWishlist();
  const { region, regions, isAuto, setRegionCode, enableAutoDetect, formatPrice } = useRegion();
  const navigate = useNavigate();

  const trendingSearches = useMemo(() => getTrendingSearches(6), []);
  const trendingProducts = useMemo(() => getTrendingProducts(4), []);
  const liveMatches = useMemo(
    () => (searchQuery.trim() ? searchProducts(searchQuery) : []),
    [searchQuery],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        desktopInputRef.current?.blur();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [searchOpen]);

  const navigateToSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    setSearchOpen(false);
    setMenuOpen(false);
    navigate({
      to: "/collections",
      search: { q: trimmed },
    });
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateToSearch(searchQuery);
    } else {
      setSearchOpen(true);
    }
  };

  const handleSearchButtonClick = () => {
    if (searchQuery.trim() && searchOpen) {
      navigateToSearch(searchQuery);
      return;
    }
    setSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          desktopInputRef.current?.focus();
          mobileInputRef.current?.focus();
        });
      }
      return next;
    });
  };

  const hasQuery = searchQuery.trim().length > 0;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 shadow-soft backdrop-blur-xl" : "bg-card/70 backdrop-blur-md"
      }`}
    >
      <div className="relative mx-auto max-w-7xl">
        <nav className="flex h-18 items-center justify-between gap-8 px-5 py-4 lg:px-8">
          {/* Brand Zone */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-accent-foreground shadow-sm">
              <UniformBagIcon className="size-4.5" />
            </span>
            <span className="font-display text-lg font-extrabold leading-none tracking-tight whitespace-nowrap">
              Shop<span className="text-accent">Ease</span>
            </span>
          </Link>

          {/* Navigation Links Zone */}
          <ul className="hidden items-center gap-7 text-sm font-medium lg:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="relative py-1.5 text-foreground/80 transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-accent after:transition-transform hover:after:scale-x-100 whitespace-nowrap shrink-0"
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
            {/* Desktop Search Box with Interactive Trending Trigger */}
            <form
              onSubmit={handleSearchSubmit}
              className={`hidden items-center gap-2 rounded-full border bg-card px-3 py-1.5 transition-colors md:flex ${
                searchOpen
                  ? "border-accent ring-2 ring-accent/15"
                  : "border-border hover:border-foreground/25"
              }`}
            >
              <button
                type="button"
                aria-label="Toggle trending searches"
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                onClick={handleSearchButtonClick}
                className="grid size-6 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
              >
                <UniformSearchIcon className="size-3.5" />
              </button>
              <input
                ref={desktopInputRef}
                type="search"
                value={searchQuery}
                onFocus={() => setSearchOpen(true)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!searchOpen) setSearchOpen(true);
                }}
                aria-label="Search products"
                placeholder="Search or view trending..."
                className="w-32 bg-transparent text-xs outline-none placeholder:text-muted-foreground lg:w-44 [&::-webkit-search-cancel-button]:hidden"
              />
              {hasQuery && (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => {
                    setSearchQuery("");
                    desktopInputRef.current?.focus();
                  }}
                  className="grid size-5 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <UniformCloseIcon className="size-3" />
                </button>
              )}
            </form>

            {/* Mobile search toggle */}
            <button
              type="button"
              aria-label="Search products and trending items"
              aria-expanded={searchOpen}
              aria-controls="header-search-panel"
              onClick={handleSearchButtonClick}
              className={`grid size-9 place-items-center rounded-full transition-colors md:hidden ${
                searchOpen ? "bg-secondary text-accent" : "hover:bg-secondary"
              }`}
            >
              {searchOpen ? (
                <UniformCloseIcon className="size-4" />
              ) : (
                <UniformSearchIcon className="size-4" />
              )}
            </button>

            {/* Wishlist Trigger */}
            <button
              type="button"
              aria-label={`Wishlist, ${wishlistCount} saved items`}
              onClick={() => setWishlistOpen(true)}
              className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <UniformHeartIcon
                className={`size-4.5 ${
                  wishlistCount > 0 ? "fill-accent text-accent" : "text-foreground"
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              type="button"
              aria-label={`Cart, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary"
            >
              <UniformBagIcon className="size-4.5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuOpen((v) => !v);
                setSearchOpen(false);
              }}
              className="grid size-9 place-items-center rounded-full transition-colors hover:bg-secondary lg:hidden"
            >
              {menuOpen ? (
                <UniformCloseIcon className="size-4.5" />
              ) : (
                <UniformMenuIcon className="size-5" />
              )}
            </button>
          </div>
        </nav>

        {/* Unified Search & Trending Searches Popover (Desktop & Mobile) */}
        {searchOpen && (
          <div
            id="header-search-panel"
            role="region"
            aria-label="Product search and trending searches"
            className="border-t border-border bg-card px-5 py-5 shadow-lift md:absolute md:right-5 md:top-full md:mt-2 md:w-[min(42rem,calc(100vw-2.5rem))] md:rounded-3xl md:border lg:right-8 max-h-[80vh] overflow-y-auto"
          >
            {/* Mobile Search Input inside Panel */}
            <form
              onSubmit={handleSearchSubmit}
              className="mb-5 flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-2 md:hidden"
            >
              <UniformSearchIcon className="size-4 text-muted-foreground shrink-0" />
              <input
                ref={mobileInputRef}
                type="search"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, materials..."
                className="flex-1 bg-transparent text-xs outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {hasQuery && (
                <button
                  type="button"
                  aria-label="Clear search query"
                  onClick={() => {
                    setSearchQuery("");
                    mobileInputRef.current?.focus();
                  }}
                  className="grid size-6 place-items-center rounded-full text-muted-foreground hover:text-foreground"
                >
                  <UniformCloseIcon className="size-3.5" />
                </button>
              )}
            </form>

            {/* Live Search Matches State */}
            {hasQuery ? (
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-border/70 pb-3">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-display font-bold text-foreground">
                      Matching Products
                    </span>
                    <span aria-hidden="true" className="text-muted-foreground">
                      ·
                    </span>
                    <span className="text-muted-foreground tabular-nums">
                      {liveMatches.length} {liveMatches.length === 1 ? "item" : "items"}
                    </span>
                  </div>
                  {liveMatches.length > 0 && (
                    <button
                      type="button"
                      onClick={() => navigateToSearch(searchQuery)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline whitespace-nowrap"
                    >
                      <span>View all results</span>
                      <UniformArrowUpRightIcon className="size-3.5" />
                    </button>
                  )}
                </div>

                {liveMatches.length > 0 ? (
                  <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {liveMatches.slice(0, 6).map((product) => (
                      <li key={product.id}>
                        <Link
                          to="/products/$id"
                          params={{ id: product.id }}
                          onClick={() => setSearchOpen(false)}
                          className="group flex items-center gap-3 rounded-2xl border border-border/60 p-2.5 transition-colors hover:border-accent/40 hover:bg-sand/40"
                        >
                          <ProductImage
                            src={product.image}
                            productId={product.id}
                            category={product.category}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            width={56}
                            height={56}
                            className="size-13 rounded-xl bg-sand object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                              {product.category} · ★ {product.rating}
                            </p>
                            <p className="mt-0.5 font-display text-xs font-bold text-foreground tabular-nums">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-2xl border border-dashed border-border p-5 text-center">
                    <p className="text-xs font-semibold text-foreground">
                      No products matched &ldquo;{searchQuery.trim()}&rdquo;
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground">
                      Try searching another material or select a trending item below.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="mt-3 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
                    >
                      Reset search
                    </button>
                  </div>
                )}
              </div>
            ) : null}

            {/* Trending Searches Section (always visible when empty, or shown as fallback on 0 matches) */}
            {(!hasQuery || liveMatches.length === 0) && (
              <div className={hasQuery ? "mt-6 border-t border-border/70 pt-5" : ""}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UniformTrendIcon className="size-4 text-accent" />
                    <h3 className="font-display text-xs font-bold text-foreground">
                      Trending Searches
                    </h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">Popular in store</span>
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {trendingSearches.map((item) => (
                    <button
                      key={item.productId}
                      type="button"
                      onClick={() => navigateToSearch(item.query)}
                      className="group flex min-h-10 items-center justify-between gap-3 rounded-xl border border-border/70 bg-background/60 px-3.5 py-2 text-left transition-colors hover:border-accent/50 hover:bg-sand/50"
                    >
                      <span className="flex min-w-0 items-center gap-2.5">
                        <UniformTrendIcon className="size-3.5 shrink-0 text-accent/80 group-hover:text-accent transition-colors" />
                        <span className="truncate text-xs font-semibold text-foreground">
                          {item.term}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-1.5 text-[11px] text-muted-foreground">
                        <span className="whitespace-nowrap">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.matchCount}</span>
                      </span>
                    </button>
                  ))}
                </div>

                {/* Trending Store Products Quick Links */}
                <div className="mt-6 border-t border-border/70 pt-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-xs font-bold text-foreground">
                      Most Searched Essentials
                    </h3>
                    <Link
                      to="/collections/trending-now"
                      onClick={() => setSearchOpen(false)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline whitespace-nowrap"
                    >
                      <span>Shop Trending</span>
                      <UniformArrowUpRightIcon className="size-3" />
                    </Link>
                  </div>

                  <ul className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {trendingProducts.map((product) => (
                      <li key={product.id}>
                        <Link
                          to="/products/$id"
                          params={{ id: product.id }}
                          onClick={() => setSearchOpen(false)}
                          className="group flex items-center gap-3 rounded-2xl border border-border/60 p-2 transition-colors hover:border-accent/40 hover:bg-sand/40"
                        >
                          <ProductImage
                            src={product.image}
                            productId={product.id}
                            category={product.category}
                            alt={product.name}
                            loading="lazy"
                            decoding="async"
                            width={52}
                            height={52}
                            className="size-13 rounded-xl bg-sand object-cover shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                              {product.name}
                            </p>
                            <p className="mt-0.5 text-[11px] text-muted-foreground truncate">
                              {product.category} · ★ {product.rating}
                            </p>
                            <p className="mt-0.5 font-display text-xs font-bold text-foreground tabular-nums">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modern Slide-Over Mobile Drawer Menu with Auto Currency & Region Converter */}
      {mounted &&
        createPortal(
          <div
            className={`fixed inset-0 z-60 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`}
            aria-hidden={!menuOpen}
          >
            {/* Backdrop */}
            <button
              type="button"
              tabIndex={menuOpen ? 0 : -1}
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
              className={`absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300 ${
                menuOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Slide-Over Panel */}
            <aside
              aria-label="Mobile navigation"
              className={`absolute right-0 top-0 flex h-full w-[88vw] max-w-sm flex-col bg-card shadow-lift transition-transform duration-300 ${
                menuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Drawer Header */}
              <header className="flex items-center justify-between border-b border-border/80 px-5 py-4 shrink-0">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <span className="grid size-8 place-items-center rounded-xl bg-accent-gradient text-accent-foreground shadow-sm">
                    <UniformBagIcon className="size-4" />
                  </span>
                  <span className="font-display text-base font-extrabold leading-none tracking-tight">
                    Shop<span className="text-accent">Ease</span>
                  </span>
                </Link>

                <button
                  type="button"
                  aria-label="Close menu"
                  onClick={() => setMenuOpen(false)}
                  className="grid size-10 place-items-center rounded-full text-foreground transition-colors hover:bg-secondary"
                >
                  <UniformCloseIcon className="size-4.5" />
                </button>
              </header>

              {/* Scrollable Navigation Body */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                {/* Quick Search Trigger */}
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setSearchOpen(true);
                    requestAnimationFrame(() => mobileInputRef.current?.focus());
                  }}
                  className="flex min-h-11 w-full items-center gap-2.5 rounded-2xl border border-border bg-secondary/40 px-4 py-2.5 text-left text-xs text-muted-foreground transition-colors hover:border-accent/40 hover:bg-sand/50"
                >
                  <UniformSearchIcon className="size-4 shrink-0 text-accent" />
                  <span className="flex-1 truncate font-medium text-foreground/80">
                    Search catalog &amp; trending items...
                  </span>
                </button>

                {/* Primary Store Departments */}
                <div>
                  <p className="px-1 text-xs font-semibold text-muted-foreground">
                    Browse Collections
                  </p>
                  <ul className="mt-2.5 grid gap-1.5">
                    {navItems.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          activeProps={{
                            className: "bg-sand/70 border-border/80 text-foreground",
                          }}
                          className="group flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-transparent px-3.5 py-2.5 transition-colors hover:border-border/60 hover:bg-sand/40"
                        >
                          <span className="min-w-0">
                            <span className="block font-display text-sm font-bold text-foreground group-hover:text-accent transition-colors">
                              {item.label}
                            </span>
                            <span className="block text-[11px] text-muted-foreground truncate">
                              {item.subtitle}
                            </span>
                          </span>
                          <UniformArrowUpRightIcon className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Utility Actions */}
                <div className="grid grid-cols-2 gap-2.5 border-t border-border/70 pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setWishlistOpen(true);
                    }}
                    className="flex min-h-11 items-center justify-between gap-2 rounded-2xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-left transition-colors hover:border-accent/40 hover:bg-sand/40"
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                      <UniformHeartIcon
                        className={`size-4 ${
                          wishlistCount > 0 ? "fill-accent text-accent" : "text-foreground"
                        }`}
                      />
                      <span>Saved</span>
                    </span>
                    <span className="text-xs font-bold tabular-nums text-muted-foreground">
                      {wishlistCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      setCartOpen(true);
                    }}
                    className="flex min-h-11 items-center justify-between gap-2 rounded-2xl border border-border/80 bg-background/60 px-3.5 py-2.5 text-left transition-colors hover:border-accent/40 hover:bg-sand/40"
                  >
                    <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                      <UniformBagIcon className="size-4" />
                      <span>Bag</span>
                    </span>
                    <span className="text-xs font-bold tabular-nums text-muted-foreground">
                      {cartCount}
                    </span>
                  </button>
                </div>

                {/* Curated Highlight */}
                <Link
                  to="/collections/trending-now"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-2xl border border-border/70 bg-sand-gradient p-4 transition-shadow hover:shadow-soft"
                >
                  <p className="text-[11px] font-semibold text-accent">Seasonal Edit</p>
                  <p className="mt-1 font-display text-sm font-bold text-foreground">
                    Trending Essentials
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Explore our most requested pieces with worldwide express dispatch.
                  </p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-foreground">
                    <span>Shop Collection</span>
                    <UniformArrowUpRightIcon className="size-3.5 text-accent" />
                  </span>
                </Link>
              </div>

              {/* Bottom Pinned Auto Currency & Region Converter */}
              <footer className="border-t border-border bg-sand/30 px-5 py-4 shrink-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <UniformGlobeIcon className="size-4 text-accent shrink-0" />
                    <span>Region &amp; Currency</span>
                  </div>

                  <button
                    type="button"
                    onClick={enableAutoDetect}
                    aria-pressed={isAuto}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                      isAuto
                        ? "bg-primary text-primary-foreground"
                        : "border border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {isAuto ? "Auto active" : "Auto-detect"}
                  </button>
                </div>

                <div className="mt-2.5">
                  <label htmlFor="mobile-region-select" className="sr-only">
                    Select region and currency
                  </label>
                  <select
                    id="mobile-region-select"
                    value={region.code}
                    onChange={(e) => setRegionCode(e.target.value)}
                    className="min-h-11 w-full cursor-pointer rounded-xl border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition-colors focus-visible:border-accent"
                  >
                    {regions.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.country} — {item.currency} ({item.symbol})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-2.5 flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
                  <span className="truncate">
                    {region.regionLabel} · {isAuto ? "Auto-detected" : "Manual"}
                  </span>
                  <span className="shrink-0 font-semibold text-foreground tabular-nums">
                    Free ship {formatPrice(100)}+
                  </span>
                </div>
              </footer>
            </aside>
          </div>,
          document.body,
        )}
    </header>
  );
}
