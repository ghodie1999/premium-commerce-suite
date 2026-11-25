import { Link } from "@tanstack/react-router";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

const SOCIAL_FRAMES = [
  {
    img: PREMIUM_ASSETS.hoodie,
    alt: "Essential hoodie styled outdoors",
    handle: "@atelier.milan",
    to: "/products/essential-hoodie",
  },
  {
    img: PREMIUM_ASSETS.bag,
    alt: "Leather tote in warm daylight",
    handle: "@studio.oslo",
    to: "/products/leather-handbag",
  },
  {
    img: PREMIUM_ASSETS.deskLamp,
    alt: "Desk lamp on oak worktable",
    handle: "@nordic.desk",
    to: "/products/architectural-desk-lamp",
  },
  {
    img: PREMIUM_ASSETS.mugSet,
    alt: "Stoneware pour-over ritual",
    handle: "@morning.brew",
    to: "/products/artisanal-pour-over-set",
  },
  {
    img: PREMIUM_ASSETS.watch,
    alt: "Steel chronograph on linen cuff",
    handle: "@horology.daily",
    to: "/products/minimalist-chronograph",
  },
];

export type InstagramStyleGalleryProps = BaseSectionProps;

export function InstagramStyleGallery({
  subheading = "@ShopEaseAtelier",
  heading = "In the Wild",
  description = "How our community styles ShopEase pieces across workspaces and cities.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: InstagramStyleGalleryProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {SOCIAL_FRAMES.map((frame) => (
          <Link
            key={frame.handle}
            to={frame.to}
            className="group relative overflow-hidden rounded-2xl bg-sand"
          >
            <img
              src={frame.img}
              alt={frame.alt}
              loading="lazy"
              decoding="async"
              width={360}
              height={450}
              className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="text-xs font-semibold text-white">{frame.handle}</span>
            </div>
          </Link>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
