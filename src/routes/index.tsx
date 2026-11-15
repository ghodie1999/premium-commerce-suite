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
import {
  KineticCollectionBridge,
  ScrollSectionRail,
  SectionReveal,
  type SectionNavItem,
} from "@/components/store/SectionMotion";
import heroImg from "@/assets/hero.jpg";

const homeSections: SectionNavItem[] = [
  { id: "hero", label: "Overview" },
  { id: "highlights", label: "Promise" },
  { id: "categories", label: "Categories" },
  { id: "deal", label: "Daily Deal" },
  { id: "new-arrivals", label: "New Arrivals" },
  { id: "reviews", label: "Reviews" },
  { id: "newsletter", label: "VIP Club" },
];

const title = "ShopEase — Premium Everyday Essentials & Apparel";
const description =
  "Discover curated everyday essentials, luxury leather bags, organic cotton hoodies, and architectural home objects with free worldwide shipping over $100.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "ShopEase" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "en_US" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "OnlineStore",
              "@id": "/#store",
              name: "ShopEase",
              description,
              url: "/",
              priceRange: "$$",
              currenciesAccepted: "USD",
              paymentAccepted: "Credit Card, PayPal, Apple Pay, Klarna",
              hasMerchantReturnPolicy: {
                "@type": "MerchantReturnPolicy",
                returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                merchantReturnDays: 30,
                returnMethod: "https://schema.org/ReturnByMail",
                returnFees: "https://schema.org/FreeReturn",
              },
            },
            {
              "@type": "WebSite",
              "@id": "/#website",
              url: "/",
              name: "ShopEase",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "/collections?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <>
      <ScrollSectionRail sections={homeSections} />
      <AnnouncementBar />
      <SiteNav />
      <main>
        <Hero />
        <SectionReveal>
          <TrustBar />
        </SectionReveal>
        <SectionReveal>
          <CategoryGrid />
        </SectionReveal>
        <KineticCollectionBridge />
        <SectionReveal>
          <DealOfDay />
        </SectionReveal>
        <SectionReveal>
          <NewArrivals />
        </SectionReveal>
        <SectionReveal>
          <Testimonials />
        </SectionReveal>
        <SectionReveal>
          <Newsletter />
        </SectionReveal>
      </main>
      <SiteFooter />
    </>
  );
}
