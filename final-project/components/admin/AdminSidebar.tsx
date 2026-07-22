"use client";

import { handleDeleteCookies } from "@/action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  ShieldCheck,
  LogOut,
} from "lucide-react";
import cn from "clsx";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await handleDeleteCookies();
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-border bg-surface text-foreground md:flex">
      <div className="flex h-20 items-center px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-primary text-white">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Admin</p>
          <p className="text-lg font-semibold text-foreground">CosFit</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-primary text-white"
                  : "text-muted hover:bg-background hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl border border-border px-4 py-3 text-sm font-medium text-muted transition hover:bg-background hover:text-foreground"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        <p className="mt-3 text-xs uppercase tracking-[0.3em] text-muted">
          Support
        </p>
        <p className="mt-2 text-sm text-foreground">
          Only admin content is visible here.
        </p>
      </div>
    </aside>
  );
}
