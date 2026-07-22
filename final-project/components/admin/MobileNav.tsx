"use client";

import { handleDeleteCookies } from "@/action";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";
import cn from "clsx";

export function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await handleDeleteCookies();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface md:hidden">
      <div className="mx-auto flex max-w-5xl justify-between px-4 py-3">
        <Link
          href="/admin"
          className={cn(
            "flex items-center gap-2 rounded-3xl px-3 py-2 text-sm font-medium",
            pathname === "/admin"
              ? "bg-primary text-white"
              : "text-muted hover:bg-background",
          )}
        >
          <Menu className="h-4 w-4" />
          Dashboard
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-3xl px-3 py-2 text-sm font-medium text-muted hover:bg-background"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </div>
  );
}
