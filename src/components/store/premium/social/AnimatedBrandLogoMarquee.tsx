import { trustedCompanies } from "@/components/store/TrustedCompaniesMarquee";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AnimatedBrandLogoMarqueeProps = BaseSectionProps;

export function AnimatedBrandLogoMarquee({
  subheading = "Supply Network",
  heading = "Certified Workshop & Carrier Partners",
  surface = "white",
  spacing = "compact",
  fullWidth = false,
  className = "",
}: AnimatedBrandLogoMarqueeProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} align="center" />

      <div className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="logo-marquee-track py-1">
          {[...trustedCompanies, ...trustedCompanies].map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className="mx-3 flex w-36 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-[#FAF8F5] p-2"
            >
              <img
                src={partner.logoSrc}
                alt={idx < trustedCompanies.length ? partner.name : ""}
                aria-hidden={idx >= trustedCompanies.length}
                loading="lazy"
                decoding="async"
                width={140}
                height={78}
                className="aspect-16/9 w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
