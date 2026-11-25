import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type TeamMembersProps = BaseSectionProps;

const TEAM = [
  {
    name: "Clara Lindholm",
    role: "Creative & Textile Director",
    studio: "New York Studio",
    bio: "14 years developing heavyweight organic knits and outerwear proportions.",
    image: PREMIUM_ASSETS.women,
  },
  {
    name: "Kenji Takahashi",
    role: "Head of Industrial Objects",
    studio: "Tokyo Atelier",
    bio: "Focuses on tactile brass lighting, acoustic chambers, and kiln ceramics.",
    image: PREMIUM_ASSETS.tech,
  },
  {
    name: "Marco Bellini",
    role: "Master Leather Buyer",
    studio: "Florence Desk",
    bio: "Oversees vegetable tanning, edge burnishing, and Horween strap finishing.",
    image: PREMIUM_ASSETS.men,
  },
  {
    name: "Amélie Laurent",
    role: "Olfactory & Botanical Curator",
    studio: "Grasse Lab",
    bio: "Composes small-batch extrait de parfum formulas with botanical extracts.",
    image: PREMIUM_ASSETS.beauty,
  },
];

export function TeamMembers({
  subheading = "Studio Leadership",
  heading = "The Makers Behind the Objects",
  description = "A small multidisciplinary group of textile directors, industrial designers, and material buyers.",
  surface = "default",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: TeamMembersProps) {
  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {TEAM.map((member) => (
          <article key={member.name} className="group">
            <div className="overflow-hidden rounded-2xl bg-sand">
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                decoding="async"
                width={480}
                height={580}
                className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-3 text-[11px] font-bold uppercase tracking-wider text-accent">
              {member.studio}
            </p>
            <h3 className="mt-0.5 font-display text-base font-extrabold text-foreground">
              {member.name}
            </h3>
            <p className="text-xs font-semibold text-primary">{member.role}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{member.bio}</p>
          </article>
        ))}
      </div>
    </PremiumSectionShell>
  );
}
