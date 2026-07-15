"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  brandTagline?: string;
  links?: NavLink[];
  loginLabel?: string;
  registerLabel?: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const defaultLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "characters", label: "Characters", href: "/characters" },
  { id: "marketplace", label: "Marketplace", href: "/marketplace" },
  { id: "forum", label: "Forum", href: "/forum" },
  { id: "events", label: "Events", href: "/events" },
  { id: "vendor", label: "Become a Vendor", href: "/become-a-vendor" },
];

export default function Navbar({
  brandName = "CosFit",
  brandTagline = "AI Virtual Fitting",
  links = defaultLinks,
  loginLabel = "Login",
  registerLabel = "Register",
  onLoginClick,
  onRegisterClick,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Brand */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="flex items-center gap-1 font-serif text-xl font-bold text-primary">
            {brandName}
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <span className="text-[10px] tracking-wide text-muted">{brandTagline}</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                href={link.href}
                className="text-sm font-medium text-text transition hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={onLoginClick}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition hover:bg-cream/40"
          >
            {loginLabel}
          </button>
          <button
            type="button"
            onClick={onRegisterClick}
            className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-white transition hover:brightness-105"
          >
            {registerLabel}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text md:hidden"
        >
          {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t border-border px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm font-medium text-text hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={onLoginClick}
              className="flex-1 rounded-full border border-border px-5 py-2 text-sm font-medium text-text hover:bg-cream/40"
            >
              {loginLabel}
            </button>
            <button
              type="button"
              onClick={onRegisterClick}
              className="flex-1 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-medium text-white hover:brightness-105"
            >
              {registerLabel}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
