import { useState } from "react";
import logoAureaLabs from "@/assets/images/logo_aurea_botanicals_1794778674159.jpg";
import logoKurodaCraft from "@/assets/images/logo_kuroda_craft_1794778673026.jpg";
import logoMeridianAtelier from "@/assets/images/logo_meridian_atelier_1794778672209.jpg";
import logoSolsticeAudio from "@/assets/images/logo_solstice_audio_1794778673610.jpg";
import logoValeHome from "@/assets/images/logo_vale_ceramics_1794778674954.jpg";
import logoVeloExpress from "@/assets/images/logo_velo_express_1794778673903.jpg";

export type TrustedCompanyLogo = {
  id: string;
  name: string;
  role: string;
  logoSrc: string;
};

// Replace or extend entries here to showcase your own trusted partner logo images
export const trustedCompanies: TrustedCompanyLogo[] = [
  {
    id: "meridian-atelier",
    name: "Meridian Atelier",
    role: "Organic Textile Mill",
    logoSrc: logoMeridianAtelier,
  },
  {
    id: "kuroda-craft",
    name: "Kuroda Craft",
    role: "Vegetable-Tanned Leather",
    logoSrc: logoKurodaCraft,
  },
  {
    id: "solstice-audio",
    name: "Solstice Audio",
    role: "Acoustic Engineering",
    logoSrc: logoSolsticeAudio,
  },
  {
    id: "velo-express",
    name: "Velo Express",
    role: "Carbon-Neutral Logistics",
    logoSrc: logoVeloExpress,
  },
  {
    id: "aurea-labs",
    name: "Aurea Labs",
    role: "Botanical Formulation",
    logoSrc: logoAureaLabs,
  },
  {
    id: "vale-home",
    name: "Vale Home",
    role: "Architectural Stoneware",
    logoSrc: logoValeHome,
  },
];

function PartnerLogoCard({
  company,
  ariaHidden,
}: {
  company: TrustedCompanyLogo;
  ariaHidden?: boolean;
}) {
  const [errored, setErrored] = useState(false);

  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="group mx-2 flex w-28 sm:w-34 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-border/75 bg-[#FAF8F5] shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40"
    >
      <div className="aspect-16/9 w-full overflow-hidden bg-[#FAF8F5]">
        {errored ? (
          <div className="flex h-full w-full items-center justify-center px-2 text-center">
            <span className="font-display text-xs font-bold tracking-tight text-foreground">
              {company.name}
            </span>
          </div>
        ) : (
          <img
            src={company.logoSrc}
            alt={ariaHidden ? "" : `${company.name} — ${company.role}`}
            referrerPolicy="no-referrer"
            loading="lazy"
            decoding="async"
            width={160}
            height={90}
            onError={() => setErrored(true)}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-103"
          />
        )}
      </div>
    </div>
  );
}

export function TrustedCompaniesMarquee() {
  return (
    <section aria-label="Trusted partner companies" className="px-5 pb-10 pt-2 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-border/70 bg-sand/35 px-5 py-6 sm:px-7">
        <div className="flex flex-col items-center justify-between gap-1 text-center sm:flex-row sm:text-left">
          <div className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-0.5 sm:justify-start">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              Trusted Partners
            </p>
            <span aria-hidden="true" className="hidden text-muted-foreground/50 sm:inline">
              ·
            </span>
            <h2 className="font-display text-sm font-bold tracking-tight text-foreground sm:text-base">
              Crafted &amp; delivered with verified industry leaders
            </h2>
          </div>
        </div>

        {/* Compact Contained Picture Logo Marquee */}
        <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="logo-marquee-track py-0.5">
            {trustedCompanies.map((company) => (
              <PartnerLogoCard key={company.id} company={company} />
            ))}
            {trustedCompanies.map((company) => (
              <PartnerLogoCard key={`dup-${company.id}`} company={company} ariaHidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
