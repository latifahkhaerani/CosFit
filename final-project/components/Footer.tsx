import Link from "next/link";
import { Sparkles } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaDiscord,
} from "react-icons/fa";
import type { IconType } from "react-icons";

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: IconType;
}

export interface FooterProps {
  brandName?: string;
  brandTagline?: string;
  brandDescription?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  copyrightText?: string;
}

const defaultColumns: FooterColumn[] = [
  {
    id: "explore",
    title: "Explore",
    links: [
      { id: "characters", label: "Characters", href: "/characters" },
      { id: "marketplace", label: "Marketplace", href: "/marketplace" },
      { id: "events", label: "Events", href: "/events" },
      { id: "forum", label: "Forum", href: "/forum" },
    ],
  },
  {
    id: "support",
    title: "Support",
    links: [
      { id: "how-it-works", label: "How It Works", href: "/how-it-works" },
      { id: "help-center", label: "Help Center", href: "/help-center" },
      { id: "size-guide", label: "Size Guide", href: "/size-guide" },
      { id: "contact-us", label: "Contact Us", href: "/contact-us" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { id: "about-us", label: "About Us", href: "/about-us" },
      { id: "become-a-vendor", label: "Become a Vendor", href: "/become-a-vendor" },
      { id: "privacy-policy", label: "Privacy Policy", href: "/privacy-policy" },
      { id: "terms-of-service", label: "Terms of Service", href: "/terms-of-service" },
    ],
  },
];

const defaultSocialLinks: SocialLink[] = [
  { id: "facebook", label: "Facebook", href: "#", icon: FaFacebookF },
  { id: "instagram", label: "Instagram", href: "#", icon: FaInstagram },
  { id: "twitter", label: "Twitter", href: "#", icon: FaTwitter },
  { id: "youtube", label: "YouTube", href: "#", icon: FaYoutube },
  { id: "discord", label: "Discord", href: "#", icon: FaDiscord },
];

export default function Footer({
  brandName = "CosFit",
  brandTagline = "AI Virtual Fitting",
  brandDescription = "AI-powered virtual fitting platform for cosplay costume rentals.",
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  copyrightText = `\u00A9 ${new Date().getFullYear()} CosFit. All rights reserved.`,
}: FooterProps) {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex flex-col leading-none">
              <span className="flex items-center gap-1.5 font-serif text-2xl font-bold text-primary">
                {brandName}
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="mt-1 text-xs tracking-wide text-muted">
                {brandTagline}
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-base text-muted">{brandDescription}</p>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.id}>
              <p className="text-base font-semibold text-text">{column.title}</p>
              <ul className="mt-5 flex flex-col gap-3.5">
                {column.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-base text-muted transition hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social column */}
          <div>
            <p className="text-base font-semibold text-text">Follow Us</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ id, label, href, icon: Icon }) => (
                <Link
                  key={id}
                  href={href}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6">
          <p className="text-sm text-muted">{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
