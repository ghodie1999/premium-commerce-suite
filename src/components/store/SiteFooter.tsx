import { Facebook, Instagram, Lock, Mail, MapPin, Phone, ShoppingBag, Twitter } from "lucide-react";

const columns = [
  { title: "Shop", links: ["New In", "Best Sellers", "Deals", "Gift Cards", "Collections"] },
  {
    title: "Support",
    links: ["FAQs", "Shipping Policy", "Returns & Refunds", "Track Order", "Contact Us"],
  },
  { title: "Company", links: ["About Us", "Sustainability", "Careers", "Privacy Policy", "Terms"] },
];

export function SiteFooter() {
  return (
    <footer className="mt-6 bg-primary px-5 pb-8 pt-14 text-primary-foreground lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-accent-foreground">
                <ShoppingBag className="size-4.5" />
              </span>
              <span className="font-display text-lg font-extrabold">
                Shop<span className="text-accent">Ease</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/65">
              Your destination for premium products at honest prices — curated, verified and shipped
              worldwide.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-accent" /> support@shopease.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-accent" /> +1 234 567 8900
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" /> 123 Commerce St, New York
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social profile"
                  className="grid size-9 place-items-center rounded-full border border-primary-foreground/15 transition-colors hover:bg-primary-foreground/10"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
                {col.title}
              </h3>
              <ul className="mt-4 grid gap-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-primary-foreground/75 transition-colors hover:text-accent"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/55">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Lock className="size-3.5 text-success" /> Secure PCI-compliant checkout · Visa ·
            Mastercard · Apple Pay · PayPal
          </p>
        </div>
      </div>
    </footer>
  );
}
