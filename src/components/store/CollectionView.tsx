import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Filter,
  Grid3X3,
  LayoutGrid,
  RotateCcw,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  categories,
  collections,
  formatPrice,
  products as allProducts,
  type Product,
} from "@/lib/catalog";
import { ProductCard } from "./ProductCard";

type SortOption = "featured" | "price-asc" | "price-desc" | "rating" | "bestseller";

export function CollectionView({
  initialCollectionSlug = "all",
  initialSearchQuery = "",
}: {
  initialCollectionSlug?: string;
  initialSearchQuery?: string;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCollectionSlug);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sort, setSort] = useState<SortOption>("featured");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Extract all available colors across products
  const availableColors = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => p.colors.forEach((c) => set.add(c.name)));
    return Array.from(set);
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((p) => {
        // Category / Collection match
        if (selectedCategory !== "all") {
          const matchCollection = p.collectionSlugs.includes(selectedCategory);
          const matchCategory =
            p.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === selectedCategory;
          if (!matchCollection && !matchCategory) return false;
        }

        // Search match
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchCategory) return false;
        }

        // Price range
        if (priceRange === "under-50" && p.price >= 50) return false;
        if (priceRange === "50-100" && (p.price < 50 || p.price > 100)) return false;
        if (priceRange === "100-150" && (p.price < 100 || p.price > 150)) return false;
        if (priceRange === "over-150" && p.price <= 150) return false;

        // In Stock only
        if (onlyInStock && p.stock <= 0) return false;

        // Badge filter
        if (selectedBadge !== "all" && p.badge !== selectedBadge) return false;

        // Color filter
        if (selectedColor !== "all" && !p.colors.some((c) => c.name === selectedColor))
          return false;

        return true;
      })
      .sort((a, b) => {
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        if (sort === "bestseller")
          return (b.badge === "Best Seller" ? 1 : 0) - (a.badge === "Best Seller" ? 1 : 0);
        return 0; // default order
      });
  }, [selectedCategory, searchQuery, priceRange, onlyInStock, selectedBadge, selectedColor, sort]);

  const activeCollection = collections.find((c) => c.slug === selectedCategory);
  const activeCategoryObj = categories.find((c) => c.slug === selectedCategory);

  const title =
    activeCollection?.name ??
    activeCategoryObj?.name ??
    (selectedCategory === "all" ? "All Products" : "Collection");
  const subtitle = activeCollection?.subtitle ?? "Curated Essentials";
  const copy =
    activeCollection?.copy ??
    "Thoughtfully designed garments, everyday objects, and sensory essentials built for daily life.";

  const hasActiveFilters =
    priceRange !== "all" ||
    onlyInStock ||
    selectedBadge !== "all" ||
    selectedColor !== "all" ||
    searchQuery.trim().length > 0;

  const resetFilters = () => {
    setPriceRange("all");
    setOnlyInStock(false);
    setSelectedBadge("all");
    setSelectedColor("all");
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="border-b border-border/60 bg-sand/20">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-muted-foreground lg:px-8">
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="size-3 text-muted-foreground/60" />
          <Link to="/collections" className="hover:text-foreground transition-colors">
            Collections
          </Link>
          {selectedCategory !== "all" && (
            <>
              <ChevronRight className="size-3 text-muted-foreground/60" />
              <span className="font-semibold text-foreground">{title}</span>
            </>
          )}
        </div>
      </div>

      {/* Editorial Collection Banner */}
      <section className="relative border-b border-border bg-sand-gradient px-5 py-12 lg:px-8 lg:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-accent">
              {subtitle}
            </span>
            <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {copy}
            </p>
          </div>

          {/* Quick Collection Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-border/70 pt-6">
            <Link
              to="/collections"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-foreground hover:bg-secondary border border-border"
              }`}
            >
              All Essentials ({allProducts.length})
            </Link>

            {collections.map((c) => (
              <Link
                key={c.slug}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                onClick={() => setSelectedCategory(c.slug)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                  selectedCategory === c.slug
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-card text-foreground hover:bg-secondary border border-border"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Viewport */}
      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {/* Controls Toolbar */}
        <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setFilterDrawerOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-soft transition-colors hover:bg-secondary"
            >
              <SlidersHorizontal className="size-3.5 text-accent" />
              <span>Filters</span>
              {hasActiveFilters && <span className="size-2 rounded-full bg-accent animate-pulse" />}
            </button>

            <span className="text-xs text-muted-foreground tabular-nums">
              Showing <strong className="text-foreground">{filteredProducts.length}</strong>{" "}
              {filteredProducts.length === 1 ? "product" : "products"}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium"
              >
                <RotateCcw className="size-3" /> Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground hidden sm:inline">Sort by:</span>
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="rounded-full border border-border bg-card px-3.5 py-2 text-xs font-semibold text-foreground outline-none transition-colors hover:border-foreground/30 cursor-pointer"
              >
                <option value="featured">Featured Collection</option>
                <option value="bestseller">Best Sellers First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Grid density switcher on desktop */}
            <div className="hidden items-center gap-1 rounded-full border border-border bg-card p-1 md:flex">
              <button
                type="button"
                aria-label="3 columns"
                onClick={() => setGridCols(3)}
                className={`grid size-7 place-items-center rounded-full transition-colors ${
                  gridCols === 3
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3X3 className="size-3.5" />
              </button>
              <button
                type="button"
                aria-label="4 columns"
                onClick={() => setGridCols(4)}
                className={`grid size-7 place-items-center rounded-full transition-colors ${
                  gridCols === 4
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="size-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Filter Drawer / Panel */}
        {filterDrawerOpen && (
          <div className="mb-8 mt-4 rounded-3xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-display text-sm font-bold flex items-center gap-2">
                <Filter className="size-4 text-accent" /> Refine Collection
              </h3>
              <button
                type="button"
                onClick={() => setFilterDrawerOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Price Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Price Range
                </label>
                <div className="mt-3 flex flex-col gap-2">
                  {[
                    { label: "All Prices", value: "all" },
                    { label: "Under $50", value: "under-50" },
                    { label: "$50 – $100", value: "50-100" },
                    { label: "$100 – $150", value: "100-150" },
                    { label: "Over $150", value: "over-150" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-2 text-xs cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="price-filter"
                        checked={priceRange === opt.value}
                        onChange={() => setPriceRange(opt.value)}
                        className="text-accent accent-accent"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Badge / Tag Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Product Status
                </label>
                <div className="mt-3 flex flex-col gap-2">
                  {[
                    { label: "All Items", value: "all" },
                    { label: "Best Sellers", value: "Best Seller" },
                    { label: "New Arrivals", value: "New" },
                    { label: "Sale", value: "Sale" },
                    { label: "Limited Edition", value: "Limited" },
                  ].map((b) => (
                    <label key={b.value} className="flex items-center gap-2 text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="badge-filter"
                        checked={selectedBadge === b.value}
                        onChange={() => setSelectedBadge(b.value)}
                        className="text-accent accent-accent"
                      />
                      <span>{b.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Colorway
                </label>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedColor("all")}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium border ${
                      selectedColor === "all"
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                    }`}
                  >
                    Any
                  </button>
                  {availableColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-medium border ${
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-foreground border-border hover:bg-secondary/80"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability & Search Reset */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Availability
                </label>
                <div className="mt-3 flex flex-col gap-3">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyInStock}
                      onChange={(e) => setOnlyInStock(e.target.checked)}
                      className="accent-accent"
                    />
                    <span>In-Stock Only</span>
                  </label>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20 text-center"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border p-12 text-center">
            <SlidersHorizontal className="size-10 text-muted-foreground/60" />
            <h3 className="mt-4 font-display text-lg font-bold">No Products Matched</h3>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              Try broadening your price range, clearing tags, or searching for a different keyword.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-6 sm:grid-cols-2 ${
              gridCols === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
            }`}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {/* Story / Craftsmanship Value Strip */}
        <section className="mt-20 rounded-3xl border border-border/60 bg-sand/40 p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
            <div>
              <span className="font-display text-base font-bold text-foreground">
                Responsible Direct Sourcing
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                We eliminate wholesale middlemen markups, compounding savings back into superior raw
                materials and certified ethical ateliers.
              </p>
            </div>
            <div>
              <span className="font-display text-base font-bold text-foreground">
                30-Day Global Trial
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Try any garment or object in your space. If the fit, hand-feel, or acoustic clarity
                isn’t exceptional, return it with pre-paid labels.
              </p>
            </div>
            <div>
              <span className="font-display text-base font-bold text-foreground">
                Carbon-Neutral Express Shipping
              </span>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Orders dispatch within 24 hours with plastic-free, recyclable FSC packaging and 100%
                verified carbon offset transport.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
