"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Layers,
  ShieldCheck,
} from "lucide-react";
import cn from "clsx";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 flex-col border-r border-slate-200 bg-slate-950 text-slate-100 md:flex">
      <div className="flex h-20 items-center px-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-950">
          <ShieldCheck className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
            Admin
          </p>
          <p className="text-lg font-semibold">CosFit</p>
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
                  ? "bg-slate-800 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Support
        </p>
        <p className="mt-2 text-sm text-slate-300">
          Only admin content is visible here.
        </p>
      </div>
    </aside>
  );
}
