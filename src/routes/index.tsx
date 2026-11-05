import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { Hero } from "@/components/store/Hero";
import { TrustBar } from "@/components/store/TrustBar";
import { CategoryGrid } from "@/components/store/CategoryGrid";
import { DealOfDay } from "@/components/store/DealOfDay";
import { NewArrivals } from "@/components/store/NewArrivals";
import { Testimonials } from "@/components/store/Testimonials";
import { Newsletter } from "@/components/store/Newsletter";
import { SiteFooter } from "@/components/store/SiteFooter";
import { CartDrawer } from "@/components/store/CartDrawer";
import { CartProvider } from "@/components/store/cart";

const title = "ShopEase — Premium Everyday Essentials, Shipped Worldwide";
const description =
  "Shop curated premium fashion, home and tech essentials. Free shipping over $100, 30-day returns and secure checkout.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "OnlineStore",
          name: "ShopEase",
          description,
          url: "/",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main>
        <Hero />
        <TrustBar />
        <CategoryGrid />
        <DealOfDay />
        <NewArrivals />
        <Testimonials />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  );
}
