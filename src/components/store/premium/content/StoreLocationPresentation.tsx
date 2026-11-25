import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type StoreLocationPresentationProps = BaseSectionProps;

const FLAGSHIPS = [
  {
    id: "ny",
    city: "New York · SoHo",
    address: "114 Mercer Street, NY 10012",
    hours: "Mon–Sat 10:00–19:00 · Sun 11:00–18:00",
    services: ["Personal Wardrobe Styling", "Same-Day Courier Pickup", "Watch Strap Fitting"],
    image: PREMIUM_ASSETS.men,
  },
  {
    id: "ldn",
    city: "London · Marylebone",
    address: "38 Chiltern Street, W1U 7QL",
    hours: "Mon–Sat 10:00–18:30 · Sun 12:00–17:00",
    services: ["Tuscany Leather Conditioning", "Bespoke Gift Wrapping", "Archive Previews"],
    image: PREMIUM_ASSETS.women,
  },
  {
    id: "tyo",
    city: "Tokyo · Minami-Aoyama",
    address: "5-7-21 Minami-Aoyama, Minato-ku",
    hours: "Daily 11:00–20:00",
    services: ["Pour-Over Tasting Bar", "Listening Room (Studio Master)", "Tax-Free Shopping"],
    image: PREMIUM_ASSETS.home,
  },
];

export function StoreLocationPresentation({
  subheading = "Physical Flagships",
  heading = "Visit Our Studio Boutiques",
  description = "Experience the hand-feel of our heavyweight cottons, Italian hides, and stoneware in person.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: StoreLocationPresentationProps) {
  const [selectedId, setSelectedId] = useState(FLAGSHIPS[0]!.id);
  const current = FLAGSHIPS.find((f) => f.id === selectedId) ?? FLAGSHIPS[0]!;

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 lg:grid-cols-12">
        <div className="space-y-3 lg:col-span-5">
          {FLAGSHIPS.map((store) => {
            const active = store.id === current.id;
            return (
              <button
                key={store.id}
                type="button"
                onClick={() => setSelectedId(store.id)}
                aria-pressed={active}
                className={`w-full rounded-2xl border p-5 text-left transition-all ${
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-soft"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                <p className="font-display text-base font-extrabold">{store.city}</p>
                <p
                  className={`mt-1 flex items-center gap-1.5 text-xs ${
                    active ? "text-primary-foreground/80" : "text-muted-foreground"
                  }`}
                >
                  <MapPin className="size-3.5 text-accent" /> {store.address}
                </p>
                <p
                  className={`mt-1 flex items-center gap-1.5 text-xs ${
                    active ? "text-primary-foreground/75" : "text-muted-foreground"
                  }`}
                >
                  <Clock className="size-3.5" /> {store.hours}
                </p>
              </button>
            );
          })}
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card lg:col-span-7">
          <img
            src={current.image}
            alt={current.city}
            loading="lazy"
            decoding="async"
            width={900}
            height={520}
            className="h-64 w-full object-cover sm:h-72"
          />
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-accent">
              Available In-Store Services
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {current.services.map((svc) => (
                <span
                  key={svc}
                  className="border-l-2 border-accent pl-3 text-xs font-semibold text-foreground"
                >
                  {svc}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PremiumSectionShell>
  );
}
