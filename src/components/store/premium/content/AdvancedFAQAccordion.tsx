import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { PremiumSectionShell, SectionHeaderBlock, type BaseSectionProps } from "../shared";

export type AdvancedFAQAccordionProps = BaseSectionProps;

type FAQItem = {
  id: string;
  category: "Orders" | "Materials" | "Care" | "Warranty";
  question: string;
  answer: string;
};

const FAQ_ITEMS: FAQItem[] = [
  {
    id: "dispatch",
    category: "Orders",
    question: "How quickly are studio orders dispatched?",
    answer:
      "In-stock orders placed before 2:00 PM local time dispatch the same business day. Express tracked couriers deliver in 2–4 business days across North America, Europe, and APAC.",
  },
  {
    id: "returns",
    category: "Orders",
    question: "What is your return and exchange window?",
    answer:
      "Every full-price and bundle item carries a complimentary 30-day home trial. Use the prepaid return portal to exchange sizes immediately upon carrier scan.",
  },
  {
    id: "leather-source",
    category: "Materials",
    question: "Where is your full-grain leather tanned?",
    answer:
      "Our bags and Horween straps are sourced from certified vegetable-tanning mills in Santa Croce sull'Arno and Chicago, avoiding chrome salts for natural patina development.",
  },
  {
    id: "hoodie-shrinkage",
    category: "Care",
    question: "Will the 450 GSM French Terry Hoodie shrink after washing?",
    answer:
      "Each garment undergoes enzymatic pre-shrinking during finishing. Wash cold with gentle detergent and dry flat to preserve chest measurements within 1%.",
  },
  {
    id: "watch-warranty",
    category: "Warranty",
    question: "What does the 2-year chronograph warranty cover?",
    answer:
      "Movement timing accuracy, crown gasket integrity, and sapphire crystal seating are covered for 24 months worldwide through our watchmaker partners.",
  },
];

const TOPICS = ["All", "Orders", "Materials", "Care", "Warranty"] as const;

export function AdvancedFAQAccordion({
  subheading = "Client Concierge",
  heading = "Frequently Asked Questions",
  description = "Search our archival care notes, shipping schedules, and material certifications.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: AdvancedFAQAccordionProps) {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]!.id);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQ_ITEMS.filter((item) => {
      if (topic !== "All" && item.category !== topic) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [topic, query]);

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />

      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search shipping, leather, sizing..."
              aria-label="Search frequently asked questions"
              className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {TOPICS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTopic(t)}
                aria-pressed={topic === t}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  topic === t
                    ? "bg-primary text-primary-foreground"
                    : "border border-border bg-background text-foreground hover:border-primary/40"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-border rounded-2xl border border-border bg-background lg:col-span-8">
          {visible.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No answers match "{query}".</p>
          ) : (
            visible.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="px-6 py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? "" : item.id)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                        {item.category}
                      </span>
                      <p className="mt-0.5 font-display text-sm font-bold text-foreground sm:text-base">
                        {item.question}
                      </p>
                    </div>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
