import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import {
  PREMIUM_ASSETS,
  PremiumSectionShell,
  SectionHeaderBlock,
  type BaseSectionProps,
} from "../shared";

export type PremiumContactFormProps = BaseSectionProps;

const TOPICS = ["Sizing & Fit", "Order Status", "Press & Partnerships", "Corporate Gifting"];

export function PremiumContactForm({
  subheading = "Written Inquiry",
  heading = "Send a Note to the Atelier",
  description = "Questions regarding custom monograms, international duties, or garment measurements receive tailored responses from our specialists.",
  surface = "white",
  spacing = "normal",
  fullWidth = false,
  className = "",
}: PremiumContactFormProps) {
  const [topic, setTopic] = useState(TOPICS[0]!);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <PremiumSectionShell
      surface={surface}
      spacing={spacing}
      fullWidth={fullWidth}
      ariaLabel={heading}
      className={className}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-5">
          <SectionHeaderBlock subheading={subheading} heading={heading} description={description} />
          <div className="mt-6 overflow-hidden rounded-3xl border border-border">
            <img
              src={PREMIUM_ASSETS.home}
              alt="ShopEase Studio Workspace"
              loading="lazy"
              decoding="async"
              width={640}
              height={480}
              className="aspect-4/3 w-full object-cover"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6 sm:p-8 lg:col-span-7">
          {submitted ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="mx-auto size-10 text-emerald-600" />
              <h3 className="mt-4 font-display text-xl font-extrabold text-foreground">
                Message Received, {name}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Our {topic} specialist has logged your note and will reply to {email} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setMessage("");
                }}
                className="mt-6 rounded-full border border-border px-5 py-2 text-xs font-semibold text-foreground hover:border-primary"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Inquiry Topic
                </p>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      aria-pressed={topic === t}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                        topic === t
                          ? "bg-primary text-primary-foreground"
                          : "border border-border bg-card text-foreground"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Claire Dupont"
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-xs font-semibold text-foreground"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block text-xs font-semibold text-foreground"
                >
                  How can we assist?
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share garment size questions, order numbers, or gifting requests..."
                  className="w-full rounded-xl border border-border bg-card px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <Send className="size-4" /> Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </PremiumSectionShell>
  );
}
