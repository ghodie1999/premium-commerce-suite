import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { CollectionView } from "@/components/store/CollectionView";
import { SiteFooter } from "@/components/store/SiteFooter";
import { products } from "@/lib/catalog";

type CollectionSearchParams = {
  q?: string;
};

const title = "Curated Collections — ShopEase Premium Essentials";
const description =
  "Explore curated everyday essentials including heavyweight organic cotton hoodies, vegetable-tanned leather totes, artisanal ceramics, and studio audio.";

export const Route = createFileRoute("/collections/")({
  validateSearch: (search: Record<string, unknown>): CollectionSearchParams => {
    return {
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:site_name", content: "ShopEase" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/collections" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: "/collections",
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: products.length,
            itemListElement: products.map((p, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: p.name,
              url: `/products/${p.id}`,
            })),
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Collections",
                item: "/collections",
              },
            ],
          },
        }),
      },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const { q } = Route.useSearch();

  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main>
        <CollectionView initialCollectionSlug="all" initialSearchQuery={q ?? ""} />
      </main>
      <SiteFooter />
    </>
  );
}
