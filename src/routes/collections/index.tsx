import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { CollectionView } from "@/components/store/CollectionView";
import { SiteFooter } from "@/components/store/SiteFooter";

type CollectionSearchParams = {
  q?: string;
};

export const Route = createFileRoute("/collections/")({
  validateSearch: (search: Record<string, unknown>): CollectionSearchParams => {
    return {
      q: typeof search.q === "string" ? search.q : undefined,
    };
  },
  head: () => ({
    meta: [
      { title: "Curated Collections — ShopEase Premium Essentials" },
      {
        name: "description",
        content:
          "Browse our curated collections of apparel, luxury leather goods, minimal footwear, architectural home lighting, and acoustic audio.",
      },
      { property: "og:title", content: "Curated Collections — ShopEase" },
      {
        property: "og:description",
        content:
          "Browse our curated collections of apparel, luxury leather goods, minimal footwear, architectural home lighting, and acoustic audio.",
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
