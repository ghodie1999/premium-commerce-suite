import hoodie from "@/assets/p-hoodie.jpg";
import bag from "@/assets/p-bag.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import perfume from "@/assets/p-perfume.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catMen from "@/assets/cat-men.jpg";
import catHome from "@/assets/cat-home.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import catTech from "@/assets/cat-tech.jpg";

export type Product = {
  id: string;
  name: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  badge?: "New" | "Best Seller" | "Limited" | "Sale";
  image: string;
  colors: string[];
  stock: number;
};

export const products: Product[] = [
  {
    id: "essential-hoodie",
    name: "Essential Oversized Hoodie",
    price: 39.99,
    compareAt: 59.99,
    rating: 4.8,
    reviews: 214,
    badge: "New",
    image: hoodie,
    colors: ["oklch(0.93 0.03 80)", "oklch(0.27 0.049 158)", "oklch(0.3 0 0)"],
    stock: 12,
  },
  {
    id: "leather-handbag",
    name: "Full-Grain Leather Handbag",
    price: 159.0,
    compareAt: 219.0,
    rating: 4.9,
    reviews: 388,
    badge: "Best Seller",
    image: bag,
    colors: ["oklch(0.48 0.09 55)", "oklch(0.3 0 0)", "oklch(0.9 0.02 80)"],
    stock: 6,
  },
  {
    id: "classic-sneakers",
    name: "Classic Low Leather Sneakers",
    price: 89.5,
    rating: 4.7,
    reviews: 156,
    image: sneakers,
    colors: ["oklch(0.97 0 0)", "oklch(0.3 0 0)", "oklch(0.75 0.05 70)"],
    stock: 24,
  },
  {
    id: "eau-de-parfum",
    name: "Amber Noir Eau de Parfum",
    price: 74.0,
    compareAt: 98.0,
    rating: 4.6,
    reviews: 97,
    badge: "Limited",
    image: perfume,
    colors: ["oklch(0.8 0.11 80)"],
    stock: 9,
  },
];

export const categories = [
  { name: "Women", items: 248, image: catWomen },
  { name: "Men", items: 192, image: catMen },
  { name: "Home & Living", items: 134, image: catHome },
  { name: "Beauty", items: 87, image: catBeauty },
  { name: "Electronics", items: 63, image: catTech },
];

export const collections = [
  { name: "Trending Now", copy: "What everyone is wearing", image: catWomen },
  { name: "Best Sellers", copy: "Loved by 40,000+ customers", image: catMen },
  { name: "Limited Edition", copy: "Small batch, made to last", image: catBeauty },
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
