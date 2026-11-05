import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { CollectionView } from "@/components/store/CollectionView";
import { SiteFooter } from "@/components/store/SiteFooter";
import { getCollectionBySlug } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const col = getCollectionBySlug(params.slug);
    const title = col ? `${col.name} — ShopEase` : "Curated Collection — ShopEase";
    const description =
      col?.copy ?? "Shop curated premium everyday essentials with free worldwide delivery.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: CollectionSlugPage,
});

function CollectionSlugPage() {
  const { slug } = Route.useParams();

  return (
    <>
      <AnnouncementBar />
      <SiteNav />
      <main>
        <CollectionView initialCollectionSlug={slug} />
      </main>
      <SiteFooter />
    </>
  );
}
