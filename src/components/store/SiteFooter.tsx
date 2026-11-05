import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Lock, Mail, MapPin, Phone, ShoppingBag, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-primary px-5 pb-8 pt-14 text-primary-foreground lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-accent-gradient text-accent-foreground">
                <ShoppingBag className="size-4.5" />
              </span>
              <span className="font-display text-lg font-extrabold">
                Shop<span className="text-accent">Ease</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-primary-foreground/65 leading-relaxed">
              Your destination for premium products at honest direct prices — curated, verified and
              shipped worldwide.
            </p>
            <ul className="mt-5 grid gap-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="size-4 text-accent" /> concierge@shopease.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 text-accent" /> +1 (800) 482-1920
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="size-4 text-accent" /> 120 Mercer Street, New York, NY
              </li>
            </ul>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="grid size-9 place-items-center rounded-full border border-primary-foreground/15 transition-colors hover:bg-primary-foreground/10"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
              Departments
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm">
              <li>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "trending-now" }}
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Trending Now
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "best-sellers" }}
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "women" }}
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Women's Wardrobe
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "men" }}
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Men's Collection
                </Link>
              </li>
              <li>
                <Link
                  to="/collections/$slug"
                  params={{ slug: "home-living" }}
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  Home & Living
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-primary-foreground/75 hover:text-accent transition-colors"
                >
                  All Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
              Customer Care
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-primary-foreground/75">
              <li>Free 30-Day Global Returns</li>
              <li>Worldwide Tracked Delivery</li>
              <li>Size & Fit Consultations</li>
              <li>Lifetime Craftsmanship Guarantee</li>
              <li>Order Status Tracking</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/50">
              Company
            </h3>
            <ul className="mt-4 grid gap-2.5 text-sm text-primary-foreground/75">
              <li>Our Atelier Story</li>
              <li>GOTS Organic Certification</li>
              <li>Ethical Production Standards</li>
              <li>Privacy Policy & Cookies</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/55">
          <p>© {new Date().getFullYear()} ShopEase. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <Lock className="size-3.5 text-success" /> 256-Bit SSL Encrypted Checkout · Visa ·
            Mastercard · Apple Pay · PayPal · Klarna
          </p>
        </div>
      </div>
    </footer>
  );
}
