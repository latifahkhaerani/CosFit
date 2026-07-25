"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { handleDeleteCookies } from "@/action";

const menus = [
  {
    title: "Dashboard",
    href: "/vendor",
    icon: LayoutDashboard,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Forum",
    href: "/forum",
    icon: MessageSquare,
  },
];

export default function VendorSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await handleDeleteCookies();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="sticky top-0 flex h-screen w-70 flex-col border-r border-(--border) bg-white">
      {/* Logo */}
      <div className="px-8 py-8">
        <h1 className="text-[42px] font-bold tracking-tight">CosFit</h1>
        <p className="text-(--primary)">Vendor</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-5">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const active = pathname === menu.href;

          return (
            <Link
              key={menu.title}
              href={menu.href}
              className={`group relative flex items-center justify-between overflow-hidden rounded-2xl px-5 py-4 transition-all duration-300 ease-out ${
                active
                  ? "bg-linear-to-r from-[#FFF5F0] to-[#FFFDFB] text-(--primary) shadow-soft"
                  : "text-gray-700 hover:-translate-y-0.5 hover:bg-[#FCFBFA] hover:text-(--primary) hover:shadow-md"
              }`}
            >
              {/* Left Accent */}
              <span
                className={`absolute left-0 top-1/2 w-1 -translate-y-1/2 rounded-r-full bg-(--primary) transition-all duration-300 ${
                  active ? "h-10" : "h-0 group-hover:h-8"
                }`}
              />

              <div className="flex items-center gap-4">
                <Icon
                  size={20}
                  className={`transition-transform duration-300 ${
                    active
                      ? "scale-110"
                      : "group-hover:scale-110 group-hover:rotate-3"
                  }`}
                />

                <span className="font-medium transition-colors duration-300">
                  {menu.title}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-(--border) p-5">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-gray-700 transition-all duration-300 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut
            size={20}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />

          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
}