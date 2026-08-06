import { useState } from "react";
import { X } from "lucide-react";

const messages = [
  "Free shipping on orders over $100",
  "Extra 15% off with code PREMIUM15",
  "Secure payments — 30-day easy returns",
  "Worldwide delivery in 2–5 days",
];

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div className="relative overflow-hidden bg-primary text-primary-foreground">
      <div className="marquee-track py-2.5 text-xs font-medium tracking-wide">
        {[...messages, ...messages].map((m, i) => (
          <span key={i} className="mx-8 inline-flex items-center gap-2">
            <span className="size-1 rounded-full bg-accent" />
            {m}
          </span>
        ))}
      </div>
      <button
        type="button"
        aria-label="Dismiss announcements"
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
