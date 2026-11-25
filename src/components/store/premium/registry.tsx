import type { ReactNode } from "react";
import type { BaseSectionProps } from "./shared";
import { EditorialSplitHero } from "./hero/EditorialSplitHero";
import { FullWidthImmersiveHero } from "./hero/FullWidthImmersiveHero";
import { AdvancedHeroSlideshow } from "./hero/AdvancedHeroSlideshow";
import { VideoBackgroundHero } from "./hero/VideoBackgroundHero";
import { CinematicHero } from "./hero/CinematicHero";
import { CollageHero } from "./hero/CollageHero";
import { DualPromotionalBanner } from "./hero/DualPromotionalBanner";
import { TripleImagePromotionalGrid } from "./hero/TripleImagePromotionalGrid";
import { SplitImagePromotionalBanner } from "./hero/SplitImagePromotionalBanner";
import { FloatingProductShowcaseHero } from "./hero/FloatingProductShowcaseHero";
import { FeaturedCollectionGrid } from "./product/FeaturedCollectionGrid";
import { FeaturedCollectionCarousel } from "./product/FeaturedCollectionCarousel";
import { TabbedProductCollections } from "./product/TabbedProductCollections";
import { BestSellersShowcase } from "./product/BestSellersShowcase";
import { TrendingProducts } from "./product/TrendingProducts";
import { ProductSpotlight } from "./product/ProductSpotlight";
import { ProductComparison } from "./product/ProductComparison";
import { RecentlyViewedProducts } from "./product/RecentlyViewedProducts";
import { FrequentlyBoughtTogether } from "./product/FrequentlyBoughtTogether";
import { CompleteTheLook } from "./product/CompleteTheLook";
import { ProductBundleShowcase } from "./product/ProductBundleShowcase";
import { RecentlyRestockedProducts } from "./product/RecentlyRestockedProducts";
import { EditorialImageWithText } from "./editorial/EditorialImageWithText";
import { BrandStorySection } from "./editorial/BrandStorySection";
import { InteractiveLookbook } from "./editorial/InteractiveLookbook";
import { AsymmetricImageGrid } from "./editorial/AsymmetricImageGrid";
import { EditorialImageCollage } from "./editorial/EditorialImageCollage";
import { FullWidthEditorialImage } from "./editorial/FullWidthEditorialImage";
import { BrandPhilosophy } from "./editorial/BrandPhilosophy";
import { CraftsmanshipAndProcess } from "./editorial/CraftsmanshipAndProcess";
import { JournalHighlights } from "./editorial/JournalHighlights";
import { EditorialQuote } from "./editorial/EditorialQuote";
import { CountdownPromotionalBanner } from "./promotional/CountdownPromotionalBanner";
import { FlashSaleShowcase } from "./promotional/FlashSaleShowcase";
import { DealOfDayAlternativeLayout } from "./promotional/DealOfDayAlternativeLayout";
import { AnimatedPromotionalMarquee } from "./promotional/AnimatedPromotionalMarquee";
import { LargeDiscountCallout } from "./promotional/LargeDiscountCallout";
import { ProductBundlePromotion } from "./promotional/ProductBundlePromotion";
import { FreeShippingProgressBanner } from "./promotional/FreeShippingProgressBanner";
import { LimitedStockPromotion } from "./promotional/LimitedStockPromotion";
import { GiftCardPromotion } from "./promotional/GiftCardPromotion";
import { PremiumNewsletterPromotion } from "./promotional/PremiumNewsletterPromotion";
import { VisualCategoryGrid } from "./collections/VisualCategoryGrid";
import { EditorialCollectionShowcase } from "./collections/EditorialCollectionShowcase";
import { HorizontalCollectionSlider } from "./collections/HorizontalCollectionSlider";
import { AsymmetricCollectionGrid } from "./collections/AsymmetricCollectionGrid";
import { FeaturedCollectionMosaic } from "./collections/FeaturedCollectionMosaic";
import { BrandDirectory } from "./collections/BrandDirectory";
import { ShopByLifestyle } from "./collections/ShopByLifestyle";
import { ShopByColour } from "./collections/ShopByColour";
import { AdvancedCustomerReviewCarousel } from "./social/AdvancedCustomerReviewCarousel";
import { EditorialTestimonials } from "./social/EditorialTestimonials";
import { InstagramStyleGallery } from "./social/InstagramStyleGallery";
import { ShoppableSocialGallery } from "./social/ShoppableSocialGallery";
import { PressAndPublications } from "./social/PressAndPublications";
import { AnimatedBrandLogoMarquee } from "./social/AnimatedBrandLogoMarquee";
import { AdvancedTrustIndicators } from "./social/AdvancedTrustIndicators";
import { BrandStatisticsCounter } from "./social/BrandStatisticsCounter";
import { InteractiveImageHotspots } from "./interactive/InteractiveImageHotspots";
import { BeforeAndAfterSlider } from "./interactive/BeforeAndAfterSlider";
import { InteractiveContentTabs } from "./interactive/InteractiveContentTabs";
import { ProductFeatureExplorer } from "./interactive/ProductFeatureExplorer";
import { HorizontalScrollStorytelling } from "./interactive/HorizontalScrollStorytelling";
import { InteractiveImageGallery } from "./interactive/InteractiveImageGallery";
import { VisualProductComparison } from "./interactive/VisualProductComparison";
import { AdvancedProductGallery } from "./product-page/AdvancedProductGallery";
import { StickyAddToCartPresentation } from "./product-page/StickyAddToCartPresentation";
import { ProductBenefitsGrid } from "./product-page/ProductBenefitsGrid";
import { TechnicalSpecificationsShowcase } from "./product-page/TechnicalSpecificationsShowcase";
import { EditorialProductDescription } from "./product-page/EditorialProductDescription";
import { ProductInformationAccordion } from "./product-page/ProductInformationAccordion";
import { ProductVideoShowcase } from "./product-page/ProductVideoShowcase";
import { SizeGuidePresentation } from "./product-page/SizeGuidePresentation";
import { ShippingAndReturnsInformation } from "./product-page/ShippingAndReturnsInformation";
import { AdvancedReviewPresentation } from "./product-page/AdvancedReviewPresentation";
import { ProductFAQ } from "./product-page/ProductFAQ";
import { RelatedProductsShowcase } from "./product-page/RelatedProductsShowcase";
import { CompleteTheSet } from "./product-page/CompleteTheSet";
import { RecentlyViewedShowcase } from "./product-page/RecentlyViewedShowcase";
import { ProductTrustAndGuaranteeInformation } from "./product-page/ProductTrustAndGuaranteeInformation";
import { CollectionHero } from "./collection-page/CollectionHero";
import { EditorialCollectionBanner } from "./collection-page/EditorialCollectionBanner";
import { CollectionIntroduction } from "./collection-page/CollectionIntroduction";
import { VisualSubcategoryNavigation } from "./collection-page/VisualSubcategoryNavigation";
import { AdvancedFilteringPresentation } from "./collection-page/AdvancedFilteringPresentation";
import { AdvancedSortingControls } from "./collection-page/AdvancedSortingControls";
import { ProductGridLayoutSwitcher } from "./collection-page/ProductGridLayoutSwitcher";
import { QuickAddPresentation } from "./collection-page/QuickAddPresentation";
import { LoadMorePaginationOptions } from "./collection-page/LoadMorePaginationOptions";
import { PromotionalCollectionBanner } from "./collection-page/PromotionalCollectionBanner";
import { AdvancedFAQAccordion } from "./content/AdvancedFAQAccordion";
import { ContactInformationShowcase } from "./content/ContactInformationShowcase";
import { PremiumContactForm } from "./content/PremiumContactForm";
import { StoreLocationPresentation } from "./content/StoreLocationPresentation";
import { BrandTimeline } from "./content/BrandTimeline";
import { TeamMembers } from "./content/TeamMembers";
import { NewsletterPopup } from "./content/NewsletterPopup";
import { PromotionalPopup } from "./content/PromotionalPopup";
import { RecentlyViewedDrawer } from "./content/RecentlyViewedDrawer";
import { WishlistPresentation } from "./content/WishlistPresentation";
import { ProductComparisonPresentation } from "./content/ProductComparisonPresentation";
import { FeaturedBlogArticles } from "./content/FeaturedBlogArticles";
import { RelatedBlogArticles } from "./content/RelatedBlogArticles";
import { RichTextEditorialSection } from "./content/RichTextEditorialSection";
import { CustomContentSection } from "./content/CustomContentSection";

export type CategoryCode = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J";

export type PremiumCategoryMeta = {
  code: CategoryCode;
  title: string;
  subtitle: string;
};

export type PremiumSectionDefinition = {
  id: number;
  slug: string;
  name: string;
  category: CategoryCode;
  description: string;
  importPath: string;
  customisableSettings: string[];
  render: (props: BaseSectionProps) => ReactNode;
};

export const PREMIUM_CATEGORIES: PremiumCategoryMeta[] = [
  { code: "A", title: "Hero & Promotional Experiences", subtitle: "Sections 01–10" },
  { code: "B", title: "Product Discovery", subtitle: "Sections 11–22" },
  { code: "C", title: "Editorial & Brand Storytelling", subtitle: "Sections 23–32" },
  { code: "D", title: "Promotional & Conversion", subtitle: "Sections 33–42" },
  { code: "E", title: "Collection & Category Experiences", subtitle: "Sections 43–50" },
  { code: "F", title: "Social Proof & Trust", subtitle: "Sections 51–58" },
  { code: "G", title: "Interactive Experiences", subtitle: "Sections 59–65" },
  { code: "H", title: "Additional Product Page Experiences", subtitle: "Sections 66–80" },
  { code: "I", title: "Collection Page Experiences", subtitle: "Sections 81–90" },
  { code: "J", title: "Supporting Content Sections", subtitle: "Sections 91–105" },
];

export const PREMIUM_SECTION_REGISTRY: PremiumSectionDefinition[] = [
  // Category A (1-10)
  {
    id: 1,
    slug: "editorial-split-hero",
    name: "Editorial Split Hero",
    category: "A",
    description:
      "Asymmetric two-column campaign opener pairing typographic copy with framed photography.",
    importPath: "@/components/store/premium/hero/EditorialSplitHero",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing", "ctaTo"],
    render: (p) => <EditorialSplitHero {...p} />,
  },
  {
    id: 2,
    slug: "full-width-immersive-hero",
    name: "Full-Width Immersive Hero",
    category: "A",
    description: "Edge-to-edge campaign canvas with atmospheric gradient scrim and twin CTAs.",
    importPath: "@/components/store/premium/hero/FullWidthImmersiveHero",
    customisableSettings: ["heading", "subheading", "description", "fullWidth", "spacing"],
    render: (p) => <FullWidthImmersiveHero {...p} />,
  },
  {
    id: 3,
    slug: "advanced-hero-slideshow",
    name: "Advanced Hero Slideshow",
    category: "A",
    description:
      "Multi-slide editorial carousel with keyboard arrows, dot index, and caption switcher.",
    importPath: "@/components/store/premium/hero/AdvancedHeroSlideshow",
    customisableSettings: ["surface", "spacing", "fullWidth", "slides"],
    render: (p) => <AdvancedHeroSlideshow {...p} />,
  },
  {
    id: 4,
    slug: "video-background-hero",
    name: "Video Background Hero",
    category: "A",
    description:
      "Motion-inspired ambient hero with play/pause kinetic toggle respecting reduced motion.",
    importPath: "@/components/store/premium/hero/VideoBackgroundHero",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <VideoBackgroundHero {...p} />,
  },
  {
    id: 5,
    slug: "cinematic-hero",
    name: "Cinematic Hero",
    category: "A",
    description: "Widescreen letterbox campaign frame with centered editorial display typography.",
    importPath: "@/components/store/premium/hero/CinematicHero",
    customisableSettings: ["heading", "subheading", "description", "align", "spacing"],
    render: (p) => <CinematicHero {...p} />,
  },
  {
    id: 6,
    slug: "collage-hero",
    name: "Collage Hero",
    category: "A",
    description:
      "Three-frame editorial mosaic uniting lookbook photography with primary collection CTA.",
    importPath: "@/components/store/premium/hero/CollageHero",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <CollageHero {...p} />,
  },
  {
    id: 7,
    slug: "dual-promotional-banner",
    name: "Dual Promotional Banner",
    category: "A",
    description: "Equal-weight 50/50 split highlighting two parallel studio departments.",
    importPath: "@/components/store/premium/hero/DualPromotionalBanner",
    customisableSettings: ["surface", "spacing", "fullWidth"],
    render: (p) => <DualPromotionalBanner {...p} />,
  },
  {
    id: 8,
    slug: "triple-image-promotional-grid",
    name: "Triple Image Promotional Grid",
    category: "A",
    description: "Three-column vertical showcase with direct category deep links.",
    importPath: "@/components/store/premium/hero/TripleImagePromotionalGrid",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <TripleImagePromotionalGrid {...p} />,
  },
  {
    id: 9,
    slug: "split-image-promotional-banner",
    name: "Split Image Promotional Banner",
    category: "A",
    description: "Reversible media-and-copy promotional band with subtle forest tint.",
    importPath: "@/components/store/premium/hero/SplitImagePromotionalBanner",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <SplitImagePromotionalBanner {...p} />,
  },
  {
    id: 10,
    slug: "floating-product-showcase-hero",
    name: "Floating Product Showcase Hero",
    category: "A",
    description: "Editorial hero paired with live floating product card and quick Add to Bag.",
    importPath: "@/components/store/premium/hero/FloatingProductShowcaseHero",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <FloatingProductShowcaseHero {...p} />,
  },

  // Category B (11-22)
  {
    id: 11,
    slug: "featured-collection-grid",
    name: "Featured Collection Grid",
    category: "B",
    description: "Configurable 4-column merchandising grid reusing native ProductCard components.",
    importPath: "@/components/store/premium/product/FeaturedCollectionGrid",
    customisableSettings: ["heading", "subheading", "collectionSlug", "surface", "spacing"],
    render: (p) => <FeaturedCollectionGrid {...p} />,
  },
  {
    id: 12,
    slug: "featured-collection-carousel",
    name: "Featured Collection Carousel",
    category: "B",
    description: "Horizontal scrolling product rail with arrow navigation controls.",
    importPath: "@/components/store/premium/product/FeaturedCollectionCarousel",
    customisableSettings: ["heading", "subheading", "collectionSlug", "surface", "spacing"],
    render: (p) => <FeaturedCollectionCarousel {...p} />,
  },
  {
    id: 13,
    slug: "tabbed-product-collections",
    name: "Tabbed Product Collections",
    category: "B",
    description: "Interactive collection tabs switching curated catalog subsets in-place.",
    importPath: "@/components/store/premium/product/TabbedProductCollections",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <TabbedProductCollections {...p} />,
  },
  {
    id: 14,
    slug: "best-sellers-showcase",
    name: "Best Sellers Showcase",
    category: "B",
    description: "Ranked top-reviewed silhouettes with editorial highlight lead card.",
    importPath: "@/components/store/premium/product/BestSellersShowcase",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <BestSellersShowcase {...p} />,
  },
  {
    id: 15,
    slug: "trending-products",
    name: "Trending Products",
    category: "B",
    description: "Live-ranked trending items powered by getTrendingProducts() scoring.",
    importPath: "@/components/store/premium/product/TrendingProducts",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <TrendingProducts {...p} />,
  },
  {
    id: 16,
    slug: "product-spotlight",
    name: "Product Spotlight",
    category: "B",
    description: "Single-object deep dive with variant swatches, highlights, and instant bag add.",
    importPath: "@/components/store/premium/product/ProductSpotlight",
    customisableSettings: ["heading", "subheading", "productId", "surface", "spacing"],
    render: (p) => <ProductSpotlight {...p} />,
  },
  {
    id: 17,
    slug: "product-comparison",
    name: "Product Comparison",
    category: "B",
    description: "Structured comparison strip contrasting materials, dimensions, and pricing.",
    importPath: "@/components/store/premium/product/ProductComparison",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductComparison {...p} />,
  },
  {
    id: 18,
    slug: "recently-viewed-products",
    name: "Recently Viewed Products",
    category: "B",
    description: "Horizontal recovery strip resurfacing recently inspected items.",
    importPath: "@/components/store/premium/product/RecentlyViewedProducts",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RecentlyViewedProducts {...p} />,
  },
  {
    id: 19,
    slug: "frequently-bought-together",
    name: "Frequently Bought Together",
    category: "B",
    description: "Interactive multi-item pairing module calculating live bundled savings.",
    importPath: "@/components/store/premium/product/FrequentlyBoughtTogether",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <FrequentlyBoughtTogether {...p} />,
  },
  {
    id: 20,
    slug: "complete-the-look",
    name: "Complete the Look",
    category: "B",
    description:
      "Editorial lookbook pairing garments, leather goods, and eyewear in one bag action.",
    importPath: "@/components/store/premium/product/CompleteTheLook",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <CompleteTheLook {...p} />,
  },
  {
    id: 21,
    slug: "product-bundle-showcase",
    name: "Product Bundle Showcase",
    category: "B",
    description: "Curated multi-piece sets with transparent compare-at pricing and savings badge.",
    importPath: "@/components/store/premium/product/ProductBundleShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductBundleShowcase {...p} />,
  },
  {
    id: 22,
    slug: "recently-restocked-products",
    name: "Recently Restocked Products",
    category: "B",
    description: "Inventory alert grid spotlighting returning low-stock studio favorites.",
    importPath: "@/components/store/premium/product/RecentlyRestockedProducts",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RecentlyRestockedProducts {...p} />,
  },

  // Category C (23-32)
  {
    id: 23,
    slug: "editorial-image-with-text",
    name: "Editorial Image with Text",
    category: "C",
    description: "Balanced split narrative layout with configurable left/right media alignment.",
    importPath: "@/components/store/premium/editorial/EditorialImageWithText",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <EditorialImageWithText {...p} />,
  },
  {
    id: 24,
    slug: "brand-story-section",
    name: "Brand Story Section",
    category: "C",
    description:
      "Architectural narrative block pairing atelier provenance with key studio metrics.",
    importPath: "@/components/store/premium/editorial/BrandStorySection",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <BrandStorySection {...p} />,
  },
  {
    id: 25,
    slug: "interactive-lookbook",
    name: "Interactive Lookbook",
    category: "C",
    description:
      "Clickable seasonal scenes with live linked garment cards beside the editorial frame.",
    importPath: "@/components/store/premium/editorial/InteractiveLookbook",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <InteractiveLookbook {...p} />,
  },
  {
    id: 26,
    slug: "asymmetric-image-grid",
    name: "Asymmetric Image Grid",
    category: "C",
    description: "Staggered gallery composition highlighting textures, proportions, and craft.",
    importPath: "@/components/store/premium/editorial/AsymmetricImageGrid",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AsymmetricImageGrid {...p} />,
  },
  {
    id: 27,
    slug: "editorial-image-collage",
    name: "Editorial Image Collage",
    category: "C",
    description: "Four-image studio moodboard with understated typographic index captioning.",
    importPath: "@/components/store/premium/editorial/EditorialImageCollage",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <EditorialImageCollage {...p} />,
  },
  {
    id: 28,
    slug: "full-width-editorial-image",
    name: "Full-Width Editorial Image",
    category: "C",
    description: "Widescreen panoramic visual breather anchored by crisp bottom caption overlay.",
    importPath: "@/components/store/premium/editorial/FullWidthEditorialImage",
    customisableSettings: ["heading", "subheading", "description", "fullWidth", "spacing"],
    render: (p) => <FullWidthEditorialImage {...p} />,
  },
  {
    id: 29,
    slug: "brand-philosophy",
    name: "Brand Philosophy",
    category: "C",
    description:
      "Three numbered design pillars articulating longevity, materiality, and restraint.",
    importPath: "@/components/store/premium/editorial/BrandPhilosophy",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <BrandPhilosophy {...p} />,
  },
  {
    id: 30,
    slug: "craftsmanship-and-process",
    name: "Craftsmanship and Process",
    category: "C",
    description:
      "Interactive step switcher exploring sourcing, milling, finishing, and inspection.",
    importPath: "@/components/store/premium/editorial/CraftsmanshipAndProcess",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <CraftsmanshipAndProcess {...p} />,
  },
  {
    id: 31,
    slug: "journal-highlights",
    name: "Journal Highlights",
    category: "C",
    description: "Editorial article preview cards linking cultural dispatches to studio pieces.",
    importPath: "@/components/store/premium/editorial/JournalHighlights",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <JournalHighlights {...p} />,
  },
  {
    id: 32,
    slug: "editorial-quote",
    name: "Editorial Quote",
    category: "C",
    description:
      "Monolith typographic manifesto pull-quote with configurable surface and alignment.",
    importPath: "@/components/store/premium/editorial/EditorialQuote",
    customisableSettings: ["heading", "subheading", "align", "surface", "spacing"],
    render: (p) => <EditorialQuote {...p} />,
  },

  // Category D (33-42)
  {
    id: 33,
    slug: "countdown-promotional-banner",
    name: "Countdown Promotional Banner",
    category: "D",
    description:
      "Live ticking campaign timer band with deep forest contrast and direct collection CTA.",
    importPath: "@/components/store/premium/promotional/CountdownPromotionalBanner",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <CountdownPromotionalBanner {...p} />,
  },
  {
    id: 34,
    slug: "flash-sale-showcase",
    name: "Flash Sale Showcase",
    category: "D",
    description: "Time-boxed markdown rail displaying percentage savings and live stock counts.",
    importPath: "@/components/store/premium/promotional/FlashSaleShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <FlashSaleShowcase {...p} />,
  },
  {
    id: 35,
    slug: "deal-of-day-alternative-layout",
    name: "Deal of the Day Alternative Layout",
    category: "D",
    description:
      "Architectural split layout showcasing daily featured pricing without touching native DealOfDay.",
    importPath: "@/components/store/premium/promotional/DealOfDayAlternativeLayout",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <DealOfDayAlternativeLayout {...p} />,
  },
  {
    id: 36,
    slug: "animated-promotional-marquee",
    name: "Animated Promotional Marquee",
    category: "D",
    description:
      "Continuous tactile announcement ribbon with pause-on-hover and reduced-motion support.",
    importPath: "@/components/store/premium/promotional/AnimatedPromotionalMarquee",
    customisableSettings: ["surface", "spacing", "fullWidth"],
    render: (p) => <AnimatedPromotionalMarquee {...p} />,
  },
  {
    id: 37,
    slug: "large-discount-callout",
    name: "Large Discount Callout",
    category: "D",
    description: "High-impact numerical promotional statement paired with copyable reward code.",
    importPath: "@/components/store/premium/promotional/LargeDiscountCallout",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <LargeDiscountCallout {...p} />,
  },
  {
    id: 38,
    slug: "product-bundle-promotion",
    name: "Product Bundle Promotion",
    category: "D",
    description: "Conversion-focused duo builder adding paired essentials at bundle discount.",
    importPath: "@/components/store/premium/promotional/ProductBundlePromotion",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductBundlePromotion {...p} />,
  },
  {
    id: 39,
    slug: "free-shipping-progress-banner",
    name: "Free Shipping Progress Banner",
    category: "D",
    description:
      "Live cart-aware shipping threshold bar reacting in real time to useCart() subtotal.",
    importPath: "@/components/store/premium/promotional/FreeShippingProgressBanner",
    customisableSettings: ["heading", "surface", "spacing"],
    render: (p) => <FreeShippingProgressBanner {...p} />,
  },
  {
    id: 40,
    slug: "limited-stock-promotion",
    name: "Limited Stock Promotion",
    category: "D",
    description: "Editorial low-inventory scarcity showcase driven by catalog stock levels.",
    importPath: "@/components/store/premium/promotional/LimitedStockPromotion",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <LimitedStockPromotion {...p} />,
  },
  {
    id: 41,
    slug: "gift-card-promotion",
    name: "Gift Card Promotion",
    category: "D",
    description: "Digital & boxed gift card selector with interactive denomination buttons.",
    importPath: "@/components/store/premium/promotional/GiftCardPromotion",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <GiftCardPromotion {...p} />,
  },
  {
    id: 42,
    slug: "premium-newsletter-promotion",
    name: "Premium Newsletter Promotion",
    category: "D",
    description:
      "Split-frame private dispatch opt-in preserving existing homepage Newsletter intact.",
    importPath: "@/components/store/premium/promotional/PremiumNewsletterPromotion",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <PremiumNewsletterPromotion {...p} />,
  },

  // Category E (43-50)
  {
    id: 43,
    slug: "visual-category-grid",
    name: "Visual Category Grid",
    category: "E",
    description: "Six-column photographic department index linking directly to category archives.",
    importPath: "@/components/store/premium/collections/VisualCategoryGrid",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <VisualCategoryGrid {...p} />,
  },
  {
    id: 44,
    slug: "editorial-collection-showcase",
    name: "Editorial Collection Showcase",
    category: "E",
    description: "Large editorial collection cards with curator summaries and piece counts.",
    importPath: "@/components/store/premium/collections/EditorialCollectionShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <EditorialCollectionShowcase {...p} />,
  },
  {
    id: 45,
    slug: "horizontal-collection-slider",
    name: "Horizontal Collection Slider",
    category: "E",
    description: "Scroll-snap horizontal collection rail with smooth arrow pagination.",
    importPath: "@/components/store/premium/collections/HorizontalCollectionSlider",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <HorizontalCollectionSlider {...p} />,
  },
  {
    id: 46,
    slug: "asymmetric-collection-grid",
    name: "Asymmetric Collection Grid",
    category: "E",
    description: "Bento-style multi-aspect collection layout prioritizing hero assortments.",
    importPath: "@/components/store/premium/collections/AsymmetricCollectionGrid",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AsymmetricCollectionGrid {...p} />,
  },
  {
    id: 47,
    slug: "featured-collection-mosaic",
    name: "Featured Collection Mosaic",
    category: "E",
    description: "Magazine-inspired mosaic grouping four primary categories into balanced tiles.",
    importPath: "@/components/store/premium/collections/FeaturedCollectionMosaic",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <FeaturedCollectionMosaic {...p} />,
  },
  {
    id: 48,
    slug: "brand-directory",
    name: "Brand Directory",
    category: "E",
    description: "Structured typographic index of all collections, departments, and featured SKUs.",
    importPath: "@/components/store/premium/collections/BrandDirectory",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <BrandDirectory {...p} />,
  },
  {
    id: 49,
    slug: "shop-by-lifestyle",
    name: "Shop by Lifestyle",
    category: "E",
    description: "Interactive scenario switcher (Workstation, Weekend Transit, Home Sanctuary).",
    importPath: "@/components/store/premium/collections/ShopByLifestyle",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ShopByLifestyle {...p} />,
  },
  {
    id: 50,
    slug: "shop-by-colour",
    name: "Shop by Colour",
    category: "E",
    description: "Palette-driven product discovery filtering inventory by hue and material tone.",
    importPath: "@/components/store/premium/collections/ShopByColour",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ShopByColour {...p} />,
  },

  // Category F (51-58)
  {
    id: 51,
    slug: "advanced-customer-review-carousel",
    name: "Advanced Customer Review Carousel",
    category: "F",
    description:
      "Interactive verified buyer review slider displaying product tags and helpful votes.",
    importPath: "@/components/store/premium/social/AdvancedCustomerReviewCarousel",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AdvancedCustomerReviewCarousel {...p} />,
  },
  {
    id: 52,
    slug: "editorial-testimonials",
    name: "Editorial Testimonials",
    category: "F",
    description: "Minimal typographic endorsement grid inspired by architectural monographs.",
    importPath: "@/components/store/premium/social/EditorialTestimonials",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <EditorialTestimonials {...p} />,
  },
  {
    id: 53,
    slug: "instagram-style-gallery",
    name: "Instagram-Style Gallery",
    category: "F",
    description:
      "Clean square lifestyle feed showcasing real styling and ambient object photography.",
    importPath: "@/components/store/premium/social/InstagramStyleGallery",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <InstagramStyleGallery {...p} />,
  },
  {
    id: 54,
    slug: "shoppable-social-gallery",
    name: "Shoppable Social Gallery",
    category: "F",
    description: "Community gallery tiles with live popover product drawer and direct add-to-bag.",
    importPath: "@/components/store/premium/social/ShoppableSocialGallery",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ShoppableSocialGallery {...p} />,
  },
  {
    id: 55,
    slug: "press-and-publications",
    name: "Press and Publications",
    category: "F",
    description: "Interactive editorial press switcher highlighting Design & Craft publications.",
    importPath: "@/components/store/premium/social/PressAndPublications",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <PressAndPublications {...p} />,
  },
  {
    id: 56,
    slug: "animated-brand-logo-marquee",
    name: "Animated Brand Logo Marquee",
    category: "F",
    description:
      "Smooth grayscale partner logo ticker separate from homepage TrustedCompaniesMarquee.",
    importPath: "@/components/store/premium/social/AnimatedBrandLogoMarquee",
    customisableSettings: ["heading", "surface", "spacing"],
    render: (p) => <AnimatedBrandLogoMarquee {...p} />,
  },
  {
    id: 57,
    slug: "advanced-trust-indicators",
    name: "Advanced Trust Indicators",
    category: "F",
    description:
      "Four-pillar service guarantee strip covering dispatch SLA, warranty, and returns.",
    importPath: "@/components/store/premium/social/AdvancedTrustIndicators",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AdvancedTrustIndicators {...p} />,
  },
  {
    id: 58,
    slug: "brand-statistics-counter",
    name: "Brand Statistics Counter",
    category: "F",
    description:
      "Tabular proof bar presenting verified review averages and mill sustainability figures.",
    importPath: "@/components/store/premium/social/BrandStatisticsCounter",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <BrandStatisticsCounter {...p} />,
  },

  // Category G (59-65)
  {
    id: 59,
    slug: "interactive-image-hotspots",
    name: "Interactive Image Hotspots",
    category: "G",
    description: "Room/lookbook image with clickable coordinate pins opening live product cards.",
    importPath: "@/components/store/premium/interactive/InteractiveImageHotspots",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <InteractiveImageHotspots {...p} />,
  },
  {
    id: 60,
    slug: "before-and-after-slider",
    name: "Before and After Slider",
    category: "G",
    description:
      "Accessible range-driven optical comparison slider highlighting material contrast.",
    importPath: "@/components/store/premium/interactive/BeforeAndAfterSlider",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <BeforeAndAfterSlider {...p} />,
  },
  {
    id: 61,
    slug: "interactive-content-tabs",
    name: "Interactive Content Tabs",
    category: "G",
    description:
      "Segmented tab panel combining storytelling media with structured technical specs.",
    importPath: "@/components/store/premium/interactive/InteractiveContentTabs",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <InteractiveContentTabs {...p} />,
  },
  {
    id: 62,
    slug: "product-feature-explorer",
    name: "Product Feature Explorer",
    category: "G",
    description:
      "Anatomy selector letting shoppers inspect individual hardware and textile details.",
    importPath: "@/components/store/premium/interactive/ProductFeatureExplorer",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductFeatureExplorer {...p} />,
  },
  {
    id: 63,
    slug: "horizontal-scroll-storytelling",
    name: "Horizontal Scroll Storytelling",
    category: "G",
    description:
      "Chaptered horizontal exhibition track combining timeline notes with studio photography.",
    importPath: "@/components/store/premium/interactive/HorizontalScrollStorytelling",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <HorizontalScrollStorytelling {...p} />,
  },
  {
    id: 64,
    slug: "interactive-image-gallery",
    name: "Interactive Image Gallery",
    category: "G",
    description: "Filterable lookbook gallery with instant lightbox modal inspection.",
    importPath: "@/components/store/premium/interactive/InteractiveImageGallery",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <InteractiveImageGallery {...p} />,
  },
  {
    id: 65,
    slug: "visual-product-comparison",
    name: "Visual Product Comparison",
    category: "G",
    description: "Side-by-side silhouette selector contrasting weight, dimensions, and ratings.",
    importPath: "@/components/store/premium/interactive/VisualProductComparison",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <VisualProductComparison {...p} />,
  },

  // Category H (66-80)
  {
    id: 66,
    slug: "advanced-product-gallery",
    name: "Advanced Product Gallery",
    category: "H",
    description: "Thumbnail rail + zoomable primary product viewer with gallery counter.",
    importPath: "@/components/store/premium/product-page/AdvancedProductGallery",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <AdvancedProductGallery {...p} />,
  },
  {
    id: 67,
    slug: "sticky-add-to-cart-presentation",
    name: "Sticky Add to Cart Presentation",
    category: "H",
    description:
      "Compact fixed/inline variant bar displaying thumbnail, swatch, price, and Add to Bag.",
    importPath: "@/components/store/premium/product-page/StickyAddToCartPresentation",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <StickyAddToCartPresentation {...p} />,
  },
  {
    id: 68,
    slug: "product-benefits-grid",
    name: "Product Benefits Grid",
    category: "H",
    description: "Icon-led value grid distilling construction, sourcing, and warranty guarantees.",
    importPath: "@/components/store/premium/product-page/ProductBenefitsGrid",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductBenefitsGrid {...p} />,
  },
  {
    id: 69,
    slug: "technical-specifications-showcase",
    name: "Technical Specifications Showcase",
    category: "H",
    description: "Precision two-column spec ledger detailing materials, measurements, and care.",
    importPath: "@/components/store/premium/product-page/TechnicalSpecificationsShowcase",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <TechnicalSpecificationsShowcase {...p} />,
  },
  {
    id: 70,
    slug: "editorial-product-description",
    name: "Editorial Product Description",
    category: "H",
    description: "Wide-margin editorial essay formatting product narrative and craft highlights.",
    importPath: "@/components/store/premium/product-page/EditorialProductDescription",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <EditorialProductDescription {...p} />,
  },
  {
    id: 71,
    slug: "product-information-accordion",
    name: "Product Information Accordion",
    category: "H",
    description:
      "Expandable detail rows for Materials, Care Guide, Fit Notes, and Global Shipping.",
    importPath: "@/components/store/premium/product-page/ProductInformationAccordion",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <ProductInformationAccordion {...p} />,
  },
  {
    id: 72,
    slug: "product-video-showcase",
    name: "Product Video Showcase",
    category: "H",
    description:
      "Simulated studio motion reel player with chapter timestamps and play/mute controls.",
    importPath: "@/components/store/premium/product-page/ProductVideoShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductVideoShowcase {...p} />,
  },
  {
    id: 73,
    slug: "size-guide-presentation",
    name: "Size Guide Presentation",
    category: "H",
    description:
      "Interactive IN/CM unit converter with structured chest, shoulder, and length table.",
    importPath: "@/components/store/premium/product-page/SizeGuidePresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <SizeGuidePresentation {...p} />,
  },
  {
    id: 74,
    slug: "shipping-and-returns-information",
    name: "Shipping and Returns Information",
    category: "H",
    description: "Clear international dispatch windows, customs clarity, and 30-day return policy.",
    importPath: "@/components/store/premium/product-page/ShippingAndReturnsInformation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ShippingAndReturnsInformation {...p} />,
  },
  {
    id: 75,
    slug: "advanced-review-presentation",
    name: "Advanced Review Presentation",
    category: "H",
    description: "Star breakdown histogram paired with sortable verified customer review cards.",
    importPath: "@/components/store/premium/product-page/AdvancedReviewPresentation",
    customisableSettings: ["heading", "productId", "surface", "spacing"],
    render: (p) => <AdvancedReviewPresentation {...p} />,
  },
  {
    id: 76,
    slug: "product-faq",
    name: "Product FAQ",
    category: "H",
    description: "Targeted product-level Q&A resolving sizing, care, and compatibility questions.",
    importPath: "@/components/store/premium/product-page/ProductFAQ",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductFAQ {...p} />,
  },
  {
    id: 77,
    slug: "related-products-showcase",
    name: "Related Products Showcase",
    category: "H",
    description: "Cross-merchandising 4-column rail reusing native ProductCard items.",
    importPath: "@/components/store/premium/product-page/RelatedProductsShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RelatedProductsShowcase {...p} />,
  },
  {
    id: 78,
    slug: "complete-the-set",
    name: "Complete the Set",
    category: "H",
    description: "Product-page bundle upsell with dynamic multi-item selection and bag insertion.",
    importPath: "@/components/store/premium/product-page/CompleteTheSet",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <CompleteTheSet {...p} />,
  },
  {
    id: 79,
    slug: "recently-viewed-showcase",
    name: "Recently Viewed Showcase",
    category: "H",
    description: "Compact footer-adjacent shelf resurfacing recently browsed studio pieces.",
    importPath: "@/components/store/premium/product-page/RecentlyViewedShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RecentlyViewedShowcase {...p} />,
  },
  {
    id: 80,
    slug: "product-trust-and-guarantee-information",
    name: "Product Trust and Guarantee Information",
    category: "H",
    description:
      "Warranty seals, ethical factory audit disclosures, and insured delivery assurances.",
    importPath: "@/components/store/premium/product-page/ProductTrustAndGuaranteeInformation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductTrustAndGuaranteeInformation {...p} />,
  },

  // Category I (81-90)
  {
    id: 81,
    slug: "collection-hero",
    name: "Collection Hero",
    category: "I",
    description: "Atmospheric collection header banner displaying piece count and curated visual.",
    importPath: "@/components/store/premium/collection-page/CollectionHero",
    customisableSettings: ["heading", "subheading", "description", "collectionSlug", "surface"],
    render: (p) => <CollectionHero {...p} />,
  },
  {
    id: 82,
    slug: "editorial-collection-banner",
    name: "Editorial Collection Banner",
    category: "I",
    description: "Full-width seasonal edition insert with release notes CTA.",
    importPath: "@/components/store/premium/collection-page/EditorialCollectionBanner",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <EditorialCollectionBanner {...p} />,
  },
  {
    id: 83,
    slug: "collection-introduction",
    name: "Collection Introduction",
    category: "I",
    description: "Editorial curatorial note paired with structured material and dispatch metrics.",
    importPath: "@/components/store/premium/collection-page/CollectionIntroduction",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <CollectionIntroduction {...p} />,
  },
  {
    id: 84,
    slug: "visual-subcategory-navigation",
    name: "Visual Subcategory Navigation",
    category: "I",
    description: "Image-backed category pills dynamically filtering the displayed product row.",
    importPath: "@/components/store/premium/collection-page/VisualSubcategoryNavigation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <VisualSubcategoryNavigation {...p} />,
  },
  {
    id: 85,
    slug: "advanced-filtering-presentation",
    name: "Advanced Filtering Presentation",
    category: "I",
    description:
      "Multi-facet toolbar (department, edition status, max price range, low stock toggle).",
    importPath: "@/components/store/premium/collection-page/AdvancedFilteringPresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AdvancedFilteringPresentation {...p} />,
  },
  {
    id: 86,
    slug: "advanced-sorting-controls",
    name: "Advanced Sorting Controls",
    category: "I",
    description: "Instant merchandising sort bar (Curated, Price Asc/Desc, Rating, Most Reviewed).",
    importPath: "@/components/store/premium/collection-page/AdvancedSortingControls",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AdvancedSortingControls {...p} />,
  },
  {
    id: 87,
    slug: "product-grid-layout-switcher",
    name: "Product Grid Layout Switcher",
    category: "I",
    description: "Live viewport density toggle switching seamlessly between 2, 3, and 4 columns.",
    importPath: "@/components/store/premium/collection-page/ProductGridLayoutSwitcher",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductGridLayoutSwitcher {...p} />,
  },
  {
    id: 88,
    slug: "quick-add-presentation",
    name: "Quick Add Presentation",
    category: "I",
    description: "Inline color and size selector cards enabling one-click cart insertion.",
    importPath: "@/components/store/premium/collection-page/QuickAddPresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <QuickAddPresentation {...p} />,
  },
  {
    id: 89,
    slug: "load-more-pagination-options",
    name: "Load More / Pagination Options",
    category: "I",
    description: "Dual-mode pagination supporting progressive reveal or numbered page controls.",
    importPath: "@/components/store/premium/collection-page/LoadMorePaginationOptions",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <LoadMorePaginationOptions {...p} />,
  },
  {
    id: 90,
    slug: "promotional-collection-banner",
    name: "Promotional Collection Banner",
    category: "I",
    description: "Mid-collection conversion card with dual imagery and checkout bundle code.",
    importPath: "@/components/store/premium/collection-page/PromotionalCollectionBanner",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <PromotionalCollectionBanner {...p} />,
  },

  // Category J (91-105)
  {
    id: 91,
    slug: "advanced-faq-accordion",
    name: "Advanced FAQ Accordion",
    category: "J",
    description: "Searchable and topic-filtered FAQ center with expandable disclosure rows.",
    importPath: "@/components/store/premium/content/AdvancedFAQAccordion",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <AdvancedFAQAccordion {...p} />,
  },
  {
    id: 92,
    slug: "contact-information-showcase",
    name: "Contact Information Showcase",
    category: "J",
    description:
      "Four-column studio concierge directory detailing email, phone, showroom, and SLA.",
    importPath: "@/components/store/premium/content/ContactInformationShowcase",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ContactInformationShowcase {...p} />,
  },
  {
    id: 93,
    slug: "premium-contact-form",
    name: "Premium Contact Form",
    category: "J",
    description:
      "Topic-routed client inquiry form with validation and instant confirmation receipt.",
    importPath: "@/components/store/premium/content/PremiumContactForm",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <PremiumContactForm {...p} />,
  },
  {
    id: 94,
    slug: "store-location-presentation",
    name: "Store Location Presentation",
    category: "J",
    description:
      "Interactive flagship boutique selector for New York, London, and Tokyo locations.",
    importPath: "@/components/store/premium/content/StoreLocationPresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <StoreLocationPresentation {...p} />,
  },
  {
    id: 95,
    slug: "brand-timeline",
    name: "Brand Timeline",
    category: "J",
    description:
      "Chronological 2021–2026 workshop milestone chronicle set in clean editorial columns.",
    importPath: "@/components/store/premium/content/BrandTimeline",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <BrandTimeline {...p} />,
  },
  {
    id: 96,
    slug: "team-members",
    name: "Team Members",
    category: "J",
    description:
      "Four-portrait editorial leadership grid highlighting textile and acoustic directors.",
    importPath: "@/components/store/premium/content/TeamMembers",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <TeamMembers {...p} />,
  },
  {
    id: 97,
    slug: "newsletter-popup",
    name: "Newsletter Popup",
    category: "J",
    description: "On-demand previewable welcome credit modal with split product photography.",
    importPath: "@/components/store/premium/content/NewsletterPopup",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <NewsletterPopup {...p} />,
  },
  {
    id: 98,
    slug: "promotional-popup",
    name: "Promotional Popup",
    category: "J",
    description: "Triggerable campaign modal with clipboard-copy promo code and collection link.",
    importPath: "@/components/store/premium/content/PromotionalPopup",
    customisableSettings: ["heading", "subheading", "promoCode", "surface", "spacing"],
    render: (p) => <PromotionalPopup {...p} />,
  },
  {
    id: 99,
    slug: "recently-viewed-drawer",
    name: "Recently Viewed Drawer",
    category: "J",
    description: "Slide-over history panel with one-click Add to Bag and clear history control.",
    importPath: "@/components/store/premium/content/RecentlyViewedDrawer",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RecentlyViewedDrawer {...p} />,
  },
  {
    id: 100,
    slug: "wishlist-presentation",
    name: "Wishlist Presentation",
    category: "J",
    description: "Full-width saved archive synchronized directly with live useWishlist() state.",
    importPath: "@/components/store/premium/content/WishlistPresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <WishlistPresentation {...p} />,
  },
  {
    id: 101,
    slug: "product-comparison-presentation",
    name: "Product Comparison Presentation",
    category: "J",
    description: "Interactive spec table allowing shoppers to toggle up to 3 items side by side.",
    importPath: "@/components/store/premium/content/ProductComparisonPresentation",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <ProductComparisonPresentation {...p} />,
  },
  {
    id: 102,
    slug: "featured-blog-articles",
    name: "Featured Blog Articles",
    category: "J",
    description:
      "Lead journal essay plus two stacked craft stories linked directly to catalog pieces.",
    importPath: "@/components/store/premium/content/FeaturedBlogArticles",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <FeaturedBlogArticles {...p} />,
  },
  {
    id: 103,
    slug: "related-blog-articles",
    name: "Related Blog Articles",
    category: "J",
    description: "Three-column reading continuation strip for material and engineering stories.",
    importPath: "@/components/store/premium/content/RelatedBlogArticles",
    customisableSettings: ["heading", "subheading", "surface", "spacing"],
    render: (p) => <RelatedBlogArticles {...p} />,
  },
  {
    id: 104,
    slug: "rich-text-editorial-section",
    name: "Rich Text Editorial Section",
    category: "J",
    description: "Typographic statement block with alignment, surface, and CTA link customization.",
    importPath: "@/components/store/premium/content/RichTextEditorialSection",
    customisableSettings: ["heading", "subheading", "description", "align", "surface", "spacing"],
    render: (p) => <RichTextEditorialSection {...p} />,
  },
  {
    id: 105,
    slug: "custom-content-section",
    name: "Custom Content Section",
    category: "J",
    description: "Modular split block uniting campaign copy, metric specs, and staggered imagery.",
    importPath: "@/components/store/premium/content/CustomContentSection",
    customisableSettings: ["heading", "subheading", "description", "surface", "spacing"],
    render: (p) => <CustomContentSection {...p} />,
  },
];
