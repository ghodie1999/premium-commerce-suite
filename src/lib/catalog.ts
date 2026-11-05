import hoodie from "@/assets/p-hoodie.jpg";
import bag from "@/assets/p-bag.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import perfume from "@/assets/p-perfume.jpg";
import watch from "@/assets/deal-watch.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catHome from "@/assets/cat-home.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import catTech from "@/assets/cat-tech.jpg";

export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  content: string;
  helpfulCount: number;
  variant?: string;
};

export type ProductColor = {
  name: string;
  value: string;
  inStock?: boolean;
};

export type ProductSize = {
  label: string;
  available: boolean;
  measurements?: string;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  category: "Women" | "Men" | "Home & Living" | "Beauty" | "Electronics" | "Accessories";
  collectionSlugs: string[];
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: "New" | "Best Seller" | "Limited" | "Sale";
  image: string;
  gallery: string[];
  colors: ProductColor[];
  sizes?: ProductSize[];
  stock: number;
  description: string;
  highlights: string[];
  materials: string;
  care: string;
  shippingInfo: string;
  dimensions?: string;
  frequentlyBoughtTogetherId?: string;
  bundleDiscountPercent?: number;
  reviewsList: ProductReview[];
};

export const products: Product[] = [
  {
    id: "essential-hoodie",
    name: "Essential Heavyweight Hoodie",
    subtitle: "Custom-milled 450 GSM French Terry Cotton, Pre-shrunk",
    category: "Men",
    collectionSlugs: ["all", "trending-now", "best-sellers", "men"],
    price: 39.99,
    compareAt: 59.99,
    rating: 4.8,
    reviews: 214,
    badge: "New",
    image: hoodie,
    gallery: [hoodie, catMen, hoodie],
    colors: [
      { name: "Oatmeal Heather", value: "oklch(0.93 0.03 80)", inStock: true },
      { name: "Forest Green", value: "oklch(0.27 0.049 158)", inStock: true },
      { name: "Washed Obsidian", value: "oklch(0.3 0 0)", inStock: true },
    ],
    sizes: [
      { label: "S", available: true, measurements: 'Chest 38" · Length 27"' },
      { label: "M", available: true, measurements: 'Chest 41" · Length 28"' },
      { label: "L", available: true, measurements: 'Chest 44" · Length 29"' },
      { label: "XL", available: true, measurements: 'Chest 47" · Length 30"' },
      { label: "XXL", available: false, measurements: 'Chest 50" · Length 31"' },
    ],
    stock: 8,
    description:
      "Crafted with an exacting eye for proportion and drape. Our signature oversized silhouette provides effortless comfort without sagging. Double-stitched seams and a reinforced kangaroo pocket ensure longevity through countless wash cycles.",
    highlights: [
      "Custom-developed 450 GSM organic French terry cotton",
      "Thermal-lined hood with zero drawstrings for a modern, architectural drape",
      "Pre-shrunk treatment retains exact fit and hand-feel forever",
      "Ethically knit and dyed in certified zero-discharge facilities",
    ],
    materials: "100% GOTS-Certified Organic Combed Cotton. Ribbing: 95% Cotton, 5% Spandex.",
    care: "Machine wash cold with like colors. Tumble dry low or dry flat. Do not bleach.",
    shippingInfo:
      "Ships within 24 hours. Free express shipping on orders over $100. 30-day global returns.",
    dimensions:
      "Relaxed drop-shoulder fit. Take your normal size for oversized aesthetic, or size down for tailored fit.",
    frequentlyBoughtTogetherId: "classic-sneakers",
    bundleDiscountPercent: 15,
    reviewsList: [
      {
        id: "r1",
        author: "Marcus Vance",
        rating: 5,
        date: "October 24, 2026",
        verified: true,
        variant: "Forest Green / L",
        title: "Heaviest, most comfortable hoodie I own",
        content:
          "The weight of the French terry is unreal. It holds its structural shape around the neck and shoulders instead of flopping. I ended up ordering the Oatmeal Heather as well.",
        helpfulCount: 38,
      },
      {
        id: "r2",
        author: "Sarah Lin",
        rating: 5,
        date: "October 18, 2026",
        verified: true,
        variant: "Oatmeal Heather / M",
        title: "Drape is pristine",
        content:
          "Zero branding, incredible fabric, and the ribbing at the cuffs and hem is firm without pinching. Truly boutique quality at a fair direct price.",
        helpfulCount: 22,
      },
      {
        id: "r3",
        author: "Julian Thorne",
        rating: 4,
        date: "October 3, 2026",
        verified: true,
        variant: "Washed Obsidian / XL",
        title: "Great quality, slightly oversized",
        content:
          "Very premium finish. Runs slightly larger than high-street brands so check the chest dimensions before buying. Extremely cozy.",
        helpfulCount: 15,
      },
    ],
  },
  {
    id: "leather-handbag",
    name: "Full-Grain Leather Tote Bag",
    subtitle: "Vegetable-tanned Tuscan leather with hand-burnished edges",
    category: "Women",
    collectionSlugs: ["all", "trending-now", "best-sellers", "women"],
    price: 159.0,
    compareAt: 219.0,
    rating: 4.9,
    reviews: 388,
    badge: "Best Seller",
    image: bag,
    gallery: [bag, catWomen, bag],
    colors: [
      { name: "Cognac Tan", value: "oklch(0.48 0.09 55)", inStock: true },
      { name: "Midnight Black", value: "oklch(0.3 0 0)", inStock: true },
      { name: "Sandstone", value: "oklch(0.9 0.02 80)", inStock: true },
    ],
    stock: 5,
    description:
      "A timeless companion built from supple, full-grain Italian leather that deepens in character and patina with every journey. Sized to effortlessly hold a 15-inch laptop, notebook, water bottle, and daily personal necessities.",
    highlights: [
      "Full-grain vegetable-tanned leather sourced from certified Santa Croce tanneries",
      "Reinforced brass hardware and YKK Excella zippers",
      'Dedicated padded 15" laptop sleeve and magnetic quick-access phone pocket',
      "Structured bottom panel with protective solid brass feet",
    ],
    materials: "100% Italian Full-Grain Cowhide Leather. Lining: 100% Organic Raw Cotton Twill.",
    care: "Condition with natural beeswax leather cream every 6 months. Wipe clean with a soft dry cloth.",
    shippingInfo:
      "Complimentary signature gift box. Ships same-day on weekdays. Free tracked shipping.",
    dimensions: '16.5" W x 12.5" H x 6" D. Handle drop: 9.5". Weight: 2.1 lbs.',
    frequentlyBoughtTogetherId: "eau-de-parfum",
    bundleDiscountPercent: 20,
    reviewsList: [
      {
        id: "r201",
        author: "Elena Rostova",
        rating: 5,
        date: "October 29, 2026",
        verified: true,
        variant: "Cognac Tan",
        title: "Smells like genuine craftsmanship",
        content:
          "The leather aroma when opening the dust bag is sublime. Sturdy handles that do not dig into the shoulder, and fits my 14-inch MacBook with plenty of room left over.",
        helpfulCount: 54,
      },
      {
        id: "r202",
        author: "Claire Dupont",
        rating: 5,
        date: "October 14, 2026",
        verified: true,
        variant: "Midnight Black",
        title: "Workhorse bag for city commutes",
        content:
          "Used this every day for two months in rain and subway commutes. Wipes down easily and holds its shape impeccably.",
        helpfulCount: 31,
      },
    ],
  },
  {
    id: "classic-sneakers",
    name: "Classic Low Leather Sneakers",
    subtitle: "Calfskin leather upper with custom margom rubber cupsole",
    category: "Men",
    collectionSlugs: ["all", "best-sellers", "men", "trending-now"],
    price: 89.5,
    compareAt: 125.0,
    rating: 4.7,
    reviews: 156,
    image: sneakers,
    gallery: [sneakers, catMen, sneakers],
    colors: [
      { name: "Chalk White", value: "oklch(0.97 0 0)", inStock: true },
      { name: "Monochrome Black", value: "oklch(0.3 0 0)", inStock: true },
      { name: "Bone Gum", value: "oklch(0.75 0.05 70)", inStock: true },
    ],
    sizes: [
      { label: "US 8", available: true, measurements: "EU 41 · 26.0 cm" },
      { label: "US 9", available: true, measurements: "EU 42 · 27.0 cm" },
      { label: "US 10", available: true, measurements: "EU 43 · 28.0 cm" },
      { label: "US 11", available: true, measurements: "EU 44 · 29.0 cm" },
      { label: "US 12", available: true, measurements: "EU 45 · 30.0 cm" },
    ],
    stock: 14,
    description:
      "Minimalist design meets athletic ergonomics. Lined in soft calfskin for comfortable sockless wear, resting on a durable Margom-style stitched rubber sole that provides arch support for all-day city walking.",
    highlights: [
      "Supple full-grain calfskin leather upper with waxed cotton laces",
      "Stitched 360-degree durable vulcanized rubber cupsole",
      "Removable ergonomic cork memory foam insole for posture comfort",
      "Reinforced counter lining eliminates heel friction on day one",
    ],
    materials: "Upper: 100% Full-Grain Calfskin. Sole: Natural Stitched Rubber.",
    care: "Wipe with damp cloth and leather conditioner. Use cedar shoe trees when resting.",
    shippingInfo: "Ships within 24 hours. Includes travel dust bag and extra laces.",
    frequentlyBoughtTogetherId: "essential-hoodie",
    bundleDiscountPercent: 15,
    reviewsList: [
      {
        id: "r301",
        author: "Mateo Silva",
        rating: 5,
        date: "October 19, 2026",
        verified: true,
        variant: "Chalk White / US 10",
        title: "Cleanest silhouette on the market",
        content:
          "Zero break-in period required. The leather inside is buttery soft and the silhouette pairs with everything from relaxed denim to tailored trousers.",
        helpfulCount: 19,
      },
    ],
  },
  {
    id: "eau-de-parfum",
    name: "Amber Noir Eau de Parfum",
    subtitle: "Smoked cedar, bergamot rind, black pepper and Madagascar vanilla",
    category: "Beauty",
    collectionSlugs: ["all", "limited-edition", "beauty"],
    price: 74.0,
    compareAt: 98.0,
    rating: 4.6,
    reviews: 97,
    badge: "Limited",
    image: perfume,
    gallery: [perfume, catBeauty, perfume],
    colors: [{ name: "50ml Flacon", value: "oklch(0.8 0.11 80)", inStock: true }],
    sizes: [
      { label: "50ml / 1.7 oz", available: true, measurements: "Approx. 600 sprays" },
      { label: "100ml / 3.4 oz", available: true, measurements: "Approx. 1200 sprays" },
    ],
    stock: 7,
    description:
      "A rich, contemplative fragrance created in small batches in Grasse. Opens with bright Italian bergamot and pink peppercorn before settling into an intoxicating heart of aged bourbon vanilla, smoked birch, and warm amber resin.",
    highlights: [
      "Concentrated 24% extrait de parfum oil concentration for 12+ hour longevity",
      "Compounded and bottled in Grasse, France using hand-harvested botanicals",
      "Sustainably sourced Haitian vetiver and Madagascar vanilla bourbon",
      "Magnetic heavy-weight metal cap with laser-engraved serial number",
    ],
    materials: "Alcohol Denat., Parfum (Fragrance), Aqua, Limonene, Linalool, Coumarin.",
    care: "Store in a cool, dark place away from direct sunlight and heat radiators.",
    shippingInfo: "Hazmat-compliant insured ground shipping. Arrives in 2–4 business days.",
    frequentlyBoughtTogetherId: "leather-handbag",
    bundleDiscountPercent: 20,
    reviewsList: [
      {
        id: "r401",
        author: "Sophia Sterling",
        rating: 5,
        date: "October 12, 2026",
        verified: true,
        variant: "50ml",
        title: "Endless compliments",
        content:
          "Mysterious, warm, and sophisticated without being overpowering. Sillage is noticeable all evening. One spray on each collarbone lasts through dinner and well into the night.",
        helpfulCount: 42,
      },
    ],
  },
  {
    id: "minimalist-chronograph",
    name: "Atelier Chronograph Watch 40mm",
    subtitle: "Brushed 316L stainless steel with sapphire crystal and Horween strap",
    category: "Accessories",
    collectionSlugs: ["all", "best-sellers", "limited-edition", "men"],
    price: 189.0,
    compareAt: 260.0,
    rating: 4.9,
    reviews: 142,
    badge: "Best Seller",
    image: watch,
    gallery: [watch, catMen, watch],
    colors: [
      { name: "Brushed Steel / Charcoal", value: "oklch(0.35 0 0)", inStock: true },
      { name: "Gold PVD / Saddle Leather", value: "oklch(0.55 0.1 65)", inStock: true },
    ],
    stock: 4,
    description:
      "Engineered for clarity and timeless proportions. Featuring an ultra-reliable Japanese meca-quartz movement that combines quartz precision with the smooth sweep of a mechanical stopwatch, protected under anti-reflective domed sapphire glass.",
    highlights: [
      "Domed scratch-resistant sapphire crystal with anti-reflective underside coating",
      "Seiko VK64 meca-quartz hybrid chronograph movement",
      "Solid 316L surgical-grade marine stainless steel case",
      "Quick-release vegetable-tanned Horween leather strap",
    ],
    materials:
      "Case: 316L Stainless Steel. Crystal: Domed Sapphire. Strap: Genuine Horween Leather.",
    care: "Water resistant to 50 meters (5 ATM). Avoid hot showers and saunas to protect gaskets.",
    shippingInfo: "Complimentary wooden display case. 2-Year International Manufacturer Warranty.",
    dimensions: "Case Diameter: 40mm. Thickness: 11.2mm. Lug width: 20mm.",
    frequentlyBoughtTogetherId: "classic-sneakers",
    bundleDiscountPercent: 15,
    reviewsList: [
      {
        id: "r501",
        author: "Henrik Lindqvist",
        rating: 5,
        date: "October 27, 2026",
        verified: true,
        variant: "Brushed Steel",
        title: "Punches way above its price point",
        content:
          "The dial finishing, subtle subdial texturing, and tactile pushers feel like a $1,000 Swiss piece. The Horween strap broke in within two days.",
        helpfulCount: 39,
      },
    ],
  },
  {
    id: "architectural-desk-lamp",
    name: "Architectural Pivot Desk Lamp",
    subtitle: "Solid brass counterweight joints with warm dimmable LED",
    category: "Home & Living",
    collectionSlugs: ["all", "home-living", "trending-now"],
    price: 119.0,
    compareAt: 165.0,
    rating: 4.8,
    reviews: 64,
    badge: "New",
    image: "/src/assets/images/product_desk_lamp_1793880894910.jpg",
    gallery: [
      "/src/assets/images/product_desk_lamp_1793880894910.jpg",
      catHome,
      "/src/assets/images/product_desk_lamp_1793880894910.jpg",
    ],
    colors: [{ name: "Matte Black & Raw Brass", value: "oklch(0.2 0 0)", inStock: true }],
    stock: 9,
    description:
      "A sculptural lighting piece designed to bring tactile focus to your creative workspace. Two articulated friction joints allow precise angle adjustment, while a warm 2700K integrated LED provides flicker-free glare-shielded task lighting.",
    highlights: [
      "Cast iron weighted base with non-slip cork underside padding",
      "Natural brushed solid brass adjustment hardware with zero tools required",
      "Continuous smooth rotary dimmer knob with 50,000-hour LED rating",
      "Braided 2-meter textile cord with reinforced strain relief",
    ],
    materials: "Aluminum shade and arms, solid brass pivots, cast iron base.",
    care: "Dust with dry microfiber cloth. Do not use chemical abrasive cleaners on brass patina.",
    shippingInfo: "Reinforced molded pulp packaging. Free express home delivery.",
    dimensions: 'Height: 22" max. Reach: 18". Base diameter: 7". Weight: 5.8 lbs.',
    reviewsList: [
      {
        id: "r601",
        author: "Audrey Chen",
        rating: 5,
        date: "October 30, 2026",
        verified: true,
        title: "Transformed my writing desk",
        content:
          "The mechanical feedback on the brass dials is so satisfying. The light warmth makes working late evenings peaceful without eye strain.",
        helpfulCount: 18,
      },
    ],
  },
  {
    id: "studio-master-headphones",
    name: "Studio Master Wireless Headphones",
    subtitle: "Custom 45mm neodymium drivers with active noise isolation",
    category: "Electronics",
    collectionSlugs: ["all", "electronics", "best-sellers"],
    price: 199.0,
    compareAt: 249.0,
    rating: 4.9,
    reviews: 178,
    badge: "Best Seller",
    image: "/src/assets/images/product_wireless_headphones_1793880896325.jpg",
    gallery: [
      "/src/assets/images/product_wireless_headphones_1793880896325.jpg",
      catTech,
      "/src/assets/images/product_wireless_headphones_1793880896325.jpg",
    ],
    colors: [
      { name: "Champagne Silver & Espresso", value: "oklch(0.85 0.03 85)", inStock: true },
      { name: "Monolith Slate", value: "oklch(0.25 0 0)", inStock: true },
    ],
    stock: 11,
    description:
      "Tuned by recording engineers for flat, transparent acoustic response. Memory foam lambskin earcups form an acoustic seal that eliminates ambient distractions, powered by Bluetooth 5.3 with high-resolution LDAC and AAC codecs.",
    highlights: [
      "Custom 45mm neodymium drivers engineered for neutral, natural acoustic fidelity",
      "40-hour continuous battery life with 10-minute fast charge for 5 hours of playback",
      "Dual multi-point connection switches seamlessly between laptop and phone",
      "Plush replaceable memory foam ear cushions with breathable lambskin",
    ],
    materials: "Machined Anodized Aluminum, Stainless Steel Headband, Full-Grain Leather.",
    care: "Store in included hard shell travel case when not in use. Wipe cushions with dry cloth.",
    shippingInfo: "Includes braided USB-C cable, 3.5mm analog audio cable, and flight adapter.",
    dimensions: "Weight: 285g. Foldable flat profile fits into briefcase sleeve.",
    frequentlyBoughtTogetherId: "architectural-desk-lamp",
    bundleDiscountPercent: 15,
    reviewsList: [
      {
        id: "r701",
        author: "Jonathan Pierce",
        rating: 5,
        date: "October 22, 2026",
        verified: true,
        variant: "Champagne Silver",
        title: "Soundstage is astonishingly wide",
        content:
          "Instruments sit distinctly in 3D space. No bloated bass boost—just pure, revealing audio with unbelievable comfort even after six-hour editing sessions.",
        helpfulCount: 29,
      },
    ],
  },
  {
    id: "artisanal-pour-over-set",
    name: "Artisanal Speckled Pour-Over Set",
    subtitle: "Hand-thrown stoneware dripper with matching 350ml carafe mug",
    category: "Home & Living",
    collectionSlugs: ["all", "home-living", "limited-edition"],
    price: 48.0,
    compareAt: 65.0,
    rating: 4.8,
    reviews: 82,
    badge: "Sale",
    image: "/src/assets/images/product_ceramic_mug_set_1793880897145.jpg",
    gallery: [
      "/src/assets/images/product_ceramic_mug_set_1793880897145.jpg",
      catHome,
      "/src/assets/images/product_ceramic_mug_set_1793880897145.jpg",
    ],
    colors: [{ name: "Oat Speckle", value: "oklch(0.92 0.02 85)", inStock: true }],
    stock: 6,
    description:
      "Handmade by independent potters in small kilns. Designed with internal spiral extraction ribs that regulate water flow for consistent extraction and nuanced pour-over coffee clarity. Microwave and dishwasher safe.",
    highlights: [
      "Natural textured unglazed exterior with food-grade satin white interior glaze",
      "Interior 60-degree spiral rib geometry maximizes extraction turbulence",
      "Compatible with standard V60 02 paper or cloth cone filters",
      "Ergonomic handle crafted for precise balanced pouring",
    ],
    materials: "100% High-Fire Stoneware Ceramic. Lead-Free and Cadmium-Free.",
    care: "Dishwasher safe. Hand washing recommended to preserve the satin glaze luster.",
    shippingInfo: "Packaged in double-walled corrugated protective honeycomb boxes.",
    dimensions: 'Dripper: 4.5" W x 3.8" H. Mug: 3.5" W x 3.5" H (12 fl oz).',
    reviewsList: [
      {
        id: "r801",
        author: "Mei-Ling Zhou",
        rating: 5,
        date: "October 16, 2026",
        verified: true,
        title: "The morning ritual highlight",
        content:
          "Each piece has subtle handmade variations in the speckled clay. It feels grounded in your hands and brews the sweetest cup of Ethiopian roast.",
        helpfulCount: 27,
      },
    ],
  },
  {
    id: "riviera-sunglasses",
    name: "Riviera Tortoiseshell Sunglasses",
    subtitle: "Custom Italian cellulose acetate with green polarized mineral glass",
    category: "Accessories",
    collectionSlugs: ["all", "women", "men", "trending-now"],
    price: 92.0,
    compareAt: 130.0,
    rating: 4.7,
    reviews: 119,
    image: "/src/assets/images/product_sunglasses_tortoise_1793880896756.jpg",
    gallery: [
      "/src/assets/images/product_sunglasses_tortoise_1793880896756.jpg",
      catWomen,
      "/src/assets/images/product_sunglasses_tortoise_1793880896756.jpg",
    ],
    colors: [
      { name: "Havana Tortoise", value: "oklch(0.4 0.08 55)", inStock: true },
      { name: "Amber Crystal", value: "oklch(0.65 0.1 65)", inStock: true },
    ],
    stock: 12,
    description:
      "A tailored silhouette inspired by 1960s Mediterranean leisure. Hand-polished Italian Mazzucchelli acetate houses distortion-free polarized glass lenses that eliminate glare from water and pavement while protecting 100% of UVA/UVB rays.",
    highlights: [
      "Genuine Italian Mazzucchelli cellulose acetate from cotton and wood pulp",
      "Category 3 polarized mineral glass lenses with internal anti-reflective coating",
      "7-barrel German engineered hinges with wire-core embedded temples",
      "Includes vegan leather collapsible travel case and microfiber cloth",
    ],
    materials: "Mazzucchelli Acetate, Scratch-Resistant Polarized Mineral Glass.",
    care: "Rinse with lukewarm water and clean using the included microfiber cloth.",
    shippingInfo: "Ships within 24 hours. Free returns with prepaid return label.",
    dimensions: "Lens Width: 49mm · Bridge: 21mm · Temple Length: 145mm.",
    reviewsList: [
      {
        id: "r901",
        author: "Liam O'Connor",
        rating: 5,
        date: "October 11, 2026",
        verified: true,
        variant: "Havana Tortoise",
        title: "Optical clarity is night and day",
        content:
          "Real mineral glass lenses make plastic lenses feel like cheap toys. Colors stay crisp and there is zero optical distortion on sunny coastal drives.",
        helpfulCount: 31,
      },
    ],
  },
];

export type Collection = {
  slug: string;
  name: string;
  subtitle: string;
  copy: string;
  image: string;
  productCount?: number;
};

export const collections: Collection[] = [
  {
    slug: "trending-now",
    name: "Trending Now",
    subtitle: "Seasonal Highlights",
    copy: "What our global community is wearing, collecting, and loving this season.",
    image: catWomen,
  },
  {
    slug: "best-sellers",
    name: "Best Sellers",
    subtitle: "Proven Essentials",
    copy: "Our most coveted, highest-rated designs backed by 40,000+ verified customer reviews.",
    image: catMen,
  },
  {
    slug: "limited-edition",
    name: "Limited Edition",
    subtitle: "Atelier Runs",
    copy: "Small-batch craftsmanship, rare materials, and numbers made to last a lifetime.",
    image: catBeauty,
  },
  {
    slug: "women",
    name: "Women's Collection",
    subtitle: "Modern Silhouettes",
    copy: "Effortless silhouettes, refined leather goods, and timeless staples made for daily wear.",
    image: catWomen,
  },
  {
    slug: "men",
    name: "Men's Collection",
    subtitle: "Architectural Wardrobe",
    copy: "Substantial heavyweight cottons, precision footwear, and enduring daily gear.",
    image: catMen,
  },
  {
    slug: "home-living",
    name: "Home & Living",
    subtitle: "Intentional Spaces",
    copy: "Sculptural lighting, handmade ceramics, and mindful objects designed for calm interiors.",
    image: catHome,
  },
  {
    slug: "beauty",
    name: "Beauty & Wellness",
    subtitle: "Artisanal Formulations",
    copy: "Small-batch perfumery, botanical extracts, and restorative sensory rituals.",
    image: catBeauty,
  },
  {
    slug: "electronics",
    name: "Audio & Tech",
    subtitle: "Precision Engineering",
    copy: "Studio acoustic clarity, premium metals, and minimalist interfaces without gimmicks.",
    image: catTech,
  },
];

export const categories = [
  { name: "All", slug: "all", items: products.length },
  {
    name: "Women",
    slug: "women",
    items: products.filter((p) => p.category === "Women").length,
    image: catWomen,
  },
  {
    name: "Men",
    slug: "men",
    items: products.filter((p) => p.category === "Men").length,
    image: catMen,
  },
  {
    name: "Home & Living",
    slug: "home-living",
    items: products.filter((p) => p.category === "Home & Living").length,
    image: catHome,
  },
  {
    name: "Beauty",
    slug: "beauty",
    items: products.filter((p) => p.category === "Beauty").length,
    image: catBeauty,
  },
  {
    name: "Electronics",
    slug: "electronics",
    items: products.filter((p) => p.category === "Electronics").length,
    image: catTech,
  },
  {
    name: "Accessories",
    slug: "accessories",
    items: products.filter((p) => p.category === "Accessories").length,
    image: watch,
  },
];

export const testimonials = [
  {
    name: "Amara Nsofor",
    role: "Verified Purchase",
    quote:
      "The packaging alone felt like a gift. Quality is genuinely better than boutiques I pay double for.",
    rating: 5,
  },
  {
    name: "Daniel Okoye",
    role: "Verified Purchase",
    quote:
      "Ordered on Tuesday, wearing it on Thursday. The fit guide was spot on — no returns needed.",
    rating: 5,
  },
  {
    name: "Lena Fischer",
    role: "Verified Purchase",
    quote:
      "Checkout took twenty seconds and support answered in two minutes. This is how shopping should feel.",
    rating: 5,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCollection(slug: string): Product[] {
  if (slug === "all") return products;
  return products.filter(
    (p) =>
      p.collectionSlugs.includes(slug) ||
      p.category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-") === slug,
  );
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}
