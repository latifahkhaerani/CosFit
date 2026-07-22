"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import cn from "clsx";

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <div className="mx-auto flex max-w-5xl justify-between px-4 py-3">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 rounded-3xl px-3 py-2 text-sm font-medium",
            pathname === "/admin"
              ? "bg-slate-950 text-white"
              : "text-slate-500 hover:bg-slate-100",
          )}
        >
          <Menu className="h-4 w-4" />
          Dashboard
        </Link>
      </div>
    </div>
  );
}
