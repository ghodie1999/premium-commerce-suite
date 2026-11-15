import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteNav } from "@/components/store/SiteNav";
import { CollectionView } from "@/components/store/CollectionView";
import { SiteFooter } from "@/components/store/SiteFooter";
import { getCollectionBySlug, getProductsByCollection } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  head: ({ params }) => {
    const col = getCollectionBySlug(params.slug);
    const title = col
      ? `${col.name} — ShopEase Curated Collection`
      : "Curated Collection — ShopEase";
    const description =
      col?.copy ??
      "Explore handcrafted everyday essentials, premium apparel, and tactile objects with free global delivery.";
    const canonical = `/collections/${params.slug}`;
    const items = getProductsByCollection(params.slug);

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:site_name", content: "ShopEase" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonical },
        ...(col?.image ? [{ property: "og:image", content: col.image }] : []),
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        ...(col?.image ? [{ name: "twitter:image", content: col.image }] : []),
      ],
      links: [{ rel: "canonical", href: canonical }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description,
            url: canonical,
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: items.length,
              itemListElement: items.map((p, idx) => ({
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
                {
                  "@type": "ListItem",
                  position: 3,
                  name: col?.name ?? "Collection",
                  item: canonical,
                },
              ],
            },
          }),
        },
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
