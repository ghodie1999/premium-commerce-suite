import type { ReactNode } from "react";
import heroImg from "@/assets/hero.jpg";
import catBeauty from "@/assets/cat-beauty.jpg";
import catHome from "@/assets/cat-home.jpg";
import catMen from "@/assets/cat-men.jpg";
import catTech from "@/assets/cat-tech.jpg";
import catWomen from "@/assets/cat-women.jpg";
import watchImg from "@/assets/deal-watch.jpg";
import bagImg from "@/assets/p-bag.jpg";
import hoodieImg from "@/assets/p-hoodie.jpg";
import perfumeImg from "@/assets/p-perfume.jpg";
import sneakersImg from "@/assets/p-sneakers.jpg";
import deskLampImg from "@/assets/images/product_desk_lamp_1793880894910.jpg";
import headphonesImg from "@/assets/images/product_wireless_headphones_1793880896325.jpg";
import sunglassesImg from "@/assets/images/product_sunglasses_tortoise_1793880896756.jpg";
import mugSetImg from "@/assets/images/product_ceramic_mug_set_1793880897145.jpg";

export const PREMIUM_ASSETS = {
  hero: heroImg,
  women: catWomen,
  men: catMen,
  home: catHome,
  beauty: catBeauty,
  tech: catTech,
  watch: watchImg,
  bag: bagImg,
  hoodie: hoodieImg,
  perfume: perfumeImg,
  sneakers: sneakersImg,
  deskLamp: deskLampImg,
  headphones: headphonesImg,
  sunglasses: sunglassesImg,
  mugSet: mugSetImg,
} as const;

export type SectionSurface = "default" | "white" | "sand" | "primary";
export type SectionSpacing = "compact" | "normal" | "spacious";
export type SectionAlignment = "left" | "center" | "right";

export type BaseSectionProps = {
  heading?: string;
  subheading?: string;
  description?: string;
  fullWidth?: boolean;
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  align?: SectionAlignment;
  className?: string;
};

export const SURFACE_MAP: Record<SectionSurface, string> = {
  default: "bg-background text-foreground",
  white: "bg-card text-foreground",
  sand: "bg-sand/50 text-foreground",
  primary: "bg-primary text-primary-foreground",
};

export const SPACING_MAP: Record<SectionSpacing, string> = {
  compact: "py-8 lg:py-10",
  normal: "py-12 lg:py-16",
  spacious: "py-16 lg:py-24",
};

export const ALIGN_MAP: Record<SectionAlignment, string> = {
  left: "text-left items-start",
  center: "text-center items-center mx-auto",
  right: "text-right items-end ml-auto",
};

export function PremiumSectionShell({
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
  ariaLabel,
  id,
  children,
}: {
  surface?: SectionSurface;
  spacing?: SectionSpacing;
  fullWidth?: boolean;
  className?: string;
  ariaLabel?: string;
  id?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`${SURFACE_MAP[surface]} ${SPACING_MAP[spacing]} ${className}`}
    >
      <div className={fullWidth ? "w-full px-5 lg:px-10" : "mx-auto max-w-7xl px-5 lg:px-8"}>
        {children}
      </div>
    </section>
  );
}

export function SectionHeaderBlock({
  subheading,
  heading,
  description,
  align = "left",
  dark = false,
  action,
}: {
  subheading?: string;
  heading: string;
  description?: string;
  align?: SectionAlignment;
  dark?: boolean;
  action?: ReactNode;
}) {
  const isCentered = align === "center";
  return (
    <div
      className={`flex flex-col gap-3 ${
        isCentered
          ? "items-center text-center"
          : align === "right"
            ? "items-end text-right"
            : "sm:flex-row sm:items-end sm:justify-between"
      }`}
    >
      <div className={isCentered ? "max-w-2xl" : "max-w-2xl"}>
        {subheading && (
          <p
            className={`text-xs font-bold uppercase tracking-[0.2em] ${
              dark ? "text-accent" : "text-accent"
            }`}
          >
            {subheading}
          </p>
        )}
        <h2
          className={`mt-2 font-display text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl text-balance ${
            dark ? "text-primary-foreground" : "text-foreground"
          }`}
        >
          {heading}
        </h2>
        {description && (
          <p
            className={`mt-2.5 text-sm leading-relaxed ${
              dark ? "text-primary-foreground/75" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
