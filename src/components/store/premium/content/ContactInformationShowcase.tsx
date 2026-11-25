import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type ContactInformationShowcaseProps = BaseSectionProps;

const CHANNELS = [
  {
    icon: Mail,
    label: "Client Concierge",
    value: "concierge@shopease.studio",
    meta: "Average reply under 2 hours · Mon–Sat",
  },
  {
    icon: Phone,
    label: "Atelier Appointments",
    value: "+1 (212) 555-0194",
    meta: "Direct line · 09:00–19:00 EST",
  },
  {
    icon: MapPin,
    label: "Flagship Showroom",
    value: "114 Mercer Street, New York",
    meta: "Private fittings & watch servicing",
  },
  {
    icon: Clock,
    label: "Dispatch Hours",
    value: "Same-Day Before 14:00",
    meta: "Climate-neutral global courier network",
  },
];

export function ContactInformationShowcase({
  subheading = "Direct Concierge",
  heading = "Speak With Our Studio Team",
  description = "Real product specialists in New York, London, and Tokyo ready to advise on sizing, garment care, or corporate gifting.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: ContactInformationShowcaseProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CHANNELS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6"
            >
              <div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Icon className="size-4" />
              </div>
              <div className="mt-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 font-display text-base font-bold text-foreground">
                  {item.value}
                </p>
                <p className="mt-1.5 text-xs text-muted-foreground">{item.meta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </PremiumSectionShell>
  );
}
