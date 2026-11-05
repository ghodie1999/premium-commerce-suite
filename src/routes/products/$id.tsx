import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Eye,
  Heart,
  HelpCircle,
  Lock,
  Minus,
  Package,
  Plus,
  RefreshCw,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  ThumbsUp,
  Truck,
  X,
  Zap,
} from "lucide-react";
import {
  formatPrice,
  getProductById,
  products,
  type Product,
  type ProductReview,
} from "@/lib/catalog";
import { useCart } from "@/components/store/cart";
import { ProductCard } from "@/components/store/ProductCard";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { SiteFooter } from "@/components/store/SiteFooter";

export const Route = createFileRoute("/products/$id")({
  head: ({ params }) => {
    const product = getProductById(params.id);
    const title = product ? `${product.name} — ShopEase` : "Product Not Found — ShopEase";
    const description =
      product?.description ??
      "Explore handcrafted everyday essentials with worldwide express shipping.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
      ],
    };
  },
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { id } = Route.useParams();
  const product = getProductById(id);

  if (!product) {
    return (
      <>
        <AnnouncementBar />
        <SiteNav />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <Package className="size-12 text-muted-foreground/60" />
          <h1 className="mt-4 font-display text-2xl font-bold">Product Not Found</h1>
          <p className="mt-2 text-xs text-muted-foreground">
            The item you are looking for may have been retired or moved.
          </p>
          <Link
            to="/collections"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
          >
            <ArrowLeft className="size-3.5" /> Back to Collections
          </Link>
        </div>
        <SiteFooter />
      </>
    );
  }

  return <ProductDetailContent product={product} />;
}

function ProductDetailContent({ product }: { product: Product }) {
  const { add } = useCart();

  // Gallery state
  const galleryImages =
    product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selections
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.find((s) => s.available)?.label ?? product.sizes?.[0]?.label,
  );
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Modals & UI states
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "shipping" | "care">(
    "details",
  );
  const [reviewFilter, setReviewFilter] = useState<number | "all">("all");
  const [copiedShare, setCopiedShare] = useState(false);

  // Reviews state with local submissions & helpful upvotes
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviewsList);
  const [helpfulVoted, setHelpfulVoted] = useState<Record<string, boolean>>({});

  // Frequently bought together item
  const bundleProduct = product.frequentlyBoughtTogetherId
    ? getProductById(product.frequentlyBoughtTogetherId)
    : undefined;
  const [includeBundleItem, setIncludeBundleItem] = useState(true);

  // Discount math
  const discount = product.compareAt
    ? Math.round((1 - product.price / product.compareAt) * 100)
    : null;
  const savings = product.compareAt ? product.compareAt - product.price : 0;
  const installment = (product.price / 4).toFixed(2);

  // Bundle calculations
  const bundleDiscount = product.bundleDiscountPercent ?? 15;
  const totalBundleOriginal = bundleProduct ? product.price + bundleProduct.price : product.price;
  const totalBundlePrice = bundleProduct
    ? (product.price + bundleProduct.price) * (1 - bundleDiscount / 100)
    : product.price;
  const totalBundleSavings = totalBundleOriginal - totalBundlePrice;

  // Add to cart handler
  const handleAddToCart = () => {
    add(product, qty, {
      color: product.colors[selectedColorIndex]?.name,
      size: selectedSize,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  // Add bundle to cart handler
  const handleAddBundle = () => {
    add(product, 1, {
      color: product.colors[selectedColorIndex]?.name,
      size: selectedSize,
    });
    if (bundleProduct && includeBundleItem) {
      add(bundleProduct, 1, {
        color: bundleProduct.colors[0]?.name,
        size: bundleProduct.sizes?.[0]?.label,
      });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleUpvoteHelpful = (reviewId: string) => {
    if (helpfulVoted[reviewId]) return;
    setHelpfulVoted((prev) => ({ ...prev, [reviewId]: true }));
    setReviewsList((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r)),
    );
  };

  // Filter reviews
  const displayedReviews = useMemo(() => {
    if (reviewFilter === "all") return reviewsList;
    return reviewsList.filter((r) => r.rating === reviewFilter);
  }, [reviewsList, reviewFilter]);

  // Related products
  const relatedProducts = useMemo(() => {
    return products
      .filter(
        (p) =>
          p.id !== product.id && (p.category === product.category || p.badge === "Best Seller"),
      )
      .slice(0, 3);
  }, [product]);

  return (
    <>
      <AnnouncementBar />
      <SiteNav />

      <main className="min-h-screen bg-background pb-20">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-border/60 bg-sand/20">
          <div className="mx-auto flex max-w-7xl items-center gap-2 px-5 py-3 text-xs text-muted-foreground lg:px-8">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <Link to="/collections" className="hover:text-foreground transition-colors">
              Collections
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <Link
              to="/collections/$slug"
              params={{
                slug: product.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-"),
              }}
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>
        </div>

        {/* Primary Viewport: Contiguous Product Showcase (1440px Desktop Grid) */}
        <div className="mx-auto max-w-7xl px-5 pt-8 lg:px-8 lg:pt-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* LEFT COLUMN: Gallery & Media (7 cols) */}
            <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-6">
              <div className="flex flex-col-reverse gap-4 sm:flex-row">
                {/* Thumbnails strip */}
                {galleryImages.length > 1 && (
                  <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0 shrink-0">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        aria-label={`View photo ${idx + 1}`}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative size-18 sm:size-20 overflow-hidden rounded-2xl border-2 transition-all ${
                          activeImageIndex === idx
                            ? "border-accent ring-2 ring-accent/30 scale-102"
                            : "border-border hover:border-foreground/30 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${product.name} angle ${idx + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Main Viewport */}
                <div className="group relative flex-1 overflow-hidden rounded-3xl bg-sand shadow-soft border border-border/80">
                  <div className="aspect-4/5 w-full overflow-hidden">
                    <img
                      src={galleryImages[activeImageIndex] || product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute left-4 top-4 flex flex-col gap-2 pointer-events-none">
                    {product.badge && (
                      <span className="rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    {discount && (
                      <span className="rounded-full bg-accent px-3 py-1 text-[11px] font-bold text-accent-foreground shadow-sm">
                        −{discount}% Off
                      </span>
                    )}
                  </div>

                  {/* Actions Over Main Image */}
                  <div className="absolute right-4 top-4 flex items-center gap-2">
                    <button
                      type="button"
                      aria-label={copiedShare ? "Link copied" : "Share product"}
                      onClick={handleShare}
                      className="grid size-10 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur hover:bg-card transition-colors"
                    >
                      {copiedShare ? (
                        <Check className="size-4 text-emerald-600" />
                      ) : (
                        <Share2 className="size-4 text-foreground" />
                      )}
                    </button>
                    <button
                      type="button"
                      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
                      onClick={() => setWished((v) => !v)}
                      className="grid size-10 place-items-center rounded-full bg-card/90 shadow-soft backdrop-blur hover:bg-card transition-colors"
                    >
                      <Heart
                        className={`size-4 ${
                          wished ? "fill-accent text-accent" : "text-foreground"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Social Proof & Activity Notification */}
              <div className="flex items-center gap-3 rounded-2xl border border-border/80 bg-sand/40 p-4 text-xs">
                <span className="grid size-8 place-items-center rounded-xl bg-accent/15 text-accent shrink-0">
                  <Zap className="size-4" />
                </span>
                <p className="leading-snug text-muted-foreground">
                  <strong className="text-foreground font-semibold">High Demand:</strong> 18
                  shoppers have viewed this item in the last hour. Only{" "}
                  <span className="font-bold text-accent">{product.stock} units</span> remain in our
                  warehouse.
                </p>
              </div>

              {/* Secondary Accordion / Information Panels */}
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft divide-y divide-border/80">
                {/* Details Tab */}
                <div className="py-4 first:pt-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "details" ? "materials" : "details")}
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-foreground"
                  >
                    <span>Overview & Highlights</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform ${
                        activeTab === "details" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeTab === "details" && (
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground space-y-3">
                      <p>{product.description}</p>
                      <ul className="list-disc pl-5 space-y-1">
                        {product.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Materials Tab */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveTab(activeTab === "materials" ? "shipping" : "materials")
                    }
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-foreground"
                  >
                    <span>Materials & Craftsmanship</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform ${
                        activeTab === "materials" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeTab === "materials" && (
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground space-y-2">
                      <p>
                        <strong className="text-foreground">Fabric & Composition:</strong>{" "}
                        {product.materials}
                      </p>
                      {product.dimensions && (
                        <p>
                          <strong className="text-foreground">Dimensions & Fit:</strong>{" "}
                          {product.dimensions}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Shipping Tab */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "shipping" ? "care" : "shipping")}
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-foreground"
                  >
                    <span>Shipping & Free 30-Day Returns</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform ${
                        activeTab === "shipping" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeTab === "shipping" && (
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground space-y-2">
                      <p>{product.shippingInfo}</p>
                      <p>
                        We include pre-paid return labels in every parcel. No questions asked return
                        window within 30 days of doorstep receipt.
                      </p>
                    </div>
                  )}
                </div>

                {/* Care Tab */}
                <div className="py-4 last:pb-0">
                  <button
                    type="button"
                    onClick={() => setActiveTab(activeTab === "care" ? "details" : "care")}
                    className="flex w-full items-center justify-between text-left font-display text-sm font-bold text-foreground"
                  >
                    <span>Care Instructions & Longevity</span>
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform ${
                        activeTab === "care" ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeTab === "care" && (
                    <div className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      <p>{product.care}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Contiguous Sticky Purchase Module (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
              <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-card">
                {/* Brand / Category Kicker (Unboxed text) */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold uppercase tracking-wider text-accent">
                    SHOPEASE ATELIER · {product.category}
                  </span>
                  {product.stock <= 10 && (
                    <span className="font-semibold text-accent">
                      Only {product.stock} units left
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground text-balance">
                  {product.name}
                </h1>
                <p className="mt-1 text-xs text-muted-foreground leading-normal">
                  {product.subtitle}
                </p>

                {/* Rating & Review Jump Link */}
                <div className="mt-3 flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`size-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    ))}
                  </div>
                  <a
                    href="#customer-reviews"
                    className="font-semibold text-foreground hover:underline tabular-nums"
                  >
                    {product.rating} ({product.reviews} verified reviews)
                  </a>
                </div>

                {/* Pricing Block */}
                <div className="mt-5 rounded-2xl border border-border/80 bg-sand/30 p-4">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-3xl font-black tracking-tight text-foreground tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAt && (
                      <span className="text-base text-muted-foreground line-through tabular-nums">
                        {formatPrice(product.compareAt)}
                      </span>
                    )}
                    {discount && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-accent-foreground">
                        Save {formatPrice(savings)} ({discount}%)
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[11px] text-muted-foreground">
                    Or 4 interest-free payments of <strong>${installment}</strong> with Klarna,
                    Afterpay, or Affirm.
                  </p>
                </div>

                {/* Color Swatch Selector */}
                {product.colors.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">
                        Color:{" "}
                        <span className="font-normal text-muted-foreground">
                          {product.colors[selectedColorIndex]?.name}
                        </span>
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2.5">
                      {product.colors.map((c, idx) => (
                        <button
                          key={c.name}
                          type="button"
                          aria-label={`Select color ${c.name}`}
                          onClick={() => setSelectedColorIndex(idx)}
                          style={{ backgroundColor: c.value }}
                          className={`size-8 rounded-full border border-border transition-all ${
                            selectedColorIndex === idx
                              ? "ring-2 ring-accent ring-offset-2 scale-105"
                              : "hover:scale-105"
                          }`}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-foreground">Select Size</span>
                      <button
                        type="button"
                        onClick={() => setSizeGuideOpen(true)}
                        className="inline-flex items-center gap-1 text-accent font-semibold hover:underline"
                      >
                        <HelpCircle className="size-3" /> Size & Fit Guide
                      </button>
                    </div>
                    <div className="mt-2.5 grid grid-cols-5 gap-2">
                      {product.sizes.map((s) => (
                        <button
                          key={s.label}
                          type="button"
                          disabled={!s.available}
                          onClick={() => setSelectedSize(s.label)}
                          className={`rounded-xl border py-2.5 text-xs font-semibold transition-all ${
                            selectedSize === s.label
                              ? "border-primary bg-primary text-primary-foreground shadow-sm"
                              : s.available
                                ? "border-border bg-card hover:border-foreground/40 hover:bg-secondary text-foreground"
                                : "border-border/40 text-muted-foreground/40 line-through cursor-not-allowed bg-secondary/30"
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Add to Cart Area */}
                <div className="mt-6 flex items-center gap-3">
                  {/* Stepper */}
                  <div className="flex items-center rounded-2xl border border-border bg-secondary/50 p-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold tabular-nums">{qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                      className="grid size-9 place-items-center rounded-xl text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>

                  {/* Primary Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent-gradient py-3.5 px-6 font-display text-sm font-bold text-accent-foreground shadow-card transition-all hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="size-4.5" /> Added to Bag
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="size-4.5" />
                        <span>Add to Bag · {formatPrice(product.price * qty)}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Fast Checkout Option */}
                <button
                  type="button"
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="mt-3 w-full rounded-2xl border border-border bg-foreground py-3 text-xs font-bold text-background transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  ⚡ Express Checkout (1-Click Buy)
                </button>

                {/* Free Delivery Meter */}
                <div className="mt-5 border-t border-border pt-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                    <Truck className="size-4 shrink-0 text-emerald-600" />
                    <span>Free Worldwide Express Shipping Included</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">
                    Dispatches in 24 hours. Expected delivery in 2–4 business days.
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-t border-border pt-4 text-[11px] text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
                    <span>30-Day Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="size-4 text-accent shrink-0" />
                    <span>Pre-paid Free Global Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="size-4 text-foreground shrink-0" />
                    <span>256-Bit SSL Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-accent shrink-0" />
                    <span>100% Certified Authentic Origin</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FREQUENTLY BOUGHT TOGETHER / BUNDLE & SAVE MODULE */}
          {bundleProduct && (
            <section className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Curated Pairings
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Frequently Bought Together
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bundle these complementary essentials and enjoy an automatic {bundleDiscount}%
                  discount.
                </p>
              </div>

              <div className="mt-8 flex flex-col lg:flex-row lg:items-center gap-8 justify-between border-t border-border pt-6">
                {/* Images Pairing */}
                <div className="flex items-center gap-4">
                  <div className="relative size-24 sm:size-28 rounded-2xl overflow-hidden bg-sand border border-border shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="grid size-8 place-items-center rounded-full bg-secondary font-bold text-foreground text-sm">
                    +
                  </span>
                  <div className="relative size-24 sm:size-28 rounded-2xl overflow-hidden bg-sand border border-border shrink-0">
                    <img
                      src={bundleProduct.image}
                      alt={bundleProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="ml-2 flex flex-col justify-center">
                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={includeBundleItem}
                        onChange={(e) => setIncludeBundleItem(e.target.checked)}
                        className="accent-accent"
                        id="bundle-check"
                      />
                      <label htmlFor="bundle-check" className="font-semibold cursor-pointer">
                        Pair with {bundleProduct.name}
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {bundleProduct.subtitle}
                    </p>
                    <span className="text-xs font-bold mt-1 text-foreground">
                      {formatPrice(bundleProduct.price)}
                    </span>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 lg:text-right">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl font-black text-foreground tabular-nums">
                        {formatPrice(includeBundleItem ? totalBundlePrice : product.price)}
                      </span>
                      {includeBundleItem && (
                        <span className="text-sm text-muted-foreground line-through tabular-nums">
                          {formatPrice(totalBundleOriginal)}
                        </span>
                      )}
                    </div>
                    {includeBundleItem && (
                      <p className="text-xs font-semibold text-emerald-700">
                        Bundle Savings: {formatPrice(totalBundleSavings)} ({bundleDiscount}% off)
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleAddBundle}
                    className="rounded-2xl bg-primary px-6 py-3.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-transform hover:-translate-y-0.5 whitespace-nowrap"
                  >
                    Add {includeBundleItem ? "Bundle" : "Item"} to Bag
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* CUSTOMER REVIEWS & RATINGS BREAKDOWN */}
          <section
            id="customer-reviews"
            className="mt-16 rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-soft"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-accent">
                  Community Feedback
                </span>
                <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Verified Customer Reviews
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setReviewModalOpen(true)}
                className="rounded-full border border-border bg-secondary/80 px-5 py-2.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors self-start sm:self-auto"
              >
                Write a Review
              </button>
            </div>

            {/* Scoreboard and Star Distribution */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-border pb-8">
              {/* Overall Score */}
              <div className="md:col-span-4 text-center md:text-left md:border-r md:border-border md:pr-8">
                <span className="font-display text-5xl font-black text-foreground tabular-nums">
                  {product.rating}
                </span>
                <span className="text-base text-muted-foreground font-medium"> / 5.0</span>
                <div className="mt-2 flex items-center justify-center md:justify-start gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Based on <strong>{product.reviews}</strong> verified owner reviews
                </p>
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  ✓ 98% of customers recommend this product
                </p>
              </div>

              {/* Breakdown Bars */}
              <div className="md:col-span-8 space-y-2">
                {[
                  { stars: 5, pct: 86, count: 184 },
                  { stars: 4, pct: 10, count: 22 },
                  { stars: 3, pct: 3, count: 6 },
                  { stars: 2, pct: 1, count: 2 },
                  { stars: 1, pct: 0, count: 0 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-xs">
                    <span className="w-12 font-medium text-foreground tabular-nums">
                      {row.stars} stars
                    </span>
                    <div className="h-2 flex-1 rounded-full bg-secondary overflow-hidden">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-muted-foreground tabular-nums">
                      {row.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filter reviews by star */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground mr-2">Filter by:</span>
              <button
                type="button"
                onClick={() => setReviewFilter("all")}
                className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                  reviewFilter === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                }`}
              >
                All Reviews ({reviewsList.length})
              </button>
              {[5, 4, 3].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setReviewFilter(rating)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    reviewFilter === rating
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  {rating} Stars
                </button>
              ))}
            </div>

            {/* Reviews List */}
            <div className="mt-8 divide-y divide-border/60">
              {displayedReviews.map((rev) => (
                <article key={rev.id} className="py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground">{rev.author}</span>
                      {rev.verified && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 px-2 py-0.5 text-[10px] font-semibold">
                          <CheckCircle2 className="size-3" /> Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{rev.date}</span>
                  </div>

                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-accent">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3 ${
                            i < rev.rating ? "fill-accent text-accent" : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    {rev.variant && (
                      <span className="text-xs text-muted-foreground">
                        · Purchased {rev.variant}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-2 text-sm font-bold text-foreground">{rev.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {rev.content}
                  </p>

                  <div className="mt-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleUpvoteHelpful(rev.id)}
                      className={`inline-flex items-center gap-1 text-xs transition-colors ${
                        helpfulVoted[rev.id]
                          ? "text-emerald-700 font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <ThumbsUp className="size-3" />
                      <span>Helpful ({rev.helpfulCount})</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* COMPLEMENTARY / RELATED PRODUCTS */}
          {relatedProducts.length > 0 && (
            <section className="mt-16">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    You Might Also Like
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-foreground">
                    Complete The Look
                  </h2>
                </div>
                <Link
                  to="/collections"
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  View All Products →
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* MOBILE STICKY BOTTOM BUY BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 p-3.5 backdrop-blur-xl lg:hidden shadow-lift">
        <div className="mx-auto flex max-w-md items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={product.image}
              alt={product.name}
              className="size-11 rounded-xl bg-sand object-cover shrink-0"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold leading-tight truncate">{product.name}</p>
              <p className="text-xs font-extrabold text-foreground tabular-nums">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full bg-accent-gradient px-5 py-2.5 text-xs font-bold text-accent-foreground shadow-sm shrink-0 whitespace-nowrap"
          >
            Add to Bag
          </button>
        </div>
      </div>

      {/* SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setSizeGuideOpen(false)}
          />
          <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-lift z-10">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-display text-base font-bold text-foreground">
                Fit & Sizing Guide
              </h3>
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="grid size-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              All measurements refer to body size, not garment dimensions. When between sizes, order
              the larger size for a relaxed look or the smaller size for a closer fit.
            </p>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-foreground">
                    <th className="py-2 font-semibold">Size</th>
                    <th className="py-2 font-semibold">Chest (Inches)</th>
                    <th className="py-2 font-semibold">Length (Inches)</th>
                    <th className="py-2 font-semibold">Sleeve (Inches)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  <tr>
                    <td className="py-2 font-bold text-foreground">S</td>
                    <td className="py-2 tabular-nums">36–38"</td>
                    <td className="py-2 tabular-nums">27"</td>
                    <td className="py-2 tabular-nums">33"</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-foreground">M</td>
                    <td className="py-2 tabular-nums">39–41"</td>
                    <td className="py-2 tabular-nums">28"</td>
                    <td className="py-2 tabular-nums">34"</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-foreground">L</td>
                    <td className="py-2 tabular-nums">42–44"</td>
                    <td className="py-2 tabular-nums">29"</td>
                    <td className="py-2 tabular-nums">35"</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-foreground">XL</td>
                    <td className="py-2 tabular-nums">45–47"</td>
                    <td className="py-2 tabular-nums">30"</td>
                    <td className="py-2 tabular-nums">36"</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-bold text-foreground">XXL</td>
                    <td className="py-2 tabular-nums">48–50"</td>
                    <td className="py-2 tabular-nums">31"</td>
                    <td className="py-2 tabular-nums">37"</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSizeGuideOpen(false)}
                className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW MODAL */}
      {reviewModalOpen && (
        <WriteReviewModal
          productName={product.name}
          onClose={() => setReviewModalOpen(false)}
          onSubmit={(newReview) => {
            setReviewsList((prev) => [newReview, ...prev]);
            setReviewModalOpen(false);
          }}
        />
      )}

      <SiteFooter />
    </>
  );
}

function WriteReviewModal({
  productName,
  onClose,
  onSubmit,
}: {
  productName: string;
  onClose: () => void;
  onSubmit: (review: ProductReview) => void;
}) {
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [variant, setVariant] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !content.trim()) return;

    onSubmit({
      id: `r_${Date.now()}`,
      author: author.trim(),
      rating,
      date: "Just now",
      verified: true,
      title: title.trim(),
      content: content.trim(),
      helpfulCount: 0,
      variant: variant.trim() || undefined,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-primary/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-lift z-10">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground">
              Review {productName}
            </h3>
            <p className="text-xs text-muted-foreground">Share your verified owner experience</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full hover:bg-secondary text-muted-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {/* Rating stars */}
          <div>
            <label className="text-xs font-semibold text-foreground">Rating</label>
            <div className="mt-1.5 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="grid size-8 place-items-center text-accent hover:scale-110 transition-transform"
                >
                  <Star
                    className={`size-5 ${
                      star <= rating ? "fill-accent text-accent" : "text-muted-foreground/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Your Name</label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Jordan Miller"
              className="mt-1 w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">
              Purchased Option (Optional)
            </label>
            <input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              placeholder="e.g. Forest Green / L"
              className="mt-1 w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Review Headline</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Exceptional hand-feel and proportion"
              className="mt-1 w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground">Detailed Feedback</label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="How does the fabric, fit, or acoustic performance hold up?"
              className="mt-1 w-full rounded-xl border border-border bg-card px-3.5 py-2 text-xs outline-none focus:border-accent resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-4 py-2 text-xs font-medium hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground hover:bg-primary/90"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
