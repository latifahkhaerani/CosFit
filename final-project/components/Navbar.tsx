'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles, ShoppingBag, User } from "lucide-react";
// import { cookies } from "next/headers";
import { useState } from "react";
import { useEffect, useState } from "react";
import { handleLoginCookies } from "@/action";
// import { cookies } from "next/headers";

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavbarProps {
  brandName?: string;
  brandTagline?: string;
  links?: NavLink[];
  isLoggedIn?: boolean;
  loginLabel?: string;
  registerLabel?: string;
  loginHref?: string;
  registerHref?: string;
  checkoutHref?: string;
  profileHref?: string;
}

const defaultLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "marketplace", label: "Marketplace", href: "/marketplace" },
  { id: "forum", label: "Forum", href: "/forum" },
  { id: "events", label: "Events", href: "/events" },
  { id: "wishlist", label: "Wishlist", href: "/wishlist" },
  { id: "try-on", label: "Try On", href: "/try-on" },
  { id: "vendor", label: "Become a Vendor", href: "/vendor/login" },
];

/** "/" only matches exactly; every other route also matches its sub-paths. */
function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({
  brandName = "CosFit",
  brandTagline = "AI Virtual Fitting",
  links = defaultLinks,
  loginLabel = "Login",
  registerLabel = "Register",
  loginHref = "/login",
  registerHref = "/register",
  checkoutHref = "/checkout",
  profileHref = "/profile",
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLogin] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const checkLogin = async () => {
      const res = await handleLoginCookies()
      setIsLogin(res)
    }

    checkLogin()
  }, [])

  // const cookieStore = await cookies();
  // const isLoggedIn = cookieStore.get("Authorization") ? true : false;

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
          {links.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <li key={link.id}>
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-block border-b-2 pb-1 text-sm font-medium transition ${
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-text hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: auth buttons OR checkout/profile when logged in */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Link
                href={checkoutHref}
                aria-label="Checkout"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isActivePath(pathname, checkoutHref)
                    ? "border-primary/40 text-primary"
                    : "border-border text-text hover:border-primary/30 hover:text-primary"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
              </Link>
              <Link
                href={profileHref}
                aria-label="Profile"
                className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
                  isActivePath(pathname, profileHref)
                    ? "border-primary/40 text-primary"
                    : "border-border text-text hover:border-primary/30 hover:text-primary"
                }`}
              >
                <User className="h-4 w-4" />
              </Link>
            </>
          ) : (
            <>
              <Link
                href={loginHref}
                className="rounded-full border border-border px-5 py-2 text-sm font-medium text-text transition hover:bg-cream/40"
              >
                {loginLabel}
              </Link>
              <Link
                href={registerHref}
                className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white transition hover:bg-secondary"
              >
                {registerLabel}
              </Link>
            </>
          )}
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
            {links.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`inline-block border-l-2 pl-3 text-sm font-medium transition ${
                      active
                        ? "border-primary text-primary"
                        : "border-transparent text-text hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {isLoggedIn && (
              <>
                <li>
                  <Link
                    href={checkoutHref}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 border-l-2 pl-3 text-sm font-medium transition ${
                      isActivePath(pathname, checkoutHref)
                        ? "border-primary text-primary"
                        : "border-transparent text-text hover:text-primary"
                    }`}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Checkout
                  </Link>
                </li>
                <li>
                  <Link
                    href={profileHref}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-2 border-l-2 pl-3 text-sm font-medium transition ${
                      isActivePath(pathname, profileHref)
                        ? "border-primary text-primary"
                        : "border-transparent text-text hover:text-primary"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!isLoggedIn && (
            <div className="mt-4 flex gap-3">
              <Link
                href={loginHref}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 rounded-full border border-border px-5 py-2 text-center text-sm font-medium text-text hover:bg-cream/40"
              >
                {loginLabel}
              </Link>
              <Link
                href={registerHref}
                onClick={() => setIsMenuOpen(false)}
                className="flex-1 rounded-full bg-primary px-5 py-2 text-center text-sm font-medium text-white transition hover:bg-secondary"
              >
                {registerLabel}
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
